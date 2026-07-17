const YAML_ANSWERS = Object.freeze({
  c1q1: 1,
  c1q2: 2,
  c1q3: 0,
  c2q1: 1,
  c2q2: 1,
  c2q3: 0,
  c3q1: 0,
  c3q2: 2,
  c3q3: 1,
  c4q1: 0,
  c4q2: 1,
  c4q3: 2,
  c5q1: 0,
  c5q2: 1,
  c5q3: 0,
  c6q1: 0,
  c6q2: 1,
  c6q3: 1,
  c7q1: 0,
  c7q2: 1,
  c7q3: 1,
  c8q1: 0,
  c8q2: 1,
  c8q3: 1,
  c9q1: 1,
  c9q2: 1,
  c9q3: 1,
  c10q1: 1,
  c10q2: 0,
  c10q3: 1,
})

const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
})

const cors = env => ({
  'access-control-allow-origin': env.ALLOWED_ORIGIN,
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type',
  'vary': 'origin',
})

const cleanName = value => String(value || '')
  .normalize('NFKC')
  .replace(/[\u0000-\u001f\u007f]/g, '')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, 24)

async function hash(value) {
  const bytes = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('')
}

function validateAttempt(body) {
  const playerName = cleanName(body.playerName)
  const playerId = String(body.playerId || '')
  const durationSeconds = Number(body.durationSeconds)
  const answers = body.answers

  if (!playerName) return { error: 'Choose a player name.' }
  if (!/^[a-zA-Z0-9_-]{16,128}$/.test(playerId)) return { error: 'Invalid player identifier.' }
  if (!Number.isInteger(durationSeconds) || durationSeconds < 20 || durationSeconds > 7200) return { error: 'Invalid completion duration.' }
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) return { error: 'Invalid answers.' }

  const keys = Object.keys(YAML_ANSWERS)
  if (Object.keys(answers).length !== keys.length || keys.some(key => !Number.isInteger(answers[key]))) {
    return { error: 'A complete answer set is required.' }
  }

  const correctAnswers = keys.reduce((total, key) => total + Number(answers[key] === YAML_ANSWERS[key]), 0)
  return { playerName, playerId, durationSeconds, correctAnswers, totalAnswers: keys.length }
}


async function verifyTurnstile(request, env, token) {
  if (!token || typeof token !== 'string') return { success: false, error: 'Human verification required.' }

  const form = new FormData()
  form.set('secret', env.TURNSTILE_SECRET)
  form.set('response', token)
  const remoteIp = request.headers.get('CF-Connecting-IP')
  if (remoteIp) form.set('remoteip', remoteIp)

  let result
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form })
    result = await response.json()
  } catch {
    return { success: false, error: 'Human verification unavailable.' }
  }

  if (!result.success) return { success: false, error: 'Human verification failed.' }
  if (!['arthak.fr', 'www.arthak.fr'].includes(result.hostname)) {
    return { success: false, error: 'Invalid verification hostname.' }
  }
  return { success: true }
}

async function submit(request, env) {
  let body
  try { body = await request.json() } catch { return json({ error: 'Invalid JSON.' }, 400, cors(env)) }

  const turnstile = await verifyTurnstile(request, env, body.turnstileToken)
  if (!turnstile.success) return json({ error: turnstile.error }, 403, cors(env))

  const attempt = validateAttempt(body)
  if (attempt.error) return json({ error: attempt.error }, 400, cors(env))

  const playerIdHash = await hash(`${attempt.playerId}:${env.COURSE_VERSION}`)
  await env.DB.prepare(`
    INSERT INTO leaderboard_scores
      (course, course_version, player_name, player_id_hash, correct_answers, total_answers, duration_seconds)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(course, course_version, player_id_hash) DO UPDATE SET
      player_name = excluded.player_name,
      correct_answers = CASE
        WHEN excluded.correct_answers > leaderboard_scores.correct_answers THEN excluded.correct_answers
        ELSE leaderboard_scores.correct_answers
      END,
      duration_seconds = CASE
        WHEN excluded.correct_answers > leaderboard_scores.correct_answers THEN excluded.duration_seconds
        WHEN excluded.correct_answers = leaderboard_scores.correct_answers
          THEN MIN(excluded.duration_seconds, leaderboard_scores.duration_seconds)
        ELSE leaderboard_scores.duration_seconds
      END,
      created_at = CASE
        WHEN excluded.correct_answers > leaderboard_scores.correct_answers
          OR (excluded.correct_answers = leaderboard_scores.correct_answers AND excluded.duration_seconds < leaderboard_scores.duration_seconds)
        THEN CURRENT_TIMESTAMP ELSE leaderboard_scores.created_at END
  `).bind('yaml', env.COURSE_VERSION, attempt.playerName, playerIdHash, attempt.correctAnswers, attempt.totalAnswers, attempt.durationSeconds).run()

  return json({
    ok: true,
    correctAnswers: attempt.correctAnswers,
    totalAnswers: attempt.totalAnswers,
    score: Number((attempt.correctAnswers / attempt.totalAnswers * 10).toFixed(1)),
  }, 201, cors(env))
}

async function leaderboard(request, env) {
  const url = new URL(request.url)
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get('limit')) || 20))
  const period = ['today', 'week', 'month', 'all'].includes(url.searchParams.get('period')) ? url.searchParams.get('period') : 'all'
  const filters = {
    today: "AND created_at >= datetime('now', 'start of day')",
    week: "AND created_at >= datetime('now', '-7 days')",
    month: "AND created_at >= datetime('now', 'start of month')",
    all: '',
  }

  const result = await env.DB.prepare(`
    SELECT player_name, correct_answers, total_answers, duration_seconds, created_at
    FROM leaderboard_scores
    WHERE course = ? AND course_version = ? ${filters[period]}
    ORDER BY correct_answers DESC, duration_seconds ASC, created_at ASC
    LIMIT ?
  `).bind('yaml', env.COURSE_VERSION, limit).all()

  return json({ period, entries: result.results }, 200, { ...cors(env), 'cache-control': 'public, max-age=30' })
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('origin')
    const headers = cors(env)
    if (origin && origin !== env.ALLOWED_ORIGIN) return json({ error: 'Origin not allowed.' }, 403, headers)
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers })

    const { pathname } = new URL(request.url)
    if (pathname === '/health' && request.method === 'GET') return json({ ok: true, service: 'arthak-leaderboard' }, 200, headers)
    if (pathname === '/api/courses/yaml/leaderboard' && request.method === 'GET') return leaderboard(request, env)
    if (pathname === '/api/courses/yaml/attempt' && request.method === 'POST') return submit(request, env)
    return json({ error: 'Not found.' }, 404, headers)
  },
}

export { validateAttempt, YAML_ANSWERS }

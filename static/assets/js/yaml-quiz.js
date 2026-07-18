(() => {
  const root = document.querySelector('.rivers-content:has([data-yaml-course])')
  if (!root) return

  const isFrench = location.pathname.startsWith('/fr/')
  const copy = isFrench ? {
    levels: ['Parseur patate', 'Débutant YAML', 'Mécano de config', 'Architecte d’automatisation', 'Magicien DevOps', 'Sage YAML', 'Génie YAML'],
    correct: 'Correct.',
    incorrect: 'Pas tout à fait.',
    chapters: 'chapitres',
    perfectChapters: 'chapitres parfaits',
    streak: 'série',
    best: 'meilleure',
    result: (correct, total, best, stars) => `${correct} bonnes réponses sur ${total}. Meilleure série : ${best}. Chapitres parfaits : ${stars}.`,
    share: (value, title) => `J’ai obtenu ${value}/10 — ${title} — au cours YAML.`,
    shareTitle: 'Score YAML',
    shared: 'Partagé',
    copied: 'Copié',
    shareButton: 'Partager le score',
    loading: 'Chargement…',
    unavailable: 'Classement indisponible.',
    noScores: 'Aucun score. Soyez la première personne.',
    verify: 'Terminez d’abord la vérification humaine.',
    sending: 'Envoi…',
    sendFailed: 'Échec de l’envoi',
    scoreSent: score => `Score envoyé : ${score.toFixed(1)}/10.`,
    submitFailed: 'Impossible d’envoyer le score.',
    timerOff: 'Chronomètre désactivé',
  } : {
    levels: ['Potato Parser', 'YAML Beginner', 'Config Mechanic', 'Automation Builder', 'DevOps Wizard', 'YAML Sage', 'YAML Genius'],
    correct: 'Correct.',
    incorrect: 'Not quite.',
    chapters: 'chapters',
    perfectChapters: 'perfect chapters',
    streak: 'streak',
    best: 'best',
    result: (correct, total, best, stars) => `${correct} correct answers out of ${total}. Best streak: ${best}. Perfect chapters: ${stars}.`,
    share: (value, title) => `I scored ${value}/10 — ${title} — on the YAML course.`,
    shareTitle: 'YAML score',
    shared: 'Shared',
    copied: 'Copied',
    shareButton: 'Share score',
    loading: 'Loading…',
    unavailable: 'Leaderboard unavailable.',
    noScores: 'No scores yet. Be the first.',
    verify: 'Complete the human verification first.',
    sending: 'Sending…',
    sendFailed: 'Submission failed',
    scoreSent: score => `Score submitted: ${score.toFixed(1)}/10.`,
    submitFailed: 'Could not submit score.',
    timerOff: 'Timer off',
  }

  const storageKey = 'arthak-yaml-course-v1'
  const playerKey = 'arthak-yaml-player-v1'
  const apiBase = 'https://arthak-leaderboard.m-267.workers.dev'
  const quizzes = [...root.querySelectorAll('[data-quiz]')]
  const firstQuiz = quizzes[0]
  const dashboard = root.querySelector('.course-dashboard')
  const questions = [...root.querySelectorAll('[data-question]')]
  const progress = root.querySelector('[data-course-progress]')
  const progressText = root.querySelector('[data-progress-text]')
  const scoreText = root.querySelector('[data-score]')
  const levelText = root.querySelector('[data-level]')
  const streakText = root.querySelector('[data-streak]')
  const starsText = root.querySelector('[data-stars]')
  const timerText = root.querySelector('[data-timer]')
  const timerToggle = root.querySelector('[data-timer-toggle]')
  const result = root.querySelector('[data-final-result]')
  const retryButton = root.querySelector('[data-retry-wrong]')
  const resetButton = root.querySelector('[data-reset-course]')
  const shareButton = root.querySelector('[data-share-score]')
  const scoreForm = root.querySelector('[data-score-form]')
  const playerNameInput = root.querySelector('[data-player-name]')
  const leaderboardStatus = root.querySelector('[data-leaderboard-status]')
  const leaderboardList = root.querySelector('[data-leaderboard-list]')
  const leaderboardPeriod = root.querySelector('[data-leaderboard-period]')
  const turnstileScript = document.createElement('script')
  turnstileScript.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
  turnstileScript.async = true
  turnstileScript.defer = true
  document.head.append(turnstileScript)

  const defaults = { answers: {}, streak: 0, bestStreak: 0, startedAt: Date.now(), timerEnabled: false }
  let state = loadState()
  let timerId
  playerNameInput.value = localStorage.getItem(playerKey) || ''

  function updateDashboardMode() {
    if (!firstQuiz || !dashboard) return
    const compact = firstQuiz.getBoundingClientRect().top <= 0
    dashboard.classList.toggle('course-dashboard--compact', compact)
  }

  function loadState() {
    try {
      return { ...defaults, ...JSON.parse(localStorage.getItem(storageKey) || '{}') }
    } catch {
      return { ...defaults }
    }
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state))
  }

  function answerEntries() {
    return Object.entries(state.answers)
  }

  function correctCount() {
    return answerEntries().filter(([, answer]) => answer.correct).length
  }

  function completedCount() {
    return answerEntries().length
  }

  function score() {
    return questions.length ? correctCount() / questions.length * 10 : 0
  }

  function level(value) {
    if (value < 2) return ['🥔', copy.levels[0]]
    if (value < 4) return ['🐣', copy.levels[1]]
    if (value < 6) return ['🔧', copy.levels[2]]
    if (value < 8) return ['⚙️', copy.levels[3]]
    if (value < 9) return ['🚀', copy.levels[4]]
    if (value < 9.8) return ['🧙', copy.levels[5]]
    return ['👑', copy.levels[6]]
  }

  function chapterComplete(quiz) {
    const chapterQuestions = [...quiz.querySelectorAll('[data-question]')]
    return chapterQuestions.every(question => state.answers[question.dataset.question])
  }

  function perfectChapters() {
    return quizzes.filter(quiz => {
      const chapterQuestions = [...quiz.querySelectorAll('[data-question]')]
      return chapterQuestions.every(question => state.answers[question.dataset.question]?.correct)
    }).length
  }

  function updateLocks() {
    let previousComplete = true
    quizzes.forEach(quiz => {
      const unlocked = previousComplete
      const lock = quiz.querySelector('[data-quiz-lock]')
      quiz.classList.toggle('quiz--locked', !unlocked)
      quiz.setAttribute('aria-disabled', String(!unlocked))
      if (lock) lock.hidden = unlocked
      quiz.querySelectorAll('button[data-answer]').forEach(button => {
        const answered = Boolean(state.answers[button.closest('[data-question]').dataset.question])
        button.disabled = !unlocked || answered
      })
      previousComplete = previousComplete && chapterComplete(quiz)
    })
  }

  function renderQuestion(question) {
    const id = question.dataset.question
    const saved = state.answers[id]
    const feedback = question.querySelector('[data-feedback]')
    question.querySelectorAll('[data-answer]').forEach(button => {
      const selected = saved?.value === button.dataset.answer
      button.classList.toggle('answer--selected', selected)
      button.classList.toggle('answer--correct', Boolean(saved && button.dataset.correct === 'true'))
      button.classList.toggle('answer--wrong', Boolean(saved && selected && !saved.correct))
      button.disabled = Boolean(saved)
    })
    if (saved && feedback) {
      feedback.hidden = false
      feedback.textContent = `${saved.correct ? copy.correct : copy.incorrect} ${question.dataset.explanation}`
    } else if (feedback) {
      feedback.hidden = true
      feedback.textContent = ''
    }
  }

  function render() {
    questions.forEach(renderQuestion)
    updateLocks()
    const completed = completedCount()
    const value = score()
    const [icon, title] = level(value)
    const completeChapters = quizzes.filter(chapterComplete).length
    const stars = perfectChapters()

    progress.value = completed
    progress.max = questions.length
    progressText.textContent = `${completed}/${questions.length} questions · ${completeChapters}/${quizzes.length} ${copy.chapters}`
    scoreText.textContent = `${value.toFixed(1)} / 10`
    levelText.textContent = `${icon} ${title}`
    streakText.textContent = `🔥 ${state.streak} ${copy.streak} · ${copy.best} ${state.bestStreak}`
    starsText.textContent = `${'⭐'.repeat(stars)}${'☆'.repeat(quizzes.length - stars)} ${stars}/${quizzes.length} ${copy.perfectChapters}`
    timerToggle.checked = state.timerEnabled
    retryButton.hidden = !answerEntries().some(([, answer]) => !answer.correct)

    const finished = completed === questions.length
    result.hidden = !finished
    if (finished) {
      result.querySelector('[data-result-icon]').textContent = icon
      result.querySelector('[data-result-title]').textContent = title
      result.querySelector('[data-result-score]').textContent = value.toFixed(1)
      result.querySelector('[data-result-detail]').textContent = copy.result(correctCount(), questions.length, state.bestStreak, stars)
      if (correctCount() === questions.length && !state.celebrated) {
        state.celebrated = true
        saveState()
        confetti()
      }
    }
    saveState()
  }

  function choose(button) {
    const question = button.closest('[data-question]')
    const id = question.dataset.question
    if (state.answers[id]) return
    const correct = button.dataset.correct === 'true'
    state.answers[id] = { value: button.dataset.answer, correct }
    state.streak = correct ? state.streak + 1 : 0
    state.bestStreak = Math.max(state.bestStreak, state.streak)
    render()
  }

  function retryWrong() {
    for (const [id, answer] of answerEntries()) {
      if (!answer.correct) delete state.answers[id]
    }
    state.streak = 0
    state.celebrated = false
    render()
    root.querySelector('[data-question]:not(.answered)')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  function resetCourse() {
    state = { ...defaults, answers: {}, startedAt: Date.now() }
    render()
    root.scrollIntoView({ behavior: 'smooth' })
  }

  async function shareScore() {
    const value = score().toFixed(1)
    const [, title] = level(Number(value))
    const url = new URL(location.href)
    url.searchParams.set('score', value)
    const text = copy.share(value, title)
    try {
      if (navigator.share) await navigator.share({ title: copy.shareTitle, text, url: url.toString() })
      else await navigator.clipboard.writeText(`${text} ${url}`)
      shareButton.textContent = navigator.share ? copy.shared : copy.copied
    } catch {}
    setTimeout(() => { shareButton.textContent = copy.shareButton }, 1600)
  }

  function playerId() {
    const key = 'arthak-yaml-player-id-v1'
    let value = localStorage.getItem(key)
    if (!value) {
      value = crypto.randomUUID().replaceAll('-', '')
      localStorage.setItem(key, value)
    }
    return value
  }

  function durationSeconds() {
    return Math.max(20, Math.min(7200, Math.floor((Date.now() - state.startedAt) / 1000)))
  }

  function submittedAnswers() {
    return Object.fromEntries(answerEntries().map(([id, answer]) => [id, Number(answer.value)]))
  }

  function formatDuration(seconds) {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0')
    const rest = String(seconds % 60).padStart(2, '0')
    return `${minutes}:${rest}`
  }

  async function loadLeaderboard() {
    leaderboardList.innerHTML = `<li>${copy.loading}</li>`
    try {
      const response = await fetch(`${apiBase}/api/courses/yaml/leaderboard?period=${leaderboardPeriod.value}&limit=20`)
      if (!response.ok) throw new Error(copy.unavailable)
      const data = await response.json()
      leaderboardList.replaceChildren(...data.entries.map(entry => {
        const item = document.createElement('li')
        const name = document.createElement('span')
        const score = document.createElement('span')
        const time = document.createElement('span')
        name.className = 'leaderboard__name'
        score.className = 'leaderboard__score'
        time.className = 'leaderboard__time'
        name.textContent = entry.player_name
        score.textContent = `${(entry.correct_answers / entry.total_answers * 10).toFixed(1)}/10`
        time.textContent = formatDuration(entry.duration_seconds)
        item.append(name, score, time)
        return item
      }))
      if (!data.entries.length) leaderboardList.innerHTML = `<li>${copy.noScores}</li>`
    } catch {
      leaderboardList.innerHTML = `<li>${copy.unavailable}</li>`
    }
  }

  async function submitScore(event) {
    event.preventDefault()
    if (completedCount() !== questions.length) return
    const playerName = playerNameInput.value.trim()
    if (!playerName) return
    const turnstileToken = scoreForm.querySelector('[name="cf-turnstile-response"]')?.value
    if (!turnstileToken) {
      leaderboardStatus.textContent = copy.verify
      return
    }
    leaderboardStatus.textContent = copy.sending
    localStorage.setItem(playerKey, playerName)
    try {
      const response = await fetch(`${apiBase}/api/courses/yaml/attempt`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          playerName,
          playerId: playerId(),
          durationSeconds: durationSeconds(),
          answers: submittedAnswers(),
          turnstileToken,
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || copy.sendFailed)
      leaderboardStatus.textContent = copy.scoreSent(data.score)
      if (window.turnstile) window.turnstile.reset()
      await loadLeaderboard()
    } catch (error) {
      leaderboardStatus.textContent = error.message || copy.submitFailed
      if (window.turnstile) window.turnstile.reset()
    }
  }

  function updateTimer() {
    if (!state.timerEnabled) {
      timerText.textContent = copy.timerOff
      return
    }
    const seconds = Math.max(0, Math.floor((Date.now() - state.startedAt) / 1000))
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0')
    const rest = String(seconds % 60).padStart(2, '0')
    timerText.textContent = `⏱ ${minutes}:${rest}`
  }

  function confetti() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const layer = document.createElement('div')
    layer.className = 'confetti-layer'
    layer.setAttribute('aria-hidden', 'true')
    for (let index = 0; index < 80; index++) {
      const piece = document.createElement('i')
      piece.style.setProperty('--x', `${Math.random() * 100}vw`)
      piece.style.setProperty('--delay', `${Math.random() * .8}s`)
      piece.style.setProperty('--spin', `${Math.random() * 720 - 360}deg`)
      layer.append(piece)
    }
    document.body.append(layer)
    setTimeout(() => layer.remove(), 4000)
  }

  root.addEventListener('click', event => {
    const answer = event.target.closest('[data-answer]')
    if (answer) choose(answer)
  })
  retryButton.addEventListener('click', retryWrong)
  resetButton.addEventListener('click', resetCourse)
  shareButton.addEventListener('click', shareScore)
  scoreForm.addEventListener('submit', submitScore)
  leaderboardPeriod.addEventListener('change', loadLeaderboard)
  timerToggle.addEventListener('change', () => {
    state.timerEnabled = timerToggle.checked
    if (state.timerEnabled && !state.startedAt) state.startedAt = Date.now()
    saveState()
    updateTimer()
  })

  timerId = setInterval(updateTimer, 1000)
  addEventListener('scroll', updateDashboardMode, { passive: true })
  addEventListener('resize', updateDashboardMode)
  addEventListener('pagehide', () => clearInterval(timerId))
  render()
  updateTimer()
  updateDashboardMode()
  loadLeaderboard()
})()

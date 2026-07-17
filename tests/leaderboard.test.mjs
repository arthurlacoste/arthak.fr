import test from 'node:test'
import assert from 'node:assert/strict'
import { validateAttempt, YAML_ANSWERS } from '../worker/src/index.js'

const validAnswers = Object.fromEntries(Object.keys(YAML_ANSWERS).map(key => [key, YAML_ANSWERS[key]]))

test('leaderboard validates and scores a complete YAML attempt', () => {
  const result = validateAttempt({
    playerName: ' YAML Genius ',
    playerId: 'abcdefghijklmnop',
    durationSeconds: 180,
    answers: validAnswers,
  })

  assert.equal(result.playerName, 'YAML Genius')
  assert.equal(result.correctAnswers, 30)
  assert.equal(result.totalAnswers, 30)
})

test('leaderboard rejects incomplete answer sets', () => {
  const result = validateAttempt({
    playerName: 'Player',
    playerId: 'abcdefghijklmnop',
    durationSeconds: 180,
    answers: { c1q1: 1 },
  })

  assert.match(result.error, /complete answer set/i)
})

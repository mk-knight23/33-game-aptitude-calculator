import { describe, it, expect } from 'vitest'
import {
  isCorrect,
  computeScore,
  nextStreak,
  nextLives,
  isSurvivalOver,
  collectWrongAnswers,
  buildResult,
  SURVIVAL_LIVES,
} from './scoring'
import type { ActiveTest, Question } from '@/types/apti'

const q = (id: string, correctAnswer: number): Question => ({
  id,
  category: 'speed',
  text: `Q${id}`,
  options: ['a', 'b', 'c', 'd'],
  correctAnswer,
  difficulty: 'easy',
})

describe('isCorrect (answer validation)', () => {
  it('returns true when selected index matches the correct answer', () => {
    expect(isCorrect(q('1', 2), 2)).toBe(true)
  })

  it('returns false when selected index is wrong', () => {
    expect(isCorrect(q('1', 2), 0)).toBe(false)
  })

  it('treats null (no answer) as incorrect', () => {
    expect(isCorrect(q('1', 2), null)).toBe(false)
  })

  it('treats undefined (unanswered) as incorrect', () => {
    expect(isCorrect(q('1', 2), undefined)).toBe(false)
  })

  it('treats the timeout sentinel (-1) as incorrect', () => {
    expect(isCorrect(q('1', 2), -1)).toBe(false)
  })

  it('does not treat 0 as falsy when 0 is the correct answer', () => {
    expect(isCorrect(q('1', 0), 0)).toBe(true)
  })
})

describe('computeScore', () => {
  const questions = [q('1', 0), q('2', 1), q('3', 2)]

  it('counts only correct answers', () => {
    const answers = { '1': 0, '2': 3, '3': 2 }
    expect(computeScore(questions, answers)).toBe(2)
  })

  it('returns 0 when nothing is answered', () => {
    expect(computeScore(questions, {})).toBe(0)
  })

  it('returns full score for an all-correct map', () => {
    expect(computeScore(questions, { '1': 0, '2': 1, '3': 2 })).toBe(3)
  })
})

describe('nextStreak', () => {
  it('increments on a correct answer', () => {
    expect(nextStreak(3, true)).toBe(4)
  })

  it('resets to zero on a wrong answer', () => {
    expect(nextStreak(5, false)).toBe(0)
  })

  it('starts a streak from zero', () => {
    expect(nextStreak(0, true)).toBe(1)
  })
})

describe('nextLives (survival)', () => {
  it('keeps lives unchanged on a correct answer', () => {
    expect(nextLives(3, 'survival', true)).toBe(3)
  })

  it('subtracts a life on a wrong answer', () => {
    expect(nextLives(3, 'survival', false)).toBe(2)
  })

  it('never goes below zero', () => {
    expect(nextLives(0, 'survival', false)).toBe(0)
  })

  it('ignores wrong answers outside survival mode', () => {
    expect(nextLives(Infinity, 'standard', false)).toBe(Infinity)
    expect(nextLives(Infinity, 'sprint', false)).toBe(Infinity)
  })
})

describe('isSurvivalOver', () => {
  it('is over when survival lives reach zero', () => {
    expect(isSurvivalOver(0, 'survival')).toBe(true)
  })

  it('is not over while lives remain', () => {
    expect(isSurvivalOver(1, 'survival')).toBe(false)
  })

  it('is never over in non-survival modes', () => {
    expect(isSurvivalOver(0, 'standard')).toBe(false)
    expect(isSurvivalOver(0, 'sprint')).toBe(false)
  })
})

describe('collectWrongAnswers', () => {
  const questions = [q('1', 0), q('2', 1), q('3', 2)]

  it('returns the wrong/skipped questions with the picked option', () => {
    const wrong = collectWrongAnswers(questions, { '1': 0, '2': 3 })
    expect(wrong).toHaveLength(2)
    expect(wrong[0]).toEqual({ question: questions[1], selected: 3 })
    expect(wrong[1]).toEqual({ question: questions[2], selected: null })
  })

  it('returns an empty array for a perfect run', () => {
    expect(collectWrongAnswers(questions, { '1': 0, '2': 1, '3': 2 })).toEqual([])
  })
})

describe('buildResult', () => {
  const test: ActiveTest = {
    questions: [q('1', 0), q('2', 1)],
    currentIndex: 1,
    answers: { '1': 0, '2': 0 },
    startTime: 10_000,
    category: 'speed',
    mode: 'standard',
    streak: 1,
    bestStreak: 2,
    lives: Infinity,
    status: 'finished',
  }

  it('records score, totals, mode, and best streak', () => {
    const result = buildResult(test, 25_000)
    expect(result.score).toBe(1)
    expect(result.totalQuestions).toBe(2)
    expect(result.mode).toBe('standard')
    expect(result.bestStreak).toBe(2)
  })

  it('computes elapsed seconds from start to now', () => {
    const result = buildResult(test, 25_000)
    expect(result.timeSpent).toBe(15)
  })

  it('never reports negative time', () => {
    const result = buildResult(test, 5_000)
    expect(result.timeSpent).toBe(0)
  })
})

describe('constants', () => {
  it('survival starts with three lives', () => {
    expect(SURVIVAL_LIVES).toBe(3)
  })
})

import type { ActiveTest, GameMode, Question, TestResult, WrongAnswer } from '@/types/apti'

/** Default per-question time budget (seconds) by mode. */
export const QUESTION_TIME_LIMIT = 30
export const SPRINT_TOTAL_TIME = 60
export const SURVIVAL_LIVES = 3

/** Returns true when the selected option index matches the correct answer. */
export function isCorrect(question: Question, selected: number | null | undefined): boolean {
  return selected != null && selected === question.correctAnswer
}

/** Counts correct answers across a finished test's answer map. */
export function computeScore(questions: Question[], answers: Record<string, number>): number {
  return questions.reduce((total, q) => total + (isCorrect(q, answers[q.id]) ? 1 : 0), 0)
}

/** Updates streak: increments on correct, resets to 0 on wrong. */
export function nextStreak(currentStreak: number, correct: boolean): number {
  return correct ? currentStreak + 1 : 0
}

/** Updates lives in survival mode: a wrong answer costs one life. */
export function nextLives(currentLives: number, mode: GameMode, correct: boolean): number {
  if (mode !== 'survival' || correct) return currentLives
  return Math.max(0, currentLives - 1)
}

/** A survival run ends when lives hit zero. */
export function isSurvivalOver(lives: number, mode: GameMode): boolean {
  return mode === 'survival' && lives <= 0
}

/** Collects the questions the player got wrong (or skipped) for the review screen. */
export function collectWrongAnswers(
  questions: Question[],
  answers: Record<string, number>
): WrongAnswer[] {
  return questions
    .filter((q) => !isCorrect(q, answers[q.id]))
    .map((q) => ({ question: q, selected: answers[q.id] ?? null }))
}

/** Builds the persisted result object from a finished test. */
export function buildResult(test: ActiveTest, now: number = Date.now()): TestResult {
  const score = computeScore(test.questions, test.answers)
  return {
    id: Math.random().toString(36).slice(2, 11),
    date: new Date(now).toISOString(),
    score,
    totalQuestions: test.questions.length,
    category: test.category,
    timeSpent: Math.max(0, Math.floor((now - test.startTime) / 1000)),
    mode: test.mode,
    bestStreak: test.bestStreak,
  }
}

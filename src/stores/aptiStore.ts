import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  AptiState,
  GameMode,
  Question,
  TestCategory,
} from '@/types/apti'
import {
  buildResult,
  collectWrongAnswers,
  isCorrect,
  isSurvivalOver,
  nextLives,
  nextStreak,
  SURVIVAL_LIVES,
} from '@/utils/scoring'

interface AptiStore extends AptiState {
  setView: (view: AptiState['view']) => void
  toggleDarkMode: () => void
  startTest: (
    category: TestCategory | 'mixed',
    questions: Question[],
    mode: GameMode
  ) => void
  submitAnswer: (questionId: string, answerIndex: number) => void
  finishTest: () => void
  clearHistory: () => void
}

export const useAptiStore = create<AptiStore>()(
  persist(
    (set, get) => ({
      view: 'calculator',
      isDarkMode: true,
      currentTest: null,
      lastWrong: [],
      history: [],
      scores: [],
      gamesPlayed: 0,
      highScore: 0,

      setView: (view) => set({ view }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      startTest: (category, questions, mode) =>
        set({
          view: 'test',
          currentTest: {
            questions,
            currentIndex: 0,
            answers: {},
            startTime: Date.now(),
            category,
            mode,
            streak: 0,
            bestStreak: 0,
            lives: mode === 'survival' ? SURVIVAL_LIVES : Infinity,
            status: 'active',
          },
        }),

      submitAnswer: (questionId, answerIndex) =>
        set((state) => {
          const test = state.currentTest
          if (!test || test.status !== 'active') return state
          // Ignore double-answers on the same question.
          if (test.answers[questionId] != null) return state

          const question = test.questions.find((q) => q.id === questionId)
          if (!question) return state

          const correct = isCorrect(question, answerIndex)
          const streak = nextStreak(test.streak, correct)
          const bestStreak = Math.max(test.bestStreak, streak)
          const lives = nextLives(test.lives, test.mode, correct)
          const isLast = test.currentIndex === test.questions.length - 1
          const dead = isSurvivalOver(lives, test.mode)

          return {
            currentTest: {
              ...test,
              answers: { ...test.answers, [questionId]: answerIndex },
              currentIndex: isLast ? test.currentIndex : test.currentIndex + 1,
              streak,
              bestStreak,
              lives,
              status: dead ? 'finished' : test.status,
            },
          }
        }),

      finishTest: () => {
        const test = get().currentTest
        if (!test) return
        const result = buildResult(test)
        const wrong = collectWrongAnswers(test.questions, test.answers)
        set((state) => ({
          view: 'results',
          history: [result, ...state.history],
          lastWrong: wrong,
          currentTest: null,
          scores: [...state.scores, result.score],
          gamesPlayed: state.gamesPlayed + 1,
          highScore: Math.max(state.highScore, result.score),
        }))
      },

      clearHistory: () =>
        set({ history: [], scores: [], gamesPlayed: 0, highScore: 0 }),
    }),
    {
      name: 'apticalc-storage',
      // Infinity does not survive JSON; rehydrate survival-less tests safely.
      merge: (persisted, current) => {
        const merged = { ...current, ...(persisted as Partial<AptiStore>) }
        if (merged.currentTest && merged.currentTest.lives === null) {
          merged.currentTest = { ...merged.currentTest, lives: Infinity }
        }
        return merged
      },
    }
  )
)

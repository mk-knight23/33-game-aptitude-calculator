export type TestCategory =
  | 'math'
  | 'logic'
  | 'verbal'
  | 'arithmetic'
  | 'algebra'
  | 'series'
  | 'speed'

export type Difficulty = 'easy' | 'medium' | 'hard'

export type GameMode = 'standard' | 'sprint' | 'survival'

export interface Question {
  id: string
  category: TestCategory
  text: string
  options: string[]
  correctAnswer: number
  difficulty: Difficulty
  explanation?: string
}

export interface WrongAnswer {
  question: Question
  selected: number | null
}

export interface TestResult {
  id: string
  date: string
  score: number
  totalQuestions: number
  category: TestCategory | 'mixed'
  timeSpent: number
  mode: GameMode
  bestStreak: number
}

export interface ActiveTest {
  questions: Question[]
  currentIndex: number
  answers: Record<string, number>
  startTime: number
  category: TestCategory | 'mixed'
  mode: GameMode
  streak: number
  bestStreak: number
  lives: number
  status: 'active' | 'finished'
}

export interface AptiState {
  view: 'calculator' | 'test' | 'results' | 'history' | 'review'
  isDarkMode: boolean
  currentTest: ActiveTest | null
  lastWrong: WrongAnswer[]
  history: TestResult[]
  // Consolidated from former gameStore — generic score tracking for Stats page
  scores: number[]
  gamesPlayed: number
  highScore: number
}

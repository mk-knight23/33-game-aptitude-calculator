import { describe, it, expect, beforeEach } from 'vitest'
import { useAptiStore } from './aptiStore'
import type { Question } from '@/types/apti'

const q = (id: string, correctAnswer: number): Question => ({
  id,
  category: 'speed',
  text: `Q${id}`,
  options: ['a', 'b', 'c', 'd'],
  correctAnswer,
  difficulty: 'easy',
})

const QS = [q('1', 0), q('2', 1), q('3', 2)]

function reset() {
  useAptiStore.setState({
    view: 'calculator',
    currentTest: null,
    lastWrong: [],
    history: [],
    scores: [],
    gamesPlayed: 0,
    highScore: 0,
  })
}

describe('aptiStore — start/answer flow', () => {
  beforeEach(reset)

  it('starts a standard test with infinite lives and zero streak', () => {
    useAptiStore.getState().startTest('speed', QS, 'standard')
    const t = useAptiStore.getState().currentTest!
    expect(t.mode).toBe('standard')
    expect(t.lives).toBe(Infinity)
    expect(t.streak).toBe(0)
    expect(useAptiStore.getState().view).toBe('test')
  })

  it('advances index and grows streak on consecutive correct answers', () => {
    const s = useAptiStore.getState()
    s.startTest('speed', QS, 'standard')
    s.submitAnswer('1', 0) // correct
    s.submitAnswer('2', 1) // correct
    const t = useAptiStore.getState().currentTest!
    expect(t.currentIndex).toBe(2)
    expect(t.streak).toBe(2)
    expect(t.bestStreak).toBe(2)
  })

  it('resets streak on a wrong answer but remembers best streak', () => {
    const s = useAptiStore.getState()
    s.startTest('speed', QS, 'standard')
    s.submitAnswer('1', 0) // correct -> streak 1
    s.submitAnswer('2', 3) // wrong   -> streak 0
    const t = useAptiStore.getState().currentTest!
    expect(t.streak).toBe(0)
    expect(t.bestStreak).toBe(1)
  })

  it('ignores a second answer to the same question', () => {
    const s = useAptiStore.getState()
    s.startTest('speed', QS, 'standard')
    s.submitAnswer('1', 0) // correct, advances
    s.submitAnswer('1', 1) // duplicate, ignored
    const t = useAptiStore.getState().currentTest!
    expect(t.answers['1']).toBe(0)
    expect(t.currentIndex).toBe(1)
  })
})

describe('aptiStore — survival mode', () => {
  beforeEach(reset)

  it('starts with three lives', () => {
    useAptiStore.getState().startTest('speed', QS, 'survival')
    expect(useAptiStore.getState().currentTest!.lives).toBe(3)
  })

  it('loses a life per wrong answer and finishes at zero', () => {
    const s = useAptiStore.getState()
    s.startTest('speed', QS, 'survival')
    s.submitAnswer('1', 3) // wrong -> 2 lives
    expect(useAptiStore.getState().currentTest!.lives).toBe(2)
    s.submitAnswer('2', 3) // wrong -> 1 life
    s.submitAnswer('3', 3) // wrong -> 0 lives -> finished
    const t = useAptiStore.getState().currentTest!
    expect(t.lives).toBe(0)
    expect(t.status).toBe('finished')
  })

  it('does not lose lives on correct answers', () => {
    const s = useAptiStore.getState()
    s.startTest('speed', QS, 'survival')
    s.submitAnswer('1', 0) // correct
    expect(useAptiStore.getState().currentTest!.lives).toBe(3)
  })
})

describe('aptiStore — finishTest', () => {
  beforeEach(reset)

  it('records history, score stats, high score and wrong-answer review set', () => {
    const s = useAptiStore.getState()
    s.startTest('speed', QS, 'standard')
    s.submitAnswer('1', 0) // correct
    s.submitAnswer('2', 3) // wrong
    s.submitAnswer('3', 2) // correct
    useAptiStore.getState().finishTest()

    const st = useAptiStore.getState()
    expect(st.view).toBe('results')
    expect(st.currentTest).toBeNull()
    expect(st.history).toHaveLength(1)
    expect(st.history[0].score).toBe(2)
    expect(st.scores).toEqual([2])
    expect(st.gamesPlayed).toBe(1)
    expect(st.highScore).toBe(2)
    expect(st.lastWrong).toHaveLength(1)
    expect(st.lastWrong[0].question.id).toBe('2')
  })

  it('keeps the highest score across multiple runs', () => {
    const s = useAptiStore.getState()
    s.startTest('speed', QS, 'standard')
    s.submitAnswer('1', 0)
    s.submitAnswer('2', 3)
    s.submitAnswer('3', 3)
    useAptiStore.getState().finishTest() // score 1

    const s2 = useAptiStore.getState()
    s2.startTest('speed', QS, 'standard')
    s2.submitAnswer('1', 0)
    s2.submitAnswer('2', 1)
    s2.submitAnswer('3', 2)
    useAptiStore.getState().finishTest() // score 3

    const st = useAptiStore.getState()
    expect(st.highScore).toBe(3)
    expect(st.gamesPlayed).toBe(2)
  })

  it('clearHistory wipes all stats', () => {
    const s = useAptiStore.getState()
    s.startTest('speed', QS, 'standard')
    s.submitAnswer('1', 0)
    s.submitAnswer('2', 1)
    s.submitAnswer('3', 2)
    useAptiStore.getState().finishTest()
    useAptiStore.getState().clearHistory()

    const st = useAptiStore.getState()
    expect(st.history).toEqual([])
    expect(st.scores).toEqual([])
    expect(st.gamesPlayed).toBe(0)
    expect(st.highScore).toBe(0)
  })
})

import { describe, it, expect } from 'vitest'
import { QUESTIONS } from './questions'
import type { TestCategory } from '@/types/apti'

describe('question bank integrity', () => {
  it('has a meaningful number of questions', () => {
    expect(QUESTIONS.length).toBeGreaterThanOrEqual(80)
  })

  it('uses unique ids', () => {
    const ids = QUESTIONS.map((q) => q.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has a valid correctAnswer index for every question', () => {
    for (const q of QUESTIONS) {
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0)
      expect(q.correctAnswer).toBeLessThan(q.options.length)
    }
  })

  it('gives every question at least two options', () => {
    for (const q of QUESTIONS) {
      expect(q.options.length).toBeGreaterThanOrEqual(2)
    }
  })

  it('only uses known difficulty tiers', () => {
    const tiers = new Set(['easy', 'medium', 'hard'])
    for (const q of QUESTIONS) {
      expect(tiers.has(q.difficulty)).toBe(true)
    }
  })

  it('covers all required categories', () => {
    const required: TestCategory[] = [
      'math',
      'logic',
      'verbal',
      'arithmetic',
      'algebra',
      'series',
      'speed',
    ]
    const present = new Set(QUESTIONS.map((q) => q.category))
    for (const cat of required) {
      expect(present.has(cat)).toBe(true)
    }
  })

  it('provides every difficulty tier in each new category', () => {
    const newCats: TestCategory[] = ['arithmetic', 'algebra', 'series', 'speed']
    for (const cat of newCats) {
      const tiers = new Set(QUESTIONS.filter((q) => q.category === cat).map((q) => q.difficulty))
      expect(tiers.has('easy')).toBe(true)
      expect(tiers.has('medium')).toBe(true)
      expect(tiers.has('hard')).toBe(true)
    }
  })
})

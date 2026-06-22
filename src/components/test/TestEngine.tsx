import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Timer, ChevronRight, Brain, Flame, Heart } from 'lucide-react'
import { useAptiStore } from '@/stores/aptiStore'
import { cn } from '@/utils/cn'
import { QUESTION_TIME_LIMIT, SPRINT_TOTAL_TIME } from '@/utils/scoring'

const SUBMIT_ADVANCE_DELAY = 350

export function TestEngine() {
  const { currentTest, submitAnswer, finishTest } = useAptiStore()

  // Per-question countdown
  const [questionTime, setQuestionTime] = useState(QUESTION_TIME_LIMIT)
  // Sprint overall countdown
  const [sprintTime, setSprintTime] = useState(SPRINT_TOTAL_TIME)
  const finishRef = useRef(finishTest)
  finishRef.current = finishTest

  const question = currentTest?.questions[currentTest.currentIndex]
  const questionId = question?.id
  const mode = currentTest?.mode
  const status = currentTest?.status
  const answered = question ? currentTest!.answers[question.id] != null : false
  const isLast = currentTest
    ? currentTest.currentIndex === currentTest.questions.length - 1
    : false

  // Reset the per-question timer whenever the question changes.
  useEffect(() => {
    setQuestionTime(QUESTION_TIME_LIMIT)
  }, [questionId])

  // Per-question countdown tick. On timeout, lock in a "no answer" (-1) and advance.
  useEffect(() => {
    if (!questionId || answered || status !== 'active') return
    if (questionTime <= 0) {
      submitAnswer(questionId, -1)
      return
    }
    const t = setTimeout(() => setQuestionTime((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [questionTime, questionId, answered, status, submitAnswer])

  // Sprint overall timer.
  useEffect(() => {
    if (mode !== 'sprint' || status !== 'active') return
    if (sprintTime <= 0) {
      finishRef.current()
      return
    }
    const t = setTimeout(() => setSprintTime((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [sprintTime, mode, status])

  // Survival death — auto-finish once the store marks the test finished.
  useEffect(() => {
    if (status === 'finished') {
      const t = setTimeout(() => finishRef.current(), 700)
      return () => clearTimeout(t)
    }
  }, [status])

  if (!currentTest || !question) return null

  const progress = ((currentTest.currentIndex + 1) / currentTest.questions.length) * 100
  const timerWarning = questionTime <= 5

  const handleSelect = (idx: number) => {
    if (answered || status !== 'active') return
    submitAnswer(question.id, idx)
    // Last question answered ends standard/survival runs; sprint also ends when
    // its question pool is exhausted (otherwise the sprint timer ends it).
    if (isLast) {
      setTimeout(() => finishRef.current(), SUBMIT_ADVANCE_DELAY)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Brain size={14} className="text-apti-primary" /> {currentTest.category} · {currentTest.mode}
          </h3>
          <p className="text-lg font-bold">
            Question {currentTest.currentIndex + 1} of {currentTest.questions.length}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Streak */}
          <div className="flex items-center gap-2 font-mono font-bold bg-amber-50 dark:bg-amber-900/20 text-amber-500 px-4 py-2 rounded-xl">
            <Flame size={18} />
            <span>{currentTest.streak}</span>
          </div>

          {/* Lives (survival) */}
          {currentTest.mode === 'survival' && (
            <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-900/20 px-4 py-2 rounded-xl">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  size={16}
                  className={i < currentTest.lives ? 'text-rose-500 fill-rose-500' : 'text-slate-300 dark:text-slate-700'}
                />
              ))}
            </div>
          )}

          {/* Timer: sprint shows overall time, others show per-question */}
          <div
            className={cn(
              'flex items-center gap-2 font-mono font-bold px-4 py-2 rounded-xl transition-colors',
              timerWarning || (currentTest.mode === 'sprint' && sprintTime <= 10)
                ? 'bg-red-50 dark:bg-red-900/20 text-red-500'
                : 'bg-blue-50 dark:bg-blue-900/20 text-apti-primary'
            )}
          >
            <Timer size={18} />
            <span>{currentTest.mode === 'sprint' ? `${sprintTime}s` : `${questionTime}s`}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-apti-primary"
        />
      </div>

      {/* Question Card */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass p-10 rounded-[2.5rem] shadow-xl space-y-8"
      >
        <h4 className="text-2xl font-display font-bold leading-snug">{question.text}</h4>

        <div className="grid gap-4">
          {question.options.map((option, idx) => {
            const selected = currentTest.answers[question.id] === idx
            return (
              <button
                key={idx}
                disabled={answered || status !== 'active'}
                onClick={() => handleSelect(idx)}
                className={cn(
                  'w-full text-left p-6 rounded-2xl border-2 transition-all group flex items-center justify-between disabled:cursor-default',
                  selected
                    ? 'border-apti-primary bg-apti-primary/5'
                    : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                )}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm',
                      selected ? 'bg-apti-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    )}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-medium">{option}</span>
                </div>
                {selected && <CheckCircle2 size={20} className="text-apti-primary" />}
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        {currentTest.mode === 'sprint' ? (
          <button
            onClick={() => finishRef.current()}
            className="bg-apti-accent text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-apti-accent/20 hover:scale-105 transition-all"
          >
            END SPRINT
          </button>
        ) : isLast ? (
          <button
            onClick={() => finishRef.current()}
            className="bg-apti-accent text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-apti-accent/20 hover:scale-105 transition-all"
          >
            FINISH ASSESSMENT
          </button>
        ) : (
          <div className="text-slate-400 text-sm font-medium flex items-center gap-2">
            Select an answer to proceed <ChevronRight size={16} />
          </div>
        )}
      </div>
    </div>
  )
}

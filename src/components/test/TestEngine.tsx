import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Timer, ChevronRight, Brain, Flame, Heart } from 'lucide-react'
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
          <h3 className="text-sm font-black uppercase tracking-widest text-nexus-primary/80 flex items-center gap-2 font-mono">
            <Brain size={14} className="text-nexus-primary" /> {currentTest.category} · {currentTest.mode}
          </h3>
          <p className="text-lg font-bold text-nexus-text font-display tracking-wide">
            Question {currentTest.currentIndex + 1} of {currentTest.questions.length}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Streak */}
          <div className="flex items-center gap-2 font-mono font-bold text-amber-300 px-4 py-2 rounded-xl border border-amber-400/30 bg-amber-400/10">
            <Flame size={18} />
            <span>{currentTest.streak}</span>
          </div>

          {/* Lives (survival) */}
          {currentTest.mode === 'survival' && (
            <div className="flex items-center gap-1 px-4 py-2 rounded-xl border border-rose-400/30 bg-rose-500/10">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  size={16}
                  className={i < currentTest.lives ? 'text-rose-400 fill-rose-400' : 'text-slate-600'}
                />
              ))}
            </div>
          )}

          {/* Timer: sprint shows overall time, others show per-question */}
          <div
            className={cn(
              'flex items-center gap-2 font-mono font-bold px-4 py-2 rounded-xl border transition-colors tabular-nums',
              timerWarning || (currentTest.mode === 'sprint' && sprintTime <= 10)
                ? 'border-rose-400/50 bg-rose-500/15 text-rose-300 shadow-[0_0_16px_-2px_#fb718580]'
                : 'border-nexus-primary/40 bg-nexus-primary/10 text-nexus-primary shadow-[0_0_14px_-4px_#22d3ee99]'
            )}
          >
            <Timer size={18} />
            <span>{currentTest.mode === 'sprint' ? `${sprintTime}s` : `${questionTime}s`}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-nexus-primary to-nexus-secondary shadow-[0_0_10px_#22d3ee]"
        />
      </div>

      {/* Question Card */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-strong p-8 md:p-10 rounded-[2.5rem] space-y-8"
      >
        <h4 className="text-2xl font-display font-bold leading-snug text-nexus-text">{question.text}</h4>

        <div className="grid gap-4">
          {question.options.map((option, idx) => {
            const selected = currentTest.answers[question.id] === idx
            const isCorrect = idx === question.correctAnswer
            // Reveal correct/incorrect only after the question has been answered.
            const revealCorrect = answered && isCorrect
            const revealWrong = answered && selected && !isCorrect

            return (
              <button
                key={idx}
                disabled={answered || status !== 'active'}
                onClick={() => handleSelect(idx)}
                className={cn(
                  'w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all group flex items-center justify-between disabled:cursor-default',
                  revealCorrect
                    ? 'border-nexus-success bg-nexus-success/15 shadow-[0_0_22px_-6px_#34d39999]'
                    : revealWrong
                      ? 'border-rose-400 bg-rose-500/15 shadow-[0_0_22px_-6px_#fb718599]'
                      : selected
                        ? 'border-nexus-primary bg-nexus-primary/12 shadow-[0_0_22px_-6px_#22d3ee99]'
                        : 'border-white/10 bg-white/[0.03] hover:border-nexus-primary/50 hover:bg-nexus-primary/8 active:scale-[0.99]'
                )}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      'w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm font-mono shrink-0',
                      revealCorrect
                        ? 'bg-nexus-success text-black'
                        : revealWrong
                          ? 'bg-rose-400 text-black'
                          : selected
                            ? 'bg-nexus-primary text-black'
                            : 'bg-white/8 text-nexus-primary border border-white/10'
                    )}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-medium text-nexus-text">{option}</span>
                </div>
                {revealCorrect && <CheckCircle2 size={20} className="text-nexus-success shrink-0" />}
                {revealWrong && <XCircle size={20} className="text-rose-400 shrink-0" />}
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
            className="bg-gradient-to-r from-nexus-accent to-nexus-secondary text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-[0_0_22px_-4px_#e879f9aa] hover:scale-105 transition-all"
          >
            END SPRINT
          </button>
        ) : isLast ? (
          <button
            onClick={() => finishRef.current()}
            className="bg-gradient-to-r from-nexus-accent to-nexus-secondary text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-[0_0_22px_-4px_#e879f9aa] hover:scale-105 transition-all"
          >
            FINISH ASSESSMENT
          </button>
        ) : (
          <div className="text-slate-400 text-sm font-medium flex items-center gap-2 font-mono">
            Select an answer to proceed <ChevronRight size={16} />
          </div>
        )}
      </div>
    </div>
  )
}

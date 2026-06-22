import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, XCircle, BookOpen, PartyPopper } from 'lucide-react'
import { useAptiStore } from '@/stores/aptiStore'

export function ReviewView() {
  const { lastWrong, setView } = useAptiStore()

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-display font-black flex items-center gap-3">
          <BookOpen className="text-apti-primary" /> Review
        </h2>
        <button
          onClick={() => setView('results')}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-3 rounded-2xl font-black hover:bg-slate-50 transition-all flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Back to results
        </button>
      </div>

      {lastWrong.length === 0 ? (
        <div className="text-center py-20 glass rounded-[3rem]">
          <PartyPopper className="mx-auto text-emerald-500 mb-4" size={48} />
          <p className="text-lg font-bold">Perfect run — nothing to review!</p>
          <p className="text-slate-400 text-sm mt-1">You answered every question correctly.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {lastWrong.map(({ question, selected }, i) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass p-7 rounded-3xl space-y-4"
            >
              <p className="font-display font-bold text-lg leading-snug">{question.text}</p>

              <div className="grid gap-2">
                {question.options.map((opt, idx) => {
                  const isAnswer = idx === question.correctAnswer
                  const isPicked = idx === selected
                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-xl border ${
                        isAnswer
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : isPicked
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      <span className="text-sm font-medium">
                        <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                        {opt}
                      </span>
                      {isAnswer && <CheckCircle2 size={16} className="text-emerald-500" />}
                      {isPicked && !isAnswer && <XCircle size={16} className="text-red-500" />}
                    </div>
                  )
                })}
              </div>

              <p className="text-xs text-slate-400">
                {selected == null || selected < 0 ? 'You skipped or ran out of time.' : 'Your answer was incorrect.'}
              </p>
              {question.explanation && (
                <div className="text-sm bg-blue-50 dark:bg-blue-900/20 text-apti-primary rounded-xl p-3">
                  <span className="font-bold">Why: </span>
                  {question.explanation}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

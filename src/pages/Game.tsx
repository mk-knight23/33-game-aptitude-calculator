import { motion, AnimatePresence } from 'framer-motion'
import { useAptiStore } from '@/stores/aptiStore'
import { cn } from '@/utils/cn'
import { Calculator } from '../components/calculator/Calculator'
import { Dashboard } from '../components/Dashboard'
import { TestEngine } from '../components/test/TestEngine'
import { ReviewView } from '../components/test/ReviewView'
import { ResultsView } from '../components/ResultsView'
import { Calculator as CalcIcon, BrainCircuit } from 'lucide-react'

export default function Game() {
  const { view, setView } = useAptiStore()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-16">
        <div
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="bg-nexus-primary/20 p-2.5 rounded-none border border-nexus-primary/50 shadow-[0_0_15px_#06b6d44d]">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-display font-black tracking-widest uppercase italic">
            APTITUDE<span className="text-nexus-primary">_NEXUS</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex bg-nexus-card p-1 rounded-none border border-white/10">
            <button
              onClick={() => setView('calculator')}
              className={cn(
                "px-4 py-2 rounded-none text-xs font-black uppercase tracking-widest transition-all",
                view === 'calculator' ? "bg-nexus-primary text-black shadow-[0_0_10px_#06b6d466]" : "text-slate-500 hover:text-white"
              )}
            >
              <CalcIcon size={14} className="inline mr-2" /> CORE_CALC
            </button>
            <button
              onClick={() => setView('test')}
              className={cn(
                "px-4 py-2 rounded-none text-xs font-black uppercase tracking-widest transition-all",
                view === 'test' ? "bg-nexus-secondary text-white shadow-[0_0_10px_#6366f166]" : "text-slate-500 hover:text-white"
              )}
            >
              <BrainCircuit size={14} className="inline mr-2" /> ASSESSMENT
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative min-h-[600px]">
        <AnimatePresence mode="wait">
          {view === 'calculator' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <header className="text-center space-y-4 mb-20">
                <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-[0.9] text-white uppercase italic">
                  QUANTUM <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-primary to-nexus-secondary">INTELLIGENCE</span>
                </h2>
                <p className="text-nexus-primary/60 max-w-xl mx-auto text-sm font-mono tracking-widest uppercase">
                  Advanced Logic Assessment // Neural Calculation Protocol
                </p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <Calculator />
                <Dashboard />
              </div>
            </motion.div>
          )}

          {view === 'test' && (
            <motion.div
              key="test"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <TestEngine />
            </motion.div>
          )}

          {view === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ResultsView />
            </motion.div>
          )}

          {view === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ReviewView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
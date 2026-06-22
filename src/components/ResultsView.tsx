import { motion } from 'framer-motion'
import { useAptiStore } from '@/stores/aptiStore'
import {
  Trophy,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Target,
  Award,
  Lightbulb,
  BarChart3,
  Star,
  Zap,
  Crown,
  BookOpen
} from 'lucide-react'
import { useMemo, useEffect, useState } from 'react'

export function ResultsView() {
  const { history, setView, lastWrong } = useAptiStore()
  const latest = history[0]
  
  // V2: Mastery tracking
  const [masteryStats, setMasteryStats] = useState({
    personalBest: 0,
    totalTests: 0,
    consistencyStreak: 0,
    rank: 'Rookie'
  })

  if (!latest) return null

  const percentage = Math.round((latest.score / latest.totalQuestions) * 100)
  
  // V2: Calculate mastery progress
  useEffect(() => {
    const totalTests = history.length
    const personalBest = Math.max(...history.map(h => (h.score / h.totalQuestions) * 100))
    
    // Consistency: tests taken within last 7 days
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
    const recentTests = history.filter(h => new Date(h.date).getTime() > oneWeekAgo).length
    
    // Determine rank
    let rank = 'Rookie'
    if (totalTests >= 20 && personalBest >= 80) rank = 'Grandmaster'
    else if (totalTests >= 15 && personalBest >= 70) rank = 'Expert'
    else if (totalTests >= 10 && personalBest >= 60) rank = 'Adept'
    else if (totalTests >= 5) rank = 'Practitioner'
    else if (totalTests >= 2) rank = 'Student'
    
    setMasteryStats({ personalBest, totalTests, consistencyStreak: recentTests, rank })
  }, [history])

  // Calculate performance metrics
  const metrics = useMemo(() => {
    const avgTime = latest.timeSpent / latest.totalQuestions
    const accuracy = (latest.score / latest.totalQuestions) * 100

    // Get recent history for trends
    const recentHistory = history.slice(0, 5)
    const avgScore = recentHistory.reduce((sum, h) => sum + (h.score / h.totalQuestions), 0) / recentHistory.length
    const trend = (latest.score / latest.totalQuestions) - avgScore

    // Determine performance level
    let level = 'Beginner'
    let levelColor = 'text-slate-500'
    if (accuracy >= 90) { level = 'Expert'; levelColor = 'text-purple-500' }
    else if (accuracy >= 75) { level = 'Advanced'; levelColor = 'text-blue-500' }
    else if (accuracy >= 60) { level = 'Intermediate'; levelColor = 'text-emerald-500' }
    else if (accuracy >= 40) { level = 'Novice'; levelColor = 'text-amber-500' }

    // Get suggestions based on performance
    const suggestions: string[] = []
    if (accuracy < 60) {
      suggestions.push('Focus on understanding basic concepts before attempting harder problems')
    }
    if (accuracy >= 60 && accuracy < 80) {
      suggestions.push('You\'re doing well! Review incorrect answers to improve further')
    }
    if (accuracy >= 80) {
      suggestions.push('Excellent work! Try more challenging problems to continue growing')
    }
    if (history.length < 5) {
      suggestions.push('Take more tests to build consistency and track your growth')
    }
    if (suggestions.length === 0) {
      suggestions.push('Keep practicing to maintain your excellent performance')
    }

    return { avgTime, accuracy, level, levelColor, trend, suggestions }
  }, [latest, history])
  
  // V2: Check if this is a personal best
  const isPersonalBest = percentage >= masteryStats.personalBest && percentage > 0

  return (
    <div className="max-w-3xl mx-auto text-center space-y-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.47 }}
        className="space-y-6"
      >
        <div className="relative inline-block">
          <div className="w-48 h-48 rounded-full border-8 border-apti-primary/10 flex items-center justify-center relative">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className={metrics.accuracy >= 70 ? 'text-emerald-500' : metrics.accuracy >= 50 ? 'text-amber-500' : 'text-red-500'}
                strokeDasharray={`${metrics.accuracy * 2.89} 289`}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center">
              <span className="text-5xl font-mono font-bold text-nexus-primary neon-text">{percentage}%</span>
              <p className={`text-xs font-bold uppercase ${metrics.levelColor} mt-1`}>{metrics.level}</p>
            </div>
          </div>
          <motion.div
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`absolute -top-4 -right-4 p-4 rounded-2xl shadow-xl ${
              percentage >= 70 ? 'bg-yellow-400 text-yellow-900' :
              percentage >= 50 ? 'bg-slate-300 text-slate-700' :
              'bg-orange-400 text-orange-900'
            }`}
          >
            {isPersonalBest ? <Crown size={32} /> : <Trophy size={32} />}
          </motion.div>
          
          {/* V2: Personal Best Badge */}
          {isPersonalBest && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg"
            >
              Personal Best!
            </motion.div>
          )}
        </div>

        <div>
          <h2 className="text-4xl font-display font-black mb-2 text-nexus-text neon-text">
            {isPersonalBest ? 'New Record!' : 'Results Are In!'}
          </h2>
          <p className="text-slate-400 font-medium">
            You got {latest.score} right out of {latest.totalQuestions}.
            {masteryStats.totalTests > 1 && (
              <span className="block text-xs mt-1 opacity-75">
                Test #{masteryStats.totalTests} overall
              </span>
            )}
          </p>
        </div>
      </motion.div>

      {/* V2: Enhanced Performance Metrics with Mastery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass p-5 rounded-3xl">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Correct</p>
          <div className="flex items-center justify-center gap-2 text-nexus-success font-black text-2xl font-mono">
            <CheckCircle2 size={18} /> {latest.score}
          </div>
        </div>
        <div className="glass p-5 rounded-3xl">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Incorrect</p>
          <div className="flex items-center justify-center gap-2 text-rose-400 font-black text-2xl font-mono">
            <XCircle size={18} /> {latest.totalQuestions - latest.score}
          </div>
        </div>
        <div className="glass p-5 rounded-3xl">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Personal Best</p>
          <div className="flex items-center justify-center gap-2 text-purple-500 font-black text-2xl">
            <Star size={18} /> {Math.round(masteryStats.personalBest)}%
          </div>
        </div>
        <div className="glass p-5 rounded-3xl">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Rank</p>
          <div className={`flex items-center justify-center gap-2 font-black text-2xl ${
            masteryStats.rank === 'Grandmaster' ? 'text-yellow-500' :
            masteryStats.rank === 'Expert' ? 'text-purple-500' :
            masteryStats.rank === 'Adept' ? 'text-blue-500' :
            masteryStats.rank === 'Practitioner' ? 'text-emerald-500' :
            'text-slate-500'
          }`}>
            <Zap size={18} /> {masteryStats.rank}
          </div>
        </div>
      </div>
      
      {/* V2: Mastery Progress Bar */}
      <div className="glass p-5 rounded-3xl">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Mastery Progress</p>
          <span className="text-xs font-bold text-apti-primary">{masteryStats.totalTests} tests taken</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((masteryStats.totalTests / 20) * 100, 100)}%` }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={`h-3 rounded-full transition-all ${
              masteryStats.totalTests >= 20 ? 'bg-yellow-400' :
              masteryStats.totalTests >= 15 ? 'bg-purple-500' :
              masteryStats.totalTests >= 10 ? 'bg-blue-500' :
              masteryStats.totalTests >= 5 ? 'bg-emerald-500' :
              'bg-slate-400'
            }`}
          />
        </div>
        <p className="text-[10px] text-slate-400 mt-2 text-center">
          {masteryStats.totalTests < 20 
            ? `${20 - masteryStats.totalTests} more tests to reach Grandmaster`
            : 'Maximum rank achieved!'
          }
        </p>
      </div>

      {/* Performance Level */}
      <div className="glass p-6 rounded-3xl flex items-center gap-6">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
          percentage >= 70 ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500' :
          percentage >= 50 ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-500' :
          'bg-red-50 dark:bg-red-900/20 text-red-500'
        }`}>
          <Award size={28} />
        </div>
        <div className="flex-1 text-left">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Performance Level</p>
          <p className={`text-2xl font-black ${metrics.levelColor}`}>{metrics.level}</p>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full transition-all ${
                percentage >= 70 ? 'bg-emerald-500' :
                percentage >= 50 ? 'bg-amber-500' :
                'bg-red-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="glass p-6 rounded-3xl text-left">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="text-amber-500" size={24} />
          <h3 className="text-lg font-bold text-nexus-text">Suggestions for Improvement</h3>
        </div>
        <ul className="space-y-3">
          {metrics.suggestions.map((suggestion, i) => (
            <li key={i} className="flex items-start gap-3">
              <Target className="text-nexus-primary mt-0.5" size={16} />
              <span className="text-sm text-slate-300">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Historical Performance */}
      {history.length > 1 && (
        <div className="glass p-6 rounded-3xl text-left">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-apti-primary" size={24} />
            <h3 className="text-lg font-bold text-nexus-text">Your Progress</h3>
          </div>
          <div className="flex items-end gap-2 h-24">
            {history.slice(0, 5).reverse().map((result, i) => {
              const pct = (result.score / result.totalQuestions) * 100
              return (
                <div key={result.id} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg transition-all"
                    style={{
                      height: `${pct}%`,
                      backgroundColor: pct >= 70 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                  <span className="text-[10px] font-bold text-slate-500">{i + 1}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => setView('calculator')}
          className="glass px-8 py-4 rounded-2xl font-black text-nexus-text hover:border-nexus-primary/50 transition-all flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Home
        </button>
        {lastWrong.length > 0 && (
          <button
            onClick={() => setView('review')}
            className="bg-amber-400/90 text-black px-8 py-4 rounded-2xl font-black shadow-[0_0_20px_-4px_#fbbf24aa] hover:scale-105 transition-all flex items-center gap-2"
          >
            <BookOpen size={18} /> Review {lastWrong.length} Wrong
          </button>
        )}
        <button
          onClick={() => setView('calculator')}
          className="bg-gradient-to-r from-nexus-primary to-nexus-secondary text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-[0_0_22px_-4px_#22d3eeaa] hover:scale-105 transition-all flex items-center gap-2"
        >
          <RotateCcw size={18} /> Another Round?
        </button>
      </div>
    </div>
  )
}

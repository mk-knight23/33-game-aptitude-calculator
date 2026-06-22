import { useState } from 'react'
import { evaluate } from 'mathjs'
import { Delete, X, Divide, Minus, Plus, Equal, Hash, ChevronUp, ChevronDown, Percent } from 'lucide-react'
import { cn } from '@/utils/cn'

type Mode = 'basic' | 'scientific'

export function Calculator() {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('')
  const [mode, setMode] = useState<Mode>('basic')
  const [history, setHistory] = useState<string[]>([])
  const [memory, setMemory] = useState<number | null>(null)

  const handleKey = (key: string) => {
    // Memory operations
    if (key === 'MC') {
      setMemory(null)
      return
    }
    if (key === 'MR') {
      if (memory !== null) {
        setExpression(prev => prev + memory.toString())
      }
      return
    }
    if (key === 'M+') {
      try {
        const current = evaluate(expression) as number
        setMemory(prev => (prev ?? 0) + current)
        setResult('M+')
      } catch {
        setResult('Error')
      }
      return
    }
    if (key === 'M-') {
      try {
        const current = evaluate(expression) as number
        setMemory(prev => (prev ?? 0) - current)
        setResult('M-')
      } catch {
        setResult('Error')
      }
      return
    }

    // Scientific functions
    if (key === 'sin' || key === 'cos' || key === 'tan') {
      setExpression(prev => prev + `${key}(`)
      return
    }
    if (key === 'log' || key === 'ln' || key === 'sqrt') {
      setExpression(prev => prev + `${key}(`)
      return
    }
    if (key === '^') {
      setExpression(prev => prev + '^')
      return
    }
    if (key === 'π') {
      setExpression(prev => prev + 'pi')
      return
    }
    if (key === 'e') {
      setExpression(prev => prev + 'e')
      return
    }
    if (key === '!') {
      setExpression(prev => prev + '!')
      return
    }

    // Percentage
    if (key === '%') {
      try {
        const res = evaluate(expression + '/100')
        setResult(res.toString())
        setExpression(res.toString())
      } catch {
        setResult('Error')
      }
      return
    }

    // Basic operations
    if (key === '=') {
      try {
        const res = evaluate(expression)
        const resultStr = res.toString()
        setResult(resultStr)
        // Add to history
        setHistory(prev => [`${expression} = ${resultStr}`, ...prev].slice(0, 10))
      } catch (err) {
        setResult('Error')
      }
    } else if (key === 'C') {
      setExpression('')
      setResult('')
    } else if (key === 'DEL') {
      setExpression(prev => prev.slice(0, -1))
    } else if (key === 'ANS') {
      if (result && result !== 'Error') {
        setExpression(prev => prev + result)
      }
    } else {
      setExpression(prev => prev + key)
    }
  }

  const basicButtons = [
    ['C', '(', ')', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', 'DEL', '=']
  ]

  const scientificButtons = [
    ['sin', 'cos', 'tan', 'deg'],
    ['log', 'ln', 'sqrt', '^'],
    ['π', 'e', '!', 'ANS'],
    ['MC', 'MR', 'M+', 'M-']
  ]

  return (
    <div className="max-w-lg mx-auto glass p-6 md:p-8 rounded-[2.5rem] space-y-6">
      {/* Mode Toggle & Memory Indicator */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setMode(mode === 'basic' ? 'scientific' : 'basic')}
          className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-nexus-primary transition-colors flex items-center gap-1"
        >
          {mode === 'basic' ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          {mode === 'basic' ? 'Basic' : 'Scientific'}
        </button>
        {memory !== null && (
          <span className="text-[10px] font-bold uppercase text-nexus-secondary font-mono">M: {memory.toFixed(2)}</span>
        )}
      </div>

      {/* Display */}
      <div className="bg-black/40 border border-nexus-primary/20 p-4 md:p-6 rounded-3xl text-right space-y-2 min-h-[100px] md:min-h-[120px] flex flex-col justify-end">
        <p className="text-xs md:text-sm font-mono text-slate-400 overflow-hidden whitespace-nowrap">{expression || '0'}</p>
        <p className="text-2xl md:text-4xl font-mono font-bold text-nexus-primary truncate neon-text">
          {result || expression || '0'}
        </p>
      </div>

      {/* Scientific Buttons */}
      {mode === 'scientific' && (
        <div className="grid grid-cols-4 gap-2">
          {scientificButtons.flat().map((btn) => (
            <button
              key={btn}
              onClick={() => handleKey(btn)}
              className="calc-btn calc-btn-scientific text-xs md:text-sm"
            >
              {btn === '^' ? 'x^y' :
               btn === 'deg' ? 'DEG' :
               btn === 'sqrt' ? '√' :
               btn}
            </button>
          ))}
        </div>
      )}

      {/* Basic Grid */}
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {basicButtons.flat().map((btn) => (
          <button
            key={btn}
            onClick={() => handleKey(btn)}
            className={cn(
              "calc-btn",
              ['/', '*', '-', '+', '(', ')'].includes(btn) ? "calc-btn-op" :
              btn === '=' ? "calc-btn-action" :
              btn === 'C' ? "bg-rose-500/15 border border-rose-400/30 text-rose-300 hover:bg-rose-500/25" :
              "calc-btn-num"
            )}
          >
            {btn === '/' ? <Divide size={18} /> :
             btn === '*' ? <X size={18} /> :
             btn === '-' ? <Minus size={18} /> :
             btn === '+' ? <Plus size={18} /> :
             btn === '=' ? <Equal size={20} /> :
             btn === 'DEL' ? <Delete size={18} /> :
             btn}
          </button>
        ))}
        {/* Percent button */}
        <button
          onClick={() => handleKey('%')}
          className="calc-btn calc-btn-op"
        >
          <Percent size={18} />
        </button>
      </div>

      {/* History */}
      {history.length > 0 && mode === 'scientific' && (
        <div className="pt-4 border-t border-white/10 max-h-32 overflow-y-auto">
          <p className="text-[10px] font-bold uppercase text-slate-400 mb-2">Recent Calculations</p>
          <div className="space-y-1">
            {history.slice(0, 5).map((entry, i) => (
              <p
                key={i}
                onClick={() => {
                  const result = entry.split(' = ')[1]
                  if (result) {
                    setExpression(prev => prev + result)
                  }
                }}
                className="text-xs font-mono text-slate-400 cursor-pointer hover:text-nexus-primary truncate"
              >
                {entry}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-white/10">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center flex items-center justify-center gap-2 font-mono">
          <Hash size={12} /> Powered by Math.js
        </p>
      </div>
    </div>
  )
}



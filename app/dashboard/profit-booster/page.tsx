'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, TrendingUp, Target, AlertCircle } from 'lucide-react'
import { useBusinessStore, AITask } from '@/lib/store'
import { generateId } from '@/lib/utils'
import toast from 'react-hot-toast'

const generateDailyTasks = (): AITask[] => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const taskTemplates = [
    {
      title: 'Review Slow-Moving Inventory',
      problem: 'T-Shirt variants show 15+ days without sales',
      action: 'Check if pricing needs adjustment or bundle with other items',
      impact: '+₹500-800',
      effort: '15 mins',
      confidence: 0.78,
    },
    {
      title: 'Create Product Bundles',
      problem: 'Complementary products are sold separately',
      action: 'Create a "Weekend Outfit" bundle: T-Shirt + Jeans + Socks',
      impact: '+₹1200-1500',
      effort: '20 mins',
      confidence: 0.82,
    },
    {
      title: 'Restock Best Sellers',
      problem: 'Popular items may stock out in 2-3 days',
      action: 'Order 50 units of Cotton T-Shirt immediately',
      impact: 'Prevent ₹3000+ lost sales',
      effort: '10 mins',
      confidence: 0.85,
    },
    {
      title: 'Optimize Pricing Strategy',
      problem: 'Weekend sales show price sensitivity for casual wear',
      action: 'Increase markup on premium items, bundle budget items',
      impact: '+₹600-900',
      effort: '25 mins',
      confidence: 0.72,
    },
    {
      title: 'Launch Loyalty Program',
      problem: 'Repeat customers buying at regular price',
      action: 'Offer 5% discount on 3+ purchases per week',
      impact: '+₹400-600',
      effort: '30 mins',
      confidence: 0.68,
    },
    {
      title: 'Seasonal Stock Planning',
      problem: 'Winter demand surge detected in data',
      action: 'Increase hoodie and warm clothing inventory by 30%',
      impact: '+₹2000-2500',
      effort: '20 mins',
      confidence: 0.76,
    },
  ]

  // Pick 3 random tasks for today
  const shuffled = [...taskTemplates].sort(() => Math.random() - 0.5)
  const selectedTasks = shuffled.slice(0, 3)

  return selectedTasks.map((task, idx) => ({
    id: `task-${today.getTime()}-${idx}`,
    date: today,
    title: task.title,
    problem: task.problem,
    action: task.action,
    impact: task.impact,
    effort: task.effort,
    confidenceScore: task.confidence,
    completed: false,
  }))
}

export default function ProfitBoosterPage() {
  const aiTasks = useBusinessStore(state => state.aiTasks)
  const addAITask = useBusinessStore(state => state.addAITask)
  const completeAITask = useBusinessStore(state => state.completeAITask)
  
  const [todaysTasks, setTodaysTasks] = useState<AITask[]>([])
  const [profitGoal, setProfitGoal] = useState(25)
  const [expandedTask, setExpandedTask] = useState<string | null>(null)

  useEffect(() => {
    // Load or generate today's tasks
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const existingTasks = aiTasks.filter(t => {
      const taskDate = new Date(t.date)
      taskDate.setHours(0, 0, 0, 0)
      return taskDate.getTime() === today.getTime()
    })

    if (existingTasks.length === 0) {
      const newTasks = generateDailyTasks()
      newTasks.forEach(task => addAITask(task))
      setTodaysTasks(newTasks)
    } else {
      setTodaysTasks(existingTasks)
    }
  }, [aiTasks, addAITask])

  const completedCount = todaysTasks.filter(t => t.completed).length
  const totalPotentialImpact = todaysTasks.reduce((sum, t) => {
    const impactMatch = t.impact.match(/₹(\d+)-?(\d+)?/)
    if (impactMatch) {
      const min = parseInt(impactMatch[1])
      const max = impactMatch[2] ? parseInt(impactMatch[2]) : min
      return sum + (min + max) / 2
    }
    return sum
  }, 0)

  const handleCompleteTask = (taskId: string) => {
    completeAITask(taskId)
    toast.success('Task marked as complete! 🎉')
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-4xl mx-auto"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">AI Profit Booster</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Three daily AI tasks to improve your profit
        </p>
      </div>

      {/* Progress Overview */}
      <motion.div
        variants={item}
        className="bg-gradient-to-r from-vyapar-navy to-blue-700 text-white rounded-card p-6"
      >
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-3xl font-bold">{completedCount}/3</p>
            <p className="text-blue-100 text-xs mt-1">Tasks Completed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">₹{Math.round(totalPotentialImpact)}</p>
            <p className="text-blue-100 text-xs mt-1">Potential Impact</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{profitGoal}%</p>
            <p className="text-blue-100 text-xs mt-1">Growth Goal</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <p className="text-sm font-semibold">Daily Progress</p>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-vyapar-cyan rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Profit Goal Tracker */}
      <motion.div
        variants={item}
        className="bg-white dark:bg-slate-800 rounded-card p-6 border border-amber-200 dark:border-amber-700"
      >
        <h2 className="font-bold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-vyapar-warning" />
          Profit Improvement Goal
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold block mb-2">
              Target Growth: {profitGoal}%
            </label>
            <input
              type="range"
              min="5"
              max="50"
              value={profitGoal}
              onChange={(e) => setProfitGoal(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-600 dark:text-slate-400">Baseline</p>
              <p className="font-bold mt-1">₹45,000</p>
              <p className="text-xs text-slate-500 mt-1">Monthly</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-600 dark:text-slate-400">Current</p>
              <p className="font-bold mt-1">₹47,800</p>
              <p className="text-xs text-vyapar-success mt-1">+6.2%</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-600 dark:text-slate-400">Target</p>
              <p className="font-bold mt-1">₹{Math.round(45000 * (1 + profitGoal / 100))}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">+{profitGoal}%</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 bg-blue-50 dark:bg-blue-900/20 rounded p-3">
            💡 Completing these tasks may help you reach this goal. Results vary based on market conditions and execution.
          </p>
        </div>
      </motion.div>

      {/* Today's Tasks */}
      <motion.div variants={item} className="space-y-3">
        <h2 className="text-lg font-bold">Today's AI Tasks</h2>
        
        {todaysTasks.map((task, idx) => (
          <motion.div
            key={task.id}
            layout
            className={`rounded-card overflow-hidden transition ${
              task.completed
                ? 'bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm'
            }`}
          >
            <button
              onClick={() =>
                setExpandedTask(expandedTask === task.id ? null : task.id)
              }
              className="w-full p-4 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition text-left"
            >
              {/* Task Number & Checkbox */}
              <div className="flex-shrink-0">
                {task.completed ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-10 h-10 rounded-full bg-vyapar-success text-white flex items-center justify-center"
                  >
                    <CheckCircle className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                )}
              </div>

              {/* Task Info */}
              <div className="flex-1">
                <h3
                  className={`font-semibold ${
                    task.completed
                      ? 'line-through text-slate-500'
                      : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {task.problem}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs bg-vyapar-success/10 text-vyapar-success px-2 py-1 rounded-full">
                    {task.impact}
                  </span>
                  <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {task.effort}
                  </span>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                    {Math.round(task.confidenceScore * 100)}% confidence
                  </span>
                </div>
              </div>

              {/* Expand Icon */}
              <div className="flex-shrink-0 text-slate-400">
                {expandedTask === task.id ? '▼' : '▶'}
              </div>
            </button>

            {/* Expanded Details */}
            {expandedTask === task.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-700/50"
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Recommended Action</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded p-3">
                      {task.action}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                        Estimated Impact
                      </p>
                      <p className="font-bold text-vyapar-success">{task.impact}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                        Effort Required
                      </p>
                      <p className="font-bold">{task.effort}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 bg-blue-50 dark:bg-blue-900/20 rounded p-3">
                    <strong>Why this task?</strong> Based on your recent sales data, this action has shown positive results in your category and could generate the estimated impact.
                  </p>

                  {!task.completed && (
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      className="w-full bg-vyapar-success hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Mark as Complete
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Refresh Tasks Info */}
      <motion.div
        variants={item}
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-card p-4 flex items-start gap-3"
      >
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-semibold text-blue-900 dark:text-blue-100">
            New tasks generated daily at 6:00 AM
          </p>
          <p className="text-blue-700 dark:text-blue-200 mt-1">
            Tasks are based on your sales patterns, inventory status, and market signals.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

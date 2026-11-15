'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import { useBusinessStore, generateDemoTransactions } from '@/lib/store'
import { formatCurrency, generateChartData, getTimeBasedGreeting } from '@/lib/utils'
import { TrendingUp, AlertCircle, Zap, Eye } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const currentMerchant = useBusinessStore(state => state.currentMerchant)
  const addTransaction = useBusinessStore(state => state.addTransaction)
  const transactions = useBusinessStore(state => state.transactions)
  const [chartData, setChartData] = useState<any[]>([])
  const [stats, setStats] = useState({
    todaysSales: 0,
    estimatedProfit: 0,
    totalOrders: 0,
    lowStockProducts: 0,
  })

  useEffect(() => {
    // Generate demo transactions on first load
    if (transactions.length === 0) {
      const demoTransactions = generateDemoTransactions(20)
      demoTransactions.forEach(t => addTransaction(t))
    }
    
    setChartData(generateChartData())
    
    // Calculate stats
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const todayTx = transactions.filter(t => {
      const txDate = new Date(t.date)
      txDate.setHours(0, 0, 0, 0)
      return txDate.getTime() === today.getTime()
    })
    
    const todaysSales = todayTx.reduce((sum, t) => sum + t.total, 0)
    const estimatedProfit = todayTx.reduce((sum, t) => {
      return sum + (t.total - t.items.reduce((itemSum, item) => {
        return itemSum + (item.price * item.quantity * 0.4) // Rough cost estimate
      }, 0))
    }, 0)
    
    setStats({
      todaysSales,
      estimatedProfit,
      totalOrders: todayTx.length,
      lowStockProducts: 3, // Mock value
    })
  }, [transactions, addTransaction])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
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
      className="space-y-6 max-w-6xl mx-auto"
    >
      {/* Greeting */}
      <motion.div variants={item} className="pt-4">
        <h1 className="text-2xl md:text-3xl font-bold">
          {getTimeBasedGreeting()}, {currentMerchant?.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Welcome back to VyaparIQ
        </p>
      </motion.div>

      {/* Business Summary Cards */}
      <motion.div
        variants={item}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
      >
        {[
          { label: "Today's Sales", value: formatCurrency(stats.todaysSales), icon: '💰' },
          { label: 'Est. Profit', value: formatCurrency(stats.estimatedProfit), icon: '📈' },
          { label: 'Total Orders', value: stats.totalOrders.toString(), icon: '📦' },
          { label: 'Low Stock', value: stats.lowStockProducts.toString(), icon: '⚠️' },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 rounded-card p-3 md:p-4 shadow-sm hover:shadow-md transition"
          >
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-2">
              {card.label}
            </p>
            <p className="text-lg md:text-2xl font-bold text-vyapar-navy dark:text-vyapar-cyan">
              {card.value}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Business Health Score */}
      <motion.div
        variants={item}
        className="bg-gradient-to-r from-vyapar-navy to-blue-700 text-white rounded-card p-6 md:p-8 shadow-lg"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">Business Health</h2>
            <p className="text-blue-100 text-sm">Your VyaparIQ Health Score</p>
          </div>
          <Eye className="w-8 h-8 opacity-50" />
        </div>
        
        <div className="mt-6 flex items-end gap-4">
          <div>
            <div className="text-5xl md:text-6xl font-bold">82</div>
            <p className="text-blue-100 text-sm">out of 100</p>
          </div>
          
          <div className="flex-1 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Sales Momentum</span>
              <span className="font-semibold">Stable ✓</span>
            </div>
            <div className="flex justify-between">
              <span>Profit Margin</span>
              <span className="font-semibold">Good ✓</span>
            </div>
            <div className="flex justify-between">
              <span>Inventory Status</span>
              <span className="font-semibold">Action Needed</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Revenue Chart */}
      <motion.div
        variants={item}
        className="bg-white dark:bg-slate-800 rounded-card p-4 md:p-6 shadow-sm"
      >
        <h3 className="text-lg font-bold mb-4">7-Day Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#00BAF2"
              strokeWidth={2}
              dot={{ fill: '#002970', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* AI Profit Booster Preview */}
      <motion.div
        variants={item}
        className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700 rounded-card p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <Zap className="w-6 h-6 text-vyapar-warning mt-1" />
            <div>
              <h3 className="font-bold text-lg">Your 3 AI Growth Tasks Today</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Personalized actions to improve your profit
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { num: 1, title: 'Review Slow-Moving Stock', impact: '+₹500' },
            { num: 2, title: 'Create Product Bundles', impact: '+₹800' },
            { num: 3, title: 'Restock Best Sellers', impact: '+₹1200' },
          ].map((task, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-lg p-3 flex items-center justify-between hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-vyapar-warning text-white flex items-center justify-center font-bold text-sm">
                  {task.num}
                </span>
                <span className="font-medium text-sm">{task.title}</span>
              </div>
              <span className="text-sm font-semibold text-vyapar-success">{task.impact}</span>
            </div>
          ))}
        </div>

        <Link href="/dashboard/profit-booster">
          <button className="w-full mt-4 bg-vyapar-navy hover:bg-blue-900 text-white font-semibold py-2 rounded-lg transition">
            View All Tasks
          </button>
        </Link>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        variants={item}
        className="bg-white dark:bg-slate-800 rounded-card p-4 md:p-6 shadow-sm"
      >
        <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
        <div className="space-y-2">
          {transactions.slice(-5).reverse().map((tx, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition"
            >
              <div>
                <p className="font-medium text-sm">
                  {tx.items.length} item{tx.items.length > 1 ? 's' : ''}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(tx.date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <p className="font-bold text-vyapar-navy dark:text-vyapar-cyan">
                {formatCurrency(tx.total)}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Demo Banner */}
      <motion.div
        variants={item}
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-card p-4 flex items-start gap-3"
      >
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold text-sm text-blue-900 dark:text-blue-100">
            Running in Demo Mode
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-200 mt-1">
            All data is synthetic and for demonstration purposes only.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

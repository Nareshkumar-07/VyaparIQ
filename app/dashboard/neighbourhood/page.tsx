'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { MapPin, TrendingUp, Calendar, Cloud, AlertCircle } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface LocalSignal {
  id: string
  title: string
  description: string
  impact: 'positive' | 'neutral' | 'negative'
  categories: string[]
  strength: number // 0-100
  date: string
}

const signals: LocalSignal[] = [
  {
    id: 1,
    title: 'Diwali Festival Approaching',
    description: 'Demand for festive wear, jewelry, and decorative items expected to surge in next 10 days',
    impact: 'positive',
    categories: ['Apparel', 'Accessories', 'Home & Decor'],
    strength: 92,
    date: 'Today',
  },
  {
    id: 2,
    title: 'Nearby Wedding Season',
    description: 'Wedding ceremonies detected in neighbourhood. Formal wear and gifting items in high demand',
    impact: 'positive',
    categories: ['Apparel', 'Accessories', 'Gifts'],
    strength: 78,
    date: 'Last 5 days',
  },
  {
    id: 3,
    title: 'School Reopening',
    description: 'Local schools reopen next week. Uniforms, stationery, and bags expected to sell well',
    impact: 'positive',
    categories: ['Apparel', 'Stationery', 'Bags'],
    strength: 85,
    date: 'Next week',
  },
  {
    id: 4,
    title: 'Weather: Monsoon Clearing',
    description: 'Heavy rains expected to reduce foot traffic for 2-3 days',
    impact: 'negative',
    categories: ['General'],
    strength: 65,
    date: 'In 2 days',
  },
  {
    id: 5,
    title: 'New Competitor Opening',
    description: 'Electronics store opening 200m away. Focus on service differentiation',
    impact: 'neutral',
    categories: ['Electronics'],
    strength: 72,
    date: 'In 5 days',
  },
]

const demandTrendData = [
  { date: 'Mon', festive: 40, casual: 65, premium: 35 },
  { date: 'Tue', festive: 52, casual: 68, premium: 42 },
  { date: 'Wed', festive: 68, casual: 70, premium: 55 },
  { date: 'Thu', festive: 82, casual: 72, premium: 72 },
  { date: 'Fri', festive: 95, casual: 75, premium: 88 },
  { date: 'Sat', festive: 120, casual: 80, premium: 110 },
  { date: 'Sun', festive: 115, casual: 85, premium: 105 },
]

export default function NeighbourhoodPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedSignal, setExpandedSignal] = useState<number | null>(null)

  const filteredSignals = selectedCategory
    ? signals.filter(s => s.categories.includes(selectedCategory))
    : signals

  const categories = Array.from(
    new Set(signals.flatMap(s => s.categories))
  ).sort()

  const recommendations = [
    {
      signal: 'Diwali Festival',
      action: 'Increase festive apparel stock by 40%',
      expectedSales: '+₹8,500',
      priority: 'high',
    },
    {
      signal: 'Wedding Season',
      action: 'Create formal wear bundles',
      expectedSales: '+₹5,200',
      priority: 'high',
    },
    {
      signal: 'School Reopening',
      action: 'Prepare uniform packages',
      expectedSales: '+₹3,800',
      priority: 'medium',
    },
  ]

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
      className="space-y-6 max-w-6xl mx-auto"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Neighbourhood Pulse</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Local demand signals, events, and market opportunities
        </p>
      </div>

      {/* Location Overview */}
      <motion.div
        variants={item}
        className="bg-white dark:bg-slate-800 rounded-card p-6 flex items-start gap-4"
      >
        <MapPin className="w-6 h-6 text-vyapar-navy flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold">Your Trading Area</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Sector 12, MG Road, Bangalore
          </p>
          <p className="text-xs text-slate-500 mt-2">
            📍 30,000+ residents within 1km radius
            <br />
            🏪 Nearby competitors: 12
            <br />
            📊 Foot traffic trend: +8% (week-on-week)
          </p>
        </div>
      </motion.div>

      {/* Demand Forecast Chart */}
      <motion.div
        variants={item}
        className="bg-white dark:bg-slate-800 rounded-card p-6"
      >
        <h2 className="text-lg font-bold mb-4">Weekly Demand Forecast by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={demandTrendData}>
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
            <Legend />
            <Bar dataKey="festive" stackId="a" fill="#F59E0B" />
            <Bar dataKey="casual" stackId="a" fill="#00BAF2" />
            <Bar dataKey="premium" stackId="a" fill="#16A34A" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Active Signals */}
      <motion.div variants={item} className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Active Market Signals</h2>
          <span className="text-xs bg-vyapar-success text-white px-3 py-1 rounded-full">
            {filteredSignals.length} signals
          </span>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
              selectedCategory === null
                ? 'bg-vyapar-navy text-white'
                : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                selectedCategory === cat
                  ? 'bg-vyapar-navy text-white'
                  : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Signals List */}
        <div className="space-y-3 mt-4">
          {filteredSignals.map((signal, idx) => (
            <motion.div
              key={signal.id}
              layout
              className={`rounded-card border p-4 cursor-pointer transition ${
                expandedSignal === signal.id
                  ? 'border-vyapar-navy bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:shadow-md'
              }`}
              onClick={() =>
                setExpandedSignal(expandedSignal === signal.id ? null : signal.id)
              }
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{signal.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        signal.impact === 'positive'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                          : signal.impact === 'negative'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {signal.impact === 'positive'
                        ? '📈 Opportunity'
                        : signal.impact === 'negative'
                        ? '📉 Challenge'
                        : '⚡ Notice'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {signal.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {signal.categories.map(cat => (
                      <span
                        key={cat}
                        className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0 text-right ml-4">
                  <p className="text-xs text-slate-500 mb-2">{signal.date}</p>
                  <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${signal.strength}%` }}
                      className={`h-full ${
                        signal.impact === 'positive'
                          ? 'bg-vyapar-success'
                          : signal.impact === 'negative'
                          ? 'bg-vyapar-error'
                          : 'bg-vyapar-warning'
                      }`}
                    />
                  </div>
                  <p className="text-xs font-bold mt-1">{signal.strength}%</p>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedSignal === signal.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white dark:bg-slate-800 rounded p-3">
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                        Confidence
                      </p>
                      <p className="font-bold">{signal.strength}%</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded p-3">
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                        Duration
                      </p>
                      <p className="font-bold">5-7 days</p>
                    </div>
                  </div>

                  <button className="w-full bg-vyapar-navy hover:bg-blue-900 text-white font-semibold py-2 rounded-lg transition">
                    Add to Procurement Plan
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommended Actions */}
      <motion.div
        variants={item}
        className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700 rounded-card p-6"
      >
        <h2 className="font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-vyapar-warning" />
          AI Recommendations
        </h2>

        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-lg p-4 flex items-start justify-between"
            >
              <div>
                <p className="text-sm font-semibold">{rec.action}</p>
                <p className="text-xs text-slate-500 mt-1">Based on: {rec.signal}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-vyapar-success">{rec.expectedSales}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                    rec.priority === 'high'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {rec.priority.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Data Transparency */}
      <motion.div
        variants={item}
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-card p-4 flex items-start gap-3"
      >
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-semibold text-blue-900 dark:text-blue-100">
            Data Sources (Demo Mode)
          </p>
          <p className="text-blue-700 dark:text-blue-200 mt-1">
            Signals are simulated based on seasonal patterns, local events, and historical trends. In production, these would come from public APIs, weather data, and aggregated merchant insights.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

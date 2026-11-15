'use client'

import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const analyticsData = [
  { date: 'Week 1', revenue: 12000, orders: 45, profit: 3600 },
  { date: 'Week 2', revenue: 15000, orders: 52, profit: 4500 },
  { date: 'Week 3', revenue: 13500, orders: 48, profit: 4050 },
  { date: 'Week 4', revenue: 18000, orders: 61, profit: 5400 },
]

export default function AnalyticsPage() {
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
        <h1 className="text-2xl md:text-3xl font-bold">Business Analytics</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Detailed insights and performance metrics
        </p>
      </div>

      {/* Key Metrics */}
      <motion.div
        variants={item}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Monthly Revenue', value: '₹58,500' },
          { label: 'Avg Daily Sales', value: '₹2,035' },
          { label: 'Monthly Profit', value: '₹17,550' },
          { label: 'Profit Margin', value: '30%' },
        ].map((metric, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 rounded-card p-4 shadow-sm">
            <p className="text-xs text-slate-600 dark:text-slate-400">{metric.label}</p>
            <p className="text-2xl font-bold mt-2">{metric.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Revenue Trend */}
      <motion.div
        variants={item}
        className="bg-white dark:bg-slate-800 rounded-card p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold mb-4">Monthly Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData}>
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
            <Line type="monotone" dataKey="revenue" stroke="#00BAF2" strokeWidth={2} />
            <Line type="monotone" dataKey="profit" stroke="#16A34A" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Orders & Revenue */}
      <motion.div
        variants={item}
        className="bg-white dark:bg-slate-800 rounded-card p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold mb-4">Orders vs Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData}>
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
            <Bar dataKey="orders" fill="#F59E0B" />
            <Bar dataKey="revenue" fill="#00BAF2" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  )
}

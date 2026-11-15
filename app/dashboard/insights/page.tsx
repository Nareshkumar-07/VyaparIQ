'use client'

import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { TrendingUp, Award, AlertCircle } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const salesData = [
  { day: 'Mon', sales: 2400, profit: 240 },
  { day: 'Tue', sales: 3200, profit: 320 },
  { day: 'Wed', sales: 2800, profit: 280 },
  { day: 'Thu', sales: 4100, profit: 410 },
  { day: 'Fri', sales: 5200, profit: 520 },
  { day: 'Sat', sales: 6800, profit: 680 },
  { day: 'Sun', sales: 5900, profit: 590 },
]

const categoryData = [
  { name: 'Apparel', value: 45, color: '#002970' },
  { name: 'Footwear', value: 25, color: '#00BAF2' },
  { name: 'Accessories', value: 20, color: '#16A34A' },
  { name: 'Other', value: 10, color: '#F59E0B' },
]

const topProducts = [
  { name: 'Cotton T-Shirt', sales: 245, revenue: 122250 },
  { name: 'Denim Jeans', sales: 156, revenue: 155640 },
  { name: 'Sneakers', sales: 98, revenue: 146902 },
  { name: 'Hoodie', sales: 87, revenue: 112893 },
  { name: 'Casual Shirt', sales: 124, revenue: 99076 },
]

export default function InsightsPage() {
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
        <h1 className="text-2xl md:text-3xl font-bold">Growth Insights</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Analytics and growth experiments
        </p>
      </div>

      {/* Key Metrics */}
      <motion.div
        variants={item}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total Revenue', value: '₹45,200', trend: '+12%' },
          { label: 'Avg Order Value', value: '₹850', trend: '+5%' },
          { label: 'Conversion Rate', value: '3.2%', trend: '-0.5%' },
          { label: 'Customer Lifetime', value: '₹3,200', trend: '+18%' },
        ].map((metric, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 rounded-card p-4 shadow-sm"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              {metric.label}
            </p>
            <p className="text-xl font-bold">{metric.value}</p>
            <p
              className={`text-xs font-semibold mt-2 ${
                metric.trend.startsWith('+')
                  ? 'text-vyapar-success'
                  : 'text-vyapar-error'
              }`}
            >
              {metric.trend}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Sales Trend */}
      <motion.div
        variants={item}
        className="bg-white dark:bg-slate-800 rounded-card p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold mb-4">Weekly Sales & Profit</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="day" stroke="#64748b" />
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
            <Line type="monotone" dataKey="sales" stroke="#00BAF2" strokeWidth={2} />
            <Line type="monotone" dataKey="profit" stroke="#16A34A" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Category & Top Products */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Category Distribution */}
        <div className="bg-white dark:bg-slate-800 rounded-card p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2 text-sm">
            {categoryData.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  {cat.name}
                </span>
                <span className="font-bold">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-slate-800 rounded-card p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Top Selling Products</h2>
          <div className="space-y-3">
            {topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-vyapar-navy/10 flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{product.name}</p>
                  <p className="text-xs text-slate-500">
                    {product.sales} units • {formatCurrency(product.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Growth Experiments */}
      <motion.div
        variants={item}
        className="bg-white dark:bg-slate-800 rounded-card p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-vyapar-warning" />
          Active Growth Experiments
        </h2>

        <div className="space-y-4">
          {[
            {
              name: 'Bundle Offer (Shirt + Jeans)',
              status: 'Active',
              treatment: 245,
              control: 198,
              uplift: '+23.7%',
            },
            {
              name: 'Loyalty Reward (+5% discount)',
              status: 'Active',
              treatment: 156,
              control: 142,
              uplift: '+9.9%',
            },
            {
              name: 'Weekend Flash Sale',
              status: 'Completed',
              treatment: 412,
              control: 356,
              uplift: '+15.7%',
            },
          ].map((exp, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-700 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{exp.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Treatment: {exp.treatment} customers | Control: {exp.control} customers
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-bold ${
                    exp.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {exp.status}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="bg-slate-100 dark:bg-slate-700 rounded h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '60%' }}
                      className="h-full bg-vyapar-success rounded"
                    />
                  </div>
                </div>
                <span className="text-lg font-bold text-vyapar-success">
                  {exp.uplift}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 border border-vyapar-navy text-vyapar-navy hover:bg-vyapar-navy/5 font-semibold py-2 rounded-lg transition">
          Launch New Experiment
        </button>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        variants={item}
        className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-card p-6"
      >
        <h2 className="font-bold mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-vyapar-success" />
          AI Insights & Recommendations
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            ✅ <strong>Weekend promotion working:</strong> Bundle offer shows 23.7% uplift. Increase promotion frequency.
          </li>
          <li>
            ⚠️ <strong>Monday slowdown:</strong> Sales typically 35% lower on Mondays. Try targeted discounts or loyalty rewards.
          </li>
          <li>
            📈 <strong>Cross-sell opportunity:</strong> Sneaker buyers rarely purchase apparel. Create combo packages.
          </li>
        </ul>
      </motion.div>
    </motion.div>
  )
}

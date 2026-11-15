'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  BarChart3,
  Package,
  ShoppingCart,
  TrendingUp,
  AlertCircle,
} from 'lucide-react'

const features = [
  {
    icon: ShoppingCart,
    title: 'Smart POS',
    description: 'Fast, intuitive billing system with barcode scanning and inventory tracking',
    href: '/dashboard/pos',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Package,
    title: 'Inventory Management',
    description: 'Track stock levels, reorder points, and low-stock alerts',
    href: '/dashboard/inventory',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: TrendingUp,
    title: 'Smart Procurement',
    description: 'Cash-aware purchasing that keeps your business healthy',
    href: '/dashboard/procurement',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: BarChart3,
    title: 'Business Analytics',
    description: 'Deep insights into your sales, margins, and profitability',
    href: '/dashboard/analytics',
    color: 'from-orange-500 to-red-500',
  },
]

export default function BusinessPage() {
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
        <h1 className="text-2xl md:text-3xl font-bold">Business Management</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          POS, inventory, and procurement tools
        </p>
      </div>

      {/* Feature Grid */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {features.map((feature, idx) => {
          const Icon = feature.icon
          return (
            <Link key={idx} href={feature.href}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-800 rounded-card p-6 shadow-sm hover:shadow-lg transition cursor-pointer h-full"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
                <p className="text-xs text-vyapar-navy dark:text-vyapar-cyan font-semibold mt-4">
                  Open →
                </p>
              </motion.div>
            </Link>
          )
        })}
      </motion.div>

      {/* Inventory Quick Status */}
      <motion.div
        variants={item}
        className="bg-white dark:bg-slate-800 rounded-card p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold mb-4">Inventory Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total SKUs', value: '10', icon: '📦' },
            { label: 'In Stock', value: '9', icon: '✅' },
            { label: 'Low Stock', value: '3', icon: '⚠️' },
            { label: 'Out of Stock', value: '1', icon: '❌' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 text-center"
            >
              <p className="text-2xl mb-2">{stat.icon}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {stat.label}
              </p>
              <p className="text-xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        <Link href="/dashboard/inventory">
          <button className="w-full mt-4 border border-vyapar-navy text-vyapar-navy hover:bg-vyapar-navy/5 font-semibold py-2 rounded-lg transition">
            Manage Inventory
          </button>
        </Link>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Today's Sales */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-card p-6">
          <h3 className="font-bold mb-3">Today's Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Transactions</span>
              <span className="font-bold">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Revenue</span>
              <span className="font-bold">₹18,500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Avg Order Value</span>
              <span className="font-bold">₹771</span>
            </div>
          </div>
        </div>

        {/* Top Performer */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-card p-6">
          <h3 className="font-bold mb-3">Best Seller</h3>
          <div className="flex items-start gap-4">
            <div className="text-3xl">👕</div>
            <div>
              <p className="font-semibold">Cotton T-Shirt</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                45 units sold
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                ₹22,455 revenue
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Alerts */}
      <motion.div
        variants={item}
        className="space-y-3"
      >
        <h2 className="font-bold">Action Items</h2>
        {[
          {
            icon: AlertCircle,
            title: 'Hoodie stock low',
            desc: 'Only 8 units remaining. Recommend ordering soon.',
            priority: 'high',
          },
          {
            icon: AlertCircle,
            title: 'Upcoming supplier payment',
            desc: 'Payment due tomorrow: ₹5,200',
            priority: 'medium',
          },
        ].map((alert, idx) => {
          const Icon = alert.icon
          return (
            <div
              key={idx}
              className={`rounded-card p-4 border flex items-start gap-3 ${
                alert.priority === 'high'
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
              }`}
            >
              <Icon
                className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                  alert.priority === 'high' ? 'text-red-600' : 'text-yellow-600'
                }`}
              />
              <div>
                <p className="font-semibold text-sm">{alert.title}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {alert.desc}
                </p>
              </div>
            </div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

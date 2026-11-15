'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useBusinessStore } from '@/lib/store'
import { formatCurrency, calculateReorderQuantity, shouldReorder } from '@/lib/utils'
import { AlertCircle, TrendingUp, DollarSign, Package } from 'lucide-react'
import toast from 'react-hot-toast'

interface ProcurementBudget {
  availableCash: number
  minCashReserve: number
  upcomingExpenses: number
  procurementBudget: number
}

export default function ProcurementPage() {
  const products = useBusinessStore(state => state.products)
  const [budget, setBudget] = useState<ProcurementBudget>({
    availableCash: 50000,
    minCashReserve: 5000,
    upcomingExpenses: 3000,
    procurementBudget: 0,
  })

  const [selectedSupplier, setSelectedSupplier] = useState<string>('standard')

  const suppliers = [
    { id: 'standard', name: 'Standard Supplier', leadTime: 5, markup: 1.0 },
    { id: 'express', name: 'Express Supplier', leadTime: 2, markup: 1.15 },
    { id: 'bulk', name: 'Bulk Supplier', leadTime: 7, markup: 0.85 },
  ]

  // Calculate procurement budget
  useMemo(() => {
    const procurementBudget = Math.max(
      0,
      budget.availableCash - budget.minCashReserve - budget.upcomingExpenses
    )
    setBudget(prev => ({ ...prev, procurementBudget }))
  }, [budget.availableCash, budget.minCashReserve, budget.upcomingExpenses])

  // Calculate recommendations
  const recommendations = useMemo(() => {
    const supplier = suppliers.find(s => s.id === selectedSupplier)!

    return products
      .map(product => {
        const forecastDemand = Math.random() * 50 + 20 // Random demand forecast
        const recommendedQty = calculateReorderQuantity(
          forecastDemand,
          supplier.leadTime,
          Math.ceil(product.reorderLevel * 0.5)
        )
        const estimatedCost = Math.round(
          recommendedQty * product.cost * supplier.markup
        )
        const priority = shouldReorder(
          product.stock,
          product.reorderLevel,
          forecastDemand,
          supplier.leadTime
        )
          ? 'high'
          : 'medium'

        return {
          productId: product.id,
          productName: product.name,
          currentStock: product.stock,
          forecastDemand: Math.ceil(forecastDemand),
          recommendedQuantity: recommendedQty,
          estimatedCost,
          priority,
          profitMargin: calculateMargin(product.price, product.cost),
          stockoutRisk: Math.max(0, 10 - Math.ceil(product.stock / 5)),
        }
      })
      .filter(r => r.priority === 'high' || r.recommendedQuantity > 0)
      .sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority === 'high' ? -1 : 1
        }
        return b.profitMargin - a.profitMargin
      })
  }, [products, selectedSupplier])

  const totalRecommendedCost = recommendations.reduce(
    (sum, r) => sum + r.estimatedCost,
    0
  )
  const canAfford = totalRecommendedCost <= budget.procurementBudget
  const afffordableItems = recommendations.filter(
    r => r.estimatedCost <= budget.procurementBudget
  )

  const calculateMargin = (price: number, cost: number) => {
    return ((price - cost) / price) * 100
  }

  const chartData = recommendations.slice(0, 8).map(r => ({
    name: r.productName.substring(0, 10),
    cost: r.estimatedCost,
    profit: Math.round(r.recommendedQuantity * r.profitMargin),
  }))

  const handleApproveProcurement = () => {
    if (afffordableItems.length === 0) {
      toast.error('No affordable items to procure')
      return
    }
    toast.success(`Procurement approved for ${afffordableItems.length} items`)
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
      className="space-y-6 max-w-6xl mx-auto"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Smart Procurement</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Cash-aware inventory planning
        </p>
      </div>

      {/* Budget Overview */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {[
          {
            label: 'Available Cash',
            value: formatCurrency(budget.availableCash),
            icon: '💵',
          },
          {
            label: 'Min. Reserve',
            value: formatCurrency(budget.minCashReserve),
            icon: '🔒',
          },
          {
            label: 'Upcoming Expenses',
            value: formatCurrency(budget.upcomingExpenses),
            icon: '💳',
          },
          {
            label: 'Procurement Budget',
            value: formatCurrency(budget.procurementBudget),
            icon: '📦',
            highlight: true,
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className={`rounded-card p-4 ${
              card.highlight
                ? 'bg-gradient-to-r from-vyapar-navy to-blue-700 text-white'
                : 'bg-white dark:bg-slate-800'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm opacity-75">{card.label}</p>
                <p className="text-2xl font-bold mt-2">{card.value}</p>
              </div>
              <span className="text-3xl">{card.icon}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Budget Input Form */}
      <motion.div
        variants={item}
        className="bg-white dark:bg-slate-800 rounded-card p-6 space-y-4"
      >
        <h2 className="font-bold mb-4">Adjust Budget Parameters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Available Cash (₹)', key: 'availableCash' as const },
            { label: 'Minimum Reserve (₹)', key: 'minCashReserve' as const },
            { label: 'Upcoming Expenses (₹)', key: 'upcomingExpenses' as const },
          ].map(field => (
            <div key={field.key}>
              <label className="text-sm font-semibold block mb-2">
                {field.label}
              </label>
              <input
                type="number"
                value={budget[field.key]}
                onChange={e =>
                  setBudget({
                    ...budget,
                    [field.key]: Math.max(0, Number(e.target.value)),
                  })
                }
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-vyapar-cyan"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Supplier Selection */}
      <motion.div
        variants={item}
        className="bg-white dark:bg-slate-800 rounded-card p-6"
      >
        <h2 className="font-bold mb-4">Choose Supplier</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suppliers.map(supplier => (
            <button
              key={supplier.id}
              onClick={() => setSelectedSupplier(supplier.id)}
              className={`rounded-lg p-4 border-2 transition text-left ${
                selectedSupplier === supplier.id
                  ? 'border-vyapar-navy bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <h3 className="font-semibold">{supplier.name}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                📦 Lead time: {supplier.leadTime} days
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                💰 Markup: {Math.round((supplier.markup - 1) * 100)}%
              </p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Cost-Benefit Chart */}
      {chartData.length > 0 && (
        <motion.div
          variants={item}
          className="bg-white dark:bg-slate-800 rounded-card p-6"
        >
          <h2 className="text-lg font-bold mb-4">Cost vs. Profit Potential</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
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
              <Bar dataKey="cost" stackId="a" fill="#F59E0B" />
              <Bar dataKey="profit" stackId="a" fill="#16A34A" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Recommendations */}
      <motion.div variants={item} className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">
            Procurement Recommendations ({afffordableItems.length}/{recommendations.length})
          </h2>
          {!canAfford && (
            <span className="text-xs bg-vyapar-warning text-white px-3 py-1 rounded-full">
              Budget Alert
            </span>
          )}
        </div>

        <div className="space-y-2">
          {recommendations.map((item, idx) => {
            const canAffordThis = item.estimatedCost <= budget.procurementBudget
            return (
              <motion.div
                key={item.productId}
                layout
                className={`rounded-card p-4 border transition ${
                  canAffordThis
                    ? 'border-slate-200 dark:border-slate-700 hover:shadow-md'
                    : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{item.productName}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-bold ${
                          item.priority === 'high'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}
                      >
                        {item.priority.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                      <div className="bg-slate-50 dark:bg-slate-700/50 rounded p-2">
                        <p className="text-slate-600 dark:text-slate-400">Stock</p>
                        <p className="font-bold">{item.currentStock}</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-700/50 rounded p-2">
                        <p className="text-slate-600 dark:text-slate-400">Forecast</p>
                        <p className="font-bold">{item.forecastDemand}</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-700/50 rounded p-2">
                        <p className="text-slate-600 dark:text-slate-400">Order Qty</p>
                        <p className="font-bold">{item.recommendedQuantity}</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-700/50 rounded p-2">
                        <p className="text-slate-600 dark:text-slate-400">Cost</p>
                        <p className="font-bold">
                          {formatCurrency(item.estimatedCost)}
                        </p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-700/50 rounded p-2">
                        <p className="text-slate-600 dark:text-slate-400">Margin</p>
                        <p className="font-bold">{Math.round(item.profitMargin)}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <input type="checkbox" defaultChecked={canAffordThis} disabled={!canAffordThis} className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Summary & Action */}
      <motion.div
        variants={item}
        className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-card p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Recommended Total
            </p>
            <p className="text-2xl font-bold mt-1">
              {formatCurrency(totalRecommendedCost)}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Affordable Items
            </p>
            <p className="text-2xl font-bold mt-1 text-vyapar-success">
              {afffordableItems.length}/{recommendations.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Remaining Cash
            </p>
            <p className="text-2xl font-bold mt-1">
              {formatCurrency(
                Math.max(
                  0,
                  budget.procurementBudget -
                    afffordableItems.reduce((sum, r) => sum + r.estimatedCost, 0)
                )
              )}
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
          {canAfford
            ? '✅ You can afford all recommended items.'
            : `⚠️ Budget sufficient for ${afffordableItems.length} items. Consider increasing budget or postponing lower-priority items.`}
        </p>

        <button
          onClick={handleApproveProcurement}
          disabled={afffordableItems.length === 0}
          className="w-full bg-vyapar-navy hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
        >
          Approve Procurement Plan
        </button>
      </motion.div>

      {/* Info Banner */}
      <motion.div
        variants={item}
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-card p-4 flex items-start gap-3"
      >
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-semibold text-blue-900 dark:text-blue-100">
            Smart Cash Management
          </p>
          <p className="text-blue-700 dark:text-blue-200 mt-1">
            Never over-spend on inventory. Our algorithm prioritizes high-margin products and ensures you maintain a healthy cash reserve.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

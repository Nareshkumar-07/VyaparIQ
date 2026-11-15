'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from 'recharts'
import { Zap, TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface SimulationScenario {
  name: string
  productPrice: number
  inventoryBudget: number
  marketingExpense: number
  customerDemand: number
  operatingExpense: number
}

const baselineScenario: SimulationScenario = {
  name: 'Current',
  productPrice: 500,
  inventoryBudget: 10000,
  marketingExpense: 2000,
  customerDemand: 100,
  operatingExpense: 5000,
}

export default function BusinessTwinPage() {
  const [scenario, setScenario] = useState<SimulationScenario>(baselineScenario)

  // Calculate simulated outcomes
  const calculateOutcomes = (s: SimulationScenario) => {
    const estimatedSales = s.customerDemand * s.productPrice * 0.7 // Assume 70% conversion
    const inventoryCost = s.inventoryBudget * 0.6 // Assume 60% of budget is COGS
    const marketingROI = s.marketingExpense * 1.5 // Assume 1.5x return
    const totalCost =
      inventoryCost + s.operatingExpense + s.marketingExpense * 0.4 // 40% is actual cost
    const profit = estimatedSales + marketingROI - totalCost
    const margin = (profit / estimatedSales) * 100

    return {
      estimatedSales: Math.round(estimatedSales),
      inventoryCost: Math.round(inventoryCost),
      totalCost: Math.round(totalCost),
      profit: Math.round(profit),
      margin: Math.round(margin),
      cashFlow: Math.round(estimatedSales - totalCost),
    }
  }

  const current = calculateOutcomes(baselineScenario)
  const projected = calculateOutcomes(scenario)

  const scenarios = [
    {
      ...baselineScenario,
      name: 'Optimistic',
      productPrice: baselineScenario.productPrice * 1.1,
      marketingExpense: baselineScenario.marketingExpense * 1.2,
      label: 'Increase price +10%',
    },
    {
      ...baselineScenario,
      name: 'Expected',
      customerDemand: baselineScenario.customerDemand * 1.05,
      inventoryBudget: baselineScenario.inventoryBudget * 1.1,
      label: 'Moderate growth',
    },
    {
      ...baselineScenario,
      name: 'Conservative',
      productPrice: baselineScenario.productPrice * 0.95,
      operatingExpense: baselineScenario.operatingExpense * 0.9,
      label: 'Cost optimization',
    },
  ] as Array<SimulationScenario & { label: string }>

  const radarData = [
    { metric: 'Sales', current: current.estimatedSales / 100, projected: projected.estimatedSales / 100 },
    { metric: 'Profit', current: current.profit / 100, projected: projected.profit / 100 },
    { metric: 'Margin %', current: current.margin * 10, projected: projected.margin * 10 },
    { metric: 'Cash Flow', current: current.cashFlow / 100, projected: projected.cashFlow / 100 },
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
        <h1 className="text-2xl md:text-3xl font-bold">AI Business Twin</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Simulate business decisions before implementation
        </p>
      </div>

      {/* Interactive Controls */}
      <motion.div
        variants={item}
        className="bg-white dark:bg-slate-800 rounded-card p-6 space-y-6"
      >
        <h2 className="text-lg font-bold">Adjust Business Parameters</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              label: 'Product Selling Price',
              key: 'productPrice' as const,
              min: 300,
              max: 1000,
              step: 50,
              unit: '₹',
            },
            {
              label: 'Inventory Purchase Budget',
              key: 'inventoryBudget' as const,
              min: 5000,
              max: 30000,
              step: 1000,
              unit: '₹',
            },
            {
              label: 'Marketing Expenditure',
              key: 'marketingExpense' as const,
              min: 500,
              max: 10000,
              step: 500,
              unit: '₹',
            },
            {
              label: 'Expected Customer Demand',
              key: 'customerDemand' as const,
              min: 50,
              max: 500,
              step: 10,
              unit: 'customers',
            },
            {
              label: 'Operating Expenses',
              key: 'operatingExpense' as const,
              min: 2000,
              max: 15000,
              step: 500,
              unit: '₹',
            },
          ].map(param => (
            <div key={param.key}>
              <label className="text-sm font-semibold block mb-2">
                {param.label}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={scenario[param.key]}
                  onChange={(e) =>
                    setScenario({
                      ...scenario,
                      [param.key]: Number(e.target.value),
                    })
                  }
                  className="flex-1"
                />
                <span className="text-sm font-bold w-24 text-right">
                  {scenario[param.key]} {param.unit}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Current: {baselineScenario[param.key]} {param.unit}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setScenario(baselineScenario)}
          className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 rounded-lg text-sm font-semibold transition"
        >
          Reset to Baseline
        </button>
      </motion.div>

      {/* Radar Comparison */}
      <motion.div
        variants={item}
        className="bg-white dark:bg-slate-800 rounded-card p-6"
      >
        <h2 className="text-lg font-bold mb-4">Current vs Simulated</h2>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis />
            <Radar
              name="Current"
              dataKey="current"
              stroke="#002970"
              fill="#002970"
              fillOpacity={0.25}
            />
            <Radar
              name="Projected"
              dataKey="projected"
              stroke="#00BAF2"
              fill="#00BAF2"
              fillOpacity={0.25}
            />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Results */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {[
          {
            label: 'Estimated Sales',
            current: current.estimatedSales,
            projected: projected.estimatedSales,
            isPriceMetric: false,
          },
          {
            label: 'Total Cost',
            current: current.totalCost,
            projected: projected.totalCost,
            isPriceMetric: false,
          },
          {
            label: 'Profit',
            current: current.profit,
            projected: projected.profit,
            isPriceMetric: false,
          },
          {
            label: 'Profit Margin',
            current: current.margin,
            projected: projected.margin,
            isPriceMetric: true,
          },
        ].map((metric, idx) => {
          const change = metric.isPriceMetric
            ? metric.projected - metric.current
            : metric.projected - metric.current

          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-card p-4 border border-slate-200 dark:border-slate-700"
            >
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                {metric.label}
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Current</p>
                  <p className="text-lg font-bold">
                    {metric.isPriceMetric ? `${metric.current}%` : formatCurrency(metric.current)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 mb-1">Projected</p>
                  <p className="text-lg font-bold text-vyapar-cyan">
                    {metric.isPriceMetric ? `${metric.projected}%` : formatCurrency(metric.projected)}
                  </p>
                  <p
                    className={`text-xs font-semibold mt-1 flex items-center justify-end gap-1 ${
                      change >= 0 ? 'text-vyapar-success' : 'text-vyapar-error'
                    }`}
                  >
                    {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {metric.isPriceMetric ? `${change.toFixed(1)}%` : formatCurrency(change)}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* Scenario Comparison */}
      <motion.div
        variants={item}
        className="bg-white dark:bg-slate-800 rounded-card p-6"
      >
        <h2 className="text-lg font-bold mb-4">Pre-Built Scenarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((scen, idx) => {
            const outcomes = calculateOutcomes(scen)
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                onClick={() => setScenario(scen)}
              >
                <h3 className="font-bold">{scen.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{scen.label}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Profit</span>
                    <span className="font-bold">{formatCurrency(outcomes.profit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Margin</span>
                    <span className="font-bold">{outcomes.margin}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cash Flow</span>
                    <span className="font-bold">{formatCurrency(outcomes.cashFlow)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* AI Explanation */}
      <motion.div
        variants={item}
        className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-card p-6"
      >
        <h2 className="font-bold mb-3 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          AI Analysis
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Based on your current parameters and historical trends:{' '}
          {scenario.productPrice > baselineScenario.productPrice
            ? 'Increasing price may reduce volume but improve margins.'
            : 'Current pricing is competitive.'}
          {scenario.marketingExpense > baselineScenario.marketingExpense
            ? ' Higher marketing spend shows positive ROI.'
            : ''}{' '}
          Your business would generate approximately{' '}
          <strong>{formatCurrency(projected.profit)}</strong> in profit. The
          confidence level is <strong>75%</strong> based on 6 months of
          historical data.
        </p>
      </motion.div>
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { useBusinessStore } from '@/lib/store'
import { AlertCircle } from 'lucide-react'

export default function InventoryPage() {
  const products = useBusinessStore(state => state.products)

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
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
        <h1 className="text-2xl md:text-3xl font-bold">Inventory Management</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Track and manage your product stock
        </p>
      </div>

      {/* Summary Stats */}
      <motion.div
        variants={item}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total Products', value: products.length },
          { label: 'Total Stock Value', value: '₹125K' },
          { label: 'Low Stock Items', value: products.filter(p => p.stock < p.reorderLevel).length },
          { label: 'Out of Stock', value: products.filter(p => p.stock === 0).length },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 rounded-card p-4 shadow-sm">
            <p className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</p>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Products Table */}
      <motion.div
        variants={item}
        className="bg-white dark:bg-slate-800 rounded-card p-6 shadow-sm overflow-x-auto"
      >
        <h2 className="font-bold mb-4">Stock Levels</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left py-3 px-4 font-semibold">Product</th>
              <th className="text-center py-3 px-4 font-semibold">SKU</th>
              <th className="text-center py-3 px-4 font-semibold">Stock</th>
              <th className="text-center py-3 px-4 font-semibold">Reorder Level</th>
              <th className="text-center py-3 px-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              let status = 'Healthy'
              let statusColor = 'text-green-600'
              if (product.stock === 0) {
                status = 'Out of Stock'
                statusColor = 'text-red-600'
              } else if (product.stock < product.reorderLevel) {
                status = 'Low Stock'
                statusColor = 'text-yellow-600'
              }

              return (
                <tr key={product.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{product.image}</span>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="text-center py-3 px-4 text-xs text-slate-500">
                    {product.sku}
                  </td>
                  <td className="text-center py-3 px-4 font-bold">{product.stock}</td>
                  <td className="text-center py-3 px-4">{product.reorderLevel}</td>
                  <td className={`text-center py-3 px-4 font-semibold ${statusColor}`}>
                    {status}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </motion.div>

      {/* Low Stock Alert */}
      {products.some(p => p.stock < p.reorderLevel) && (
        <motion.div
          variants={item}
          className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-card p-4 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-semibold text-yellow-900 dark:text-yellow-100">
              {products.filter(p => p.stock < p.reorderLevel).length} products need restocking
            </p>
            <p className="text-yellow-700 dark:text-yellow-200 mt-1">
              Consider using Smart Procurement to plan your purchases.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

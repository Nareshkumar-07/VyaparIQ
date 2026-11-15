'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingCart, Check } from 'lucide-react'
import { useBusinessStore } from '@/lib/store'
import { formatCurrency, generateId } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function POSPage() {
  const products = useBusinessStore(state => state.products)
  const cart = useBusinessStore(state => state.cart)
  const addToCart = useBusinessStore(state => state.addToCart)
  const removeFromCart = useBusinessStore(state => state.removeFromCart)
  const updateCart = useBusinessStore(state => state.updateCart)
  const clearCart = useBusinessStore(state => state.clearCart)
  const addTransaction = useBusinessStore(state => state.addTransaction)
  const updateInventory = useBusinessStore(state => state.updateInventory)
  
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCheckout, setShowCheckout] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi' | 'card'>('cash')
  const [discountPercent, setDiscountPercent] = useState(0)

  const categories = ['all', ...new Set(products.map(p => p.category))]
  
  const filteredProducts = products.filter(p => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cartDiscount = cartTotal * (discountPercent / 100)
  const tax = (cartTotal - cartDiscount) * 0.05
  const grandTotal = cartTotal - cartDiscount + tax

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      productId: product.id,
      quantity: 1,
      price: product.price,
      discount: 0,
    })
    toast.success(`${product.name} added to cart`)
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty')
      return
    }

    // Create transaction
    addTransaction({
      id: generateId(),
      date: new Date(),
      items: cart,
      subtotal: cartTotal,
      discount: cartDiscount,
      tax,
      total: grandTotal,
      paymentMethod,
      status: 'completed',
    })

    // Update inventory
    cart.forEach(item => {
      updateInventory(item.productId, -item.quantity)
    })

    toast.success('Payment successful! Invoice generated.')
    clearCart()
    setShowCheckout(false)
    setDiscountPercent(0)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Products Section */}
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold">Smart POS</h1>

        {/* Search & Category */}
        <div className="bg-white dark:bg-slate-800 rounded-card p-4 space-y-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-vyapar-cyan"
          />

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-vyapar-navy text-white'
                    : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filteredProducts.map(product => {
            const cartItem = cart.find(i => i.productId === product.id)
            return (
              <motion.div
                key={product.id}
                layout
                className="bg-white dark:bg-slate-800 rounded-card p-3 shadow-sm hover:shadow-md transition cursor-pointer group"
                onClick={() => !cartItem && handleAddToCart(product)}
              >
                <div className="aspect-square bg-slate-100 dark:bg-slate-700 rounded-lg mb-2 flex items-center justify-center text-4xl group-hover:bg-slate-200 transition">
                  {product.image}
                </div>
                
                <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{product.sku}</p>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-vyapar-navy dark:text-vyapar-cyan">
                    {formatCurrency(product.price)}
                  </span>
                  {product.stock < product.reorderLevel && (
                    <span className="text-xs bg-vyapar-warning text-white px-2 py-1 rounded">
                      Low Stock
                    </span>
                  )}
                </div>

                {/* Quantity Controls */}
                {cartItem && (
                  <div className="mt-3 flex items-center justify-between bg-vyapar-navy/10 rounded-lg p-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        updateCart(product.id, Math.max(0, cartItem.quantity - 1))
                      }}
                      className="p-1 hover:bg-slate-200 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-sm">{cartItem.quantity}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        updateCart(product.id, cartItem.quantity + 1)
                      }}
                      className="p-1 hover:bg-slate-200 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Cart Section */}
      <div className="md:col-span-1">
        <motion.div
          layout
          className="bg-white dark:bg-slate-800 rounded-card p-4 sticky top-24 shadow-lg"
        >
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Cart ({cart.length})
          </h2>

          {cart.length === 0 ? (
            <p className="text-slate-500 text-center py-8">Cart is empty</p>
          ) : (
            <>
              <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                {cart.map(item => {
                  const product = products.find(p => p.id === item.productId)
                  return (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700 rounded"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{product?.name}</p>
                        <p className="text-xs text-slate-500">
                          {item.quantity} × {formatCurrency(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="p-1 hover:bg-red-100 rounded transition"
                        >
                          <X className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Discount */}
              <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700 rounded">
                <label className="text-xs font-semibold block mb-2">Discount (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded text-sm"
                />
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm mb-4 pb-4 border-b border-slate-200 dark:border-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-vyapar-success">
                    <span>Discount</span>
                    <span>-{formatCurrency(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="bg-vyapar-navy text-white rounded-lg p-3 mb-4">
                <p className="text-xs mb-1">Total</p>
                <p className="text-2xl font-bold">{formatCurrency(grandTotal)}</p>
              </div>

              {/* Payment Method */}
              <div className="space-y-2 mb-4">
                <label className="text-xs font-semibold block">Payment Method</label>
                <div className="flex gap-2">
                  {['cash', 'upi', 'card'].map(method => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method as any)}
                      className={`flex-1 py-2 rounded text-xs font-semibold transition ${
                        paymentMethod === method
                          ? 'bg-vyapar-navy text-white'
                          : 'bg-slate-100 dark:bg-slate-700'
                      }`}
                    >
                      {method.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-vyapar-success hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Checkout
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}

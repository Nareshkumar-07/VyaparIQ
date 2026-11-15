'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useBusinessStore, getDemoMerchants } from '@/lib/store'

export default function Home() {
  const router = useRouter()
  const currentMerchant = useBusinessStore(state => state.currentMerchant)
  const setCurrentMerchant = useBusinessStore(state => state.setCurrentMerchant)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (currentMerchant) {
      router.push('/dashboard')
    }
  }, [currentMerchant, router])

  const handleSelectMerchant = (merchantId: string) => {
    setIsLoading(true)
    const merchants = getDemoMerchants()
    const merchant = merchants.find(m => m.id === merchantId)
    if (merchant) {
      setCurrentMerchant(merchant)
      setTimeout(() => router.push('/dashboard'), 300)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-vyapar-navy via-blue-900 to-vyapar-cyan/20 text-white">
      {/* Header */}
      <div className="safe-area-inset px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-4xl mb-3">📊</div>
          <h1 className="text-3xl font-bold mb-2">VyaparIQ</h1>
          <p className="text-blue-100 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Your AI Business Partner
          </p>
        </motion.div>
      </div>

      {/* Hero Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="px-6 py-12 max-w-md mx-auto"
      >
        <motion.div variants={item} className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-3">Grow Your Business Smarter</h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            Real-time AI insights, smart billing, inventory management, and growth experiments—all designed for Paytm merchants.
          </p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div variants={item} className="space-y-3 mb-12">
          {[
            { icon: '🤖', title: 'AI Business Twin', desc: 'Simulate decisions before implementation' },
            { icon: '📈', title: 'Daily AI Tasks', desc: 'Personalized profit improvement actions' },
            { icon: '🛍️', title: 'Smart POS', desc: 'Fast, intuitive billing system' },
            { icon: '🗺️', title: 'Neighbourhood Pulse', desc: 'Local demand & market signals' },
            { icon: '📦', title: 'Smart Procurement', desc: 'Cash-aware inventory planning' },
            { icon: '🧪', title: 'Growth Experiments', desc: 'Measure what actually works' },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-4 text-left hover:bg-white/15 transition"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-xs text-blue-100 mt-1">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Merchant Selection */}
      <motion.div
        variants={item}
        className="px-6 pb-12 max-w-md mx-auto"
      >
        <h3 className="text-lg font-semibold mb-4 text-center">Select Your Store</h3>
        <div className="space-y-3">
          {getDemoMerchants().map((merchant) => (
            <motion.button
              key={merchant.id}
              onClick={() => handleSelectMerchant(merchant.id)}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white/15 hover:bg-white/25 disabled:opacity-50 border border-white/30 rounded-lg p-4 text-left transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{merchant.avatar}</span>
                <div>
                  <p className="font-semibold">{merchant.name}</p>
                  <p className="text-xs text-blue-100">{merchant.shopName}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center pb-8 text-xs text-blue-100"
      >
        <p>Demo Mode - Using Synthetic Data</p>
        <p className="mt-1">🔒 No real transactions or data collection</p>
      </motion.div>
    </div>
  )
}

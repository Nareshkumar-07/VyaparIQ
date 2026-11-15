'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LogOut, Settings, FileText, Bell, Lock, Palette } from 'lucide-react'
import { useBusinessStore, getDemoMerchants } from '@/lib/store'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const router = useRouter()
  const currentMerchant = useBusinessStore(state => state.currentMerchant)
  const setCurrentMerchant = useBusinessStore(state => state.setCurrentMerchant)

  const handleLogout = () => {
    setCurrentMerchant(null)
    toast.success('Logged out successfully')
    router.push('/')
  }

  const handleSwitchMerchant = (merchantId: string) => {
    const merchants = getDemoMerchants()
    const merchant = merchants.find(m => m.id === merchantId)
    if (merchant) {
      setCurrentMerchant(merchant)
      toast.success(`Switched to ${merchant.shopName}`)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  const settingsOptions = [
    {
      icon: Settings,
      title: 'Account Settings',
      description: 'Update your profile information',
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Manage alerts and reminders',
    },
    {
      icon: Lock,
      title: 'Privacy & Security',
      description: 'Control data sharing and permissions',
    },
    {
      icon: Palette,
      title: 'Appearance',
      description: 'Light mode, dark mode, and themes',
    },
    {
      icon: FileText,
      title: 'Reports',
      description: 'Download business reports and exports',
    },
  ]

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-2xl mx-auto"
    >
      {/* Profile Header */}
      <motion.div
        variants={item}
        className="bg-gradient-to-r from-vyapar-navy to-blue-700 text-white rounded-card p-6"
      >
        <div className="flex items-center gap-4">
          <div className="text-5xl">{currentMerchant?.avatar}</div>
          <div>
            <h1 className="text-2xl font-bold">{currentMerchant?.name}</h1>
            <p className="text-blue-100 mt-1">{currentMerchant?.shopName}</p>
            <p className="text-xs text-blue-200 mt-2">📧 {currentMerchant?.email}</p>
            <p className="text-xs text-blue-200">📞 {currentMerchant?.phone}</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={item}
        className="grid grid-cols-3 gap-4"
      >
        {[
          { label: 'Member Since', value: 'Jan 2024' },
          { label: 'Transactions', value: '245' },
          { label: 'Total Revenue', value: '₹95K' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 rounded-card p-4 text-center shadow-sm">
            <p className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</p>
            <p className="text-lg font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Switch Merchant */}
      <motion.div
        variants={item}
        className="bg-white dark:bg-slate-800 rounded-card p-6 shadow-sm"
      >
        <h2 className="font-bold mb-4">Switch Store</h2>
        <div className="space-y-2">
          {getDemoMerchants().map(merchant => (
            <button
              key={merchant.id}
              onClick={() => handleSwitchMerchant(merchant.id)}
              className={`w-full text-left p-4 rounded-lg border-2 transition ${
                currentMerchant?.id === merchant.id
                  ? 'border-vyapar-navy bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{merchant.avatar}</span>
                <div>
                  <p className="font-semibold">{merchant.name}</p>
                  <p className="text-xs text-slate-500">{merchant.shopName}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div
        variants={item}
        className="space-y-3"
      >
        <h2 className="font-bold">Settings</h2>
        {settingsOptions.map((option, idx) => {
          const Icon = option.icon
          return (
            <button
              key={idx}
              className="w-full text-left p-4 bg-white dark:bg-slate-800 rounded-card hover:shadow-md transition flex items-start gap-4 border border-slate-200 dark:border-slate-700"
            >
              <Icon className="w-5 h-5 text-vyapar-navy mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">{option.title}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {option.description}
                </p>
              </div>
            </button>
          )
        })}
      </motion.div>

      {/* Information */}
      <motion.div
        variants={item}
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-card p-6"
      >
        <h2 className="font-bold mb-3">About VyaparIQ</h2>
        <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <p>
            <strong>Version:</strong> 0.1.0 (Demo)
          </p>
          <p>
            <strong>Mode:</strong> 🎭 Demo Mode - Using Synthetic Data
          </p>
          <p>
            <strong>Privacy:</strong> 🔒 No real data is collected or stored
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-3">
            This is a hackathon prototype demonstrating AI-powered merchant business
            management. All data is simulated.
          </p>
        </div>
      </motion.div>

      {/* Logout */}
      <motion.button
        variants={item}
        onClick={handleLogout}
        className="w-full bg-vyapar-error hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </motion.button>

      {/* Footer */}
      <motion.div
        variants={item}
        className="text-center text-xs text-slate-500 pb-4"
      >
        <p>Made with ❤️ for Paytm Merchants</p>
        <p className="mt-1">© 2024 VyaparIQ</p>
      </motion.div>
    </motion.div>
  )
}

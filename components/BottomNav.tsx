'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Store, Zap, BarChart3, User } from 'lucide-react'
import { motion } from 'framer-motion'

const tabs = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Business', href: '/dashboard/business', icon: Store },
  { name: 'AI', href: '/dashboard/copilot', icon: Zap },
  { name: 'Insights', href: '/dashboard/insights', icon: BarChart3 },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 md:hidden">
        <div className="flex items-center justify-around h-20 safe-area-inset">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = pathname.startsWith(tab.href)

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex-1 flex flex-col items-center justify-center h-full relative group"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center justify-center gap-1 transition ${
                    isActive
                      ? 'text-vyapar-navy'
                      : 'text-slate-600 group-hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{tab.name}</span>
                </motion.div>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-0 left-0 right-0 h-1 bg-vyapar-navy rounded-b-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-vyapar-navy dark:text-vyapar-cyan">VyaparIQ</h2>
          <p className="text-xs text-slate-500">Your AI Business Partner</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = pathname.startsWith(tab.href)

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-vyapar-navy text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 text-center">
            Demo Mode
            <br />
            Using Synthetic Data
          </p>
        </div>
      </aside>
    </>
  )
}

'use client'

import { Merchant } from '@/lib/store'
import { Bell, Settings } from 'lucide-react'

export default function Header({ merchant }: { merchant: Merchant }) {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{merchant.avatar}</div>
          <div>
            <h1 className="font-bold text-sm md:text-base">{merchant.shopName}</h1>
            <p className="text-xs text-slate-500">{merchant.name}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-vyapar-error rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useBusinessStore } from '@/lib/store'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const currentMerchant = useBusinessStore(state => state.currentMerchant)

  useEffect(() => {
    if (!currentMerchant) {
      router.push('/')
    }
  }, [currentMerchant, router])

  if (!currentMerchant) {
    return null
  }

  return (
    <div className="min-h-screen bg-vyapar-bg dark:bg-slate-950 pb-24 md:pb-0 md:ml-64">
      <Header merchant={currentMerchant} />
      <main className="container mx-auto px-4 py-6 md:py-8">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}

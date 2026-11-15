import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'VyaparIQ - Your AI Business Partner',
  description: 'AI-powered business management platform for Paytm merchants',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'VyaparIQ',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#002970" />
        <meta name="description" content="VyaparIQ - Your AI Business Partner" />
      </head>
      <body className="bg-vyapar-bg dark:bg-slate-950">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

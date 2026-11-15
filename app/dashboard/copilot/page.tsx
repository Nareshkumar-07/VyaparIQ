'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Mic } from 'lucide-react'
import toast from 'react-hot-toast'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const suggestionQuestions = [
  'Why did my sales decrease yesterday?',
  'Give me three tasks to improve my profit',
  'Which products should I restock?',
  "Can I afford to purchase ₹10,000 of inventory?",
  'What happens if I offer a 10% discount?',
  'Which campaign performed better?',
]

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm VyaparIQ's AI Business Copilot. Ask me anything about your business. I can help with sales analysis, inventory planning, pricing strategies, and growth recommendations.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [language, setLanguage] = useState<'en' | 'hi' | 'ta'>('en')

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes('sales') && lowerQuery.includes('decrease')) {
      return 'Your sales decreased by 12% yesterday compared to the average. This could be due to: 1) Weather conditions reducing foot traffic by 8%, 2) A competitor nearby launched a promotion, 3) You had 2 hours of lower customer flow during lunch time. Try increasing your marketing or creating a counter-offer.'
    }

    if (lowerQuery.includes('three tasks') || lowerQuery.includes('tasks to improve')) {
      return 'Your top 3 tasks today are:\n\n1. **Review Slow-Moving Stock** - 5 products unsold for 15+ days. Consider bundling or discounting.\n\n2. **Restock Best Sellers** - Cotton T-Shirt stock drops to critical level in 2 days.\n\n3. **Create Product Combos** - Denim + T-Shirt bundles can increase AOV by 25%.'
    }

    if (lowerQuery.includes('restock') || lowerQuery.includes('products') && lowerQuery.includes('stock')) {
      return 'Based on your sales data, I recommend restocking:\n\n• Cotton T-Shirt (Stock: 8 units) - Order 50 units immediately\n• Denim Jeans (Stock: 22 units) - Order 30 units\n• Sneakers (Stock: 12 units) - Order 15 units\n\nEstimated cost: ₹18,500. Your current budget allows this purchase safely.'
    }

    if (lowerQuery.includes('afford') || lowerQuery.includes('₹10,000')) {
      return 'Yes, you can safely purchase ₹10,000 of inventory. Your current cash position:\n\n• Available Cash: ₹50,000\n• Minimum Reserve: ₹5,000\n• Upcoming Expenses: ₹3,000\n• Safe Procurement Budget: ₹42,000\n\nAfter this purchase, you\'ll still have ₹32,000 in working capital. ✅'
    }

    if (lowerQuery.includes('discount') || lowerQuery.includes('10%')) {
      return 'If you offer a 10% discount across all products:\n\n**Projected Impact:**\n• Sales Volume: +18-22% (price elasticity)\n• Profit Margin: -10% per unit\n• Net Profit: -5% to +8% depending on volume increase\n\nI recommend: Apply 10% discount only to slow-moving items to clear inventory, not across all products.'
    }

    if (lowerQuery.includes('campaign') || lowerQuery.includes('performed')) {
      return 'Your recent campaigns performance:\n\n**Best**: Weekend Bundle Offer\n• ROI: 2.8x\n• Conversion: 34%\n• Customers: 145\n\n**Good**: Email Blast\n• ROI: 1.4x\n• Conversion: 12%\n\n**Needs Improvement**: Social Media Ads\n• ROI: 0.8x\n• Conversion: 4%\n\nI recommend increasing budget on Bundle Offers.'
    }

    return `Based on your business data, here's my analysis: Your question relates to ${lowerQuery.includes('inventory') ? 'inventory management' : lowerQuery.includes('sales') ? 'sales' : 'general business'}. I need more specific details to provide accurate recommendations. Try asking: "Should I restock product X?" or "What\'s my profit margin on Y?".\n\n💡 Tip: Use the other tabs (Smart POS, Business Twin, Profit Booster) for detailed insights.`
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const responseContent = generateResponse(input)
      const assistantMessage: Message = {
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 800)
  }

  const handleQuestionClick = (question: string) => {
    setInput(question)
  }

  const handleVoiceInput = () => {
    toast.success('Voice input available in mobile browsers')
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="pt-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold">VyaparIQ AI Copilot</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Your intelligent business assistant
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 py-6"
          >
            <h2 className="text-lg font-bold text-center mb-6">What can I help you with?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestionQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuestionClick(question)}
                  className="text-left p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-vyapar-navy transition"
                >
                  <p className="text-sm font-medium">{question}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-md md:max-w-xl px-4 py-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-vyapar-navy text-white rounded-br-none'
                  : 'bg-slate-100 dark:bg-slate-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </p>
              <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-blue-100' : 'text-slate-500'}`}>
                {msg.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" />
            </div>
            <p className="text-sm text-slate-500 mt-2">Analyzing your data...</p>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
        {/* Language Selector */}
        <div className="mb-3 flex gap-2">
          {(['en', 'hi', 'ta'] as const).map(lang => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`text-xs px-2 py-1 rounded transition ${
                language === lang
                  ? 'bg-vyapar-navy text-white'
                  : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200'
              }`}
            >
              {lang === 'en' ? '🇬🇧 EN' : lang === 'hi' ? '🇮🇳 HI' : '🇮🇳 TA'}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask me about your business..."
            className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-vyapar-cyan bg-white dark:bg-slate-700"
          />
          <button
            onClick={handleVoiceInput}
            className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
            title="Voice input"
          >
            <Mic className="w-5 h-5" />
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-vyapar-navy hover:bg-blue-900 disabled:opacity-50 text-white rounded-lg transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-2">
          💡 Tip: Ask specific questions for better answers
        </p>
      </div>
    </div>
  )
}

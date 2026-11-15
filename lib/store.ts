import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Merchant {
  id: string
  name: string
  shopName: string
  email: string
  phone: string
  avatar: string
  businessType: 'clothing' | 'grocery' | 'electronics'
}

export interface Product {
  id: string
  name: string
  sku: string
  price: number
  cost: number
  category: string
  image: string
  variants?: {
    size?: string[]
    color?: string[]
  }
  stock: number
  reorderLevel: number
}

export interface CartItem {
  productId: string
  quantity: number
  price: number
  discount: number
}

export interface Transaction {
  id: string
  date: Date
  items: CartItem[]
  subtotal: number
  discount: number
  tax: number
  total: number
  paymentMethod: 'cash' | 'upi' | 'card'
  status: 'completed' | 'pending' | 'cancelled'
}

export interface AITask {
  id: string
  date: Date
  title: string
  problem: string
  action: string
  impact: string
  effort: string
  confidenceScore: number
  completed: boolean
  completedAt?: Date
}

export interface ProcurementItem {
  productId: string
  currentStock: number
  recommendedQuantity: number
  estimatedCost: number
  priority: 'high' | 'medium' | 'low'
  forecastDemand: number
}

interface BusinessState {
  // Merchant
  currentMerchant: Merchant | null
  setCurrentMerchant: (merchant: Merchant) => void
  switchMerchant: (merchantId: string) => void

  // Cart
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  updateCart: (productId: string, quantity: number) => void
  clearCart: () => void
  
  // Transactions
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
  
  // Inventory
  products: Product[]
  updateInventory: (productId: string, quantityChange: number) => void
  
  // AI Tasks
  aiTasks: AITask[]
  addAITask: (task: AITask) => void
  completeAITask: (taskId: string) => void
  
  // Procurement
  procurementPlan: ProcurementItem[]
  setProcurementPlan: (plan: ProcurementItem[]) => void
  
  // Business metrics
  totalSales: number
  totalProfit: number
  businessHealthScore: number
  updateMetrics: () => void
}

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set, get) => ({
      currentMerchant: null,
      setCurrentMerchant: (merchant) => set({ currentMerchant: merchant }),
      switchMerchant: (merchantId) => {
        // In a real app, this would load merchant data from backend
        const demoMerchants = getDemoMerchants()
        const merchant = demoMerchants.find(m => m.id === merchantId)
        if (merchant) {
          set({ currentMerchant: merchant })
        }
      },

      cart: [],
      addToCart: (item) => set((state) => {
        const existing = state.cart.find(i => i.productId === item.productId)
        if (existing) {
          return {
            cart: state.cart.map(i =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          }
        }
        return { cart: [...state.cart, item] }
      }),
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(i => i.productId !== productId),
      })),
      updateCart: (productId, quantity) => set((state) => {
        if (quantity <= 0) {
          return { cart: state.cart.filter(i => i.productId !== productId) }
        }
        return {
          cart: state.cart.map(i =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        }
      }),
      clearCart: () => set({ cart: [] }),

      transactions: [],
      addTransaction: (transaction) => set((state) => ({
        transactions: [...state.transactions, transaction],
      })),

      products: getDemoProducts(),
      updateInventory: (productId, quantityChange) => set((state) => ({
        products: state.products.map(p =>
          p.id === productId
            ? { ...p, stock: Math.max(0, p.stock + quantityChange) }
            : p
        ),
      })),

      aiTasks: [],
      addAITask: (task) => set((state) => ({
        aiTasks: [...state.aiTasks, task],
      })),
      completeAITask: (taskId) => set((state) => ({
        aiTasks: state.aiTasks.map(t =>
          t.id === taskId ? { ...t, completed: true, completedAt: new Date() } : t
        ),
      })),

      procurementPlan: [],
      setProcurementPlan: (plan) => set({ procurementPlan: plan }),

      totalSales: 0,
      totalProfit: 0,
      businessHealthScore: 82,
      updateMetrics: () => {
        const state = get()
        const totalSales = state.transactions.reduce((sum, t) => sum + t.total, 0)
        const totalProfit = state.transactions.reduce((sum, t) => {
          return sum + t.items.reduce((itemSum, item) => {
            const product = state.products.find(p => p.id === item.productId)
            if (!product) return itemSum
            const profitMargin = (item.price - product.cost) * item.quantity
            return itemSum + profitMargin
          }, 0)
        }, 0)
        set({ totalSales, totalProfit })
      },
    }),
    {
      name: 'vyapariq-store',
      version: 1,
    }
  )
)

// Demo data
export function getDemoMerchants(): Merchant[] {
  return [
    {
      id: '1',
      name: 'Rajesh Kumar',
      shopName: 'Style Hub',
      email: 'rajesh@example.com',
      phone: '+91 98765 43210',
      avatar: '👨‍💼',
      businessType: 'clothing',
    },
    {
      id: '2',
      name: 'Priya Singh',
      shopName: 'Fresh Mart',
      email: 'priya@example.com',
      phone: '+91 98765 43211',
      avatar: '👩‍💼',
      businessType: 'grocery',
    },
    {
      id: '3',
      name: 'Amit Patel',
      shopName: 'TechStore',
      email: 'amit@example.com',
      phone: '+91 98765 43212',
      avatar: '👨‍💻',
      businessType: 'electronics',
    },
  ]
}

export function getDemoProducts(): Product[] {
  return [
    // Clothing
    { id: '1', name: 'Cotton T-Shirt', sku: 'TSH-001', price: 499, cost: 250, category: 'Apparel', image: '👕', variants: { size: ['S', 'M', 'L', 'XL'], color: ['Red', 'Blue', 'Black'] }, stock: 45, reorderLevel: 20 },
    { id: '2', name: 'Denim Jeans', sku: 'JNS-001', price: 999, cost: 550, category: 'Apparel', image: '👖', variants: { size: ['28', '30', '32', '34'] }, stock: 22, reorderLevel: 15 },
    { id: '3', name: 'Casual Shirt', sku: 'SHR-001', price: 799, cost: 400, category: 'Apparel', image: '👔', variants: { size: ['S', 'M', 'L', 'XL'] }, stock: 18, reorderLevel: 12 },
    { id: '4', name: 'Sneakers', sku: 'SNK-001', price: 1499, cost: 800, category: 'Footwear', image: '👟', variants: { size: ['6', '7', '8', '9', '10', '11'] }, stock: 12, reorderLevel: 8 },
    { id: '5', name: 'Hoodie', sku: 'HOD-001', price: 1299, cost: 650, category: 'Apparel', image: '🧥', variants: { size: ['S', 'M', 'L', 'XL'], color: ['Navy', 'Grey', 'Black'] }, stock: 8, reorderLevel: 10 },
    // Grocery
    { id: '6', name: 'Basmati Rice 1kg', sku: 'RIC-001', price: 120, cost: 70, category: 'Grains', image: '🌾', stock: 150, reorderLevel: 50 },
    { id: '7', name: 'Cooking Oil 1L', sku: 'OIL-001', price: 210, cost: 130, category: 'Oils', image: '🫒', stock: 45, reorderLevel: 20 },
    { id: '8', name: 'Whole Wheat Flour 1kg', sku: 'FLR-001', price: 85, cost: 50, category: 'Grains', image: '🌾', stock: 80, reorderLevel: 30 },
    // Electronics
    { id: '9', name: 'USB-C Cable', sku: 'USB-001', price: 299, cost: 150, category: 'Accessories', image: '🔌', stock: 200, reorderLevel: 50 },
    { id: '10', name: 'Phone Charger', sku: 'CHG-001', price: 599, cost: 300, category: 'Chargers', image: '🔋', stock: 85, reorderLevel: 30 },
  ]
}

export function generateDemoTransactions(count: number = 15): Transaction[] {
  const transactions: Transaction[] = []
  const paymentMethods: Array<'cash' | 'upi' | 'card'> = ['cash', 'upi', 'card']
  
  for (let i = 0; i < count; i++) {
    const date = new Date()
    date.setHours(date.getHours() - Math.random() * 24)
    
    const items: CartItem[] = [
      {
        productId: Math.random() > 0.5 ? '1' : '2',
        quantity: Math.floor(Math.random() * 3) + 1,
        price: Math.random() > 0.5 ? 499 : 999,
        discount: Math.random() > 0.7 ? 50 : 0,
      },
    ]
    
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const discount = items.reduce((sum, item) => sum + item.discount, 0)
    const tax = Math.floor(subtotal * 0.05)
    
    transactions.push({
      id: `txn-${i}`,
      date,
      items,
      subtotal,
      discount,
      tax,
      total: subtotal - discount + tax,
      paymentMethod: paymentMethods[Math.floor(Math.random() * 3)],
      status: 'completed',
    })
  }
  
  return transactions
}

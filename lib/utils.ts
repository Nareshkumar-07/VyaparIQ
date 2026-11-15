export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount)
}

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`
}

export const calculateProfit = (revenue: number, cost: number): number => {
  return revenue - cost
}

export const calculateMargin = (price: number, cost: number): number => {
  return ((price - cost) / price) * 100
}

export const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export const calculateBusinessHealth = (metrics: {
  salesTrend: number // -1 to 1
  profitMargin: number // 0 to 1
  inventoryHealth: number // 0 to 1
  cashFlow: number // 0 to 1
  taskCompletion: number // 0 to 1
}): number => {
  const weights = {
    salesTrend: 0.25,
    profitMargin: 0.25,
    inventoryHealth: 0.2,
    cashFlow: 0.2,
    taskCompletion: 0.1,
  }
  
  const score =
    (metrics.salesTrend + 1) / 2 * weights.salesTrend * 100 +
    metrics.profitMargin * weights.profitMargin * 100 +
    metrics.inventoryHealth * weights.inventoryHealth * 100 +
    metrics.cashFlow * weights.cashFlow * 100 +
    metrics.taskCompletion * weights.taskCompletion * 100
  
  return Math.min(100, Math.max(0, score))
}

export const getDayOfWeek = (date: Date): string => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return days[date.getDay()]
}

export const getLast7Days = (): Date[] => {
  const days: Date[] = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    days.push(date)
  }
  return days
}

export const generateChartData = () => {
  const days = getLast7Days()
  return days.map(date => ({
    date: getDayOfWeek(date),
    sales: Math.floor(Math.random() * 5000) + 2000,
    profit: Math.floor(Math.random() * 1500) + 500,
  }))
}

export const calculateReorderQuantity = (
  forecastDemand: number,
  leadTime: number,
  safetyStock: number
): number => {
  return Math.ceil(forecastDemand * (leadTime / 7) + safetyStock)
}

export const shouldReorder = (
  currentStock: number,
  reorderLevel: number,
  forecastDemand: number,
  leadTime: number = 3
): boolean => {
  const consumptionDuringLeadTime = (forecastDemand / 7) * leadTime
  return currentStock <= reorderLevel + consumptionDuringLeadTime
}

# VyaparIQ - Your AI Business Partner

A modern, mobile-first Progressive Web Application (PWA) that combines AI-driven decision-making with retail billing, local market intelligence, inventory procurement, and measurable growth optimization for Paytm merchants.

## 🎯 Project Overview

VyaparIQ is an intelligent merchant business management platform designed to help small retailers grow their business, manage operations, and serve customers better. Built as a hackathon prototype with a focus on demo-mode functionality using realistic synthetic data.

**Key Features:**
- 🤖 **AI Business Twin** - Simulate business decisions before implementation
- 📈 **AI Profit Booster** - Three daily personalized profit improvement tasks
- 🛍️ **Smart POS** - Fast, intuitive billing system with inventory tracking
- 🗺️ **Neighbourhood Pulse** - Local demand signals and market intelligence
- 📦 **Smart Procurement** - Cash-aware inventory purchasing
- 🧪 **Growth Experiments** - Measure what actually works
- 💬 **AI Copilot** - Conversational business assistant

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Framer Motion** for animations
- **Recharts** for interactive charts
- **Zustand** for state management
- **Lucide React** for icons

### Tools & Libraries
- **react-hot-toast** for notifications
- **date-fns** for date utilities
- **Responsive design** for mobile/tablet/desktop

## 📁 Project Structure

```
VyaparIQ/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   ├── providers.tsx           # Context providers
│   ├── globals.css             # Global styles
│   └── dashboard/
│       ├── layout.tsx          # Dashboard layout with nav
│       ├── page.tsx            # Home dashboard
│       ├── pos/                # Smart POS
│       ├── business-twin/      # AI Business Twin
│       ├── profit-booster/     # AI Profit Booster
│       ├── neighbourhood/      # Neighbourhood Pulse
│       ├── procurement/        # Smart Procurement
│       ├── copilot/            # AI Copilot
│       ├── insights/           # Analytics & Growth Lab
│       ├── inventory/          # Inventory Management
│       ├── analytics/          # Business Analytics
│       ├── business/           # Business Dashboard
│       └── profile/            # Merchant Profile
├── components/
│   ├── Header.tsx              # Sticky header
│   └── BottomNav.tsx           # Bottom navigation
├── lib/
│   ├── store.ts                # Zustand store & demo data
│   └── utils.ts                # Utility functions
├── public/
│   ├── manifest.json           # PWA manifest
│   └── icons/                  # App icons
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── postcss.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or using `nvm`
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd "c:\Users\my pc\Downloads\2\VyaparIQ"
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 📱 Demo Mode

The entire application works in **Demo Mode** without any external API credentials:

### Three Demo Merchants
1. **Rajesh Kumar** - Style Hub (Clothing Store)
2. **Priya Singh** - Fresh Mart (Grocery Store)
3. **Amit Patel** - TechStore (Electronics Store)

### Demo Features
- ✅ Working navigation across all pages
- ✅ Interactive charts and analytics
- ✅ Functional POS billing system
- ✅ Simulated checkout workflow
- ✅ Inventory management
- ✅ Business Twin scenario simulation
- ✅ AI-generated daily tasks
- ✅ Growth experiments simulation
- ✅ Neighbourhood demand signals

**All data is synthetic and deterministic** - results remain consistent across sessions.

## 🎨 Design System

### Color Palette
- **Primary Navy**: `#002970`
- **Bright Cyan**: `#00BAF2`
- **White**: `#FFFFFF`
- **Background**: `#F4F8FC`
- **Success Green**: `#16A34A`
- **Warning Orange**: `#F59E0B`
- **Error Red**: `#EF4444`

### Responsive Breakpoints
- Mobile: 360-430px (primary)
- Tablet: 768px+
- Desktop: 1024px+

## 🔑 Key Features Explained

### 1. Smart POS
- Barcode scanning simulation
- Product search and filtering
- Size/color variants
- Real-time discount calculations
- Multiple payment methods (Cash, UPI, Card)
- Digital invoice generation

### 2. Business Twin
- Adjust business parameters
- Simulates revenue, costs, and profitability
- Scenario comparison (Optimistic, Expected, Conservative)
- Visual radar charts for comparison
- AI analysis and recommendations

### 3. Profit Booster
- Daily AI-generated tasks (3 per day)
- Profit improvement suggestions
- Task completion tracking
- Profit goal tracking (5-50%)
- Expected financial impact

### 4. Neighbourhood Pulse
- Local market signals (festivals, events, weather)
- Demand forecast by category
- Category-wise filtering
- Seasonal trend analysis
- AI recommendations for stock adjustments

### 5. Smart Procurement
- Budget-aware purchasing
- Cash reserve management
- Reorder quantity calculations
- Supplier comparison
- Cost-benefit analysis

### 6. AI Copilot
- Conversational business assistant
- Handles questions about sales, inventory, pricing
- Multi-language support (English, Hindi, Tamil)
- Voice input ready (browser-dependent)
- Suggested questions for guidance

## 🧪 Financial Calculations

### Margin Calculation
```
Margin % = ((Price - Cost) / Price) × 100
```

### Profit Calculation
```
Profit = Revenue - Total Costs
```

### Reorder Quantity
```
Reorder Qty = (Forecast Demand × Lead Time) + Safety Stock
```

### Business Health Score
```
Score = (Sales Trend × 0.25) + (Profit Margin × 0.25) + 
         (Inventory Health × 0.2) + (Cash Flow × 0.2) + 
         (Task Completion × 0.1)
```

## 📊 Data Models

### Core Entities
- **Merchant** - Business owner profile
- **Product** - SKU, price, cost, stock levels
- **Inventory** - Stock tracking per product
- **Transaction** - Sales record with items and payment
- **AITask** - Daily profit improvement recommendations
- **Procurement** - Purchase planning
- **Experiment** - Growth campaign testing

All data is stored in **Zustand store** with local persistence.

## 🔐 Security & Privacy

- ✅ No external API calls in demo mode
- ✅ All data stays local (browser storage)
- ✅ No real payment processing
- ✅ No sensitive merchant data
- ✅ HTTPS-ready when deployed
- ✅ Input validation on all forms

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## 📦 PWA Installation

1. Open VyaparIQ in supported browser
2. Click "Install App" or use three-dot menu
3. Select "Install" or "Add to Home Screen"
4. App installs with offline capability

## 🧮 Key Utilities

### Price Formatting
```typescript
formatCurrency(45000) // ₹45,000
```

### Business Metrics
```typescript
calculateMargin(499, 250) // 50%
calculateReorderQuantity(100, 3, 20) // Reorder Qty
shouldReorder(stock, level, demand) // Boolean
```

### UI Helpers
```typescript
getTimeBasedGreeting() // "Good Morning"
getLast7Days() // Array of dates
generateChartData() // Randomized revenue data
```

## 📝 Demo Workflow

1. Select a merchant on landing page
2. View dashboard with today's metrics
3. Process a sale through Smart POS
4. Review Business Twin scenarios
5. Check daily AI tasks
6. Explore Neighbourhood Pulse signals
7. Plan procurement
8. Test growth experiments
9. Chat with AI Copilot

## 🔄 State Management

Using **Zustand** for:
- Merchant selection
- Cart management
- Transaction history
- Product inventory
- AI tasks
- Procurement planning

All state persists to localStorage with key: `vyapariq-store`

## ⚡ Performance Optimizations

- ✅ Code splitting with Next.js
- ✅ Image optimization
- ✅ CSS-in-JS with Tailwind
- ✅ Lazy component loading
- ✅ Memoized calculations
- ✅ Optimized re-renders

## 🤝 Contributing

This is a hackathon project. Feel free to extend with:
- Backend FastAPI integration
- Real Paytm payment API
- PostgreSQL database
- Enhanced ML models
- Multi-language support
- Offline-first architecture

## 📄 License

MIT - Feel free to use and modify for your projects.

## 🙏 Acknowledgments

- Designed for Paytm's merchant ecosystem
- Inspired by modern fintech applications
- Built with ❤️ for Indian small merchants

---

**VyaparIQ** - Empowering merchants with AI 🚀

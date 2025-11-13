# 👨‍💻 FarmAid AI - Developer Guide

This guide covers development practices, architecture patterns, and best practices for FarmAid AI.

## 🏗️ Architecture Overview

### Folder Organization

```
app/                    - Pages and routing (Next.js App Router)
├── (routes)/           - Page layouts and pages
├── layout.tsx          - Root layout
├── globals.css         - Global styles
└── favicon.ico

components/             - Reusable UI components
├── ui/                 - Basic UI components
└── features/           - Feature-specific components

hooks/                  - Custom React hooks
├── useTranslation.ts  - i18n hook
├── useUpload.ts       - Upload logic
└── useFetchData.ts    - Data fetching

services/              - External services
├── api.ts             - API client
└── auth.ts            - Authentication

store/                 - Global state
└── useAppStore.ts    - Zustand store

utils/                 - Utilities
├── translations.ts    - i18n strings
├── helpers.ts         - Helper functions
└── constants.ts       - Constants
```

## 🎯 Development Patterns

### 1. Server Components (Default)

```typescript
// app/page.tsx - Server component by default
export default function HomePage() {
  // No 'use client' directive
  // Can directly access database, environment variables
  return <div>Server Component</div>
}
```

### 2. Client Components (Interactive)

```typescript
// components/Counter.tsx - Client component
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

### 3. API Routes (Backend)

```typescript
// app/api/endpoint/route.ts
export async function POST(request: Request) {
  const body = await request.json()
  return Response.json({ message: 'Success' })
}
```

## 📦 State Management with Zustand

### Store Definition

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  // State
  language: string
  isLoading: boolean
  
  // Actions
  setLanguage: (lang: string) => void
  setIsLoading: (loading: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'en',
      isLoading: false,
      
      setLanguage: (lang) => set({ language: lang }),
      setIsLoading: (loading) => set({ isLoading: loading }),
    }),
    { name: 'app-store' }
  )
)
```

### Using Store in Component

```typescript
'use client'

import { useAppStore } from '@/store/useAppStore'

export function MyComponent() {
  const { language, setLanguage } = useAppStore()
  
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      <option value="en">English</option>
      <option value="ig">Igbo</option>
    </select>
  )
}
```

## 🌍 Internationalization (i18n)

### Translation Keys Structure

```typescript
const translations = {
  en: {
    nav: {
      home: 'Home',
      upload: 'Upload',
    },
    home: {
      title: 'Welcome',
      subtitle: 'Subtitle text',
    },
  },
}
```

### Using Translations

```typescript
'use client'

import { useTranslation } from '@/hooks/useTranslation'

export function MyComponent() {
  const { t } = useTranslation()
  
  return (
    <>
      <h1>{t('home.title')}</h1>
      <p>{t('home.subtitle')}</p>
    </>
  )
}
```

## 🔌 API Integration

### API Client Pattern

```typescript
// services/api.ts
import axios, { AxiosInstance } from 'axios'

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    })
  }

  async predict(file: File) {
    const formData = new FormData()
    formData.append('image', file)
    return this.api.post('/predict', formData)
  }
}

export const apiService = new ApiService()
```

### Using API in Component

```typescript
'use client'

import { useState } from 'react'
import { apiService } from '@/services/api'

export function UploadComponent() {
  const [loading, setLoading] = useState(false)

  const handleUpload = async (file: File) => {
    setLoading(true)
    try {
      const result = await apiService.predict(file)
      console.log('Success:', result)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return <button onClick={() => handleUpload(file)}>Upload</button>
}
```

## 🎨 Component Patterns

### Functional Component

```typescript
'use client'

interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-primary"
    >
      {label}
    </button>
  )
}
```

### Component with Hooks

```typescript
'use client'

import { useState, useEffect } from 'react'

export function DataComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data')
        setData(await response.json())
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>
  return <div>{JSON.stringify(data)}</div>
}
```

## 🎬 Animation Patterns with Framer Motion

### Basic Animation

```typescript
'use client'

import { motion } from 'framer-motion'

export function AnimatedBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Animated content
    </motion.div>
  )
}
```

### Variant-Based Animation

```typescript
'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function AnimatedList({ items }: { items: string[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item) => (
        <motion.div key={item} variants={itemVariants}>
          {item}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

## 🎯 Best Practices

### 1. Component Organization

- Keep components focused (single responsibility)
- Extract reusable logic into hooks
- Use TypeScript for type safety
- Name components descriptively

### 2. File Naming

```
components/
├── Button.tsx         // Component
├── Button.test.tsx    // Test file
└── Button.module.css  // Styles (if needed)
```

### 3. Imports

```typescript
// Good - absolute imports
import { useAppStore } from '@/store/useAppStore'
import { Button } from '@/components/Button'

// Avoid - relative imports
import { useAppStore } from '../../../store/useAppStore'
```

### 4. Error Handling

```typescript
try {
  const result = await apiService.predict(file)
  // Handle success
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  setError(message)
}
```

### 5. Type Safety

```typescript
// Use interfaces for props
interface ComponentProps {
  title: string
  onClick: () => void
  disabled?: boolean
}

// Use discriminated unions for complex state
type FormState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: any }
  | { status: 'error'; message: string }
```

## 📝 Adding New Features

### 1. New Page

```bash
# Create folder structure
mkdir app/newpage

# Create page.tsx
touch app/newpage/page.tsx
```

```typescript
// app/newpage/page.tsx
'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useTranslation } from '@/hooks/useTranslation'

export default function NewPage() {
  const { t } = useTranslation()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '3rem 1rem' }}>
        <div className="container-safe">
          <h1 className="section-title">{t('newpage.title')}</h1>
        </div>
      </main>
      <Footer />
    </div>
  )
}
```

### 2. New Component

```typescript
// components/MyComponent.tsx
'use client'

import { motion } from 'framer-motion'

interface MyComponentProps {
  title: string
  children?: React.ReactNode
}

export function MyComponent({ title, children }: MyComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <h2 className="section-title">{title}</h2>
      {children}
    </motion.div>
  )
}
```

### 3. New API Endpoint

```typescript
// services/api.ts
async getNewData() {
  try {
    const response = await this.api.get('/new-endpoint')
    return response.data.data
  } catch (error) {
    throw this.handleError(error)
  }
}
```

## 🧪 Testing

### Component Testing (Jest + React Testing Library)

```typescript
// components/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = jest.fn()
    render(<Button label="Click" onClick={onClick} />)
    screen.getByText('Click').click()
    expect(onClick).toHaveBeenCalled()
  })
})
```

## 📊 Performance Tips

1. **Image Optimization**
   ```typescript
   import Image from 'next/image'
   
   <Image src="/image.jpg" alt="Description" width={400} height={300} />
   ```

2. **Code Splitting**
   ```typescript
   const Component = dynamic(() => import('@/components/Heavy'))
   ```

3. **Memoization**
   ```typescript
   const MemoComponent = React.memo(Component)
   ```

4. **Lazy Loading**
   ```typescript
   <motion.div whileInView={{ opacity: 1 }} viewport={{ once: true }} />
   ```

## 🔒 Security Practices

1. **Validate Input**
   - Validate file types
   - Check file sizes
   - Sanitize user input

2. **Environment Variables**
   - Use `.env.local` for secrets
   - Never commit `.env` files
   - Prefix public vars with `NEXT_PUBLIC_`

3. **CORS Configuration**
   - Configure API CORS properly
   - Use secure headers

4. **Authentication**
   - Store tokens securely
   - Implement proper session management

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 🤝 Code Review Checklist

- [ ] TypeScript types are correct
- [ ] Components are properly documented
- [ ] No console errors/warnings
- [ ] Responsive design tested
- [ ] Accessibility considerations
- [ ] Performance is optimized
- [ ] Error handling is present
- [ ] Translations are complete

---

**Happy Development! 🚀**

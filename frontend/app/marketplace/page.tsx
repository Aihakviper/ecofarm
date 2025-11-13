'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ProductCard } from '@/components/ProductCard'
import { Loader } from '@/components/Loader'
import { useTranslation } from '@/hooks/useTranslation'
import { apiService, Product } from '@/services/api'
import { Search } from 'lucide-react'

export default function MarketplacePage() {
  const { t } = useTranslation()
  
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const data = await apiService.getProducts()
        setProducts(data)
        setFilteredProducts(data)
      } catch (err) {
        console.error('Failed to fetch products:', err)
        // Mock data for demo
        const mockProducts: Product[] = [
          {
            id: '1',
            name: 'Fungicide Spray',
            description: 'Effective fungicide for treating various crop diseases',
            price: 5000,
            type: 'fungicide',
            rating: 4.5,
          },
          {
            id: '2',
            name: 'Disease Prevention Kit',
            description: 'Complete kit for preventing crop diseases',
            price: 12000,
            type: 'prevention',
            rating: 4.8,
          },
          {
            id: '3',
            name: 'Soil Nutrient Mix',
            description: 'Enriches soil and strengthens plant immunity',
            price: 8000,
            type: 'fertilizer',
            rating: 4.6,
          },
          {
            id: '4',
            name: 'Pesticide Solution',
            description: 'Organic pesticide for crop protection',
            price: 6500,
            type: 'pesticide',
            rating: 4.4,
          },
        ]
        setProducts(mockProducts)
        setFilteredProducts(mockProducts)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleFilter = (type: string) => {
    setSelectedType(type)
    if (type === 'all') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter((p) => p.type === type))
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = products.filter(
      (p) =>
        (selectedType === 'all' || p.type === selectedType) &&
        (p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()))
    )
    setFilteredProducts(filtered)
  }

  const handleBuy = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      // In a real app, this would redirect to payment or vendor
      alert(`Redirecting to purchase: ${product.name}`)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '3rem 1rem' }}>
        <div className="container-safe">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '2rem' }}
          >
            <Link href="/result">
              <button className="btn-outline" style={{ marginBottom: '1rem' }}>
                ← Back to Result
              </button>
            </Link>
            <h1 className="section-title">{t('marketplace.title')}</h1>
            <p className="section-subtitle">Browse recommended treatments and products</p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              marginBottom: '2rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            {/* Search Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                border: '2px solid rgb(209, 213, 219)',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
              }}
            >
              <Search size={20} style={{ color: 'rgb(107, 114, 128)' }} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '1rem',
                }}
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => handleFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Types</option>
              <option value="fungicide">Fungicide</option>
              <option value="pesticide">Pesticide</option>
              <option value="fertilizer">Fertilizer</option>
              <option value="prevention">Prevention</option>
            </select>
          </motion.div>

          {/* Products Grid */}
          {isLoading ? (
            <Loader message="Loading products..." size="lg" />
          ) : filteredProducts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '2rem',
              }}
            >
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <ProductCard
                    {...product}
                    onBuy={handleBuy}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div
              style={{
                padding: '3rem',
                textAlign: 'center',
                backgroundColor: 'rgb(244, 246, 248)',
                borderRadius: '1rem',
              }}
            >
              <p style={{ color: 'rgb(107, 114, 128)', fontSize: '1.125rem' }}>
                No products found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

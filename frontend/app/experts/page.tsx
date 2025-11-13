'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ExpertCard } from '@/components/ExpertCard'
import { Loader } from '@/components/Loader'
import { useTranslation } from '@/hooks/useTranslation'
import { apiService, Expert } from '@/services/api'
import { MapPin, Search } from 'lucide-react'

export default function ExpertsPage() {
  const { t } = useTranslation()
  
  const [experts, setExperts] = useState<Expert[]>([])
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<string>('all')

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setIsLoading(true)
        const data = await apiService.getExperts()
        setExperts(data)
        setFilteredExperts(data)
      } catch (err) {
        console.error('Failed to fetch experts:', err)
        // Mock data for demo
        const mockExperts: Expert[] = [
          {
            id: '1',
            name: 'Dr. Eze Chisom',
            specialty: 'Veterinarian',
            location: 'Lagos',
            whatsapp: '+2348012345678',
            email: 'dr.chisom@expert.ng',
            rating: 4.9,
            experience: 12,
          },
          {
            id: '2',
            name: 'Prof. Adeyemi Okafor',
            specialty: 'Crop Agronomist',
            location: 'Ibadan',
            whatsapp: '+2348023456789',
            email: 'prof.okafor@agro.ng',
            rating: 4.8,
            experience: 15,
          },
          {
            id: '3',
            name: 'Mama Zainab Ali',
            specialty: 'Livestock Expert',
            location: 'Kano',
            whatsapp: '+2348034567890',
            email: 'mama.zainab@livestock.ng',
            rating: 4.7,
            experience: 10,
          },
          {
            id: '4',
            name: 'Engr. Chukwu Emmanuel',
            specialty: 'Agricultural Engineer',
            location: 'Enugu',
            whatsapp: '+2348045678901',
            email: 'engr.chukwu@agrieng.ng',
            rating: 4.6,
            experience: 8,
          },
          {
            id: '5',
            name: 'Dr. Fatima Hassan',
            specialty: 'Plant Pathologist',
            location: 'Katsina',
            whatsapp: '+2348056789012',
            email: 'dr.fatima@pathology.ng',
            rating: 4.9,
            experience: 11,
          },
          {
            id: '6',
            name: 'Chief Kwame Asante',
            specialty: 'Cooperative Manager',
            location: 'Lagos',
            whatsapp: '+2348067890123',
            email: 'chief.kwame@coop.ng',
            rating: 4.5,
            experience: 20,
          },
        ]
        setExperts(mockExperts)
        setFilteredExperts(mockExperts)
      } finally {
        setIsLoading(false)
      }
    }

    fetchExperts()
  }, [])

  const handleFilter = (location: string) => {
    setSelectedLocation(location)
    if (location === 'all') {
      setFilteredExperts(experts)
    } else {
      setFilteredExperts(experts.filter((e) => e.location === location))
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = experts.filter(
      (e) =>
        (selectedLocation === 'all' || e.location === selectedLocation) &&
        (e.name.toLowerCase().includes(query.toLowerCase()) ||
          e.specialty.toLowerCase().includes(query.toLowerCase()))
    )
    setFilteredExperts(filtered)
  }

  const locations = Array.from(new Set(experts.map((e) => e.location)))

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
            <h1 className="section-title">{t('experts.title')}</h1>
            <p className="section-subtitle">{t('experts.subtitle')}</p>
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
                placeholder="Search by name or specialty..."
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

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => handleFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Experts Grid */}
          {isLoading ? (
            <Loader message="Loading experts..." size="lg" />
          ) : filteredExperts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem',
              }}
            >
              {filteredExperts.map((expert, idx) => (
                <motion.div
                  key={expert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <ExpertCard {...expert} />
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
              <p style={{ color: 'rgb(107, 114, 128)', fontSize: '1.125rem', marginBottom: '1rem' }}>
                {t('experts.noneFound')}
              </p>
              <p style={{ color: 'rgb(107, 114, 128)', fontSize: '0.95rem' }}>
                Try searching by name, specialty, or selecting a different location.
              </p>
            </div>
          )}

          {/* Support Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              marginTop: '4rem',
              padding: '2rem',
              backgroundColor: 'linear-gradient(135deg, rgb(46, 125, 50) 0%, rgb(21, 101, 192) 100%)',
              backgroundImage: 'linear-gradient(135deg, rgb(46, 125, 50) 0%, rgb(21, 101, 192) 100%)',
              borderRadius: '1rem',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Need Immediate Help?
            </h3>
            <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
              Call our support line for urgent assistance
            </p>
            <a
              href="tel:+234800000000"
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                backgroundColor: 'rgb(253, 216, 53)',
                color: 'rgb(26, 26, 26)',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(251, 192, 45)'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(253, 216, 53)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              📞 +234 (800) 000-0000
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

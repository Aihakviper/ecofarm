'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { useAppStore } from '@/store/useAppStore'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const { t } = useTranslation()
  const { language, setLanguage } = useAppStore()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav
      style={{
        backgroundColor: 'rgb(46, 125, 50)',
        color: 'white',
        padding: '1rem 0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <div className="container-safe">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>
            🌾 FarmAid AI
          </Link>

          {/* Desktop Menu */}
          <div style={{ display: 'none' }}>
            <style>{`
              @media (min-width: 768px) {
                [data-desktop-menu] {
                  display: flex !important;
                }
              }
            `}</style>
          </div>
          <div
            data-desktop-menu
            style={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
              {t('nav.home')}
            </Link>
            <Link href="/upload" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
              {t('nav.upload')}
            </Link>
            <Link href="/marketplace" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
              {t('nav.marketplace')}
            </Link>
            <Link href="/experts" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
              {t('nav.experts')}
            </Link>

            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              <option value="en">English</option>
              <option value="ig">Igbo</option>
              <option value="ha">Hausa</option>
              <option value="yo">Yoruba</option>
            </select>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
            data-mobile-button
          >
            <style>{`
              @media (max-width: 767px) {
                [data-mobile-button] {
                  display: block !important;
                }
                [data-desktop-menu] {
                  display: none !important;
                }
              }
            `}</style>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
              {t('nav.home')}
            </Link>
            <Link href="/upload" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
              {t('nav.upload')}
            </Link>
            <Link href="/marketplace" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
              {t('nav.marketplace')}
            </Link>
            <Link href="/experts" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
              {t('nav.experts')}
            </Link>
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value)
                setIsOpen(false)
              }}
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              <option value="en">English</option>
              <option value="ig">Igbo</option>
              <option value="ha">Hausa</option>
              <option value="yo">Yoruba</option>
            </select>
          </div>
        )}
      </div>
    </nav>
  )
}

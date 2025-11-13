'use client'

import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer
      style={{
        backgroundColor: 'rgb(26, 26, 26)',
        color: 'white',
        padding: '3rem 0 1rem',
        marginTop: '4rem',
      }}
    >
      <div className="container-safe">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem',
          }}
        >
          {/* Brand */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              🌾 FarmAid AI
            </h3>
            <p style={{ color: 'rgb(209, 213, 219)', lineHeight: '1.6' }}>
              Advanced AI system for early detection and diagnosis of crop and livestock diseases.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>{t('nav.home')}</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="/" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>
                  {t('nav.home')}
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="/upload" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>
                  {t('nav.upload')}
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="/marketplace" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>
                  {t('nav.marketplace')}
                </Link>
              </li>
              <li>
                <Link href="/experts" style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none' }}>
                  {t('nav.experts')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a
                href="mailto:support@farmaidai.com"
                style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Mail size={18} />
                support@farmaidai.com
              </a>
              <a
                href="tel:+234800000000"
                style={{ color: 'rgb(209, 213, 219)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Phone size={18} />
                +234 (800) 000-0000
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Follow Us</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'rgb(209, 213, 219)', display: 'flex', alignItems: 'center' }}>
                <Facebook size={20} />
              </a>
              <a href="#" style={{ color: 'rgb(209, 213, 219)', display: 'flex', alignItems: 'center' }}>
                <Twitter size={20} />
              </a>
              <a href="#" style={{ color: 'rgb(209, 213, 219)', display: 'flex', alignItems: 'center' }}>
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgb(55, 65, 81)', paddingTop: '1rem', marginTop: '1rem' }}>
          <p style={{ textAlign: 'center', color: 'rgb(107, 114, 128)', fontSize: '0.875rem' }}>
            © 2024 FarmAid AI. All rights reserved. | Helping farmers, growing futures.
          </p>
        </div>
      </div>
    </footer>
  )
}



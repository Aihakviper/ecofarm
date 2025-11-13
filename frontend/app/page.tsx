'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useTranslation } from '@/hooks/useTranslation'
import { Leaf, Zap, TrendingUp } from 'lucide-react'
import type { Variants } from 'framer-motion'

export default function HomePage() {
  const { t } = useTranslation()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section
          style={{
            background: 'linear-gradient(135deg, rgb(46, 125, 50) 0%, rgb(21, 101, 192) 100%)',
            color: 'white',
            padding: '5rem 1rem',
            textAlign: 'center',
          }}
        >
          <div className="container-safe">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ marginBottom: '2rem' }}
            >
              <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: '1.2' }}>
                {t('home.title')}
              </h1>
              <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', margin: '0 auto 2rem' }}>
                {t('home.subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Link href="/upload">
                <button className="btn-cta">
                  🚀 {t('home.cta')}
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section style={{ padding: '4rem 1rem', backgroundColor: 'rgb(244, 246, 248)' }}>
          <div className="container-safe">
            <div className="section-header" style={{ textAlign: 'center' }}>
              <h2 className="section-title">{t('home.howItWorks')}</h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                marginTop: '3rem',
              }}
            >
              {[
                { icon: Leaf, title: t('home.step1'), desc: t('home.step1Desc'), num: '1' },
                { icon: Zap, title: t('home.step2'), desc: t('home.step2Desc'), num: '2' },
                { icon: TrendingUp, title: t('home.step3'), desc: t('home.step3Desc'), num: '3' },
              ].map((step, idx) => (
                <motion.div key={idx} variants={itemVariants} className="card">
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: 'rgb(46, 125, 50)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    {step.num}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'rgb(26, 26, 26)' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'rgb(107, 114, 128)', lineHeight: '1.6' }}>
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section style={{ padding: '4rem 1rem' }}>
          <div className="container-safe">
            <div className="section-header" style={{ textAlign: 'center' }}>
              <h2 className="section-title">Why Choose FarmAid AI?</h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                marginTop: '3rem',
              }}
            >
              {[
                { title: 'AI-Powered Accuracy', desc: 'Advanced machine learning models trained on thousands of disease samples' },
                { title: 'Multi-Language Support', desc: 'Available in English, Igbo, Hausa, and Yoruba for local farmers' },
                { title: 'Expert Connection', desc: 'Direct access to certified veterinarians and agronomists' },
                { title: 'Marketplace Integration', desc: 'Buy recommended treatments directly from verified vendors' },
                { title: 'Mobile Friendly', desc: 'Works seamlessly on smartphones and tablets' },
                { title: 'Offline Ready', desc: 'Access key features even without internet connection' },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="card"
                  style={{
                    borderTop: '4px solid rgb(21, 101, 192)',
                  }}
                >
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'rgb(26, 26, 26)' }}>
                    ✨ {feature.title}
                  </h3>
                  <p style={{ color: 'rgb(107, 114, 128)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{ padding: '4rem 1rem', backgroundColor: 'rgb(244, 246, 248)' }}>
          <div className="container-safe">
            <div className="section-header" style={{ textAlign: 'center' }}>
              <h2 className="section-title">Success Stories</h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                marginTop: '3rem',
              }}
            >
              {[
                { name: 'Chioma, Imo State', quote: 'FarmAid AI saved my cassava farm from disease. Highly recommend!' },
                { name: 'Ahmed, Kano State', quote: 'Quick diagnosis and expert support. This platform is a game-changer.' },
                { name: 'Kolade, Oyo State', quote: 'Easy to use and affordable. My yields improved significantly.' },
              ].map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '1rem',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    borderLeft: '4px solid rgb(46, 125, 50)',
                  }}
                >
                  <p style={{ fontSize: '1rem', marginBottom: '1rem', color: 'rgb(26, 26, 26)', fontStyle: 'italic' }}>
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <p style={{ fontWeight: '600', color: 'rgb(75, 85, 99)' }}>
                    - {testimonial.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            background: 'linear-gradient(135deg, rgb(21, 101, 192) 0%, rgb(46, 125, 50) 100%)',
            color: 'white',
            padding: '4rem 1rem',
            textAlign: 'center',
          }}
        >
          <div className="container-safe">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Ready to Protect Your Farm?
              </h2>
              <p style={{ fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                Start diagnosing your crops and livestock today. Get expert advice in minutes.
              </p>
              <Link href="/upload">
                <button className="btn-cta" style={{ marginTop: '1rem' }}>
                  🚀 {t('home.cta')}
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

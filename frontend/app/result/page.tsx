'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ResultCard } from '@/components/ResultCard'
import { ImagePreview } from '@/components/ImagePreview'
import { useTranslation } from '@/hooks/useTranslation'
import { useAppStore } from '@/store/useAppStore'
import { apiService } from '@/services/api'
import { CheckCircle } from 'lucide-react'

export default function ResultPage() {
  const { t } = useTranslation()
  const { diagnosisResult, uploadedImage } = useAppStore()
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)

  if (!diagnosisResult) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, padding: '3rem 1rem', textAlign: 'center' }}>
          <div className="container-safe">
            <p style={{ color: 'rgb(107, 114, 128)', marginBottom: '1.5rem' }}>
              No diagnosis result found. Please upload an image first.
            </p>
            <Link href="/upload">
              <button className="btn-primary">← Go to Upload</button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleFeedback = async (helpful: boolean) => {
    setIsSubmittingFeedback(true)
    try {
      // In a real app, you'd have a diagnosis ID
      await apiService.submitFeedback('diagnosis-id', helpful, '')
      setFeedbackSubmitted(true)
      setTimeout(() => setFeedbackSubmitted(false), 3000)
    } catch (err) {
      console.error('Failed to submit feedback:', err)
    } finally {
      setIsSubmittingFeedback(false)
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
            <Link href="/upload">
              <button className="btn-outline" style={{ marginBottom: '1rem' }}>
                ← Upload Another Image
              </button>
            </Link>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem',
            }}
          >
            {/* Image Preview */}
            {uploadedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: 'rgb(26, 26, 26)' }}>
                  Uploaded Image
                </h2>
                <ImagePreview imageUrl={uploadedImage} />
              </motion.div>
            )}

            {/* Disease Result */}
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: 'rgb(26, 26, 26)' }}>
                AI Analysis
              </h2>
              <ResultCard
                disease={diagnosisResult.disease}
                confidence={diagnosisResult.confidence}
                description="Based on our advanced AI model trained on thousands of disease samples"
              />
            </div>
          </motion.div>

          {/* Recommendations */}
          {diagnosisResult.recommendations && diagnosisResult.recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ marginBottom: '3rem' }}
            >
              <h2 className="section-title">{t('result.recommendations')}</h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {diagnosisResult.recommendations.map((rec, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="card"
                  >
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'rgb(46, 125, 50)' }}>
                      {rec.title}
                    </h3>
                    <p style={{ color: 'rgb(107, 114, 128)', marginBottom: '1rem', lineHeight: '1.6' }}>
                      {rec.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {rec.products && rec.products.map((product, pidx) => (
                        <span
                          key={pidx}
                          className="badge-info"
                          style={{ backgroundColor: 'rgb(227, 242, 253)', color: 'rgb(21, 101, 192)' }}
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '3rem',
            }}
          >
            <Link href="/marketplace">
              <button className="btn-primary" style={{ width: '100%' }}>
                🛒 {t('result.buyNow')}
              </button>
            </Link>
            <Link href="/experts">
              <button className="btn-secondary" style={{ width: '100%' }}>
                👩🏾‍⚕️ {t('result.contactExpert')}
              </button>
            </Link>
          </motion.div>

          {/* Feedback Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              padding: '2rem',
              backgroundColor: 'rgb(244, 246, 248)',
              borderRadius: '1rem',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: 'rgb(26, 26, 26)' }}>
              {t('result.feedback')}
            </h3>

            {feedbackSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  color: 'rgb(46, 125, 50)',
                }}
              >
                <CheckCircle size={20} />
                <span>{t('result.thankYou')}</span>
              </motion.div>
            ) : (
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  onClick={() => handleFeedback(true)}
                  disabled={isSubmittingFeedback}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'rgb(46, 125, 50)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                    opacity: isSubmittingFeedback ? 0.5 : 1,
                  }}
                >
                  👍 {t('result.yes')}
                </button>
                <button
                  onClick={() => handleFeedback(false)}
                  disabled={isSubmittingFeedback}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'rgb(198, 40, 40)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                    opacity: isSubmittingFeedback ? 0.5 : 1,
                  }}
                >
                  👎 {t('result.no')}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

interface ResultCardProps {
  disease: string
  confidence: number
  description?: string
}

export function ResultCard({ disease, confidence, description }: ResultCardProps) {
  const { t } = useTranslation()
  const isConfident = confidence >= 70

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
        borderLeft: `4px solid ${isConfident ? 'rgb(46, 125, 50)' : 'rgb(245, 124, 0)'}`,
      }}
    >
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        {isConfident ? (
          <CheckCircle size={32} style={{ color: 'rgb(46, 125, 50)', flexShrink: 0 }} />
        ) : (
          <AlertCircle size={32} style={{ color: 'rgb(245, 124, 0)', flexShrink: 0 }} />
        )}
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'rgb(26, 26, 26)' }}>
            {t('result.disease')}
          </h2>
          <p style={{ color: 'rgb(107, 114, 128)' }}>AI Analysis Result</p>
        </div>
      </div>

      <div style={{ backgroundColor: 'rgb(244, 246, 248)', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'rgb(107, 114, 128)', marginBottom: '0.5rem' }}>
            Identified Disease
          </p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'rgb(26, 26, 26)' }}>
            {disease}
          </h3>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'rgb(107, 114, 128)' }}>
              {t('result.confidence')}
            </p>
            <p style={{ fontSize: '0.875rem', fontWeight: '700', color: 'rgb(46, 125, 50)' }}>
              {confidence}%
            </p>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: 'rgb(209, 213, 219)', borderRadius: '9999px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                height: '100%',
                backgroundColor: isConfident ? 'rgb(46, 125, 50)' : 'rgb(245, 124, 0)',
              }}
            />
          </div>
        </div>
      </div>

      {description && (
        <div>
          <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'rgb(26, 26, 26)' }}>
            Description
          </h4>
          <p style={{ color: 'rgb(75, 85, 99)', lineHeight: '1.6' }}>
            {description}
          </p>
        </div>
      )}
    </motion.div>
  )
}

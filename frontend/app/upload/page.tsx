'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { UploadBox } from '@/components/UploadBox'
import { ImagePreview } from '@/components/ImagePreview'
import { Loader } from '@/components/Loader'
import { useTranslation } from '@/hooks/useTranslation'
import { useAppStore } from '@/store/useAppStore'
import { apiService } from '@/services/api'

export default function UploadPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { setDiagnosisResult, setIsLoading, setError, isLoading, error } = useAppStore()
  
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileSelect = (file: File) => {
    setImageFile(file)
    setError(null)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setPreview(null)
    setError(null)
  }

  const handleAnalyze = async () => {
    if (!imageFile) {
      setError(t('upload.invalidFile'))
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await apiService.predict({ image: imageFile })
      setDiagnosisResult(result)
      router.push('/result')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to analyze image'
      setError(message)
      setIsLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '3rem 1rem' }}>
        <div className="container-safe">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '3rem', textAlign: 'center' }}
          >
            <h1 className="section-title">{t('upload.title')}</h1>
            <p className="section-subtitle">{t('upload.subtitle')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              alignItems: 'start',
            }}
          >
            {/* Upload Section */}
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'rgb(26, 26, 26)' }}>
                📸 {t('upload.dragDrop')}
              </h2>
              <UploadBox
                onFileSelect={handleFileSelect}
                isLoading={isLoading}
                error={error}
              />
            </div>

            {/* Preview Section */}
            {preview && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'rgb(26, 26, 26)' }}>
                  👁️ Preview
                </h2>
                <ImagePreview imageUrl={preview} onRemove={handleRemoveImage} />
              </motion.div>
            )}
          </motion.div>

          {/* Loader State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ marginTop: '3rem' }}
            >
              <Loader message={t('upload.processing')} size="lg" />
            </motion.div>
          )}

          {/* Action Buttons */}
          {!isLoading && preview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <button onClick={handleRemoveImage} className="btn-outline">
                ❌ Remove Image
              </button>
              <button onClick={handleAnalyze} className="btn-primary" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                ⚡ {t('upload.analyze')}
              </button>
            </motion.div>
          )}

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              marginTop: '4rem',
              padding: '2rem',
              backgroundColor: 'rgb(227, 242, 253)',
              borderRadius: '1rem',
              borderLeft: '4px solid rgb(21, 101, 192)',
            }}
          >
            <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'rgb(21, 101, 192)' }}>
              💡 Tips for Best Results
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, color: 'rgb(75, 85, 99)' }}>
              <li style={{ marginBottom: '0.5rem' }}>✓ Use clear, well-lit images</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Focus on the affected area</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Ensure the entire plant/animal is visible</li>
              <li>✓ Avoid shadows and reflections</li>
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

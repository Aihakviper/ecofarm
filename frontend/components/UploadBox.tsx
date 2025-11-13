'use client'

import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

interface UploadBoxProps {
  onFileSelect: (file: File) => void
  isLoading?: boolean
  error?: string | null
}

export function UploadBox({ onFileSelect, isLoading = false, error = null }: UploadBoxProps) {
  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.type.startsWith('image/')) {
        onFileSelect(file)
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      onFileSelect(files[0])
    }
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      style={{
        padding: '3rem',
        border: '2px dashed rgb(21, 101, 192)',
        borderRadius: '1rem',
        backgroundColor: isDragging ? 'rgba(21, 101, 192, 0.05)' : 'rgba(21, 101, 192, 0.02)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textAlign: 'center',
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        style={{ display: 'none' }}
        disabled={isLoading}
      />

      <Upload size={48} style={{ margin: '0 auto 1rem', color: 'rgb(21, 101, 192)' }} />

      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'rgb(26, 26, 26)' }}>
        {t('upload.dragDrop')}
      </h3>
      <p style={{ color: 'rgb(107, 114, 128)', marginBottom: '1rem' }}>
        {t('upload.or')} <span style={{ fontWeight: 'bold', color: 'rgb(21, 101, 192)' }}>{t('upload.clickHere')}</span>
      </p>

      {error && (
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: 'rgb(253, 230, 230)',
            color: 'rgb(198, 40, 40)',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
          }}
        >
          {error}
        </div>
      )}
    </div>
  )
}

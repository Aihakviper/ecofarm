'use client'

import Image from 'next/image'
import { X } from 'lucide-react'

interface ImagePreviewProps {
  imageUrl: string
  onRemove?: () => void
}

export function ImagePreview({ imageUrl, onRemove }: ImagePreviewProps) {
  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '400px',
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Image
          src={imageUrl}
          alt="Preview"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgb(198, 40, 40)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <X size={20} />
        </button>
      )}
    </div>
  )
}

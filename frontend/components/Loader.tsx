'use client'

import { motion } from 'framer-motion'

interface LoaderProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Loader({ message = 'Loading...', size = 'md' }: LoaderProps) {
  const sizeMap = {
    sm: 30,
    md: 50,
    lg: 80,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', minHeight: '200px' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          border: '4px solid rgb(209, 213, 219)',
          borderTop: '4px solid rgb(46, 125, 50)',
          borderRadius: '50%',
        }}
      />
      {message && <p style={{ color: 'rgb(107, 114, 128)', fontWeight: '500' }}>{message}</p>}
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShoppingCart, Star } from 'lucide-react'

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  image?: string
  rating?: number
  type: string
  onBuy?: (id: string) => void
}

export function ProductCard({
  id,
  name,
  description,
  price,
  image,
  rating = 4.5,
  type,
  onBuy,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
      }}
    >
      {image && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '200px',
            backgroundColor: 'rgb(244, 246, 248)',
          }}
        >
          <Image
            src={image}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              top: '0.75rem',
              right: '0.75rem',
              backgroundColor: 'rgb(253, 216, 53)',
              color: 'rgb(26, 26, 26)',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '600',
              textTransform: 'capitalize',
            }}
          >
            {type}
          </div>
        </div>
      )}

      <div style={{ padding: '1.5rem' }}>
        <h3
          style={{
            fontSize: '1.125rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: 'rgb(26, 26, 26)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </h3>

        <p
          style={{
            color: 'rgb(107, 114, 128)',
            fontSize: '0.875rem',
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </p>

        {rating && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                style={{
                  fill: i < Math.floor(rating) ? 'rgb(253, 216, 53)' : 'rgb(209, 213, 219)',
                  color: i < Math.floor(rating) ? 'rgb(253, 216, 53)' : 'rgb(209, 213, 219)',
                }}
              />
            ))}
            <span style={{ fontSize: '0.875rem', color: 'rgb(107, 114, 128)', marginLeft: '0.5rem' }}>
              {rating}
            </span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'rgb(46, 125, 50)' }}>
            ₦{price.toLocaleString()}
          </p>
          <button
            onClick={() => onBuy?.(id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: 'rgb(46, 125, 50)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgb(27, 94, 32)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgb(46, 125, 50)')}
          >
            <ShoppingCart size={18} />
            Buy
          </button>
        </div>
      </div>
    </motion.div>
  )
}

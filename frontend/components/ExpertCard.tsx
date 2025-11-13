'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Mail, MapPin, Star } from 'lucide-react'

interface ExpertCardProps {
  name: string
  specialty: string
  location: string
  whatsapp?: string
  email?: string
  rating?: number
  experience?: number
}

export function ExpertCard({
  name,
  specialty,
  location,
  whatsapp,
  email,
  rating = 4.8,
  experience = 5,
}: ExpertCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
        textAlign: 'center',
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 1rem',
          borderRadius: '50%',
          backgroundColor: 'rgb(21, 101, 192)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        {name.charAt(0)}
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'rgb(26, 26, 26)' }}>
        {name}
      </h3>

      <p style={{ color: 'rgb(46, 125, 50)', fontWeight: '600', marginBottom: '0.75rem' }}>
        {specialty}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'rgb(107, 114, 128)', fontSize: '0.875rem' }}>
        <MapPin size={16} />
        {location}
      </div>

      {/* Rating and Experience */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1.5rem',
          padding: '1rem',
          backgroundColor: 'rgb(244, 246, 248)',
          borderRadius: '0.5rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                style={{
                  fill: i < Math.floor(rating) ? 'rgb(253, 216, 53)' : 'rgb(209, 213, 219)',
                  color: i < Math.floor(rating) ? 'rgb(253, 216, 53)' : 'rgb(209, 213, 219)',
                }}
              />
            ))}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'rgb(107, 114, 128)' }}>
            {rating} Rating
          </p>
        </div>
        <div>
          <p style={{ fontSize: '1rem', fontWeight: 'bold', color: 'rgb(26, 26, 26)', marginBottom: '0.25rem' }}>
            {experience}+
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgb(107, 114, 128)' }}>
            Years Exp.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        {whatsapp && (
          <a
            href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              backgroundColor: 'rgb(46, 125, 50)',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.875rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgb(27, 94, 32)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgb(46, 125, 50)')}
          >
            <MessageCircle size={16} />
            Chat
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              backgroundColor: 'rgb(21, 101, 192)',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.875rem',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgb(13, 71, 161)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgb(21, 101, 192)')}
          >
            <Mail size={16} />
            Email
          </a>
        )}
      </div>
    </motion.div>
  )
}

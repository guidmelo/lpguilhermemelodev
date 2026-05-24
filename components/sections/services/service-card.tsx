'use client'

import { memo, useRef } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

export interface ServiceCardProps {
  icon:      LucideIcon
  title:     string
  desc:      string
  tag:       string
  index:     number
  featured?: boolean
  className?: string
}

/* ── ServiceCard ─────────────────────────────────────────────────────────── *
 *  Premium service tile with:
 *  - Cursor-tracking radial spotlight (direct DOM, no useState, no re-renders)
 *  - Border glow on hover (inline style mutation)
 *  - whileHover subtle lift via Framer Motion
 *  - whileInView staggered scroll entrance
 *  - Top refraction edge + icon container
 * ──────────────────────────────────────────────────────────────────────────*/
export const ServiceCard = memo(function ServiceCard({
  icon: Icon,
  title,
  desc,
  tag,
  index,
  featured = false,
  className = '',
}: ServiceCardProps) {
  const spotRef = useRef<HTMLDivElement>(null)

  /* ── Event handlers — direct DOM, zero React re-renders ────────────────── */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotRef.current) return
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x    = ((e.clientX - rect.left)  / rect.width)  * 100
    const y    = ((e.clientY - rect.top)   / rect.height) * 100
    const r    = featured ? 160 : 130
    spotRef.current.style.background = `radial-gradient(circle ${r}px at ${x}% ${y}%, rgba(255,107,0,0.08), transparent)`
    spotRef.current.style.opacity    = '1'
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLElement
    el.style.borderColor = 'rgba(255,107,0,0.22)'
    el.style.background  = 'rgba(255,107,0,0.025)'
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLElement
    el.style.borderColor = 'rgba(255,255,255,0.06)'
    el.style.background  = 'rgba(255,255,255,0.02)'
    if (spotRef.current) spotRef.current.style.opacity = '0'
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-[14px] cursor-default ${className}`}
      style={{
        background:  'rgba(255,255,255,0.02)',
        border:      '1px solid rgba(255,255,255,0.06)',
        padding:     featured ? '28px 28px 24px' : '22px 22px 20px',
        transition:  'border-color 0.22s ease, background 0.22s ease',
        minHeight:   featured ? '210px' : '190px',
        display:     'flex',
        flexDirection: 'column',
      }}
      initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, delay: 0.06 + index * 0.065, ease: [0.16, 1, 0.3, 1] as const }}
      whileHover={{ y: -3 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cursor-tracking spotlight */}
      <div
        ref={spotRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none rounded-[14px] opacity-0"
        style={{ transition: 'opacity 0.15s ease' }}
      />

      {/* Top edge refraction */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 15%, rgba(255,255,255,0.055) 50%, transparent 85%)',
        }}
      />

      {/* ── Card content ─────────────────────────────── */}
      <div className="relative flex flex-col gap-4 flex-1">

        {/* Icon container */}
        <div
          style={{
            width:          '34px',
            height:         '34px',
            borderRadius:   '8px',
            background:     'rgba(255,107,0,0.08)',
            border:         '1px solid rgba(255,107,0,0.15)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            flexShrink:     0,
          }}
        >
          <Icon size={15} strokeWidth={1.5} color="#FF6B00" aria-hidden />
        </div>

        {/* Title */}
        <p
          style={{
            fontFamily:    "'Satoshi', sans-serif",
            fontSize:      featured ? '15.5px' : '14px',
            fontWeight:    600,
            color:         '#bcbcbc',
            letterSpacing: '-0.01em',
            lineHeight:    1.25,
          }}
        >
          {title}
        </p>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize:   '12.5px',
            color:      '#363636',
            lineHeight: 1.75,
            flexGrow:   1,
          }}
        >
          {desc}
        </p>

        {/* Capability tag */}
        <div style={{ paddingTop: '2px' }}>
          <span
            style={{
              fontFamily:    "'JetBrains Mono', monospace",
              fontSize:      '9px',
              color:         '#FF6B00',
              background:    'rgba(255,107,0,0.06)',
              border:        '1px solid rgba(255,107,0,0.12)',
              borderRadius:  '4px',
              padding:       '2px 7px',
              letterSpacing: '0.05em',
              userSelect:    'none',
            }}
          >
            {tag}
          </span>
        </div>
      </div>
    </motion.div>
  )
})

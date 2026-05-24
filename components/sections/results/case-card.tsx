'use client'

import { memo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { CaseDef } from './types'

interface CaseCardProps {
  case:      CaseDef
  onOpen:    (id: string) => void
  index:     number
  className?: string
}

export const CaseCard = memo(function CaseCard({ case: c, onOpen, index, className = '' }: CaseCardProps) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const spotRef  = useRef<HTMLDivElement>(null)
  const isInView = useInView(wrapRef, { once: true, margin: '-60px' })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width)  * 100
    const y = ((e.clientY - rect.top)  / rect.height) * 100
    if (spotRef.current) {
      spotRef.current.style.background = `radial-gradient(circle 150px at ${x}% ${y}%, ${c.accentColor}06, transparent)`
      spotRef.current.style.opacity    = '1'
    }
  }

  const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    ;(e.currentTarget as HTMLElement).style.borderColor = `${c.accentColor}22`
  }

  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.055)'
    if (spotRef.current) spotRef.current.style.opacity = '0'
  }

  return (
    <motion.div
      ref={wrapRef}
      className={`relative cursor-pointer rounded-[14px] overflow-hidden ${className}`}
      style={{
        background:  'rgba(4,4,4,0.96)',
        border:      '1px solid rgba(255,255,255,0.055)',
        transition:  'border-color 0.22s ease',
      }}
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true as const, margin: '-40px' }}
      transition={{ duration: 0.7, delay: 0.05 + index * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
      whileHover={{ y: -3 }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={() => onOpen(c.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(c.id) }}
    >
      {/* Spotlight */}
      <div ref={spotRef} aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0, transition: 'opacity 0.15s ease', zIndex: 1, borderRadius: '14px' }} />

      {/* Chart area */}
      <div
        style={{ background: c.gradient, position: 'relative', overflow: 'hidden', height: '130px' }}
      >
        {/* Accent glow */}
        <div aria-hidden style={{ position: 'absolute', inset: '-30%', background: `radial-gradient(circle at 70% 50%, ${c.accentColor}14 0%, transparent 55%)`, pointerEvents: 'none' }} />

        {/* SVG growth chart */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          <defs>
            <linearGradient id={`fill-${c.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={c.accentColor} stopOpacity="0.12" />
              <stop offset="100%" stopColor={c.accentColor} stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <motion.path
            d={c.areaPath}
            fill={`url(#fill-${c.id})`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.08 }}
          />

          {/* Line */}
          <motion.path
            d={c.chartPath}
            fill="none"
            stroke={c.accentColor}
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.4, delay: 0.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
          />
        </svg>

        {/* Category badge */}
        <div style={{ position: 'absolute', bottom: '10px', left: '12px', zIndex: 2 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8.5px', color: c.accentColor, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', border: `1px solid ${c.accentColor}30`, borderRadius: '4px', padding: '2px 7px', letterSpacing: '0.06em' }}>
            {c.category.toUpperCase()}
          </span>
        </div>

        {/* Segment */}
        <div style={{ position: 'absolute', bottom: '10px', right: '12px', zIndex: 2 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: '#2a2a2a', letterSpacing: '0.06em' }}>
            {c.segment.toUpperCase()}
          </span>
        </div>

        {/* Bottom fade */}
        <div aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, rgba(4,4,4,0.9) 0%, transparent 100%)', pointerEvents: 'none' }} />
      </div>

      {/* Body */}
      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: '9px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        {/* Title */}
        <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: c.featured ? '15px' : '13.5px', fontWeight: 600, color: '#bcbcbc', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
          {c.title}
        </p>

        {/* Challenge brief */}
        <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '11.5px', color: '#2d2d2d', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {c.challenge}
        </p>

        {/* Metric chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {c.metrics.map((m) => (
            <div
              key={m.label}
              style={{
                display:       'flex',
                alignItems:    'center',
                gap:           '4px',
                background:    `${c.accentColor}08`,
                border:        `1px solid ${c.accentColor}18`,
                borderRadius:  '5px',
                padding:       '2.5px 8px',
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: c.accentColor, letterSpacing: '0.04em', opacity: 0.8 }}>
                {m.value}
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7.5px', color: '#2a2a2a', letterSpacing: '0.03em' }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Stack badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {c.stack.slice(0, 3).map((tech) => (
            <span key={tech} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8.5px', color: '#3a3a3a', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.055)', borderRadius: '4px', padding: '1.5px 6px', letterSpacing: '0.03em' }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
})

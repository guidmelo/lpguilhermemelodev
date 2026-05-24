'use client'

import { memo, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { ProjectDef } from './types'
import { ProjectMockup } from './project-mockup'

interface PortfolioCardProps {
  project:  ProjectDef
  onOpen:   (id: string) => void
  index:    number
  className?: string
}

/* ── PortfolioCard ───────────────────────────────────────────────────────── *
 *  - Card-local 3D tilt via useMotionValue + useSpring (no global mouse hook)
 *  - Cursor spotlight via spotRef direct DOM mutation (zero re-renders)
 *  - Scroll entrance via whileInView
 *  - Memoized — stable even when parent re-renders on modal open
 * ──────────────────────────────────────────────────────────────────────────*/
export const PortfolioCard = memo(function PortfolioCard({
  project,
  onOpen,
  index,
  className = '',
}: PortfolioCardProps) {
  const spotRef = useRef<HTMLDivElement>(null)

  /* ── Card-local tilt (each card tracks its own cursor) ─────────────────── */
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotY = useSpring(rawX, { stiffness: 50, damping: 22 })
  const rotX = useSpring(rawY, { stiffness: 50, damping: 22 })

  /* ── Event handlers (all direct DOM — no React state) ───────────────────── */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const nx   = (e.clientX - rect.left) / rect.width  - 0.5   /* -0.5 … 0.5 */
    const ny   = (e.clientY - rect.top)  / rect.height - 0.5

    rawX.set(nx * 10)   /* max ±10° */
    rawY.set(-ny * 7)

    if (!spotRef.current) return
    const x = ((e.clientX - rect.left) / rect.width)  * 100
    const y = ((e.clientY - rect.top)  / rect.height) * 100
    spotRef.current.style.background = `radial-gradient(circle 140px at ${x}% ${y}%, rgba(255,255,255,0.04), transparent)`
    spotRef.current.style.opacity    = '1'
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    ;(e.currentTarget as HTMLElement).style.borderColor = `${project.accentColor}30`
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'
    rawX.set(0)
    rawY.set(0)
    if (spotRef.current) spotRef.current.style.opacity = '0'
  }

  return (
    <motion.div
      className={`relative cursor-pointer rounded-[14px] overflow-hidden ${className}`}
      style={{
        background:   'rgba(255,255,255,0.02)',
        border:       '1px solid rgba(255,255,255,0.06)',
        transition:   'border-color 0.22s ease',
        perspective:  '900px',
        rotateY:      rotY,
        rotateX:      rotX,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: 0.05 + index * 0.07, ease: [0.16, 1, 0.3, 1] as const }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(project.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(project.id) }}
    >
      {/* Spotlight layer */}
      <div
        ref={spotRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 rounded-[14px]"
        style={{ transition: 'opacity 0.15s ease', zIndex: 1 }}
      />

      {/* ── Mockup preview area ─────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '16 / 10' }}
      >
        <ProjectMockup
          variant={project.mockup}
          gradient={project.gradient}
          accentColor={project.accentColor}
        />

        {/* Category badge overlay */}
        <div
          className="absolute bottom-3 left-3"
          style={{ zIndex: 2 }}
        >
          <span
            style={{
              fontFamily:    "'JetBrains Mono', monospace",
              fontSize:      '8.5px',
              color:         project.accentColor,
              background:    'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(8px)',
              border:        `1px solid ${project.accentColor}30`,
              borderRadius:  '4px',
              padding:       '2px 7px',
              letterSpacing: '0.06em',
            }}
          >
            {project.category.toUpperCase()}
          </span>
        </div>
      </div>

      {/* ── Details area ────────────────────────────────── */}
      <div
        style={{
          padding:     '14px 16px 16px',
          borderTop:   '1px solid rgba(255,255,255,0.04)',
          display:     'flex',
          flexDirection: 'column',
          gap:         '8px',
        }}
      >
        {/* Title */}
        <p
          style={{
            fontFamily:    "'Satoshi', sans-serif",
            fontSize:      project.featured ? '15px' : '13.5px',
            fontWeight:    600,
            color:         '#bcbcbc',
            letterSpacing: '-0.01em',
            lineHeight:    1.2,
          }}
        >
          {project.title}
        </p>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize:   '12px',
            color:      '#333333',
            lineHeight: 1.5,
          }}
        >
          {project.subtitle}
        </p>

        {/* Stack badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily:    "'JetBrains Mono', monospace",
                fontSize:      '8.5px',
                color:         '#4a4a4a',
                background:    'rgba(255,255,255,0.03)',
                border:        '1px solid rgba(255,255,255,0.06)',
                borderRadius:  '4px',
                padding:       '1.5px 6px',
                letterSpacing: '0.03em',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
})

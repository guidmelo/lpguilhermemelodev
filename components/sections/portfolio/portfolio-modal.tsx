'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import type { ProjectDef } from './types'
import { ProjectMockup } from './project-mockup'

interface PortfolioModalProps {
  project: ProjectDef
  onClose: () => void
}

export function PortfolioModal({ project, onClose }: PortfolioModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  /* ── Scroll lock + ESC handler ─────────────────────────────────────────── */
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    /* ── Backdrop ──────────────────────────────────────────────────────────── */
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex:          100,
        background:      'rgba(4,4,4,0.88)',
        backdropFilter:  'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        padding:         'clamp(12px, 3vw, 40px)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      {/* ── Panel ─────────────────────────────────────────────────────────── */}
      <motion.div
        ref={panelRef}
        className="relative w-full overflow-hidden"
        style={{
          maxWidth:    '1100px',
          maxHeight:   'calc(100dvh - 80px)',
          background:  'rgba(10,10,10,0.95)',
          border:      '1px solid rgba(255,255,255,0.07)',
          borderRadius: '20px',
          display:     'flex',
          flexDirection: 'column',
        }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{    opacity: 0, scale: 0.97, y: 8  }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Close button ─────────────────────────────────────────────── */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position:     'absolute',
            top:          '14px',
            right:        '14px',
            zIndex:       10,
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            width:        '30px',
            height:       '30px',
            borderRadius: '50%',
            background:   'rgba(255,255,255,0.06)',
            border:       '1px solid rgba(255,255,255,0.1)',
            cursor:       'pointer',
            color:        '#666',
            transition:   'background 0.15s ease, color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'
            ;(e.currentTarget as HTMLElement).style.color = '#ccc'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'
            ;(e.currentTarget as HTMLElement).style.color = '#666'
          }}
        >
          <X size={14} strokeWidth={1.8} />
        </button>

        {/* ── Body: horizontal split ────────────────────────────────────── */}
        <div
          className="flex flex-col lg:flex-row overflow-auto"
          style={{ flex: 1, minHeight: 0 }}
        >
          {/* ── Left: Mockup (55%) ─────────────────────────────────────── */}
          <div
            className="relative overflow-hidden flex-shrink-0"
            style={{
              width:           '100%',
              height:          'clamp(200px, 38vw, 420px)',
              /* desktop override via inline, mobile is 100% width already */
            }}
          >
            {/* Desktop: override to 55% width and full height */}
            <style>{`
              @media (min-width: 1024px) {
                .modal-left  { width: 55% !important; height: 100% !important; }
                .modal-right { width: 45% !important; }
              }
            `}</style>
            <div
              className="modal-left absolute inset-0"
              style={{ width: '100%', height: '100%' }}
            >
              <ProjectMockup
                variant={project.mockup}
                gradient={project.gradient}
                accentColor={project.accentColor}
                large
              />

              {/* Inner right border on desktop */}
              <div
                aria-hidden
                style={{
                  position:   'absolute',
                  top:        0,
                  right:      0,
                  bottom:     0,
                  width:      '1px',
                  background: 'rgba(255,255,255,0.05)',
                }}
              />
            </div>
          </div>

          {/* ── Right: Details (45%) ─────────────────────────────────────── */}
          <div
            className="modal-right overflow-y-auto"
            style={{
              flex:    1,
              padding: 'clamp(20px, 3vw, 36px)',
              display: 'flex',
              flexDirection: 'column',
              gap:     '20px',
            }}
          >
            {/* Category badge */}
            <div>
              <span
                style={{
                  fontFamily:    "'JetBrains Mono', monospace",
                  fontSize:      '9px',
                  color:         project.accentColor,
                  background:    'rgba(0,0,0,0.5)',
                  border:        `1px solid ${project.accentColor}30`,
                  borderRadius:  '4px',
                  padding:       '3px 8px',
                  letterSpacing: '0.07em',
                }}
              >
                {project.category.toUpperCase()}
              </span>
            </div>

            {/* Title */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h2
                style={{
                  fontFamily:    "'Clash Display', sans-serif",
                  fontSize:      'clamp(1.5rem, 2.8vw, 2rem)',
                  fontWeight:    700,
                  color:         '#f0f0f0',
                  letterSpacing: '-0.03em',
                  lineHeight:    1.1,
                }}
              >
                {project.title}
              </h2>
              <p
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize:   '13px',
                  color:      '#484848',
                  lineHeight: 1.5,
                }}
              >
                {project.subtitle}
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />

            {/* Description */}
            <p
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize:   '14px',
                color:      '#5a5a5a',
                lineHeight: 1.75,
              }}
            >
              {project.description}
            </p>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {project.features.map((feat) => (
                <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width:        '4px',
                      height:       '4px',
                      borderRadius: '50%',
                      background:   project.accentColor,
                      flexShrink:   0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Satoshi', sans-serif",
                      fontSize:   '13px',
                      color:      '#777',
                    }}
                  >
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />

            {/* Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span
                style={{
                  fontFamily:    "'JetBrains Mono', monospace",
                  fontSize:      '9px',
                  color:         '#333',
                  letterSpacing: '0.1em',
                }}
              >
                STACK
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily:    "'JetBrains Mono', monospace",
                      fontSize:      '10px',
                      color:         '#5a5a5a',
                      background:    'rgba(255,255,255,0.03)',
                      border:        '1px solid rgba(255,255,255,0.07)',
                      borderRadius:  '5px',
                      padding:       '3px 9px',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
              <motion.button
                style={{
                  display:       'inline-flex',
                  alignItems:    'center',
                  gap:           '7px',
                  fontFamily:    "'Satoshi', sans-serif",
                  fontSize:      '13px',
                  fontWeight:    500,
                  color:         project.accentColor,
                  background:    `${project.accentColor}12`,
                  border:        `1px solid ${project.accentColor}25`,
                  borderRadius:  '8px',
                  padding:       '9px 18px',
                  cursor:        'pointer',
                  letterSpacing: '-0.01em',
                  transition:    'background 0.2s ease',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = `${project.accentColor}22`
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = `${project.accentColor}12`
                }}
              >
                Ver projeto
                <ExternalLink size={13} strokeWidth={1.8} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

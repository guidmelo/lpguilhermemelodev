'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { CaseDef } from './types'

interface CaseModalProps {
  case:    CaseDef
  onClose: () => void
}

const SECTIONS = [
  { key: 'challenge' as const, num: '01', label: 'Desafio' },
  { key: 'solution'  as const, num: '02', label: 'Solução' },
  { key: 'impact'    as const, num: '03', label: 'Impacto' },
] as const

const reveal = (delay: number) => ({
  initial:     { opacity: 0, y: 12, filter: 'blur(3px)' },
  animate:     { opacity: 1, y: 0,  filter: 'blur(0px)' },
  transition:  { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
})

export function CaseModal({ case: c, onClose }: CaseModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  /* scroll lock + ESC */
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 100, background: 'rgba(4,4,4,0.9)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: 'clamp(12px, 3vw, 40px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        className="relative w-full overflow-hidden"
        style={{ maxWidth: '820px', maxHeight: 'calc(100dvh - 80px)', background: 'rgba(8,8,8,0.98)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', display: 'flex', flexDirection: 'column' }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{    opacity: 0, scale: 0.97, y: 8  }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', color: '#666', transition: 'background 0.15s ease, color 0.15s ease' }}
          onMouseEnter={(e) => { ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'; ;(e.currentTarget as HTMLElement).style.color = '#ccc' }}
          onMouseLeave={(e) => { ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; ;(e.currentTarget as HTMLElement).style.color = '#666' }}
        >
          <X size={14} strokeWidth={1.8} />
        </button>

        {/* Header: gradient + chart */}
        <div style={{ background: c.gradient, position: 'relative', overflow: 'hidden', height: '200px', flexShrink: 0 }}>
          <div aria-hidden style={{ position: 'absolute', inset: '-30%', background: `radial-gradient(circle at 60% 40%, ${c.accentColor}18 0%, transparent 55%)`, pointerEvents: 'none' }} />

          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id={`modal-fill-${c.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={c.accentColor} stopOpacity="0.14" />
                <stop offset="100%" stopColor={c.accentColor} stopOpacity="0.01" />
              </linearGradient>
            </defs>
            <path d={c.areaPath} fill={`url(#modal-fill-${c.id})`} />
            <motion.path
              d={c.chartPath}
              fill="none"
              stroke={c.accentColor}
              strokeWidth="1.0"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            />
          </svg>

          {/* Bottom overlay with title */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%', background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, transparent 100%)' }} />

          <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '50px' }}>
            <div style={{ marginBottom: '8px' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8.5px', color: c.accentColor, background: 'rgba(0,0,0,0.6)', border: `1px solid ${c.accentColor}30`, borderRadius: '4px', padding: '2px 7px', letterSpacing: '0.07em' }}>
                {c.category.toUpperCase()} · {c.segment.toUpperCase()}
              </span>
            </div>
            <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '6px' }}>
              {c.title}
            </h2>
            <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '13px', color: '#3d3d3d', lineHeight: 1.5 }}>
              {c.subtitle}
            </p>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '0px' }}>

          {/* 01/02/03 sections */}
          {SECTIONS.map(({ key, num, label }, i) => (
            <motion.div
              key={key}
              {...reveal(0.1 + i * 0.1)}
              style={{ paddingBottom: '20px', marginBottom: '20px', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: c.accentColor, letterSpacing: '0.1em', opacity: 0.5, paddingTop: '3px', flexShrink: 0 }}>
                  {num}
                </span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#282828', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>
                    {label.toUpperCase()}
                  </span>
                  <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '14px', color: '#505050', lineHeight: 1.75 }}>
                    {c[key]}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Metrics */}
          <motion.div {...reveal(0.4)} style={{ marginBottom: '20px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#1e1e1e', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>
              RESULTADOS
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {c.metrics.map((m) => (
                <div
                  key={m.label}
                  style={{ flex: 1, minWidth: '140px', background: `${c.accentColor}07`, border: `1px solid ${c.accentColor}15`, borderRadius: '10px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '5px' }}
                >
                  <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '18px', fontWeight: 700, color: c.accentColor, letterSpacing: '-0.02em', opacity: 0.9 }}>
                    {m.value}
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: '#282828', letterSpacing: '0.06em' }}>
                    {m.label.toUpperCase()}
                  </span>
                  {m.context && (
                    <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '11px', color: '#1e1e1e' }}>
                      {m.context}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stack */}
          <motion.div {...reveal(0.5)}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#1e1e1e', letterSpacing: '0.1em', display: 'block', marginBottom: '10px' }}>
              STACK
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {c.stack.map((tech) => (
                <span key={tech} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#484848', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.055)', borderRadius: '5px', padding: '3px 9px', letterSpacing: '0.03em' }}>
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

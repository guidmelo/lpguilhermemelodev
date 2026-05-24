'use client'

import { memo, useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATES = [
  { leads: 47,  automations: 128, conversion: '34.2',  bars: [42,58,35,72,88,64,45,91,67,53] },
  { leads: 51,  automations: 134, conversion: '35.8',  bars: [55,42,70,48,82,59,77,43,88,65] },
  { leads: 44,  automations: 121, conversion: '33.1',  bars: [38,74,52,65,43,88,61,77,49,82] },
] as const

export const LiveDashboard = memo(function LiveDashboard() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const isInView = useInView(wrapRef, { once: true, margin: '-80px' })

  const [stateIdx,  setStateIdx]  = useState(0)
  const [flash,     setFlash]     = useState(false)
  const [started,   setStarted]   = useState(false)

  useEffect(() => {
    if (isInView && !started) setStarted(true)
  }, [isInView, started])

  useEffect(() => {
    if (!started) return
    const t = setInterval(() => {
      setFlash(true)
      setTimeout(() => {
        setStateIdx(i => (i + 1) % STATES.length)
        setFlash(false)
      }, 200)
    }, 4200)
    return () => clearInterval(t)
  }, [started])

  const s = STATES[stateIdx]

  return (
    <div
      ref={wrapRef}
      style={{
        background:    'rgba(4,4,4,0.96)',
        border:        '1px solid rgba(255,255,255,0.055)',
        borderRadius:  '12px',
        overflow:      'hidden',
        padding:       '14px 16px',
        display:       'flex',
        flexDirection: 'column',
        gap:           '12px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#222', letterSpacing: '0.1em' }}>
          PERFORMANCE · LIVE
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <motion.div
            style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34D399' }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: '#1e1e1e', letterSpacing: '0.08em' }}>
            ATIVO
          </span>
        </div>
      </div>

      {/* Metrics row */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[
          { label: 'LEADS HOJE',  value: s.leads,       suffix: '',   trend: '+12%' },
          { label: 'AUTOMAÇÕES',  value: s.automations,  suffix: '',   trend: 'ATIVO' },
          { label: 'CONVERSÃO',   value: s.conversion,   suffix: '%',  trend: '↑ 5.1%' },
        ].map((m) => (
          <div
            key={m.label}
            style={{
              flex:         1,
              background:   'rgba(255,255,255,0.018)',
              border:       '1px solid rgba(255,255,255,0.04)',
              borderRadius: '8px',
              padding:      '10px 10px 8px',
              display:      'flex',
              flexDirection: 'column',
              gap:          '4px',
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7.5px', color: '#1c1c1c', letterSpacing: '0.08em' }}>
              {m.label}
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1px' }}>
              <span
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize:   '20px',
                  fontWeight: 700,
                  color:      flash ? '#1e1e1e' : '#bcbcbc',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  transition: 'color 0.18s ease',
                }}
              >
                {m.value}
              </span>
              {m.suffix && (
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '11px', color: '#2d2d2d' }}>{m.suffix}</span>
              )}
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', color: '#FF6B00', letterSpacing: '0.04em', opacity: 0.5 }}>
              {m.trend}
            </span>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '48px' }}>
        {s.bars.map((h, i) => (
          <motion.div
            key={i}
            style={{
              flex:            1,
              transformOrigin: 'bottom',
              background:      i === 7 ? 'rgba(255,107,0,0.25)' : 'rgba(255,255,255,0.06)',
              borderRadius:    '2px 2px 0 0',
              height:          '100%',
            }}
            animate={{ scaleY: h / 100 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          />
        ))}
      </div>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', color: '#161616', letterSpacing: '0.06em' }}>
        LEADS / HORA · ÚLTIMAS 10H
      </span>
    </div>
  )
})

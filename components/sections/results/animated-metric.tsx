'use client'

import { memo, useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedMetricProps {
  value:     number
  suffix?:   string
  prefix?:   string
  label:     string
  sublabel?: string
}

export const AnimatedMetric = memo(function AnimatedMetric({
  value,
  suffix   = '',
  prefix   = '',
  label,
  sublabel,
}: AnimatedMetricProps) {
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let frame: number
    const start = performance.now()
    const dur   = 1800

    const tick = (now: number) => {
      const t      = Math.min((now - start) / dur, 1)
      const eased  = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * value))
      if (t < 1) frame = requestAnimationFrame(tick)
      else setDisplay(value)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isInView, value])

  return (
    <div
      ref={ref}
      style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        gap:            '6px',
        padding:        '24px 20px',
        background:     'rgba(4,4,4,0.96)',
        border:         '1px solid rgba(255,255,255,0.055)',
        borderRadius:   '12px',
        flex:           1,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1px' }}>
        {prefix && (
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', color: '#FF6B00', opacity: 0.7 }}>
            {prefix}
          </span>
        )}
        <span
          style={{
            fontFamily:    "'Clash Display', sans-serif",
            fontSize:      'clamp(2.2rem, 4vw, 3rem)',
            fontWeight:    700,
            color:         '#e0e0e0',
            letterSpacing: '-0.04em',
            lineHeight:    1,
          }}
        >
          {display}
        </span>
        {suffix && (
          <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '18px', color: '#FF6B00', fontWeight: 600, marginBottom: '2px' }}>
            {suffix}
          </span>
        )}
      </div>
      <span
        style={{
          fontFamily:    "'JetBrains Mono', monospace",
          fontSize:      '9px',
          color:         '#282828',
          letterSpacing: '0.1em',
          textAlign:     'center',
        }}
      >
        {label.toUpperCase()}
      </span>
      {sublabel && (
        <span
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize:   '11px',
            color:      '#1e1e1e',
            textAlign:  'center',
          }}
        >
          {sublabel}
        </span>
      )}
    </div>
  )
})

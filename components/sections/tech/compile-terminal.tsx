'use client'

import { memo, useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LINES = [
  { cmd: '$ initializing infrastructure',  time: '12ms'  },
  { cmd: '$ resolving type definitions',   time: '38ms'  },
  { cmd: '$ compiling 42 modules',         time: '124ms' },
  { cmd: '$ deploying to edge network',    time: '91ms'  },
  { cmd: '$ connecting AI services',       time: '8ms'   },
] as const

export const CompileTerminal = memo(function CompileTerminal() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const isInView = useInView(wrapRef, { once: true, margin: '-60px' })

  const [shown,  setShown]  = useState(0)
  const [done,   setDone]   = useState(false)
  const [cursor, setCursor] = useState(true)

  /* cursor blink */
  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530)
    return () => clearInterval(t)
  }, [])

  /* sequential line reveal */
  useEffect(() => {
    if (!isInView || done) return
    if (shown >= LINES.length) {
      const t = setTimeout(() => setDone(true), 180)
      return () => clearTimeout(t)
    }
    const t = setTimeout(
      () => setShown(s => s + 1),
      shown === 0 ? 160 : 240 + Math.random() * 80,
    )
    return () => clearTimeout(t)
  }, [isInView, shown, done])

  const progress = done ? 1 : shown / LINES.length

  return (
    <div
      ref={wrapRef}
      style={{
        background:    'rgba(4,4,4,0.96)',
        border:        '1px solid rgba(255,255,255,0.055)',
        borderRadius:  '12px',
        overflow:      'hidden',
      }}
    >
      {/* Chrome */}
      <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.018)', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: '6px' }}>
        {(['rgba(255,88,88,0.32)', 'rgba(255,176,0,0.22)', 'rgba(40,200,90,0.22)'] as const).map((bg, i) => (
          <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: bg }} />
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#1c1c1c', letterSpacing: '0.07em' }}>
          build · guilherme.dev
        </span>
        <span style={{ marginLeft: '12px', fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.07em', color: done ? '#34D399' : '#FF6B00', opacity: done ? 0.55 : 0.4 }}>
          {done ? 'SUCCESS' : 'COMPILE'}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height: '2px', background: 'rgba(255,255,255,0.03)', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          style={{ position: 'absolute', inset: 0, transformOrigin: '0 50%', background: done ? '#34D399' : '#FF6B00' }}
          animate={{ scaleX: progress }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] as const }}
        />
      </div>

      {/* Lines */}
      <div style={{ padding: '12px 16px 14px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {LINES.slice(0, shown).map((ln, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#282828', flex: 1 }}>{ln.cmd}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8.5px', color: '#FF6B00', background: 'rgba(255,107,0,0.05)', border: '1px solid rgba(255,107,0,0.1)', borderRadius: '3px', padding: '0.5px 5px', letterSpacing: '0.04em' }}>
              {ln.time}
            </span>
          </div>
        ))}

        {/* Active cursor while compiling */}
        {!done && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '2px' }}>
            <span style={{ color: '#1c1c1c' }}>$</span>
            <span style={{ display: 'inline-block', width: '6px', height: '11px', background: '#FF6B00', marginLeft: '4px', opacity: cursor ? 0.7 : 0, verticalAlign: 'middle' }} />
          </div>
        )}

        {/* Success message */}
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.04)' }}
          >
            <span style={{ color: '#34D399', fontSize: '12px' }}>✓</span>
            <span style={{ color: '#262626' }}>build successful · 273ms · 42 modules loaded</span>
          </motion.div>
        )}
      </div>
    </div>
  )
})

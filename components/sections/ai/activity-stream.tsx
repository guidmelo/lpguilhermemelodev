'use client'

import { memo, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

interface Event {
  id:     number
  time:   string
  text:   string
  badge:  string
  color:  string
}

const POOL: Omit<Event, 'id' | 'time'>[] = [
  { text: 'Lead qualificado via Instagram',      badge: 'HIGH',      color: '#FF6B00' },
  { text: 'WhatsApp enviado para João Silva',    badge: 'SENT',      color: '#34D399' },
  { text: 'CRM sincronizado automaticamente',    badge: 'SYNCED',    color: '#4F8EF7' },
  { text: 'IA classificou intenção de compra',   badge: '94%',       color: '#FF6B00' },
  { text: 'Novo lead capturado do Instagram',    badge: 'NEW',       color: '#34D399' },
  { text: 'Fluxo de nutrição iniciado',          badge: 'RUNNING',   color: '#818CF8' },
  { text: 'Resposta automática enviada',         badge: 'AUTO',      color: '#34D399' },
  { text: 'Segmento atualizado: E-commerce',     badge: 'UPDATED',   color: '#4F8EF7' },
  { text: 'Pipeline CRM avançou etapa',          badge: 'ADVANCED',  color: '#FF6B00' },
  { text: 'Análise de engajamento concluída',    badge: '87/100',    color: '#818CF8' },
]

let poolIdx  = 0
let globalId = 0

function now() {
  const d = new Date()
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`
}

const SEED: Event[] = [0, 1, 2, 3].map((i) => ({
  id:    i,
  time:  '14:3' + (2 - i) + ':' + String(7 + i * 12).padStart(2,'0'),
  ...POOL[i],
}))

export const ActivityStream = memo(function ActivityStream() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const isInView = useInView(wrapRef, { once: true, margin: '-80px' })

  const [events,  setEvents]  = useState<Event[]>(SEED)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (isInView && !started) { setStarted(true); poolIdx = 4; globalId = 4 }
  }, [isInView, started])

  useEffect(() => {
    if (!started) return
    const t = setInterval(() => {
      const base = POOL[poolIdx % POOL.length]
      poolIdx++
      const evt: Event = { id: globalId++, time: now(), ...base }
      setEvents(prev => [evt, ...prev].slice(0, 6))
    }, 3100)
    return () => clearInterval(t)
  }, [started])

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
        gap:           '10px',
        flex:          1,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#222', letterSpacing: '0.1em' }}>
          ATIVIDADE RECENTE
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: '#141414', letterSpacing: '0.06em' }}>
          LIVE
        </span>
      </div>

      {/* Events */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflow: 'hidden', flex: 1 }}>
        <AnimatePresence initial={false}>
          {events.map((evt, i) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1 - i * 0.14, y: 0, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.025)' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: evt.color, flexShrink: 0, opacity: 0.7 }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8.5px', color: '#1a1a1a', flexShrink: 0 }}>
                  {evt.time}
                </span>
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '11px', color: '#3d3d3d', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {evt.text}
                </span>
                <span
                  style={{
                    fontFamily:    "'JetBrains Mono', monospace",
                    fontSize:      '7.5px',
                    color:         evt.color,
                    background:    evt.color + '12',
                    border:        `1px solid ${evt.color}20`,
                    borderRadius:  '3px',
                    padding:       '1.5px 5px',
                    letterSpacing: '0.05em',
                    flexShrink:    0,
                  }}
                >
                  {evt.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
})

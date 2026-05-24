'use client'

import { memo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const NODES = [
  { id: 'instagram', label: 'Instagram',   sub: 'Captura de lead',         color: '#E1306C', icon: '◈' },
  { id: 'ai',        label: 'IA Engine',   sub: 'Análise de intenção',     color: '#FF6B00', icon: '⬡' },
  { id: 'crm',       label: 'CRM',         sub: 'Registro automático',     color: '#4F8EF7', icon: '◎' },
  { id: 'whatsapp',  label: 'WhatsApp',    sub: 'Notificação inteligente', color: '#25D366', icon: '◉' },
  { id: 'dashboard', label: 'Dashboard',   sub: 'Métricas em tempo real',  color: '#818CF8', icon: '▣' },
] as const

export const AutomationFlow = memo(function AutomationFlow() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const isInView = useInView(wrapRef, { once: true, margin: '-100px' })

  return (
    <div
      ref={wrapRef}
      style={{
        background:    'rgba(4,4,4,0.96)',
        border:        '1px solid rgba(255,255,255,0.055)',
        borderRadius:  '12px',
        overflow:      'hidden',
        padding:       '20px 24px',
      }}
    >
      {/* Label */}
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#202020', letterSpacing: '0.1em' }}>
          FLUXO OPERACIONAL · AUTOMAÇÃO INTELIGENTE
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <motion.div
            style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FF6B00' }}
            animate={{ opacity: [0.6, 0.15, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: '#1a1a1a', letterSpacing: '0.07em' }}>
            EXECUTANDO
          </span>
        </div>
      </div>

      {/* Pipeline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {NODES.map((node, i) => (
          <div key={node.id} style={{ display: 'flex', alignItems: 'center', flex: i === NODES.length - 1 ? 'none' : 1, minWidth: 0 }}>
            {/* Node */}
            <motion.div
              style={{
                flexShrink:     0,
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                gap:            '6px',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const }}
            >
              {/* Icon container */}
              <div style={{ position: 'relative' }}>
                {/* Pulse ring */}
                <motion.div
                  style={{
                    position:     'absolute',
                    inset:        '-6px',
                    borderRadius: '50%',
                    border:       `1px solid ${node.color}`,
                  }}
                  animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1.4, 0.8] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.55, ease: 'easeOut' }}
                />
                <div
                  style={{
                    width:        '36px',
                    height:       '36px',
                    borderRadius: '10px',
                    background:   `${node.color}10`,
                    border:       `1px solid ${node.color}25`,
                    display:      'flex',
                    alignItems:   'center',
                    justifyContent: 'center',
                    fontSize:     '15px',
                    color:        node.color,
                  }}
                >
                  {node.icon}
                </div>
              </div>

              {/* Labels */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '11px', fontWeight: 600, color: '#4a4a4a', whiteSpace: 'nowrap' }}>
                  {node.label}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7.5px', color: '#1c1c1c', whiteSpace: 'nowrap', letterSpacing: '0.03em' }}>
                  {node.sub}
                </span>
              </div>
            </motion.div>

            {/* Connector (not after last node) */}
            {i < NODES.length - 1 && (
              <div
                style={{
                  flex:       1,
                  height:     '1px',
                  position:   'relative',
                  overflow:   'hidden',
                  alignSelf:  'flex-start',
                  marginTop:  '18px',
                  marginLeft: '6px',
                  marginRight: '6px',
                }}
              >
                {/* Static line */}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.05)' }} />
                {/* Animated packet */}
                <motion.div
                  style={{
                    position:   'absolute',
                    left:       0,
                    top:        0,
                    width:      '40%',
                    height:     '100%',
                    background: `linear-gradient(90deg, transparent, ${NODES[i + 1].color}50, transparent)`,
                  }}
                  animate={isInView ? { x: ['-100%', '250%'] } : { x: '-100%' }}
                  transition={{
                    duration: 1.5,
                    repeat:   Infinity,
                    delay:    i * 0.38,
                    ease:     'linear',
                    repeatDelay: 0.1,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
})

'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'

/* ── Timeline data ───────────────────────────────────────────────────────── */
const STEPS = [
  {
    year:  '2022',
    title: 'Python & Data',
    desc:  'Análise de dados, primeiros algoritmos e fundações de programação.',
    state: 'past',
  },
  {
    year:  '2023',
    title: 'Startup & Systems',
    desc:  'Primeira oportunidade profissional. Desenvolvimento e soluções internas reais.',
    state: 'past',
  },
  {
    year:  '2024',
    title: 'Web & SaaS',
    desc:  'Aplicações completas, landing pages premium e primeiros produtos SaaS.',
    state: 'past',
  },
  {
    year:  '2025',
    title: 'AI & Automation',
    desc:  'Agentes autônomos, fluxos altamente otimizados e cybersecurity aplicada.',
    state: 'active',
  },
  {
    year:  'Future',
    title: 'Global Software House',
    desc:  'Uma software house reconhecida globalmente. Em construção contínua.',
    state: 'future',
  },
] as const

type StepState = (typeof STEPS)[number]['state']

/* ── Node dot ────────────────────────────────────────────────────────────── */
const NodeDot = memo(function NodeDot({ state }: { state: StepState }) {
  if (state === 'future') {
    return (
      <motion.div
        style={{
          width:        '13px',
          height:       '13px',
          borderRadius: '50%',
          border:       '1.5px solid #FF6B00',
          flexShrink:   0,
        }}
        animate={{
          boxShadow: [
            '0 0 6px rgba(255,107,0,0.3)',
            '0 0 18px rgba(255,107,0,0.65)',
            '0 0 6px rgba(255,107,0,0.3)',
          ],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    )
  }

  if (state === 'active') {
    return (
      <div
        style={{
          width:        '9px',
          height:       '9px',
          borderRadius: '50%',
          background:   '#FF6B00',
          boxShadow:    '0 0 10px rgba(255,107,0,0.55)',
          flexShrink:   0,
        }}
      />
    )
  }

  return (
    <div
      style={{
        width:        '7px',
        height:       '7px',
        borderRadius: '50%',
        background:   '#2a2a2a',
        border:       '1px solid rgba(255,255,255,0.08)',
        flexShrink:   0,
      }}
    />
  )
})

/* ── Desktop step ────────────────────────────────────────────────────────── */
const DesktopStep = memo(function DesktopStep({
  step,
  index,
}: {
  step: (typeof STEPS)[number]
  index: number
}) {
  const isActive = step.state === 'active'
  const isFuture = step.state === 'future'

  return (
    <motion.div
      className="flex flex-col items-center text-center"
      style={{ flex: 1 }}
      initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.14, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {/* Dot — sits on the track line */}
      <div style={{ marginBottom: '14px' }}>
        <NodeDot state={step.state} />
      </div>

      {/* Year label */}
      <p
        style={{
          fontFamily:    "'JetBrains Mono', monospace",
          fontSize:      '10px',
          color:         isActive || isFuture ? '#FF6B00' : '#2e2e2e',
          letterSpacing: '0.07em',
          marginBottom:  '6px',
        }}
      >
        {step.year}
      </p>

      {/* Title */}
      <p
        style={{
          fontFamily:    "'Satoshi', sans-serif",
          fontSize:      '12.5px',
          fontWeight:    600,
          color:         isFuture ? '#FF6B00' : isActive ? '#c8c8c8' : '#3d3d3d',
          letterSpacing: '-0.01em',
          lineHeight:    1.3,
          marginBottom:  '8px',
          maxWidth:      '110px',
        }}
      >
        {step.title}
      </p>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize:   '11px',
          color:      '#272727',
          lineHeight: 1.6,
          maxWidth:   '120px',
        }}
      >
        {step.desc}
      </p>
    </motion.div>
  )
})

/* ── Mobile step ─────────────────────────────────────────────────────────── */
const MobileStep = memo(function MobileStep({
  step,
  index,
}: {
  step: (typeof STEPS)[number]
  index: number
}) {
  const isActive = step.state === 'active'
  const isFuture = step.state === 'future'

  return (
    <motion.div
      className="relative pl-8"
      initial={{ opacity: 0, x: -12, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {/* Dot */}
      <div className="absolute -left-[3px] top-[2px]">
        <NodeDot state={step.state} />
      </div>

      <p
        style={{
          fontFamily:    "'JetBrains Mono', monospace",
          fontSize:      '10px',
          color:         isActive || isFuture ? '#FF6B00' : '#2e2e2e',
          letterSpacing: '0.07em',
          marginBottom:  '3px',
        }}
      >
        {step.year}
      </p>
      <p
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize:   '14px',
          fontWeight: 600,
          color:      isFuture ? '#FF6B00' : isActive ? '#c8c8c8' : '#3d3d3d',
          marginBottom: '4px',
        }}
      >
        {step.title}
      </p>
      <p
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize:   '13px',
          color:      '#2e2e2e',
          lineHeight: 1.65,
        }}
      >
        {step.desc}
      </p>
    </motion.div>
  )
})

/* ── TimelineExperience ──────────────────────────────────────────────────── */
export const TimelineExperience = memo(function TimelineExperience() {
  return (
    <div>
      {/* Section header */}
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <p
          style={{
            fontFamily:    "'JetBrains Mono', monospace",
            fontSize:      '9px',
            color:         '#2e2e2e',
            letterSpacing: '0.1em',
            marginBottom:  '6px',
          }}
        >
          EVOLUÇÃO TECNOLÓGICA
        </p>
        <p
          style={{
            fontFamily:    "'Clash Display', sans-serif",
            fontSize:      'clamp(1.5rem, 2.8vw, 2rem)',
            fontWeight:    700,
            color:         '#F3F3F3',
            letterSpacing: '-0.025em',
            lineHeight:    1.1,
          }}
        >
          Trajetória
        </p>
      </motion.div>

      {/* ── Desktop: horizontal track ──────────────────── */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Base track — full width hairline */}
          <div
            className="absolute"
            style={{
              top:        '6px',
              left:       0,
              right:      0,
              height:     '1px',
              background: 'rgba(255,255,255,0.04)',
            }}
          />

          {/* Animated fill — left to right amber gradient */}
          <motion.div
            className="absolute"
            style={{
              top:             '6px',
              left:            0,
              right:           0,
              height:          '1px',
              background:      'linear-gradient(90deg, rgba(255,107,0,0.5) 0%, rgba(255,107,0,0.18) 65%, transparent 100%)',
              transformOrigin: '0 50%',
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 2.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          />

          {/* Steps row — dots sit on the track */}
          <div className="flex justify-between">
            {STEPS.map((step, i) => (
              <DesktopStep key={step.year} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile: vertical track ─────────────────────── */}
      <div
        className="lg:hidden flex flex-col gap-8"
        style={{
          borderLeft: '1px solid rgba(255,255,255,0.05)',
          paddingLeft: '0',
        }}
      >
        {STEPS.map((step, i) => (
          <MobileStep key={step.year} step={step} index={i} />
        ))}
      </div>
    </div>
  )
})

'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { Container }      from '@/components/layout/container'
import { GradientLine }   from '@/components/effects/gradient-line'
import { PromptTerminal } from './prompt-terminal'
import { LiveDashboard }  from './live-dashboard'
import { ActivityStream } from './activity-stream'
import { AutomationFlow } from './automation-flow'

const DIFFERENTIALS = [
  { label: 'IA Aplicada',          desc: 'Inteligência integrada diretamente nas operações e fluxos de negócio.' },
  { label: 'Automações Precisas',  desc: 'Processos automatizados com lógica de negócio real e baixo ruído.' },
  { label: 'Integrações Nativas',  desc: 'APIs conectadas de forma coesa — sem complexidade desnecessária.' },
  { label: 'Estruturas Escaláveis', desc: 'Arquitetura pensada para crescer sem refactor traumático.' },
] as const

const reveal = (delay: number) => ({
  initial:     { opacity: 0, y: 14, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  viewport:    { once: true as const, margin: '-40px' },
  transition:  { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
})

export const AISection = memo(function AISection() {
  return (
    <section
      id="ia"
      className="relative overflow-hidden"
      style={{ paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      {/* ── Top separator ──────────────────────────────────────────────────── */}
      <div className="absolute top-0 inset-x-0" style={{ zIndex: 6 }}>
        <GradientLine orientation="horizontal" accentSide="center" />
      </div>

      {/* ── Ambient lighting ───────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex:     0,
          background: [
            'radial-gradient(ellipse 60% 50% at 0%   30%, rgba(255,107,0,0.04) 0%, transparent 65%)',
            'radial-gradient(ellipse 50% 55% at 100% 70%, rgba(79,142,247,0.03) 0%, transparent 65%)',
          ].join(', '),
        }}
      />

      {/* ── Subtle grid ────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex:          0,
          backgroundImage: [
            'linear-gradient(rgba(255,255,255,0.009) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255,255,255,0.009) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <Container
        className="relative"
        style={{ zIndex: 10 } as React.CSSProperties}
      >
        {/* Section header */}
        <div className="mb-14 max-w-[640px]">

          {/* Badge */}
          <motion.div {...reveal(0)} className="mb-6">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
              style={{ background: 'rgba(255,107,0,0.06)', border: '1px solid rgba(255,107,0,0.18)' }}
            >
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FF6B00', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#FF6B00', letterSpacing: '0.08em' }}>
                IA & AUTOMAÇÕES // OPERANDO EM ESCALA
              </span>
            </div>
          </motion.div>

          <motion.h2
            style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 'clamp(1.85rem, 3.8vw, 2.7rem)', fontWeight: 700, color: '#F3F3F3', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '14px' }}
            {...reveal(0.1)}
          >
            Automação, inteligência artificial e sistemas modernos{' '}
            <span style={{ color: '#FF6B00' }}>operando em escala.</span>
          </motion.h2>

          <motion.p
            style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '16px', color: '#484848', lineHeight: 1.7 }}
            {...reveal(0.2)}
          >
            Soluções inteligentes desenvolvidas para automatizar operações,
            acelerar processos e transformar estruturas digitais em sistemas
            altamente eficientes.
          </motion.p>
        </div>

        {/* ── Main grid ──────────────────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-3"
          style={{ minHeight: '380px' }}
          {...reveal(0.25)}
        >
          {/* Terminal */}
          <div className="lg:col-span-7" style={{ minHeight: '360px' }}>
            <PromptTerminal />
          </div>

          {/* Right column */}
          <div className="lg:col-span-5" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <LiveDashboard />
            <ActivityStream />
          </div>
        </motion.div>

        {/* ── Automation flow ────────────────────────────────────────────── */}
        <motion.div className="mt-3" {...reveal(0.35)}>
          <AutomationFlow />
        </motion.div>

        {/* ── Differentials ──────────────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3"
          {...reveal(0.45)}
        >
          {DIFFERENTIALS.map((d) => (
            <div
              key={d.label}
              style={{
                background:    'rgba(4,4,4,0.96)',
                border:        '1px solid rgba(255,255,255,0.055)',
                borderRadius:  '12px',
                padding:       '16px 18px',
                display:       'flex',
                flexDirection: 'column',
                gap:           '7px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#FF6B00', flexShrink: 0 }} />
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '13px', fontWeight: 600, color: '#3a3a3a', letterSpacing: '-0.01em' }}>
                  {d.label}
                </span>
              </div>
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '12px', color: '#232323', lineHeight: 1.6 }}>
                {d.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </Container>

      {/* ── Bottom separator ───────────────────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0" style={{ zIndex: 6 }}>
        <GradientLine orientation="horizontal" accentSide="center" />
      </div>
    </section>
  )
})

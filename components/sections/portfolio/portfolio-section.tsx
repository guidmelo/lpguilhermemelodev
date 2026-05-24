'use client'

import { memo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container }    from '@/components/layout/container'
import { GradientLine } from '@/components/effects/gradient-line'
import { PortfolioCard }  from './portfolio-card'
import { PortfolioModal } from './portfolio-modal'
import { PROJECTS, type ProjectDef } from './types'

/* ── Scroll reveal helper ────────────────────────────────────────────────── */
const reveal = (delay: number) => ({
  initial:     { opacity: 0, y: 14, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport:    { once: true as const, margin: '-40px' },
  transition:  { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
})

/* ── PortfolioSection ─────────────────────────────────────────────────────── */
export const PortfolioSection = memo(function PortfolioSection() {
  const [selected, setSelected] = useState<ProjectDef | null>(null)

  /* Stable reference — memo on PortfolioCard won't re-render on modal open */
  const handleOpen = useCallback((id: string) => {
    const project = PROJECTS.find((p) => p.id === id) ?? null
    setSelected(project)
  }, [])

  const handleClose = useCallback(() => {
    setSelected(null)
  }, [])

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden"
      style={{ paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      {/* ── Top separator ────────────────────────────────────────────────── */}
      <div className="absolute top-0 inset-x-0" style={{ zIndex: 6 }}>
        <GradientLine orientation="horizontal" accentSide="center" />
      </div>

      {/* ── Ambient lighting ─────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex:     0,
          background: [
            'radial-gradient(ellipse 55% 45% at 5%  20%, rgba(255,107,0,0.035) 0%, transparent 65%)',
            'radial-gradient(ellipse 50% 55% at 95% 80%, rgba(255,107,0,0.025) 0%, transparent 65%)',
          ].join(', '),
        }}
      />

      {/* ── Content ──────────────────────────────────────────────────────── */}
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
              style={{
                background: 'rgba(255,107,0,0.06)',
                border:     '1px solid rgba(255,107,0,0.18)',
              }}
            >
              <span
                style={{
                  width:        '5px',
                  height:       '5px',
                  borderRadius: '50%',
                  background:   '#FF6B00',
                  display:      'inline-block',
                  flexShrink:   0,
                }}
              />
              <span
                style={{
                  fontFamily:    "'JetBrains Mono', monospace",
                  fontSize:      '10px',
                  color:         '#FF6B00',
                  letterSpacing: '0.08em',
                }}
              >
                PORTFOLIO // {PROJECTS.length} PROJETOS
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            style={{
              fontFamily:    "'Clash Display', sans-serif",
              fontSize:      'clamp(1.85rem, 3.8vw, 2.7rem)',
              fontWeight:    700,
              color:         '#F3F3F3',
              letterSpacing: '-0.03em',
              lineHeight:    1.1,
              marginBottom:  '14px',
            }}
            {...reveal(0.1)}
          >
            Projetos reais entregues com{' '}
            <span style={{ color: '#FF6B00' }}>precisão.</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize:   '16px',
              color:      '#484848',
              lineHeight: 1.7,
            }}
            {...reveal(0.2)}
          >
            Cada projeto é construído com arquitetura moderna, performance e
            identidade visual que transmite autoridade.
          </motion.p>
        </div>

        {/* ── Asymmetric Bento grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
          {PROJECTS.map((project, i) => (
            <PortfolioCard
              key={project.id}
              project={project}
              onOpen={handleOpen}
              index={i}
              className={project.colClass}
            />
          ))}
        </div>

        {/* ── Bottom note ───────────────────────────────────────────────── */}
        <motion.p
          className="mt-10 text-center"
          style={{
            fontFamily:    "'JetBrains Mono', monospace",
            fontSize:      '10px',
            color:         '#2a2a2a',
            letterSpacing: '0.08em',
          }}
          {...reveal(0.4)}
        >
          CLIQUE EM QUALQUER PROJETO PARA VER OS DETALHES
        </motion.p>
      </Container>

      {/* ── Bottom separator ─────────────────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0" style={{ zIndex: 6 }}>
        <GradientLine orientation="horizontal" accentSide="center" />
      </div>

      {/* ── Modal ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <PortfolioModal
            key={selected.id}
            project={selected}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </section>
  )
})

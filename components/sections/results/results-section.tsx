'use client'

import { memo, useState, useCallback } from 'react'
import { motion, AnimatePresence }    from 'framer-motion'
import { Container }    from '@/components/layout/container'
import { GradientLine } from '@/components/effects/gradient-line'
import { AnimatedMetric } from './animated-metric'
import { CaseCard }       from './case-card'
import { CaseModal }      from './case-modal'
import { CASES, type CaseDef } from './types'

const reveal = (delay: number) => ({
  initial:     { opacity: 0, y: 14, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  viewport:    { once: true as const, margin: '-40px' },
  transition:  { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
})

export const ResultsSection = memo(function ResultsSection() {
  const [selected, setSelected] = useState<CaseDef | null>(null)

  const handleOpen = useCallback((id: string) => {
    setSelected(CASES.find((c) => c.id === id) ?? null)
  }, [])

  const handleClose = useCallback(() => setSelected(null), [])

  return (
    <section
      id="resultados"
      className="relative overflow-hidden"
      style={{ paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      {/* Top separator */}
      <div className="absolute top-0 inset-x-0" style={{ zIndex: 6 }}>
        <GradientLine orientation="horizontal" accentSide="center" />
      </div>

      {/* Ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex:     0,
          background: [
            'radial-gradient(ellipse 60% 50% at 100% 20%, rgba(255,107,0,0.035) 0%, transparent 65%)',
            'radial-gradient(ellipse 45% 50% at 0%  80%, rgba(52,211,153,0.02)  0%, transparent 65%)',
          ].join(', '),
        }}
      />

      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex:          0,
          backgroundImage: [
            'linear-gradient(rgba(255,255,255,0.008) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255,255,255,0.008) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '68px 68px',
        }}
      />

      <Container className="relative" style={{ zIndex: 10 } as React.CSSProperties}>

        {/* Header */}
        <div className="mb-14 max-w-[640px]">
          <motion.div {...reveal(0)} className="mb-6">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
              style={{ background: 'rgba(255,107,0,0.06)', border: '1px solid rgba(255,107,0,0.18)' }}
            >
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FF6B00', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#FF6B00', letterSpacing: '0.08em' }}>
                RESULTADOS // {CASES.length} TRANSFORMAÇÕES DIGITAIS
              </span>
            </div>
          </motion.div>

          <motion.h2
            style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 'clamp(1.85rem, 3.8vw, 2.7rem)', fontWeight: 700, color: '#F3F3F3', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '14px' }}
            {...reveal(0.1)}
          >
            Estruturas digitais desenvolvidas para gerar crescimento,{' '}
            <span style={{ color: '#FF6B00' }}>percepção e autoridade.</span>
          </motion.h2>

          <motion.p
            style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '16px', color: '#484848', lineHeight: 1.7 }}
            {...reveal(0.2)}
          >
            Mais do que projetos visuais. Soluções construídas para transformar presença
            digital, aumentar percepção de valor e estruturar crescimento real.
          </motion.p>
        </div>

        {/* Animated stats */}
        <motion.div className="flex gap-3 mb-3 flex-col sm:flex-row" {...reveal(0.25)}>
          <AnimatedMetric value={8}   suffix="+"  label="Projetos entregues"  sublabel="Sites, SaaS e sistemas" />
          <AnimatedMetric value={5}   suffix=""   label="Segmentos atendidos" sublabel="Alimentação, Educação, Tech…" />
          <AnimatedMetric value={100} suffix="%"  label="Foco em resultado"   sublabel="Entrega premium garantida" />
        </motion.div>

        {/* Case grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
          {CASES.map((c, i) => (
            <CaseCard
              key={c.id}
              case={c}
              onOpen={handleOpen}
              index={i}
              className={c.colClass}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="mt-10 text-center"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#2a2a2a', letterSpacing: '0.08em' }}
          {...reveal(0.4)}
        >
          CLIQUE EM QUALQUER CASE PARA VER A HISTÓRIA COMPLETA
        </motion.p>

      </Container>

      {/* Bottom separator */}
      <div className="absolute bottom-0 inset-x-0" style={{ zIndex: 6 }}>
        <GradientLine orientation="horizontal" accentSide="center" />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <CaseModal
            key={selected.id}
            case={selected}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </section>
  )
})

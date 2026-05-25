'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { Container }       from '@/components/layout/container'
import { GradientLine }    from '@/components/effects/gradient-line'
import { TechMarqueeRow }  from '@/components/tech/tech-marquee-row'
import { ALL_TECH }        from '@/data/tech-stack'
import type { TechCategory } from '@/data/tech-stack'

/* ── Row manifest ───────────────────────────────────────────────────────────── */

/*
 * speed = seconds for one full pass of the content (1× copy width).
 * With 4× duplication, the visual repeats every `speed` seconds.
 * Rows with fewer items get slightly faster speeds so motion stays lively.
 */
const ROWS: {
  label: string
  cats:  readonly TechCategory[]
  dir:   'left' | 'right'
  speed: number
}[] = [
  { label: 'Front-end Engineering', cats: ['languages', 'frontend'], dir: 'left',  speed: 44 },
  { label: 'Back-end Architecture', cats: ['backend'],               dir: 'right', speed: 38 },
  { label: 'Cloud & DevOps',        cats: ['devops', 'cloud'],       dir: 'left',  speed: 46 },
  { label: 'IA & Automações',       cats: ['ai'],                    dir: 'right', speed: 34 },
  { label: 'Banco de Dados',        cats: ['database'],              dir: 'left',  speed: 36 },
  { label: 'Mobile Development',    cats: ['mobile'],                dir: 'right', speed: 30 },
  { label: 'Performance & Escala',  cats: ['performance'],           dir: 'left',  speed: 35 },
  { label: 'Segurança',             cats: ['security'],              dir: 'right', speed: 28 },
  { label: 'Qualidade & Testes',    cats: ['testing'],               dir: 'left',  speed: 48 },
]

/* ── Entrance animation helper ──────────────────────────────────────────────── */

const reveal = (delay: number) => ({
  initial:     { opacity: 0, y: 14, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  viewport:    { once: true as const, margin: '-40px' },
  transition:  { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
})

/* ── TechMarqueeSection ─────────────────────────────────────────────────────── */

export const TechMarqueeSection = memo(function TechMarqueeSection() {
  return (
    <section
      id="stack"
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
          zIndex: 0,
          background: [
            'radial-gradient(ellipse 60% 50% at 50%   0%, rgba(255,107,0,0.032) 0%, transparent 65%)',
            'radial-gradient(ellipse 35% 40% at 0%  100%, rgba(79,142,247,0.018) 0%, transparent 65%)',
            'radial-gradient(ellipse 30% 30% at 100%  50%, rgba(255,107,0,0.012) 0%, transparent 65%)',
          ].join(', '),
        }}
      />

      {/* ── Grid texture ───────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 0,
          backgroundImage: [
            'linear-gradient(rgba(255,255,255,0.007) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255,255,255,0.007) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '72px 72px',
        }}
      />

      <Container className="relative" style={{ zIndex: 10 } as React.CSSProperties}>

        {/* ── Section header ─────────────────────────────────────────────── */}
        <div className="mb-16 max-w-[560px]">

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
                TECH STACK // 9 CATEGORIAS · {ALL_TECH.length}+ FERRAMENTAS
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
            Tecnologias modernas para construir{' '}
            <span style={{ color: '#FF6B00' }}>sistemas de alta performance.</span>
          </motion.h2>

          {/* Sub */}
          <motion.p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize:   '15px',
              color:      '#404040',
              lineHeight: 1.7,
            }}
            {...reveal(0.2)}
          >
            Stacks modernas, arquitetura escalável e ferramentas premium utilizadas
            para criar experiências digitais sofisticadas.
          </motion.p>
        </div>

        {/* ── Marquee rows ───────────────────────────────────────────────── */}
        <div>
          {ROWS.map((row, i) => {
            const items = ALL_TECH.filter((t) =>
              (row.cats as readonly string[]).includes(t.category)
            )
            if (!items.length) return null
            return (
              <TechMarqueeRow
                key={row.label}
                label={row.label}
                index={i}
                items={items}
                direction={row.dir}
                speed={row.speed}
              />
            )
          })}
        </div>

        {/* ── Bottom rule ────────────────────────────────────────────────── */}
        <div
          style={{
            borderTop:  '1px solid rgba(255,255,255,0.042)',
            marginTop:  '0px',
          }}
        />

      </Container>

      {/* ── Bottom separator ───────────────────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0" style={{ zIndex: 6 }}>
        <GradientLine orientation="horizontal" accentSide="center" />
      </div>
    </section>
  )
})
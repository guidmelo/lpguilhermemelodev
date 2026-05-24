'use client'

import { memo, useRef } from 'react'
import { motion }            from 'framer-motion'
import * as Tooltip          from '@radix-ui/react-tooltip'
import { Container }         from '@/components/layout/container'
import { GradientLine }      from '@/components/effects/gradient-line'
import { CompileTerminal }   from './compile-terminal'
import { TechBadge }         from '@/components/tech/tech-badge'
import { TECH_CATEGORIES }   from '@/data/tech-stack'
import type { TechCategoryGroup } from '@/data/tech-stack'

/* ── Motion variants (module-level — no recreation on render) ───────────────── */

const badgeContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } },
}

/* ── CategoryCard ─────────────────────────────────────────────────────────────── */

const CategoryCard = memo(function CategoryCard({
  cat,
  index,
}: {
  cat:   TechCategoryGroup
  index: number
}) {
  const spotRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width)  * 100
    const y = ((e.clientY - rect.top)  / rect.height) * 100
    if (spotRef.current) {
      spotRef.current.style.background = `radial-gradient(circle 130px at ${x}% ${y}%, ${cat.accent}09, transparent)`
      spotRef.current.style.opacity    = '1'
    }
  }

  const onLeave = () => {
    if (spotRef.current) spotRef.current.style.opacity = '0'
  }

  return (
    <motion.div
      className={cat.col}
      style={{
        position:     'relative',
        background:   'rgba(4,4,4,0.96)',
        border:       '1px solid rgba(255,255,255,0.055)',
        borderRadius: '12px',
        padding:      '18px 20px',
        overflow:     'hidden',
      }}
      initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true as const, margin: '-40px' }}
      transition={{ duration: 0.6, delay: 0.04 * index, ease: [0.16, 1, 0.3, 1] as const }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Spotlight */}
      <div
        ref={spotRef}
        aria-hidden
        style={{
          position:     'absolute',
          inset:        0,
          pointerEvents:'none',
          opacity:      0,
          transition:   'opacity 0.15s ease',
          zIndex:       0,
          borderRadius: '12px',
        }}
      />

      {/* Category header */}
      <div
        style={{
          position:       'relative',
          zIndex:         1,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          marginBottom:   '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div
            style={{
              width:        '4px',
              height:       '4px',
              borderRadius: '50%',
              background:   cat.accent,
              flexShrink:   0,
            }}
          />
          <span
            style={{
              fontFamily:    "'JetBrains Mono', monospace",
              fontSize:      '9px',
              color:         '#282828',
              letterSpacing: '0.09em',
            }}
          >
            {cat.label.toUpperCase()}
          </span>
        </div>
        <span
          style={{
            fontFamily:    "'JetBrains Mono', monospace",
            fontSize:      '8px',
            color:         cat.accent,
            background:    cat.accent + '10',
            border:        `1px solid ${cat.accent}20`,
            borderRadius:  '3px',
            padding:       '1.5px 6px',
            letterSpacing: '0.04em',
            opacity:       0.7,
          }}
        >
          {cat.items.length}
        </span>
      </div>

      {/* Badge grid with stagger */}
      <motion.div
        variants={badgeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true as const, margin: '-40px' }}
        style={{
          position:  'relative',
          zIndex:    1,
          display:   'flex',
          flexWrap:  'wrap',
          gap:       '5px',
        }}
      >
        {cat.items.map((item) => (
          <TechBadge key={item.name} item={item} accentColor={cat.accent} />
        ))}
      </motion.div>
    </motion.div>
  )
})

/* ── Reveal helper ──────────────────────────────────────────────────────────── */

const reveal = (delay: number) => ({
  initial:     { opacity: 0, y: 14, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  viewport:    { once: true as const, margin: '-40px' },
  transition:  { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
})

/* ── TechStackSection ────────────────────────────────────────────────────────── */

export const TechStackSection = memo(function TechStackSection() {
  return (
    <Tooltip.Provider>
      <section
        id="stack"
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
              'radial-gradient(ellipse 55% 45% at 50% 0%,   rgba(255,107,0,0.04)   0%, transparent 65%)',
              'radial-gradient(ellipse 40% 40% at 0%  100%, rgba(79,142,247,0.025) 0%, transparent 65%)',
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
            backgroundSize: '72px 72px',
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
                  TECH STACK // 9 CATEGORIAS · 60+ FERRAMENTAS
                </span>
              </div>
            </motion.div>

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

            <motion.p
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize:   '16px',
                color:      '#484848',
                lineHeight: 1.7,
              }}
              {...reveal(0.2)}
            >
              Stacks modernas, arquitetura escalável e ferramentas premium utilizadas
              para criar experiências digitais sofisticadas.
            </motion.p>
          </div>

          {/* Compile terminal */}
          <motion.div className="mb-3" {...reveal(0.25)}>
            <CompileTerminal />
          </motion.div>

          {/* Category grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
            {TECH_CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.label} cat={cat} index={i} />
            ))}
          </div>

        </Container>

        {/* Bottom separator */}
        <div className="absolute bottom-0 inset-x-0" style={{ zIndex: 6 }}>
          <GradientLine orientation="horizontal" accentSide="center" />
        </div>
      </section>
    </Tooltip.Provider>
  )
})

'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'

/* ── Narrative split into logical beats ──────────────────────────────────── */
const PARAGRAPHS = [
  {
    text: 'Meu nome é Guilherme Melo. Tenho 21 anos e sou empreendedor desde os 15 — desde muito cedo sempre fui o cara do computador, completamente imerso em tecnologia, sistemas e internet.',
    weight: 'normal',
  },
  {
    text: 'Minha primeira experiência real com programação aconteceu em 2022, estudando Python voltado para análise de dados.',
    weight: 'normal',
  },
  {
    text: 'Em 2023 conquistei minha primeira oportunidade profissional em uma startup, atuando diretamente com desenvolvimento e soluções internas.',
    weight: 'normal',
  },
  {
    text: 'Com o tempo comecei a desenvolver aplicações, sistemas e ferramentas para empresas — criando soluções focadas em performance operacional e crescimento digital.',
    weight: 'normal',
  },
  {
    text: 'Em 2025 aprofundei meus estudos em inteligência artificial e agentes autônomos, construindo fluxos operacionais altamente otimizados.',
    weight: 'normal',
  },
  {
    text: 'Atualmente também estudo cybersecurity — com foco em elevar o nível de segurança, performance e robustez dos sistemas que desenvolvo.',
    weight: 'normal',
  },
  {
    text: 'Meu objetivo como empreendedor é construir uma software house reconhecida globalmente.',
    weight: 'accent',  /* last paragraph gets elevated treatment */
  },
] as const

/* ── Reveal helper (whileInView scroll-triggered) ────────────────────────── */
const reveal = (delay: number) => ({
  initial:   { opacity: 0, y: 14, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport:  { once: true as const, margin: '-40px' },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
})

/* ── StoryReveal ─────────────────────────────────────────────────────────── */
export const StoryReveal = memo(function StoryReveal() {
  return (
    <div className="flex flex-col gap-7">

      {/* Section badge */}
      <motion.div {...reveal(0)}>
        <div
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
          style={{
            background:  'rgba(255,107,0,0.06)',
            border:      '1px solid rgba(255,107,0,0.18)',
            backdropFilter: 'blur(8px)',
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
            SOBRE // GUILHERME MELO
          </span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h2
        style={{
          fontFamily:    "'Clash Display', sans-serif",
          fontSize:      'clamp(1.75rem, 3.5vw, 2.6rem)',
          fontWeight:    700,
          color:         '#F3F3F3',
          letterSpacing: '-0.03em',
          lineHeight:    1.12,
        }}
        {...reveal(0.1)}
      >
        Tecnologia,{' '}
        <span style={{ color: '#FF6B00' }}>construção</span>
        {' '}e{' '}
        <span style={{ color: '#FF6B00' }}>evolução</span>
        {' '}constante.
      </motion.h2>

      {/* Intro paragraph */}
      <motion.p
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize:   '17px',
          color:      '#5a5a5a',
          lineHeight: 1.75,
          maxWidth:   '500px',
        }}
        {...reveal(0.2)}
      >
        Minha trajetória sempre esteve conectada à tecnologia, construção
        de sistemas e desenvolvimento de soluções digitais modernas.
      </motion.p>

      {/* Thin divider */}
      <motion.div
        style={{ height: '1px', background: 'rgba(255,255,255,0.04)' }}
        {...reveal(0.28)}
      />

      {/* Narrative paragraphs — stagger on scroll */}
      <div className="flex flex-col gap-4">
        {PARAGRAPHS.map((para, i) => {
          const isAccent = para.weight === 'accent'
          return (
            <motion.p
              key={i}
              style={{
                fontFamily:   "'Satoshi', sans-serif",
                fontSize:     '14.5px',
                color:        isAccent ? '#c8c8c8' : '#4a4a4a',
                lineHeight:   1.8,
                borderLeft:   isAccent ? '2px solid rgba(255,107,0,0.35)' : undefined,
                paddingLeft:  isAccent ? '14px' : undefined,
                fontStyle:    isAccent ? 'italic' : undefined,
              }}
              {...reveal(0.32 + i * 0.07)}
            >
              {para.text}
            </motion.p>
          )
        })}
      </div>
    </div>
  )
})

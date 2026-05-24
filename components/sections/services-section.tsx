'use client'

import { memo } from 'react'
import {
  Globe, Layers, BarChart3, Zap,
  Monitor, Database, MessageSquare,
  Network, Cpu,
} from 'lucide-react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

import { Container }   from '@/components/layout/container'
import { GradientLine } from '@/components/effects/gradient-line'
import { ServiceCard }  from './services/service-card'

/* ── Service catalogue ───────────────────────────────────────────────────── */
interface ServiceDef {
  icon:      LucideIcon
  title:     string
  desc:      string
  tag:       string
  featured:  boolean
  /** Tailwind col-span classes for each breakpoint */
  colClass:  string
}

const SERVICES: ServiceDef[] = [
  {
    icon:     Globe,
    title:    'Criação de Sites',
    desc:     'Experiências digitais modernas desenvolvidas para transmitir percepção premium, performance e conversão real.',
    tag:      'UX Premium',
    featured: true,
    colClass: 'lg:col-span-7',
  },
  {
    icon:     Layers,
    title:    'Sistemas SaaS',
    desc:     'Plataformas escaláveis com arquitetura moderna, automação inteligente e experiência de uso premium de ponta a ponta.',
    tag:      'Escalabilidade',
    featured: false,
    colClass: 'lg:col-span-5',
  },
  {
    icon:     BarChart3,
    title:    'Gestão de Tráfego',
    desc:     'Estratégias de aquisição focadas em crescimento previsível, autoridade digital e geração de demanda qualificada.',
    tag:      'Alta Performance',
    featured: false,
    colClass: 'lg:col-span-5',
  },
  {
    icon:     Zap,
    title:    'Automações',
    desc:     'Fluxos inteligentes capazes de otimizar processos, atendimento e operações em escala sem adicionar complexidade.',
    tag:      'Automação Inteligente',
    featured: false,
    colClass: 'lg:col-span-7',
  },
  {
    icon:     Monitor,
    title:    'Landing Pages',
    desc:     'Páginas de alta conversão projetadas para capturar demanda, transmitir autoridade e acelerar resultados.',
    tag:      'Conversão',
    featured: false,
    colClass: 'lg:col-span-4',
  },
  {
    icon:     Database,
    title:    'ERPs',
    desc:     'Sistemas de gestão empresarial que centralizam operações, dados e processos em uma única plataforma moderna.',
    tag:      'Arquitetura Moderna',
    featured: false,
    colClass: 'lg:col-span-4',
  },
  {
    icon:     MessageSquare,
    title:    'Chatbots',
    desc:     'Atendimento inteligente automatizado com processamento de linguagem natural e integrações nativas em escala.',
    tag:      'Sistemas Inteligentes',
    featured: false,
    colClass: 'lg:col-span-4',
  },
  {
    icon:     Network,
    title:    'Estruturação Digital',
    desc:     'Diagnóstico e implementação da infraestrutura digital completa: presença, sistemas e processos integrados.',
    tag:      'Ecossistema Digital',
    featured: false,
    colClass: 'lg:col-span-6',
  },
  {
    icon:     Cpu,
    title:    'Integrações Inteligentes',
    desc:     'Conexão entre plataformas, APIs e ferramentas para criar ecossistemas digitais coesos e automatizados.',
    tag:      'API & Conectividade',
    featured: false,
    /* full-width on tablet, half on desktop */
    colClass: 'md:col-span-2 lg:col-span-6',
  },
]

/* ── Grid layout (12 col on desktop) ─────────────────────────────────────
 *
 *  Row 1:  [Criação de Sites ── 7] [SaaS ──────────── 5]
 *  Row 2:  [Tráfego ─────── 5]    [Automações ──────── 7]
 *  Row 3:  [Landing ─ 4]   [ERP ─ 4]   [Chatbot ─── 4]
 *  Row 4:  [Estruturação ──── 6] [Integrações ──────── 6]
 *
 *  Asymmetry is created through alternating 7/5 and 5/7 wide rows,
 *  giving optical rhythm without complex grid-template-areas.
 * ────────────────────────────────────────────────────────────────────────*/

/* ── Scroll reveal helper ────────────────────────────────────────────────── */
const reveal = (delay: number) => ({
  initial:     { opacity: 0, y: 14, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport:    { once: true as const, margin: '-40px' },
  transition:  { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
})

/* ── ServicesSection ─────────────────────────────────────────────────────── */
export const ServicesSection = memo(function ServicesSection() {
  return (
    <section
      id="servicos"
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
            'radial-gradient(ellipse 60% 50% at 100% 15%, rgba(255,107,0,0.04) 0%, transparent 65%)',
            'radial-gradient(ellipse 50% 60% at 0% 85%,  rgba(255,107,0,0.03) 0%, transparent 65%)',
          ].join(', '),
        }}
      />

      {/* ── Subtle grid texture ──────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex:          0,
          backgroundImage: [
            'linear-gradient(rgba(255,255,255,0.011) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255,255,255,0.011) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '80px 80px',
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
                background:  'rgba(255,107,0,0.06)',
                border:      '1px solid rgba(255,107,0,0.18)',
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
                ESPECIALIDADES // 9 SERVIÇOS
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
            Estruturas digitais modernas para empresas que querem{' '}
            <span style={{ color: '#FF6B00' }}>crescer.</span>
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
            Desenvolvimento, automação e crescimento digital unidos em soluções
            premium focadas em performance, percepção e escalabilidade.
          </motion.p>
        </div>

        {/* ── Asymmetric Bento grid ──────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
          {SERVICES.map((svc, i) => (
            <ServiceCard
              key={svc.title}
              icon={svc.icon}
              title={svc.title}
              desc={svc.desc}
              tag={svc.tag}
              index={i}
              featured={svc.featured}
              className={svc.colClass}
            />
          ))}
        </div>

        {/* ── Bottom CTA strip ──────────────────────── */}
        <motion.div
          className="mt-12 flex items-center justify-between flex-wrap gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '2.5rem' }}
          {...reveal(0.5)}
        >
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize:   '14px',
              color:      '#3a3a3a',
              lineHeight: 1.6,
            }}
          >
            Precisa de algo específico?{' '}
            <span style={{ color: '#6a6a6a' }}>Cada projeto é único — soluções sob medida disponíveis.</span>
          </p>
          <motion.button
            style={{
              fontFamily:    "'Satoshi', sans-serif",
              fontSize:      '13px',
              fontWeight:    500,
              color:         '#FF6B00',
              background:    'rgba(255,107,0,0.07)',
              border:        '1px solid rgba(255,107,0,0.2)',
              borderRadius:  '8px',
              padding:       '8px 18px',
              cursor:        'pointer',
              letterSpacing: '-0.01em',
              whiteSpace:    'nowrap',
              transition:    'background 0.2s ease',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,107,0,0.13)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,107,0,0.07)' }}
          >
            Solicitar diagnóstico
          </motion.button>
        </motion.div>
      </Container>

      {/* ── Bottom separator ─────────────────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0" style={{ zIndex: 6 }}>
        <GradientLine orientation="horizontal" accentSide="center" />
      </div>
    </section>
  )
})

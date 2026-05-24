'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Globe, BarChart3, Cpu, Layers, Network } from 'lucide-react'

import { Container }        from '@/components/layout/container'
import { Button }           from '@/components/ui/button'
import { GradientLine }     from '@/components/effects/gradient-line'
import { MagneticWrapper }  from '@/components/effects/magnetic-wrapper'
import { AnimatedCodeBg }   from './hero/animated-code-bg'
import { HeroImage }        from './hero/hero-image'
import { HeadlineReveal }   from './hero/headline-reveal'
import { ScrollIndicator }  from './hero/scroll-indicator'

/* ── Content constants ───────────────────────────────────────────────────── */
const HEADLINE     = 'Tecnologia, automação e crescimento digital para empresas que querem escalar.'
const ACCENT_WORDS = ['automação', 'escalar.']

const SUBHEADLINE =
  'Desenvolvimento web, SaaS, tráfego pago e sistemas inteligentes para empresas que desejam crescer com estruturas digitais modernas.'

const SERVICES = [
  { label: 'Sites modernos',       icon: Globe    },
  { label: 'SaaS',                 icon: Layers   },
  { label: 'Tráfego pago',         icon: BarChart3 },
  { label: 'Automações',           icon: Zap      },
  { label: 'Sistemas inteligentes', icon: Cpu      },
  { label: 'Estrutura digital',    icon: Network  },
]

/* ── Entrance timing helpers ─────────────────────────────────────────────── */
const fadeUp = (delay: number) => ({
  initial:    { opacity: 0, y: 20, filter: 'blur(4px)' },
  animate:    { opacity: 1, y: 0,  filter: 'blur(0px)' },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
})

/* ── GlowBadge (top label) ───────────────────────────────────────────────── */
const GlowBadge = memo(function GlowBadge() {
  return (
    <motion.div {...fadeUp(0.1)} className="inline-flex items-center">
      <div
        className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
        style={{
          background:  'rgba(255,107,0,0.06)',
          border:      '1px solid rgba(255,107,0,0.2)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <motion.span
          className="rounded-full"
          style={{ width: '5px', height: '5px', background: '#FF6B00', display: 'inline-block' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span
          style={{
            fontFamily:    "'JetBrains Mono', monospace",
            fontSize:      '10px',
            color:         '#FF6B00',
            letterSpacing: '0.08em',
          }}
        >
          SOFTWARE HOUSE // GUILHERME MELO
        </span>
      </div>
    </motion.div>
  )
})

/* ── Service badge row ───────────────────────────────────────────────────── */
const ServiceBadges = memo(function ServiceBadges() {
  return (
    <motion.div
      className="flex flex-wrap gap-2"
      initial="hidden"
      animate="visible"
      variants={{
        hidden:  {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.9 } },
      }}
    >
      {SERVICES.map(({ label, icon: Icon }) => (
        <motion.div
          key={label}
          variants={{
            hidden:  { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 cursor-default transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border:     '1px solid rgba(255,255,255,0.07)',
              fontSize:   '11.5px',
              color:      '#525252',
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor    = 'rgba(255,107,0,0.25)'
              el.style.color          = '#c8c8c8'
              el.style.background     = 'rgba(255,107,0,0.04)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor    = 'rgba(255,255,255,0.07)'
              el.style.color          = '#525252'
              el.style.background     = 'rgba(255,255,255,0.02)'
            }}
          >
            <Icon size={11} strokeWidth={1.5} aria-hidden />
            {label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
})

/* ── Stats strip ─────────────────────────────────────────────────────────── */
const StatsStrip = memo(function StatsStrip() {
  const stats = [
    { value: '47+',    label: 'Projetos'   },
    { value: '4 anos', label: 'Experiência' },
    { value: '100%',   label: 'Satisfação' },
  ]

  return (
    <motion.div
      {...fadeUp(0.82)}
      className="flex gap-8 pt-6"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {stats.map(({ value, label }) => (
        <div key={label}>
          <p
            style={{
              fontFamily:    "'Clash Display', sans-serif",
              fontSize:      '22px',
              fontWeight:    700,
              color:         '#F3F3F3',
              letterSpacing: '-0.025em',
              lineHeight:    1.1,
            }}
          >
            {value}
          </p>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize:   '9px',
              color:      '#3a3a3a',
              marginTop:  '3px',
              letterSpacing: '0.06em',
            }}
          >
            {label.toUpperCase()}
          </p>
        </div>
      ))}
    </motion.div>
  )
})

/* ── Main HeroSection ────────────────────────────────────────────────────── */
export const HeroSection = memo(function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      {/* ── Layer 0: Live tech background ──────────────────────────────── */}
      <AnimatedCodeBg />

      {/* ── Layer 1: Section ambient lighting ──────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex:     1,
          background: [
            'radial-gradient(ellipse 60% 50% at 100% 40%, rgba(255,107,0,0.055) 0%, transparent 65%)',
            'radial-gradient(ellipse 40% 60% at 0% 60%,  rgba(255,107,0,0.03)  0%, transparent 65%)',
            'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(10,10,10,0.95) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      {/* ── Layer 2: Content ────────────────────────────────────────────── */}
      <Container
        className="relative"
        style={{ zIndex: 10, paddingTop: '7rem', paddingBottom: '6rem' } as React.CSSProperties}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-12 xl:gap-20 items-center">

          {/* ── Left column: Text ─────────────────────────────────────── */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">

            {/* Top badge */}
            <GlowBadge />

            {/* Headline — word cascade */}
            <HeadlineReveal
              text={HEADLINE}
              accentWords={ACCENT_WORDS}
              className="text-display-xl font-display text-white"
            />

            {/* Subheadline */}
            <motion.p
              {...fadeUp(0.52)}
              className="text-body-lg max-w-[520px]"
            >
              {SUBHEADLINE}
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.66)} className="flex flex-wrap items-center gap-3">
              <MagneticWrapper strength={0.22}>
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight size={15} />}
                >
                  Solicitar diagnóstico estratégico
                </Button>
              </MagneticWrapper>
              <MagneticWrapper strength={0.18}>
                <Button variant="secondary" size="lg">
                  Ver portfólio
                </Button>
              </MagneticWrapper>
            </motion.div>

            {/* Service badges */}
            <ServiceBadges />

            {/* Stats */}
            <StatsStrip />
          </div>

          {/* ── Right column: Photo ────────────────────────────────────── */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0,  filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-full">
              <HeroImage />
            </div>
          </motion.div>
        </div>
      </Container>

      {/* ── Bottom gradient ──────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 inset-x-0"
        style={{
          zIndex:     5,
          height:     '180px',
          background: 'linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.6) 50%, transparent 100%)',
        }}
      />

      {/* ── Separator line at the very bottom ─────────────────────────── */}
      <div
        className="absolute bottom-0 inset-x-0"
        style={{ zIndex: 6 }}
      >
        <GradientLine orientation="horizontal" accentSide="center" animate />
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 6 }}>
        <ScrollIndicator />
      </div>
    </section>
  )
})

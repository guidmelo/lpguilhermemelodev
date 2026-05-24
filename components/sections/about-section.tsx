'use client'

import { memo } from 'react'

import { Container }          from '@/components/layout/container'
import { GradientLine }       from '@/components/effects/gradient-line'
import { CinematicPortrait }  from './about/cinematic-portrait'
import { StoryReveal }        from './about/story-reveal'
import { TimelineExperience } from './about/timeline-experience'
import { FloatingCodeCards }  from './about/floating-code-cards'

/* ── AboutSection ────────────────────────────────────────────────────────── *
 *  Structure:
 *    ① Atmospheric background (floating code fragments + ambient radials)
 *    ② Split grid: CinematicPortrait (left) | StoryReveal (right)
 *    ③ Full-width TimelineExperience
 *
 *  All animations are scroll-triggered (whileInView, once: true) — safe to
 *  mount below the fold without affecting initial page performance.
 * ──────────────────────────────────────────────────────────────────────────*/

export const AboutSection = memo(function AboutSection() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden"
      style={{ paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      {/* ── Top separator ──────────────────────────────────────────────────── */}
      <div className="absolute top-0 inset-x-0" style={{ zIndex: 6 }}>
        <GradientLine orientation="horizontal" accentSide="center" />
      </div>

      {/* ── Ambient radial lighting ─────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex:     0,
          background: [
            'radial-gradient(ellipse 55% 65% at 0% 35%, rgba(255,107,0,0.04) 0%, transparent 65%)',
            'radial-gradient(ellipse 45% 50% at 100% 75%, rgba(255,107,0,0.025) 0%, transparent 65%)',
            'radial-gradient(ellipse 70% 30% at 50% 0%, rgba(10,10,10,0.9) 0%, transparent 55%)',
          ].join(', '),
        }}
      />

      {/* ── Subtle grid pattern ─────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex:          0,
          backgroundImage: [
            'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize:  '80px 80px',
        }}
      />

      {/* ── Floating atmospheric code cards ────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 1 }}
      >
        <FloatingCodeCards />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <Container
        className="relative"
        style={{ zIndex: 10 } as React.CSSProperties}
      >
        {/* Split layout: portrait | narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] gap-16 xl:gap-24 items-start">
          <CinematicPortrait />
          <StoryReveal />
        </div>

        {/* Full-width timeline */}
        <div style={{ marginTop: '6rem' }}>
          {/* Thin rule above timeline */}
          <div
            style={{
              height:       '1px',
              background:   'rgba(255,255,255,0.04)',
              marginBottom: '4rem',
            }}
          />
          <TimelineExperience />
        </div>
      </Container>

      {/* ── Bottom separator ───────────────────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0" style={{ zIndex: 6 }}>
        <GradientLine orientation="horizontal" accentSide="center" />
      </div>
    </section>
  )
})

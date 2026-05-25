'use client'

/*
 * ProfileImage — cinematic hero photo with:
 *   • Mouse-driven spring parallax (zero re-renders via MotionValue chain)
 *   • Slow infinite float animation
 *   • Orange radial glow that follows mouse at 60% speed (depth illusion)
 *   • HUD grid + scanlines masked to center (barely visible, purely atmospheric)
 *   • Corner brackets (tech aesthetic)
 *   • Bottom vignette blending into page background
 *   • Cinema-grade CSS filter — preserves skin tones, subtle contrast boost
 *   • Floating glass badges (availability, metrics, stack)
 *
 * DROP PHOTO HERE:
 *   /public/assets/images/profile/guilherme-melo-main.png
 *   Transparent-background PNG, portrait ~3:4 ratio recommended
 */

import { memo } from 'react'
import Image from 'next/image'
import { motion, useTransform, useSpring } from 'framer-motion'
import { useMouse } from '@/hooks/use-mouse'

const PHOTO = '/assets/images/profile/guilherme-melo-main.png'

/* ── HUD corner brackets ────────────────────────────────────────────────── */

function HUDCorners() {
  const S = 20
  const base: React.CSSProperties = {
    position:      'absolute',
    width:         S,
    height:        S,
    borderColor:   'rgba(255,107,0,0.16)',
    borderStyle:   'solid',
    pointerEvents: 'none',
  }
  return (
    <>
      <div aria-hidden style={{ ...base, top: 0, left: 0, borderWidth: '1px 0 0 1px' }} />
      <div aria-hidden style={{ ...base, top: 0, right: 0, borderWidth: '1px 1px 0 0' }} />
      <div aria-hidden style={{ ...base, bottom: 0, left: 0, borderWidth: '0 0 1px 1px' }} />
      <div aria-hidden style={{ ...base, bottom: 0, right: 0, borderWidth: '0 1px 1px 0' }} />
    </>
  )
}

/* ── Floating glass card (reusable) ─────────────────────────────────────── */

function GlassCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background:           'rgba(14,14,14,0.9)',
        border:               '1px solid rgba(255,255,255,0.07)',
        backdropFilter:       'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow:            '0 12px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ── ProfileImage ────────────────────────────────────────────────────────── */

export const ProfileImage = memo(function ProfileImage() {
  const { xNorm, yNorm } = useMouse()

  /* Smooth spring parallax — full chain on MotionValues, no React state */
  const rawX    = useTransform(xNorm, [0, 1], [-12,  12])
  const rawY    = useTransform(yNorm, [0, 1], [ -7,   7])
  const rawTX   = useTransform(xNorm, [0, 1], [  3,  -3])
  const rawTY   = useTransform(yNorm, [0, 1], [ -2,   2])
  const moveX   = useSpring(rawX,  { stiffness: 52, damping: 22 })
  const moveY   = useSpring(rawY,  { stiffness: 52, damping: 22 })
  const rotateY = useSpring(rawTX, { stiffness: 48, damping: 22 })
  const rotateX = useSpring(rawTY, { stiffness: 48, damping: 22 })
  /* Glow drifts at 60% — depth illusion */
  const glowX   = useTransform(moveX, (v) => v * 0.6)
  const glowY   = useTransform(moveY, (v) => v * 0.6)

  return (
    <div
      className="relative select-none"
      style={{ height: 'clamp(380px, 55vh, 540px)' }}
    >

      {/* ── Ambient orange glow — breathes slowly ──────────────────────── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          x:          glowX,
          y:          glowY,
          background: [
            'radial-gradient(ellipse 55% 68% at 50% 60%, rgba(255,107,0,0.12) 0%, rgba(255,107,0,0.045) 45%, transparent 70%)',
            'radial-gradient(ellipse 28% 35% at 46% 28%, rgba(255,140,60,0.06) 0%, transparent 60%)',
          ].join(', '),
          filter: 'blur(36px)',
          zIndex:  0,
        }}
        animate={{ opacity: [0.68, 1, 0.68] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── HUD grid — masked radial, barely visible ────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex:          0,
          backgroundImage: [
            'linear-gradient(rgba(255,107,0,0.024) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255,107,0,0.024) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize:     '42px 42px',
          maskImage:          'radial-gradient(ellipse 62% 72% at 50% 56%, black 0%, transparent 78%)',
          WebkitMaskImage:    'radial-gradient(ellipse 62% 72% at 50% 56%, black 0%, transparent 78%)',
        }}
      />

      {/* ── Scanlines — barely-there cinematic texture ──────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex:          0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,107,0,0.009) 3px, rgba(255,107,0,0.009) 4px)',
          maskImage:       'radial-gradient(ellipse 50% 55% at 50% 50%, black 0%, transparent 88%)',
          WebkitMaskImage: 'radial-gradient(ellipse 50% 55% at 50% 50%, black 0%, transparent 88%)',
        }}
      />

      {/* ── HUD corner brackets ─────────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <HUDCorners />
      </div>

      {/* ── Photo — infinite float + spring parallax ────────────────────── */}
      <motion.div
        className="absolute inset-0"
        style={{ zIndex: 2 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="w-full h-full"
          style={{
            x:              moveX,
            y:              moveY,
            rotateX,
            rotateY,
            perspective:    900,
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={PHOTO}
              alt="Guilherme Melo — Engenheiro e Fundador da Software House"
              fill
              priority
              draggable={false}
              style={{
                objectFit:      'contain',
                objectPosition: 'bottom center',
                /*
                 * Cinema grade — keeps skin tones accurate:
                 * contrast(1.04)  → +4% depth, shadow crunch
                 * brightness(0.96) → slight underexposure = cinematic
                 * saturate(0.92)  → slight desaturation = premium feel
                 */
                filter:     'contrast(1.04) brightness(0.96) saturate(0.92)',
                userSelect: 'none',
              }}
            />

            {/* Bottom vignette — figure dissolves into page background */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                height:     '32%',
                background: 'linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.72) 40%, transparent 100%)',
                zIndex:     1,
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* ── Badge: availability ─────────────────────────────────────────── */}
      <motion.div
        className="absolute"
        style={{ top: '14%', right: '-6%', zIndex: 6 }}
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <GlassCard style={{ borderRadius: '999px', padding: '6px 12px' }}>
          <div className="flex items-center gap-2">
            <motion.span
              style={{
                width:        '6px',
                height:       '6px',
                background:   '#4ade80',
                borderRadius: '50%',
                display:      'inline-block',
                flexShrink:   0,
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span
              style={{
                fontFamily:  "'JetBrains Mono', monospace",
                fontSize:    '10px',
                color:       '#c8c8c8',
                whiteSpace:  'nowrap',
                letterSpacing: '0.02em',
              }}
            >
              Available
            </span>
          </div>
        </GlassCard>
      </motion.div>

      {/* ── Badge: metric card ──────────────────────────────────────────── */}
      <motion.div
        className="absolute"
        style={{ bottom: '28%', left: '-8%', zIndex: 6 }}
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <GlassCard style={{ borderRadius: '12px', padding: '10px 14px' }}>
            <p
              style={{
                fontFamily:    "'Clash Display', sans-serif",
                fontSize:      '19px',
                fontWeight:    700,
                color:         '#F3F3F3',
                letterSpacing: '-0.025em',
                lineHeight:    1,
                marginBottom:  '3px',
              }}
            >
              47+
            </p>
            <p
              style={{
                fontFamily:    "'JetBrains Mono', monospace",
                fontSize:      '9px',
                color:         '#484848',
                letterSpacing: '0.07em',
              }}
            >
              PROJETOS
            </p>
          </GlassCard>
        </motion.div>
      </motion.div>

      {/* ── Badge: tech stack ───────────────────────────────────────────── */}
      <motion.div
        className="absolute"
        style={{ top: '42%', right: '-10%', zIndex: 6 }}
        initial={{ opacity: 0, x: 14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.85, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        >
          <GlassCard style={{ borderRadius: '10px', padding: '8px 10px' }}>
            <div className="flex items-center gap-1.5">
              {['Next.js', 'AI', 'Node'].map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily:    "'JetBrains Mono', monospace",
                    fontSize:      '9px',
                    color:         '#FF6B00',
                    background:    'rgba(255,107,0,0.08)',
                    border:        '1px solid rgba(255,107,0,0.16)',
                    borderRadius:  '4px',
                    padding:       '2px 5px',
                    letterSpacing: '0.01em',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>

    </div>
  )
})

'use client'

/*
 * SVG is landscape (viewBox 0 0 1101 803, ratio ≈ 1.37:1).
 * Using object-fit:cover in a portrait container to crop to person.
 * Centering vertically in section aligns head with headline.
 */

import { memo } from 'react'
import { motion, useTransform, useSpring } from 'framer-motion'
import { useMouse } from '@/hooks/use-mouse'

const PHOTO = '/assets/images/profile/guilherme-melo-main.svg'

function GlassCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background:           'rgba(10,10,10,0.82)',
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

export const ProfileImage = memo(function ProfileImage() {
  const { xNorm, yNorm } = useMouse()

  const rawX    = useTransform(xNorm, [0, 1], [-10,  10])
  const rawY    = useTransform(yNorm, [0, 1], [ -6,   6])
  const rawTX   = useTransform(xNorm, [0, 1], [  2,  -2])
  const rawTY   = useTransform(yNorm, [0, 1], [ -1.5, 1.5])
  const moveX   = useSpring(rawX,  { stiffness: 52, damping: 22 })
  const moveY   = useSpring(rawY,  { stiffness: 52, damping: 22 })
  const rotateY = useSpring(rawTX, { stiffness: 48, damping: 22 })
  const rotateX = useSpring(rawTY, { stiffness: 48, damping: 22 })
  const glowX   = useTransform(moveX, (v) => v * 0.6)
  const glowY   = useTransform(moveY, (v) => v * 0.6)

  return (
    /*
     * Root fills the container.
     * Mobile:  h-[420px] container → root is 420px, portrait crop fits inside.
     * Desktop: absolute inset-y-0 container → root is section height (100dvh).
     * align-items:center vertically centers the portrait frame alongside the headline.
     */
    <div
      className="relative select-none"
      style={{
        width:          '100%',
        height:         '100%',
        display:        'flex',
        justifyContent: 'flex-end',
        alignItems:     'center',
        overflow:       'visible',
      }}
    >
      {/* ── Ambient glow — bleeds left into text area for depth ──────────── */}
      <motion.div
        aria-hidden
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0,
          left: '-40%',   /* deliberately bleeds left to light the text column */
          x:          glowX,
          y:          glowY,
          background: [
            'radial-gradient(ellipse 80% 80% at 65% 55%, rgba(255,107,0,0.22) 0%, rgba(255,107,0,0.08) 48%, transparent 72%)',
            'radial-gradient(ellipse 45% 50% at 58% 20%, rgba(255,140,60,0.09) 0%, transparent 65%)',
          ].join(', '),
          filter: 'blur(55px)',
          zIndex:  0,
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── HUD grid ────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex:          1,
          backgroundImage: [
            'linear-gradient(rgba(255,107,0,0.022) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255,107,0,0.022) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize:     '42px 42px',
          maskImage:          'radial-gradient(ellipse 80% 88% at 65% 55%, black 0%, transparent 82%)',
          WebkitMaskImage:    'radial-gradient(ellipse 80% 88% at 65% 55%, black 0%, transparent 82%)',
        }}
      />

      {/* ── Scanlines ────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex:          1,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,107,0,0.009) 3px, rgba(255,107,0,0.009) 4px)',
          maskImage:       'radial-gradient(ellipse 60% 68% at 65% 55%, black 0%, transparent 86%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 68% at 65% 55%, black 0%, transparent 86%)',
        }}
      />

      {/* ── Figure: float outer ─────────────────────────────────────────── */}
      <motion.div
        style={{ position: 'relative', zIndex: 2, flexShrink: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* ── Figure: parallax inner ──────────────────────────────────── */}
        <motion.div
          style={{
            x:              moveX,
            y:              moveY,
            rotateX,
            rotateY,
            perspective:    900,
            transformStyle: 'preserve-3d',
          }}
        >
          {/*
           * Outer wrapper — defines portrait dimensions; overflow:visible so badges pop out.
           * SVG is landscape (1.37:1). object-fit:cover in a portrait container
           * crops it to show the person, while object-position:center shifts to subject.
           *
           * Width: min(100%, 460px) — fills mobile column, capped on desktop.
           * Height: clamp(500px, 84vh, 840px) — dominant on desktop, capped.
           */}
          <div
            style={{
              position: 'relative',
              overflow: 'visible',
              width:    'min(100%, 460px)',
              height:   'clamp(500px, 84vh, 840px)',
            }}
          >
            {/* Inner clip — isolates overflow:hidden to the image only */}
            <div
              aria-hidden={false}
              style={{
                position: 'absolute',
                inset:    0,
                overflow: 'hidden',
              }}
            >
              {/* ── Transparent SVG figure — object-fit crops landscape ── */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHOTO}
                alt="Guilherme Melo — Engenheiro e Fundador da Software House"
                draggable={false}
                style={{
                  width:          '100%',
                  height:         '100%',
                  objectFit:      'cover',
                  /* center horizontally; 10% from top shows head/torso */
                  objectPosition: 'center 10%',
                  display:        'block',
                  filter:         'contrast(1.04) brightness(0.97) saturate(0.92)',
                  userSelect:     'none',
                }}
              />

              {/* ── Bottom vignette ──────────────────────────────────── */}
              <div
                aria-hidden
                style={{
                  position:      'absolute',
                  inset:         'auto 0 0 0',
                  height:        '35%',
                  background:    'linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.6) 50%, transparent 100%)',
                  zIndex:        1,
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* ── Badge: available ─────────────────────────────────────── */}
            <motion.div
              style={{ position: 'absolute', top: '8%', right: '-6%', zIndex: 6, pointerEvents: 'auto' }}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard style={{ borderRadius: '999px', padding: '6px 12px' }}>
                <div className="flex items-center gap-2">
                  <motion.span
                    style={{ width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%', display: 'inline-block', flexShrink: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#c8c8c8', whiteSpace: 'nowrap', letterSpacing: '0.02em' }}>
                    Available
                  </span>
                </div>
              </GlassCard>
            </motion.div>

            {/* ── Badge: projects metric ───────────────────────────────── */}
            <motion.div
              style={{ position: 'absolute', bottom: '30%', left: '-8%', zIndex: 6, pointerEvents: 'auto' }}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}>
                <GlassCard style={{ borderRadius: '12px', padding: '10px 14px' }}>
                  <p style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '19px', fontWeight: 700, color: '#F3F3F3', letterSpacing: '-0.025em', lineHeight: 1, marginBottom: '3px' }}>
                    47+
                  </p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#484848', letterSpacing: '0.07em' }}>
                    PROJETOS
                  </p>
                </GlassCard>
              </motion.div>
            </motion.div>

            {/* ── Badge: tech stack ────────────────────────────────────── */}
            <motion.div
              style={{ position: 'absolute', top: '42%', right: '-10%', zIndex: 6, pointerEvents: 'auto' }}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.85, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}>
                <GlassCard style={{ borderRadius: '10px', padding: '8px 10px' }}>
                  <div className="flex items-center gap-1.5">
                    {['Next.js', 'AI', 'Node'].map((t) => (
                      <span
                        key={t}
                        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#FF6B00', background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.16)', borderRadius: '4px', padding: '2px 5px', letterSpacing: '0.01em' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>
    </div>
  )
})

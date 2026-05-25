'use client'

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

  const rawX    = useTransform(xNorm, [0, 1], [-12,  12])
  const rawY    = useTransform(yNorm, [0, 1], [ -7,   7])
  const rawTX   = useTransform(xNorm, [0, 1], [  3,  -3])
  const rawTY   = useTransform(yNorm, [0, 1], [ -2,   2])
  const moveX   = useSpring(rawX,  { stiffness: 52, damping: 22 })
  const moveY   = useSpring(rawY,  { stiffness: 52, damping: 22 })
  const rotateY = useSpring(rawTX, { stiffness: 48, damping: 22 })
  const rotateX = useSpring(rawTY, { stiffness: 48, damping: 22 })
  const glowX   = useTransform(moveX, (v) => v * 0.6)
  const glowY   = useTransform(moveY, (v) => v * 0.6)

  return (
    /*
     * Root fills 100% of its container.
     * Mobile: container is h-[420px] overflow-hidden → figure cropped at bottom.
     * Desktop: container is absolute inset-y-0 right-0 → figure fills section height.
     */
    <div
      className="relative select-none"
      style={{
        width:   '100%',
        height:  '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems:     'flex-end',
        overflow: 'visible',
      }}
    >
      {/* ── Ambient glow — bleeds left into text area for depth ──────────── */}
      <motion.div
        aria-hidden
        className="pointer-events-none"
        style={{
          position: 'absolute',
          /* Extend glow left beyond the photo container boundary */
          top: 0, right: 0, bottom: 0, left: '-35%',
          x:          glowX,
          y:          glowY,
          background: [
            'radial-gradient(ellipse 85% 90% at 70% 80%, rgba(255,107,0,0.24) 0%, rgba(255,107,0,0.09) 48%, transparent 72%)',
            'radial-gradient(ellipse 55% 55% at 62% 22%, rgba(255,140,60,0.09) 0%, transparent 65%)',
            'radial-gradient(ellipse 40% 35% at 20% 65%,  rgba(255,107,0,0.03) 0%, transparent 60%)',
          ].join(', '),
          filter: 'blur(55px)',
          zIndex:  0,
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── HUD grid — masked to figure area ────────────────────────────── */}
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
          maskImage:          'radial-gradient(ellipse 80% 88% at 68% 78%, black 0%, transparent 82%)',
          WebkitMaskImage:    'radial-gradient(ellipse 80% 88% at 68% 78%, black 0%, transparent 82%)',
        }}
      />

      {/* ── Scanlines ────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex:          1,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,107,0,0.009) 3px, rgba(255,107,0,0.009) 4px)',
          maskImage:       'radial-gradient(ellipse 60% 72% at 68% 72%, black 0%, transparent 86%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 72% at 68% 72%, black 0%, transparent 86%)',
        }}
      />

      {/* ── Figure: float outer ─────────────────────────────────────────── */}
      <motion.div
        style={{
          position:     'relative',
          zIndex:       2,
          marginRight:  '-3%',
          marginBottom: '-1rem',
          flexShrink:   0,
        }}
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
          {/* Inline block so badges can anchor to the figure's real bounds */}
          <div style={{ position: 'relative', display: 'inline-block' }}>

            {/* ── Transparent SVG figure — no baked background ────────── */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTO}
              alt="Guilherme Melo — Engenheiro e Fundador da Software House"
              draggable={false}
              style={{
                /* Desktop: 78vh fills most of the full-section container.
                   Mobile:  max 420px is already capped by the parent.       */
                height:     'clamp(400px, 78vh, 800px)',
                width:      'auto',
                maxWidth:   'none',
                display:    'block',
                filter:     'contrast(1.04) brightness(0.97) saturate(0.92)',
                userSelect: 'none',
              }}
            />

            {/* ── Bottom vignette — figure fades into page bg ─────────── */}
            <div
              aria-hidden
              style={{
                position:      'absolute',
                inset:         'auto 0 0 0',
                height:        '30%',
                background:    'linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.65) 45%, transparent 100%)',
                zIndex:        1,
                pointerEvents: 'none',
              }}
            />

            {/* ── Badge: available ─────────────────────────────────────── */}
            <motion.div
              style={{ position: 'absolute', top: '10%', right: '-8%', zIndex: 6, pointerEvents: 'auto' }}
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
              style={{ position: 'absolute', bottom: '28%', left: '-10%', zIndex: 6, pointerEvents: 'auto' }}
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
              style={{ position: 'absolute', top: '40%', right: '-12%', zIndex: 6, pointerEvents: 'auto' }}
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

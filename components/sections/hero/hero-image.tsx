'use client'

import { memo } from 'react'
import { motion, useTransform, useSpring } from 'framer-motion'
import { useMouse } from '@/hooks/use-mouse'

/* ── HeroImage ───────────────────────────────────────────────────────────── *
 *  Cinematic photo treatment with:
 *  - Mouse-driven depth parallax (MotionValues — no useState)
 *  - Bottom gradient mask (blends into page background)
 *  - Ambient amber glow behind photo
 *  - "Available" status badge overlay
 *  - Floating tech accent cards
 *
 *  To use your own photo: place image at /public/hero-photo.jpg
 *  The placeholder gradient will be replaced automatically.
 * ──────────────────────────────────────────────────────────────────────────*/

export const HeroImage = memo(function HeroImage() {
  const { xNorm, yNorm } = useMouse()

  /* Smooth spring-based parallax — MotionValue chain, zero re-renders */
  const rawTiltX = useTransform(xNorm, [0, 1], [5, -5])
  const rawTiltY = useTransform(yNorm, [0, 1], [-4, 4])
  const rawMoveX = useTransform(xNorm, [0, 1], [-8, 8])
  const rawMoveY = useTransform(yNorm, [0, 1], [-5, 5])

  const rotateY = useSpring(rawTiltX, { stiffness: 60, damping: 20 })
  const rotateX = useSpring(rawTiltY, { stiffness: 60, damping: 20 })
  const moveX   = useSpring(rawMoveX, { stiffness: 60, damping: 20 })
  const moveY   = useSpring(rawMoveY, { stiffness: 60, damping: 20 })

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow — always behind photo */}
      <motion.div
        aria-hidden
        className="absolute rounded-[24px]"
        style={{
          inset:      '-20px',
          background: 'radial-gradient(ellipse at 40% 35%, rgba(255,107,0,0.12) 0%, transparent 65%)',
          filter:     'blur(30px)',
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Deep shadow beneath */}
      <div
        aria-hidden
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width:      '75%',
          height:     '40px',
          background: 'rgba(0,0,0,0.5)',
          filter:     'blur(24px)',
        }}
      />

      {/* Photo frame — 3D perspective tilt */}
      <motion.div
        className="relative w-full"
        style={{
          x:           moveX,
          y:           moveY,
          rotateX,
          rotateY,
          perspective: 900,
          transformStyle: 'preserve-3d',
          maxWidth:    '400px',
        }}
      >
        {/* ── The photo (or placeholder) ─────────────── */}
        <div
          className="relative overflow-hidden rounded-[20px]"
          style={{ aspectRatio: '3 / 4' }}
        >
          {/*
            Photo placeholder — replace with:
            <Image src="/hero-photo.jpg" alt="Guilherme Melo" fill className="object-cover" />
          */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(160deg, #1c1c1c 0%, #141414 40%, #0f0f0f 100%)',
            }}
          />

          {/* Subtle texture overlay on placeholder */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 35% 25%, rgba(255,107,0,0.07) 0%, transparent 55%), radial-gradient(circle at 70% 75%, rgba(80,80,120,0.08) 0%, transparent 50%)',
            }}
          />

          {/* Placeholder initials */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display font-bold select-none"
              style={{
                fontSize:   'clamp(5rem, 12vw, 8rem)',
                color:      'rgba(255,255,255,0.04)',
                letterSpacing: '-0.05em',
                lineHeight: 1,
              }}
            >
              GL
            </span>
          </div>

          {/* Placeholder label */}
          <div
            className="absolute bottom-8 left-0 right-0 flex justify-center"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.12em' }}
          >
            ADD HERO-PHOTO.JPG TO /PUBLIC
          </div>

          {/* Gradient mask — bottom fade to black */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0"
            style={{
              height:     '55%',
              background: 'linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.7) 40%, transparent 100%)',
            }}
          />

          {/* Left-edge lighting streak */}
          <div
            aria-hidden
            className="absolute left-0 inset-y-0"
            style={{
              width:      '1px',
              background: 'linear-gradient(180deg, transparent 10%, rgba(255,107,0,0.3) 50%, transparent 90%)',
            }}
          />

          {/* Top-edge frosted border */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.08) 50%, transparent 90%)',
            }}
          />
        </div>

        {/* ── Floating badge: availability ─────────────── */}
        <motion.div
          className="absolute"
          style={{ top: '10%', right: '-14%' }}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              background:     'rgba(20,20,20,0.9)',
              border:         '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
              boxShadow:      '0 8px 24px rgba(0,0,0,0.4)',
            }}
          >
            <motion.span
              className="rounded-full"
              style={{ width: '6px', height: '6px', background: '#4ade80', display: 'inline-block' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize:   '10px',
                color:      '#c8c8c8',
                whiteSpace: 'nowrap',
              }}
            >
              Available
            </span>
          </div>
        </motion.div>

        {/* ── Floating metric card ──────────────────────── */}
        <motion.div
          className="absolute"
          style={{ bottom: '22%', left: '-16%' }}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="rounded-[12px] px-3.5 py-2.5"
              style={{
                background:     'rgba(20,20,20,0.92)',
                border:         '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(16px)',
                boxShadow:      '0 12px 32px rgba(0,0,0,0.5)',
              }}
            >
              <p
                style={{
                  fontFamily:  "'Clash Display', 'Satoshi', sans-serif",
                  fontSize:    '18px',
                  fontWeight:  700,
                  color:       '#F3F3F3',
                  letterSpacing: '-0.02em',
                  lineHeight:  1,
                  marginBottom: '2px',
                }}
              >
                47+
              </p>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize:   '9px',
                  color:      '#525252',
                  letterSpacing: '0.07em',
                }}
              >
                PROJETOS
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Floating stack badge ──────────────────────── */}
        <motion.div
          className="absolute"
          style={{ top: '38%', right: '-18%' }}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <div
              className="rounded-[10px] px-3 py-2"
              style={{
                background:     'rgba(20,20,20,0.92)',
                border:         '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(16px)',
                boxShadow:      '0 8px 24px rgba(0,0,0,0.4)',
              }}
            >
              <div className="flex items-center gap-1.5">
                {['Next.js', 'React', 'AI'].map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily:  "'JetBrains Mono', monospace",
                      fontSize:    '9px',
                      color:       '#FF6B00',
                      background:  'rgba(255,107,0,0.08)',
                      border:      '1px solid rgba(255,107,0,0.15)',
                      borderRadius: '4px',
                      padding:     '1px 5px',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
})

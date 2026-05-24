'use client'

import { memo } from 'react'
import { motion, useTransform, useSpring } from 'framer-motion'
import { useMouse } from '@/hooks/use-mouse'

/* ── CinematicPortrait ───────────────────────────────────────────────────── *
 *  Photo area for the About section. Same parallax architecture as HeroImage
 *  but adapted for a 4:5 portrait frame with scroll-triggered entrance.
 *
 *  To use your photo: place at /public/about-photo.jpg and replace the
 *  placeholder block with:
 *    <Image src="/about-photo.jpg" alt="Guilherme Melo" fill className="object-cover" />
 * ──────────────────────────────────────────────────────────────────────────*/

export const CinematicPortrait = memo(function CinematicPortrait() {
  const { xNorm, yNorm } = useMouse()

  /* Gentler tilt than the hero — this is a supporting element, not the lead */
  const rawTiltX = useTransform(xNorm, [0, 1], [3.5, -3.5])
  const rawTiltY = useTransform(yNorm, [0, 1], [-2.5, 2.5])
  const rawMoveX = useTransform(xNorm, [0, 1], [-5, 5])
  const rawMoveY = useTransform(yNorm, [0, 1], [-3, 3])

  const rotateY = useSpring(rawTiltX, { stiffness: 45, damping: 22 })
  const rotateX = useSpring(rawTiltY, { stiffness: 45, damping: 22 })
  const moveX   = useSpring(rawMoveX, { stiffness: 45, damping: 22 })
  const moveY   = useSpring(rawMoveY, { stiffness: 45, damping: 22 })

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -28, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {/* Ambient glow behind photo */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none rounded-[28px]"
        style={{
          inset:      '-20px',
          background: 'radial-gradient(ellipse at 40% 35%, rgba(255,107,0,0.09) 0%, transparent 65%)',
          filter:     'blur(36px)',
          zIndex:     0,
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ground shadow */}
      <div
        aria-hidden
        className="absolute pointer-events-none -bottom-6 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width:      '65%',
          height:     '36px',
          background: 'rgba(0,0,0,0.55)',
          filter:     'blur(22px)',
          zIndex:     0,
        }}
      />

      {/* 3D tilt frame */}
      <motion.div
        className="relative"
        style={{
          x:              moveX,
          y:              moveY,
          rotateX,
          rotateY,
          perspective:    900,
          transformStyle: 'preserve-3d',
          zIndex:         1,
        }}
      >
        {/* ── Photo (4:5 ratio) ─────────────────────────── */}
        <div
          className="relative overflow-hidden rounded-[22px]"
          style={{ aspectRatio: '4 / 5' }}
        >
          {/*
            Photo placeholder — replace with:
            <Image src="/about-photo.jpg" alt="Guilherme Melo" fill className="object-cover" />
          */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(160deg, #1e1e1e 0%, #141414 45%, #0e0e0e 100%)',
            }}
          />

          {/* Colour overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: [
                'radial-gradient(circle at 28% 20%, rgba(255,107,0,0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 75% 80%, rgba(60,60,110,0.05) 0%, transparent 50%)',
              ].join(', '),
            }}
          />

          {/* Placeholder initials */}
          <div className="absolute inset-0 flex items-center justify-center select-none">
            <span
              style={{
                fontFamily:    "'Clash Display', sans-serif",
                fontSize:      'clamp(4.5rem, 9vw, 6.5rem)',
                fontWeight:    700,
                color:         'rgba(255,255,255,0.03)',
                letterSpacing: '-0.05em',
              }}
            >
              GM
            </span>
          </div>

          {/* Placeholder label */}
          <div
            className="absolute bottom-8 inset-x-0 flex justify-center"
            style={{
              fontFamily:    "'JetBrains Mono', monospace",
              fontSize:      '8px',
              color:         'rgba(255,255,255,0.1)',
              letterSpacing: '0.12em',
            }}
          >
            ADD ABOUT-PHOTO.JPG TO /PUBLIC
          </div>

          {/* Bottom fade to page bg */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              height:     '50%',
              background: 'linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.65) 40%, transparent 100%)',
            }}
          />

          {/* Left edge amber streak */}
          <div
            aria-hidden
            className="absolute left-0 inset-y-0 pointer-events-none"
            style={{
              width:      '1px',
              background: 'linear-gradient(180deg, transparent 15%, rgba(255,107,0,0.2) 50%, transparent 85%)',
            }}
          />

          {/* Top edge highlight */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.07) 50%, transparent 90%)',
            }}
          />
        </div>

        {/* ── Floating badge: Founder & Dev ─────────────── */}
        <motion.div
          className="absolute"
          style={{ top: '8%', right: '-10%' }}
          initial={{ opacity: 0, x: 14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div
            className="flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              background:     'rgba(16,16,16,0.92)',
              border:         '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              boxShadow:      '0 8px 24px rgba(0,0,0,0.45)',
            }}
          >
            <motion.span
              className="rounded-full"
              style={{ width: '5px', height: '5px', background: '#FF6B00', display: 'inline-block' }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize:   '10px',
                color:      '#a0a0a0',
                whiteSpace: 'nowrap',
              }}
            >
              Founder & Dev
            </span>
          </div>
        </motion.div>

        {/* ── Floating card: 6+ Anos ────────────────────── */}
        <motion.div
          className="absolute"
          style={{ bottom: '22%', left: '-12%' }}
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.95, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="rounded-[12px] px-3.5 py-2.5"
              style={{
                background:     'rgba(16,16,16,0.92)',
                border:         '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(16px)',
                boxShadow:      '0 12px 32px rgba(0,0,0,0.5)',
              }}
            >
              <p
                style={{
                  fontFamily:    "'Clash Display', 'Satoshi', sans-serif",
                  fontSize:      '18px',
                  fontWeight:    700,
                  color:         '#F3F3F3',
                  letterSpacing: '-0.02em',
                  lineHeight:    1,
                  marginBottom:  '2px',
                }}
              >
                6+
              </p>
              <p
                style={{
                  fontFamily:    "'JetBrains Mono', monospace",
                  fontSize:      '9px',
                  color:         '#4a4a4a',
                  letterSpacing: '0.07em',
                }}
              >
                ANOS EMPREEND.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Floating badge: Tech stack ────────────────── */}
        <motion.div
          className="absolute"
          style={{ top: '38%', right: '-15%' }}
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <div
              className="rounded-[10px] px-3 py-2"
              style={{
                background:     'rgba(16,16,16,0.92)',
                border:         '1px solid rgba(255,107,0,0.12)',
                backdropFilter: 'blur(16px)',
                boxShadow:      '0 8px 24px rgba(0,0,0,0.4)',
              }}
            >
              <div className="flex items-center gap-1.5">
                {['AI', 'SaaS', 'Systems'].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily:   "'JetBrains Mono', monospace",
                      fontSize:     '8.5px',
                      color:        '#FF6B00',
                      background:   'rgba(255,107,0,0.08)',
                      border:       '1px solid rgba(255,107,0,0.14)',
                      borderRadius: '4px',
                      padding:      '1px 5px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
})

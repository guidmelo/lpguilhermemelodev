'use client'

import { memo, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────
   AmbientLight — animated background orbs with mouse parallax.
   Three spring configs create three distinct depth layers:
     Layer A (deepest):  stiffness=28  → most responsive to mouse
     Layer B (mid):      stiffness=45  → medium lag
     Layer C (near):     stiffness=65  → tightest, quickest
───────────────────────────────────────────────────────────────── */

export const AmbientLight = memo(function AmbientLight() {
  const mx = useMotionValue(0)  // normalized: -1 → 1
  const my = useMotionValue(0)

  /* Three spring configs — different stiffness = different depth */
  const axSp = useSpring(mx, { stiffness: 28, damping: 18, mass: 1.2 })
  const aySp = useSpring(my, { stiffness: 28, damping: 18, mass: 1.2 })
  const bxSp = useSpring(mx, { stiffness: 45, damping: 20, mass: 1.0 })
  const bySp = useSpring(my, { stiffness: 45, damping: 20, mass: 1.0 })
  const cxSp = useSpring(mx, { stiffness: 65, damping: 22, mass: 0.8 })
  const cySp = useSpring(my, { stiffness: 65, damping: 22, mass: 0.8 })

  /* Pixel offsets — deeper layers move more */
  const ax = useTransform(axSp, v => v * 28)
  const ay = useTransform(aySp, v => v * 28)
  const bx = useTransform(bxSp, v => v * 18)
  const by = useTransform(bySp, v => v * 18)
  const cx = useTransform(cxSp, v => v * 10)
  const cy = useTransform(cySp, v => v * 10)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth  - 0.5) * 2)
      my.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [mx, my])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Layer A — primary accent orb, top-right, deepest parallax */}
      <motion.div
        className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,107,0,0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          x: ax, y: ay,
        }}
        animate={{
          scale:   [1, 1.07, 0.97, 1.05, 1],
          opacity: [0.35, 0.52, 0.38, 0.58, 0.35],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Layer B — neutral orb, bottom-left, mid parallax */}
      <motion.div
        className="absolute -bottom-48 -left-48 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(70,80,105,0.14) 0%, transparent 70%)',
          filter: 'blur(100px)',
          x: bx, y: by,
        }}
        animate={{
          scale:   [1, 1.05, 0.96, 1.03, 1],
          opacity: [0.25, 0.36, 0.27, 0.40, 0.25],
        }}
        transition={{ duration: 26, delay: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Layer C — warm mid-screen glow, nearest parallax */}
      <motion.div
        className="absolute top-[30%] left-[20%] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,107,0,0.07) 0%, transparent 70%)',
          filter: 'blur(120px)',
          x: cx, y: cy,
        }}
        animate={{
          scale:   [1, 1.06, 0.98, 1.04, 1],
          opacity: [0.14, 0.26, 0.16, 0.22, 0.14],
        }}
        transition={{ duration: 32, delay: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Static top-center radial — no parallax, always centered */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] opacity-[0.18]"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.09) 0%, transparent 70%)',
        }}
      />
    </div>
  )
})

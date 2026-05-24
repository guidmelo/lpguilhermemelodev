'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'

/* Animated ambient orbs — the "alive" background lighting system.
   Keep pointer-events-none and fixed to avoid GPU repaint on scroll. */

const Orb = memo(function Orb({
  className,
  style,
  delay = 0,
  duration = 18,
}: {
  className: string
  style?: React.CSSProperties
  delay?: number
  duration?: number
}) {
  return (
    <motion.div
      className={className}
      animate={{
        scale:   [1, 1.08, 0.96, 1.04, 1],
        opacity: [0.35, 0.55, 0.4, 0.6, 0.35],
        x:       [0, 24, -16, 30, 0],
        y:       [0, -18, 32, -10, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatType: 'loop',
      }}
    />
  )
})

export const AmbientLight = memo(function AmbientLight() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Primary accent orb — top right */}
      <Orb
        delay={0}
        duration={20}
        className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,107,0,0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
        } as React.CSSProperties}
      />

      {/* Secondary deep blue/neutral orb — bottom left */}
      <Orb
        delay={4}
        duration={24}
        className="absolute -bottom-48 -left-48 w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle at center, rgba(80,80,100,0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
        } as React.CSSProperties}
      />

      {/* Subtle mid-screen warm glow */}
      <Orb
        delay={8}
        duration={30}
        className="absolute top-[30%] left-[20%] w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,107,0,0.07) 0%, transparent 70%)',
          filter: 'blur(120px)',
        } as React.CSSProperties}
      />

      {/* Faint top-center radial */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.08) 0%, transparent 70%)',
        }}
      />
    </div>
  )
})

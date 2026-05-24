'use client'

import { ReactNode, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowEffectProps {
  children:    ReactNode
  className?:  string
  glowColor?:  string
  intensity?:  'subtle' | 'medium' | 'strong'
  interactive?: boolean
}

const intensityMap = {
  subtle: { inner: 'rgba(255,107,0,0.06)',  outer: '0 0 40px rgba(255,107,0,0.08)' },
  medium: { inner: 'rgba(255,107,0,0.10)',  outer: '0 0 60px rgba(255,107,0,0.12)' },
  strong: { inner: 'rgba(255,107,0,0.15)',  outer: '0 0 80px rgba(255,107,0,0.18)' },
}

/* Reusable glow wrapper — adds a warm accent glow behind any child element.
   Set interactive=true to make the glow follow the mouse cursor. */
export function GlowEffect({
  children,
  className,
  glowColor,
  intensity   = 'subtle',
  interactive = false,
}: GlowEffectProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const bgX = useTransform(mouseX, [0, 1], ['10%', '90%'])
  const bgY = useTransform(mouseY, [0, 1], ['10%', '90%'])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top)  / rect.height)
  }

  const handleMouseLeave = () => {
    if (!interactive) return
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  const cfg = intensityMap[intensity]

  return (
    <motion.div
      ref={ref}
      className={cn('relative', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={interactive ? { boxShadow: cfg.outer } : undefined}
    >
      {interactive && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: `radial-gradient(circle at ${bgX.get()}% ${bgY.get()}%, ${glowColor ?? cfg.inner} 0%, transparent 60%)`,
          }}
        />
      )}
      {!interactive && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${glowColor ?? cfg.inner} 0%, transparent 60%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  )
}

'use client'

import { memo, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticWrapperProps {
  children:  ReactNode
  strength?: number   /* 0–1, default 0.3 — how far element pulls toward cursor */
  className?: string
}

/* Wraps any element with magnetic cursor-pull physics.
   Uses only MotionValues — zero re-renders on mouse movement. */
export const MagneticWrapper = memo(function MagneticWrapper({
  children,
  strength = 0.30,
  className,
}: MagneticWrapperProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSp = useSpring(x, { stiffness: 130, damping: 18, mass: 0.5 })
  const ySp = useSpring(y, { stiffness: 130, damping: 18, mass: 0.5 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width  / 2) * strength)
    y.set((e.clientY - rect.top  - rect.height / 2) * strength)
  }

  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      style={{ x: xSp, y: ySp, display: 'inline-flex' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
})

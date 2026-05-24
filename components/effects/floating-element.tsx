'use client'

import { memo, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface FloatingElementProps {
  children:   ReactNode
  delay?:     number
  duration?:  number
  amplitude?: number
  className?: string
}

/* Wraps children in a continuous, subtle floating animation */
export const FloatingElement = memo(function FloatingElement({
  children,
  delay     = 0,
  duration  = 6,
  amplitude = 14,
  className,
}: FloatingElementProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      animate={{
        y:      [0, -amplitude, amplitude * 0.5, -amplitude * 0.4, 0],
        rotate: [0, 0.8, -0.6, 0.4, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatType: 'loop',
      }}
    >
      {children}
    </motion.div>
  )
})

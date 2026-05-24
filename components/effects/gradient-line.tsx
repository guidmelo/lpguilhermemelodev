'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradientLineProps {
  orientation?: 'horizontal' | 'vertical'
  accentSide?:  'left' | 'right' | 'center'
  animate?:     boolean
  className?:   string
  thickness?:   number
}

/* Decorative gradient line — used to add precision and tech-feel accents */
export function GradientLine({
  orientation = 'horizontal',
  accentSide  = 'left',
  animate     = true,
  className,
  thickness   = 1,
}: GradientLineProps) {
  const gradients: Record<string, string> = {
    horizontal_left:   'linear-gradient(90deg, var(--accent) 0%, rgba(255,107,0,0.3) 30%, transparent 100%)',
    horizontal_right:  'linear-gradient(270deg, var(--accent) 0%, rgba(255,107,0,0.3) 30%, transparent 100%)',
    horizontal_center: 'linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)',
    vertical_left:     'linear-gradient(180deg, var(--accent) 0%, rgba(255,107,0,0.3) 50%, transparent 100%)',
    vertical_right:    'linear-gradient(180deg, var(--accent) 0%, rgba(255,107,0,0.3) 50%, transparent 100%)',
    vertical_center:   'linear-gradient(180deg, transparent 0%, var(--accent) 50%, transparent 100%)',
  }

  const gradientKey = `${orientation}_${accentSide}`
  const gradient = gradients[gradientKey] ?? gradients['horizontal_left']

  const isHorizontal = orientation === 'horizontal'

  const inner = (
    <div
      className={cn(
        'origin-left',
        isHorizontal ? 'w-full' : 'h-full',
        className
      )}
      style={{
        background: gradient,
        ...(isHorizontal
          ? { height: thickness, width: '100%' }
          : { width: thickness, height: '100%' }),
      }}
    />
  )

  if (!animate) return inner

  return (
    <motion.div
      className={isHorizontal ? 'w-full' : 'h-full'}
      initial={{ scaleX: isHorizontal ? 0 : 1, scaleY: isHorizontal ? 1 : 0, transformOrigin: 'left top' }}
      whileInView={{ scaleX: 1, scaleY: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-10%' }}
    >
      {inner}
    </motion.div>
  )
}

'use client'

import { ReactNode } from 'react'
import { motion, type Variants, type Variant } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'

interface MotionRevealProps {
  children:    ReactNode
  direction?:  Direction
  delay?:      number
  duration?:   number
  blur?:       boolean
  className?:  string
  once?:       boolean
  margin?:     string
  as?:         keyof typeof motion
}

function buildVariants(
  direction: Direction,
  duration:  number,
  blur:      boolean
): Variants {
  const offset = 32
  const blurFrom = blur ? 'blur(6px)' : 'blur(0px)'
  const blurTo   = 'blur(0px)'

  const fromMap: Record<Direction, Variant> = {
    up:    { y: offset,   opacity: 0, filter: blurFrom },
    down:  { y: -offset,  opacity: 0, filter: blurFrom },
    left:  { x: offset,   opacity: 0, filter: blurFrom },
    right: { x: -offset,  opacity: 0, filter: blurFrom },
    scale: { scale: 0.9,  opacity: 0, filter: blurFrom },
    fade:  { opacity: 0 },
  }
  const toMap: Record<Direction, Variant> = {
    up:    { y: 0,      opacity: 1, filter: blurTo },
    down:  { y: 0,      opacity: 1, filter: blurTo },
    left:  { x: 0,      opacity: 1, filter: blurTo },
    right: { x: 0,      opacity: 1, filter: blurTo },
    scale: { scale: 1,  opacity: 1, filter: blurTo },
    fade:  { opacity: 1 },
  }

  return {
    hidden:  fromMap[direction],
    visible: {
      ...toMap[direction],
      transition: { duration, ease: [0.16, 1, 0.3, 1] },
    },
  }
}

/* Scroll-triggered reveal — wraps any child with an entrance animation */
export function MotionReveal({
  children,
  direction = 'up',
  delay     = 0,
  duration  = 0.65,
  blur      = true,
  className,
  once      = true,
  margin    = '-6%',
  as        = 'div',
}: MotionRevealProps) {
  const prefersReduced = useReducedMotion()
  const Tag = motion[as] as typeof motion.div

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  const variants = buildVariants(direction, duration, blur)

  return (
    <Tag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      transition={{ delay }}
    >
      {children}
    </Tag>
  )
}

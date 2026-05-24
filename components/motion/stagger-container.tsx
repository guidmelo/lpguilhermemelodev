'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { staggerContainer, staggerFadeUp } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface StaggerContainerProps {
  children:        ReactNode
  className?:      string
  staggerDelay?:   number
  delayStart?:     number
  once?:           boolean
  margin?:         string
}

/* Parent orchestrator — children should use StaggerItem to reveal in sequence */
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  delayStart   = 0,
  once         = true,
  margin       = '-6%',
}: StaggerContainerProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={cn(className)}
      variants={staggerContainer(staggerDelay, delayStart)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children:   ReactNode
  className?: string
}

/* Child item inside StaggerContainer */
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div className={cn(className)} variants={staggerFadeUp}>
      {children}
    </motion.div>
  )
}

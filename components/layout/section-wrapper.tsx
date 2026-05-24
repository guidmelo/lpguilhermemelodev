'use client'

import { ReactNode, ElementType } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { staggerContainer } from '@/lib/motion'

interface SectionWrapperProps {
  children:      ReactNode
  as?:           ElementType
  id?:           string
  className?:    string
  innerClass?:   string
  /** Add subtle separator line at top */
  divider?:      boolean
  /** Skip the entrance stagger animation */
  noAnimation?:  boolean
}

/* Section-level wrapper — handles spacing, reveal stagger, optional divider */
export function SectionWrapper({
  children,
  as:    Tag    = 'section',
  id,
  className,
  innerClass,
  divider     = false,
  noAnimation = false,
}: SectionWrapperProps) {
  const Wrapper = noAnimation ? Tag : motion[Tag as 'section'] ?? motion.section

  return (
    <Wrapper
      id={id}
      className={cn(
        'relative w-full',
        'py-[clamp(4rem,8vw,7rem)]',
        className
      )}
      {...(!noAnimation && {
        variants:      staggerContainer(0.1, 0.05),
        initial:       'hidden',
        whileInView:   'visible',
        viewport:      { once: true, margin: '-8%' },
      })}
    >
      {divider && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
          }}
        />
      )}
      <div className={cn('relative z-10', innerClass)}>{children}</div>
    </Wrapper>
  )
}

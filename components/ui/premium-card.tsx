'use client'

import { ReactNode, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PremiumCardProps {
  children:     ReactNode
  className?:   string
  tilt?:        boolean
  glow?:        boolean
  spotlight?:   boolean
  border?:      'subtle' | 'accent' | 'none'
  padding?:     'sm' | 'md' | 'lg'
  onClick?:     () => void
}

const borderStyles = {
  subtle: 'border border-[rgba(255,255,255,0.06)]',
  accent: 'border border-[rgba(255,107,0,0.2)]',
  none:   '',
}

const paddingStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

/* Premium glassmorphism card with optional 3D tilt + spotlight glow.
   Tilt and spotlight are CPU-safe via Framer Motion MotionValues (no useState). */
export function PremiumCard({
  children,
  className,
  tilt      = false,
  glow      = true,
  spotlight = false,
  border    = 'subtle',
  padding   = 'md',
  onClick,
}: PremiumCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const spotX = useMotionValue(50)
  const spotY = useMotionValue(50)

  const rotX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]),  { stiffness: 200, damping: 30 })
  const rotY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]),  { stiffness: 200, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || (!tilt && !spotlight)) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5

    if (tilt) {
      rawX.set(x)
      rawY.set(y)
    }
    if (spotlight) {
      spotX.set(((e.clientX - rect.left) / rect.width)  * 100)
      spotY.set(((e.clientY - rect.top)  / rect.height) * 100)
    }
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
    spotX.set(50)
    spotY.set(50)
  }

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tilt ? { rotateX: rotX, rotateY: rotY, transformPerspective: 800 } : undefined}
      whileHover={!tilt ? { y: -3 } : undefined}
      transition={!tilt ? { type: 'spring', stiffness: 300, damping: 30 } : undefined}
      className={cn(
        'relative overflow-hidden rounded-[16px]',
        'bg-[rgba(26,26,26,0.8)]',
        'backdrop-blur-xl',
        glow && 'shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_20px_50px_-15px_rgba(0,0,0,0.6)]',
        borderStyles[border],
        paddingStyles[padding],
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Spotlight layer */}
      {spotlight && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${spotX.get()}% ${spotY.get()}%, rgba(255,107,0,0.06) 0%, transparent 55%)`,
          }}
        />
      )}

      {/* Top edge refraction */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.08) 50%, transparent 90%)',
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

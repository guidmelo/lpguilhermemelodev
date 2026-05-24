import { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface BlurOrbProps {
  size?:    number
  color?:   string
  opacity?: number
  blur?:    number
  className?: string
  style?:   CSSProperties
  animate?: boolean
}

/* Reusable positioned blur orb — compose these to build depth layers */
export function BlurOrb({
  size    = 400,
  color   = 'rgba(255, 107, 0, 0.12)',
  opacity = 1,
  blur    = 80,
  className,
  style,
  animate = false,
}: BlurOrbProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute rounded-full',
        animate && 'animate-glow-pulse',
        className
      )}
      style={{
        width:    size,
        height:   size,
        background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity,
        ...style,
      }}
    />
  )
}

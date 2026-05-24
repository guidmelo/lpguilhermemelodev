'use client'

import { useEffect, useRef } from 'react'
import { useMotionValue } from 'framer-motion'

interface MousePosition {
  x: ReturnType<typeof useMotionValue<number>>
  y: ReturnType<typeof useMotionValue<number>>
  /** Normalized 0–1 values relative to viewport */
  xNorm: ReturnType<typeof useMotionValue<number>>
  yNorm: ReturnType<typeof useMotionValue<number>>
}

export function useMouse(): MousePosition {
  const x     = useMotionValue(0)
  const y     = useMotionValue(0)
  const xNorm = useMotionValue(0.5)
  const yNorm = useMotionValue(0.5)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      xNorm.set(e.clientX / window.innerWidth)
      yNorm.set(e.clientY / window.innerHeight)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [x, y, xNorm, yNorm])

  return { x, y, xNorm, yNorm }
}

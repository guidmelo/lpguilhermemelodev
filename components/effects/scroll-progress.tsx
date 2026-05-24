'use client'

import { memo } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

/* 2px cinematic progress line at the very top of the viewport.
   Pure MotionValues — zero re-renders, GPU-composited. */
export const ScrollProgress = memo(function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      style={{
        position:        'fixed',
        top:             0,
        left:            0,
        right:           0,
        height:          '2px',
        scaleX,
        transformOrigin: '0 50%',
        background:      'linear-gradient(90deg, #FF6B00 0%, #ff9340 70%, rgba(255,147,64,0.3) 100%)',
        zIndex:          9996,
        pointerEvents:   'none',
      }}
    />
  )
})

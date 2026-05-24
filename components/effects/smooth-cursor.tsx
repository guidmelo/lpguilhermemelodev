'use client'

import { memo, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────
   SmoothCursor — spring-physics cursor for pointer:fine devices.

   Architecture:
   - Outer motion.div  → Framer controls transform (x/y position)
   - Inner plain div   → CSS transitions control visuals (size, opacity, scale)
   No conflicts between Framer and CSS because they target different elements.
───────────────────────────────────────────────────────────────── */

const DOT_SPRING  = { stiffness: 720, damping: 34, mass: 0.14 }
const RING_SPRING = { stiffness:  88, damping: 20, mass: 0.60 }

function detectInteractive(el: Element | null): boolean {
  if (!el) return false
  return !!(el.closest('a, button, [role="button"], input, select, textarea, [data-cursor="hover"]'))
}

export const SmoothCursor = memo(function SmoothCursor() {
  const x = useMotionValue(-300)
  const y = useMotionValue(-300)

  const dotX  = useSpring(x, DOT_SPRING)
  const dotY  = useSpring(y, DOT_SPRING)
  const ringX = useSpring(x, RING_SPRING)
  const ringY = useSpring(y, RING_SPRING)

  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const hovered = useRef(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches)         return
    if ( window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    document.documentElement.classList.add('custom-cursor')

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const isHover = detectInteractive(e.target as Element)
      if (isHover === hovered.current) return
      hovered.current = isHover

      const dot  = dotRef.current
      const ring = ringRef.current
      if (!dot || !ring) return

      if (isHover) {
        ring.style.width       = '42px'
        ring.style.height      = '42px'
        ring.style.marginLeft  = '-21px'
        ring.style.marginTop   = '-21px'
        ring.style.borderColor = 'rgba(255,107,0,0.42)'
        ring.style.background  = 'rgba(255,107,0,0.02)'
        dot.style.opacity      = '0'
        dot.style.transform    = 'scale(0)'
      } else {
        ring.style.width       = '28px'
        ring.style.height      = '28px'
        ring.style.marginLeft  = '-14px'
        ring.style.marginTop   = '-14px'
        ring.style.borderColor = 'rgba(255,255,255,0.18)'
        ring.style.background  = 'transparent'
        dot.style.opacity      = '1'
        dot.style.transform    = 'scale(1)'
      }
    }

    const onDown = () => {
      const ring = ringRef.current
      const dot  = dotRef.current
      if (ring) ring.style.transform = 'scale(0.78)'
      if (dot)  dot.style.transform  = hovered.current ? 'scale(0)' : 'scale(1.4)'
    }

    const onUp = () => {
      const ring = ringRef.current
      const dot  = dotRef.current
      if (ring) ring.style.transform = 'scale(1)'
      if (dot)  dot.style.transform  = hovered.current ? 'scale(0)' : 'scale(1)'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('mouseover',   onOver, { passive: true })
    window.addEventListener('mousedown',   onDown, { passive: true })
    window.addEventListener('mouseup',     onUp,   { passive: true })

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('mouseover',   onOver)
      window.removeEventListener('mousedown',   onDown)
      window.removeEventListener('mouseup',     onUp)
    }
  }, [x, y])

  return (
    <>
      {/* Dot — tight spring, near-instant */}
      <motion.div
        aria-hidden
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 9998, pointerEvents: 'none', x: dotX, y: dotY }}
      >
        <div
          ref={dotRef}
          style={{
            width: '5px', height: '5px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.88)',
            marginLeft: '-2.5px', marginTop: '-2.5px',
            transition: 'opacity 0.18s ease, transform 0.18s ease',
          }}
        />
      </motion.div>

      {/* Ring — slow spring, visible lag = depth */}
      <motion.div
        aria-hidden
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 9997, pointerEvents: 'none', x: ringX, y: ringY }}
      >
        <div
          ref={ringRef}
          style={{
            width: '28px', height: '28px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'transparent',
            marginLeft: '-14px', marginTop: '-14px',
            transition: [
              'width 0.22s cubic-bezier(0.16,1,0.3,1)',
              'height 0.22s cubic-bezier(0.16,1,0.3,1)',
              'margin 0.22s cubic-bezier(0.16,1,0.3,1)',
              'border-color 0.22s ease',
              'background 0.22s ease',
              'transform 0.08s ease',
            ].join(', '),
          }}
        />
      </motion.div>
    </>
  )
})

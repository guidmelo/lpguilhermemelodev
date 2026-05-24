'use client'

import { memo, type ReactNode } from 'react'
import { SmoothCursor } from '@/components/effects/smooth-cursor'

interface MotionProviderProps {
  children: ReactNode
}

/* Global motion shell — renders cursor overlay above everything.
   Cursor is conditionally activated inside SmoothCursor itself
   (pointer:fine + prefers-reduced-motion checks). */
export const MotionProvider = memo(function MotionProvider({ children }: MotionProviderProps) {
  return (
    <>
      {children}
      <SmoothCursor />
    </>
  )
})

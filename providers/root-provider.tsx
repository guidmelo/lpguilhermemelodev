'use client'

import { useState, useCallback, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LoadingScreen } from '@/components/loading/loading-screen'

interface RootProviderProps {
  children: ReactNode
}

export function RootProvider({ children }: RootProviderProps) {
  const [showLoader, setShowLoader] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    setShowLoader(false)
  }, [])

  return (
    <>
      {/*
        Main content — rendered immediately but invisible while the loader is active.
        The opacity transition starts 150ms after the loader begins its exit, creating
        a cinematic crossfade overlap: loader fades/blurs out while content fades in.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showLoader ? 0 : 1 }}
        transition={{
          duration: 0.75,
          delay:    showLoader ? 0 : 0.15,
          ease:     [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>

      {/*
        LoadingScreen sits on top (z-9000).
        AnimatePresence plays the exit animation when showLoader becomes false.
        The exit is: opacity→0 + scale→1.06 + blur→12px over 1s
        giving the "zooming into the system" sensation.
      */}
      <AnimatePresence>
        {showLoader && (
          <LoadingScreen key="loading-experience" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
    </>
  )
}

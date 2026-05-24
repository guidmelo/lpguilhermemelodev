import { ReactNode } from 'react'
import { AmbientLight }  from '@/components/effects/ambient-light'
import { NoiseOverlay }  from '@/components/effects/noise-overlay'
import { AnimatedGrid }  from '@/components/effects/animated-grid'

interface PageWrapperProps {
  children: ReactNode
}

/* Root page shell — stacks background layers:
   1. AnimatedGrid (z-0 absolute, lowest)
   2. AmbientLight orbs (fixed, z-0)
   3. NoiseOverlay (fixed, z-[999])
   4. Page content (z-10) */
export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="relative min-h-[100dvh] bg-[#0A0A0A] overflow-x-hidden">
      {/* Technical grid */}
      <AnimatedGrid
        opacity={0.032}
        cellSize={72}
        className="fixed inset-0"
      />

      {/* Ambient light system */}
      <AmbientLight />

      {/* Radial vignette — pulls focus to center */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(10,10,10,0.6) 100%)',
        }}
      />

      {/* Page content */}
      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>

      {/* Film grain (top layer) */}
      <NoiseOverlay opacity={0.026} />
    </div>
  )
}

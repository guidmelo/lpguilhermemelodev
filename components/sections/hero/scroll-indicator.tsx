'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'

/* Minimal animated scroll hint — appears at the bottom of the hero.
   Mouse-like icon with a bouncing inner dot. */
export const ScrollIndicator = memo(function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Scroll para continuar"
    >
      {/* Mouse icon */}
      <div
        style={{
          width:        '22px',
          height:       '34px',
          borderRadius: '11px',
          border:       '1.5px solid rgba(255,255,255,0.15)',
          display:      'flex',
          justifyContent: 'center',
          paddingTop:   '6px',
        }}
      >
        {/* Bouncing scroll wheel dot */}
        <motion.div
          style={{
            width:        '3px',
            height:       '7px',
            borderRadius: '2px',
            background:   '#FF6B00',
            opacity:      0.7,
          }}
          animate={{ y: [0, 8, 0], opacity: [0.7, 0.3, 0.7] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <span
        style={{
          fontFamily:    "'JetBrains Mono', monospace",
          fontSize:      '9px',
          color:         'rgba(255,255,255,0.2)',
          letterSpacing: '0.1em',
        }}
      >
        SCROLL
      </span>
    </motion.div>
  )
})

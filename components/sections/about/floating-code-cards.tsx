'use client'

import { memo } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'

/* Purely atmospheric — barely-visible code/data fragments that create the
   feeling of a technological environment without competing with content.
   Opacity target: ~0.04 total (combine color alpha + element opacity). */

const JSON_BLOCK = `{
  "client": "Empresa Tech",
  "project": "SaaS Platform",
  "status": "deployed",
  "performance": 97,
  "ai_enabled": true
}`

const CODE_BLOCK = `def automate_flow(
  df: DataFrame
) -> Pipeline:
  return df
    .transform()
    .optimize()`

const LOG_BLOCK = `> npm run build
✓ Compiled in 3.5s
> deploy triggered
✓ Production ready`

const METRIC_BLOCK = `SYSTEM.METRICS
──────────────
  uptime:   99.8%
  latency:  12ms
  builds:   stable`

/* ── Float wrapper ───────────────────────────────────────────────────────── */
const FloatEl = memo(function FloatEl({
  children,
  style,
  delay = 0,
  duration = 9,
}: {
  children: ReactNode
  style: CSSProperties
  delay?: number
  duration?: number
}) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={style}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
})

/* ── Shared text style ───────────────────────────────────────────────────── */
const BASE: CSSProperties = {
  fontFamily:  "'JetBrains Mono', monospace",
  fontSize:    '9px',
  lineHeight:  1.75,
  whiteSpace:  'pre',
  color:       'rgba(255,255,255,0.055)',
  filter:      'blur(0.4px)',
  userSelect:  'none',
}

/* ── FloatingCodeCards ───────────────────────────────────────────────────── */
export const FloatingCodeCards = memo(function FloatingCodeCards() {
  return (
    <>
      {/* JSON block — upper left */}
      <FloatEl
        style={{ top: '6%', left: '1%', ...BASE }}
        delay={0}
        duration={11}
      >
        {JSON_BLOCK}
      </FloatEl>

      {/* Python snippet — lower right */}
      <FloatEl
        style={{ bottom: '18%', right: '2%', ...BASE, color: 'rgba(255,255,255,0.04)' }}
        delay={2.5}
        duration={13}
      >
        {CODE_BLOCK}
      </FloatEl>

      {/* Log output — mid left */}
      <FloatEl
        style={{ top: '44%', left: '0.5%', ...BASE, color: 'rgba(255,255,255,0.035)' }}
        delay={1.2}
        duration={8}
      >
        {LOG_BLOCK}
      </FloatEl>

      {/* Metrics block — upper right */}
      <FloatEl
        style={{ top: '10%', right: '1%', ...BASE, color: 'rgba(255,255,255,0.03)' }}
        delay={3}
        duration={15}
      >
        {METRIC_BLOCK}
      </FloatEl>
    </>
  )
})

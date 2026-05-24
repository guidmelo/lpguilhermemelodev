'use client'

import { memo, useEffect, useRef, useState } from 'react'
import { getScoreMessage } from './types'

interface DigitalScoreProps {
  score: number
}

const R    = 38
const CX   = 50
const CY   = 50
const CIRC = 2 * Math.PI * R

export const DigitalScore = memo(function DigitalScore({ score }: DigitalScoreProps) {
  const [display,  setDisplay]  = useState(0)
  const [dashOffset, setDashOffset] = useState(CIRC)
  const prevScore = useRef(score)

  useEffect(() => {
    const start  = performance.now()
    const dur    = 1600
    const from   = prevScore.current
    prevScore.current = score
    let frame: number

    const tick = (now: number) => {
      const t      = Math.min((now - start) / dur, 1)
      const eased  = 1 - Math.pow(1 - t, 3)
      const cur    = from + (score - from) * eased
      setDisplay(Math.round(cur))
      setDashOffset(CIRC - (cur / 100) * CIRC)
      if (t < 1) frame = requestAnimationFrame(tick)
      else {
        setDisplay(score)
        setDashOffset(CIRC - (score / 100) * CIRC)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [score])

  const msg = getScoreMessage(score)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>

      {/* Ring */}
      <div style={{ position: 'relative', width: '160px', height: '160px' }}>
        <svg
          width="160"
          height="160"
          viewBox="0 0 100 100"
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Track */}
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="5"
          />
          {/* Progress */}
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke="#FF6B00"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 0.016s linear', filter: 'drop-shadow(0 0 6px rgba(255,107,0,0.4))' }}
          />
        </svg>

        {/* Center text */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
          <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '28px', fontWeight: 700, color: '#FF6B00', letterSpacing: '-0.04em', lineHeight: 1 }}>
            {display}%
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', color: '#333', letterSpacing: '0.1em' }}>
            SCORE
          </span>
        </div>
      </div>

      {/* Label block */}
      <div style={{ textAlign: 'center', maxWidth: '320px' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#FF6B00', letterSpacing: '0.12em', marginBottom: '8px', opacity: 0.7 }}>
          MATURIDADE DIGITAL ATUAL
        </p>
        <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '14px', color: '#484848', lineHeight: 1.65 }}>
          {msg}
        </p>
      </div>
    </div>
  )
})

'use client'

import { useEffect, useRef, useState, memo } from 'react'
import { motion } from 'framer-motion'

interface TypingLineProps {
  text:        string
  prefix?:     string
  speed?:      number
  startDelay?: number
  variant?:    'command' | 'success' | 'system'
  active:      boolean
  onComplete?: () => void
}

const PALETTE = {
  command: { text: '#c8c8c8', prefix: '#FF6B00' },
  success: { text: '#FF6B00', prefix: '#FF6B00' },
  system:  { text: '#3a3a3a', prefix: '#2a2a2a' },
}

/* Natural typing delays — pauses at sentence-end characters for realism */
function charDelay(char: string, base: number): number {
  const variance = base * (0.78 + Math.random() * 0.38)
  if (char === '.') return variance * 2.6
  if (char === ',') return variance * 1.5
  if (char === ' ') return variance * 1.1
  if (char === '/') return variance * 0.72
  return Math.max(13, variance)
}

export const TypingLine = memo(function TypingLine({
  text,
  prefix     = '$ ',
  speed      = 30,
  startDelay = 0,
  variant    = 'command',
  active,
  onComplete,
}: TypingLineProps) {
  const [chars,    setChars]    = useState(0)
  const [started,  setStarted]  = useState(false)
  const doneRef        = useRef(false)
  const timerRef       = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const onCompleteRef  = useRef(onComplete)

  // Always hold latest reference to avoid stale closure in recursive timer
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  useEffect(() => {
    if (!active || doneRef.current) return

    let cancelled = false

    const typeNext = (i: number) => {
      if (cancelled) return

      if (i >= text.length) {
        doneRef.current = true
        onCompleteRef.current?.()
        return
      }

      timerRef.current = setTimeout(() => {
        if (cancelled) return
        setChars(i + 1)
        typeNext(i + 1)
      }, charDelay(text[i], speed))
    }

    timerRef.current = setTimeout(() => {
      if (!cancelled) {
        setStarted(true)
        typeNext(0)
      }
    }, startDelay)

    return () => {
      cancelled = true
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [active, text, speed, startDelay])

  const palette = PALETTE[variant]
  const isTyping = started && chars < text.length

  return (
    <div
      className="flex items-center"
      style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize:   '13px',
        lineHeight: '1.9',
      }}
    >
      <span style={{ color: palette.prefix, marginRight: '2px' }} aria-hidden>
        {prefix}
      </span>

      <span style={{ color: palette.text }}>
        {text.slice(0, chars)}
      </span>

      {/* Typing cursor — only while this line is active and typing */}
      {isTyping && (
        <motion.span
          aria-hidden
          style={{
            display:    'inline-block',
            width:      '2px',
            height:     '0.88em',
            marginLeft: '1.5px',
            background: '#FF6B00',
            borderRadius: '1px',
          }}
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            duration:   0.75,
            repeat:     Infinity,
            times:      [0, 0.44, 0.5, 0.94],
            ease:       'linear',
          }}
        />
      )}
    </div>
  )
})

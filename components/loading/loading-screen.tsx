'use client'

import { useState, useRef, useCallback, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TypingLine }  from './typing-line'
import { NoiseOverlay } from '@/components/effects/noise-overlay'

/* ── Sequence definition ─────────────────────────────────────────────────── */
const SEQUENCE = [
  { text: 'initializing GuilhermeMelo.dev', speed: 30, pause: 320, variant: 'command' },
  { text: 'loading systems...',             speed: 27, pause: 280, variant: 'command' },
  { text: 'starting experience engine...',  speed: 27, pause: 260, variant: 'command' },
  { text: 'connecting interfaces...',       speed: 27, pause: 300, variant: 'command' },
  { text: 'access granted',                 speed: 75, pause: 680, variant: 'success' },
] as const

interface LoadingScreenProps {
  onComplete: () => void
}

/* ── Scan sweep — CRT horizontal line drifting top→bottom ────────────────── */
const ScanSweep = memo(function ScanSweep() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0"
      style={{
        height:     '120px',
        background: 'linear-gradient(180deg, transparent 0%, rgba(255,107,0,0.025) 40%, rgba(255,107,0,0.032) 50%, rgba(255,107,0,0.025) 60%, transparent 100%)',
        zIndex:     2,
      }}
      animate={{ y: ['-10vh', '110vh'] }}
      transition={{
        duration:    9,
        repeat:      Infinity,
        ease:        'linear',
        repeatDelay: 1.5,
      }}
    />
  )
})

/* ── Minimal particles — static drift, pure CSS ──────────────────────────── */
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id:      i,
  x:       `${6 + Math.floor((i * 137.508) % 88)}%`,
  y:       `${4 + Math.floor((i * 97.31)  % 88)}%`,
  size:    i % 3 === 0 ? 1.5 : 1,
  delay:   `${(i * 0.7) % 5}s`,
  duration:`${5 + (i % 4)}s`,
  opacity: i % 4 === 0 ? 0.25 : 0.12,
}))

const ParticleField = memo(function ParticleField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left:     p.x,
            top:      p.y,
            width:    p.size,
            height:   p.size,
            background: '#FF6B00',
            opacity:  p.opacity,
            animation: `float ${p.duration} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  )
})

/* ── Blinking initial prompt cursor — shown before sequence starts ────────── */
const PromptCursor = memo(function PromptCursor() {
  return (
    <div
      className="flex items-center"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: '13px', lineHeight: '1.9' }}
    >
      <span style={{ color: '#FF6B00', marginRight: '2px' }}>$</span>
      <span style={{ color: '#FF6B00', marginRight: '3px' }}>{' '}</span>
      <motion.span
        aria-hidden
        style={{
          display:      'inline-block',
          width:        '7px',
          height:       '0.88em',
          background:   '#FF6B00',
          borderRadius: '1px',
          opacity:      0.65,
        }}
        animate={{ opacity: [0.65, 0.65, 0, 0] }}
        transition={{
          duration: 0.9,
          repeat:   Infinity,
          times:    [0, 0.44, 0.5, 0.94],
          ease:     'linear',
        }}
      />
    </div>
  )
})

/* ── Corner HUD decorations ──────────────────────────────────────────────── */
const CornerHUD = memo(function CornerHUD({ visible }: { visible: boolean }) {
  const dim = '#232323'

  return (
    <>
      {/* Top-right */}
      <motion.div
        className="absolute top-7 right-8 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <p style={{ fontSize: '9px', color: dim, letterSpacing: '0.08em' }}>PROTOCOL:v2.0</p>
        <p style={{ fontSize: '9px', color: dim, letterSpacing: '0.08em' }}>ENV:PRODUCTION</p>
      </motion.div>

      {/* Bottom-left */}
      <motion.div
        className="absolute bottom-7 left-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <div className="flex items-center gap-1.5">
          <motion.span
            style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', background: '#FF6B00' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span style={{ fontSize: '9px', color: dim, letterSpacing: '0.1em' }}>SYSTEM ONLINE</span>
        </div>
      </motion.div>

      {/* Bottom-right */}
      <motion.div
        className="absolute bottom-7 right-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <p style={{ fontSize: '9px', color: dim, letterSpacing: '0.08em' }}>BUILD:2025.05</p>
      </motion.div>
    </>
  )
})

/* ── Main loading screen ─────────────────────────────────────────────────── */
export const LoadingScreen = memo(function LoadingScreen({ onComplete }: LoadingScreenProps) {
  /* currentLine: -1 = pre-sequence, 0–N = typing, SEQUENCE.length = all done */
  const [currentLine,   setCurrentLine]   = useState(-1)
  const [successGlow,   setSuccessGlow]   = useState(false)
  const timerRef      = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  /* Kick off the sequence after terminal entrance animation finishes */
  useEffect(() => {
    timerRef.current = setTimeout(() => setCurrentLine(0), 540)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  const handleLineComplete = useCallback((lineIndex: number) => {
    if (timerRef.current) clearTimeout(timerRef.current)

    const { pause } = SEQUENCE[lineIndex]
    const isLast    = lineIndex === SEQUENCE.length - 1

    if (isLast) {
      setSuccessGlow(true)
      timerRef.current = setTimeout(() => {
        onCompleteRef.current()
      }, pause)
    } else {
      timerRef.current = setTimeout(() => setCurrentLine(lineIndex + 1), pause)
    }
  }, [])

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  /* ── Derived state ─────────────────────────────────────────────────────── */
  const hudVisible  = currentLine >= 0
  const visibleRows = Math.max(0, currentLine + 1)           // how many lines to render
  const progress    = currentLine < 0 ? 0
    : Math.min(((currentLine + 0.5) / SEQUENCE.length) * 100, 100)

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ zIndex: 9000, background: '#0A0A0A' }}
      /* The exit animation is the cinematic "entrance into the system" transition.
         Scale-up + blur gives the "zooming through the screen" sensation. */
      exit={{
        opacity: 0,
        scale:   1.06,
        filter:  'blur(12px)',
      }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Layer 1: Ambient glow ─────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 55%, rgba(255,107,0,0.042) 0%, transparent 72%)',
        }}
      />

      {/* ── Layer 2: Static scanlines ─────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 4px)',
          zIndex: 1,
        }}
      />

      {/* ── Layer 3: CRT scan sweep ───────────────────────────────────────── */}
      <ScanSweep />

      {/* ── Layer 4: Minimal particle field ──────────────────────────────── */}
      <ParticleField />

      {/* ── Layer 5: Success glow flash ───────────────────────────────────── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex:     3,
          background: 'radial-gradient(circle at 50% 52%, rgba(255,107,0,0.18) 0%, transparent 58%)',
        }}
        animate={{ opacity: successGlow ? [0, 1, 0] : 0 }}
        transition={{ duration: 0.85, times: [0, 0.22, 1], ease: 'easeOut' }}
      />

      {/* ── Layer 6: Corner HUD ───────────────────────────────────────────── */}
      <CornerHUD visible={hudVisible} />

      {/* ── Layer 7: Terminal content ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 4 }}
      >
        <div className="w-full px-8 sm:px-0" style={{ maxWidth: '460px' }}>

          {/* Section label */}
          <motion.p
            style={{
              fontFamily:    "'JetBrains Mono', monospace",
              fontSize:      '9px',
              color:         '#2a2a2a',
              letterSpacing: '0.12em',
              marginBottom:  '20px',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: hudVisible ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            TERMINAL SESSION // SECURE HANDSHAKE
          </motion.p>

          {/* Terminal lines container */}
          <motion.div
            style={{ marginBottom: '28px' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            {/* Pre-sequence: blinking block cursor */}
            <AnimatePresence>
              {currentLine === -1 && (
                <motion.div
                  key="prompt-cursor"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <PromptCursor />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Typed lines — appear one at a time */}
            <AnimatePresence initial={false}>
              {SEQUENCE.slice(0, visibleRows).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{
                    opacity: i < currentLine ? 0.35 : 1,
                    x:       0,
                  }}
                  transition={{
                    opacity: { duration: i < currentLine ? 0.4 : 0.22, ease: 'easeOut' },
                    x:       { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                  }}
                >
                  <TypingLine
                    text={item.text}
                    speed={item.speed}
                    variant={item.variant as 'command' | 'success'}
                    active={i === currentLine}
                    onComplete={() => handleLineComplete(i)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── Status footer ─────────────────────────────────────────────── */}
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: hudVisible ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {/* Progress bar */}
            <div
              style={{
                position:   'relative',
                height:     '1px',
                background: '#181818',
                overflow:   'hidden',
              }}
            >
              {/* Fill */}
              <motion.div
                style={{
                  position:   'absolute',
                  inset:      0,
                  transformOrigin: 'left',
                  background: 'linear-gradient(90deg, #FF6B00 0%, rgba(255, 107, 0, 0.3) 100%)',
                }}
                animate={{ scaleX: progress / 100 }}
                initial={{ scaleX: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Moving shimmer over fill */}
              <motion.div
                style={{
                  position:           'absolute',
                  inset:              0,
                  background:         'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
                  backgroundSize:     '50% 100%',
                  backgroundRepeat:   'no-repeat',
                }}
                animate={{ backgroundPositionX: ['-50%', '150%'] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', repeatDelay: 0.4 }}
              />
            </div>

            {/* Meta row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Status dot */}
                <motion.span
                  aria-hidden
                  style={{
                    display:      'inline-block',
                    width:        '5px',
                    height:       '5px',
                    borderRadius: '50%',
                    background:   '#FF6B00',
                  }}
                  animate={
                    currentLine >= 0 && currentLine < SEQUENCE.length
                      ? { opacity: [0.4, 1, 0.4] }
                      : { opacity: 1 }
                  }
                  transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span
                  style={{
                    fontFamily:    "'JetBrains Mono', monospace",
                    fontSize:      '9.5px',
                    color:         '#303030',
                    letterSpacing: '0.09em',
                  }}
                >
                  {currentLine < 0
                    ? 'STANDBY'
                    : currentLine < SEQUENCE.length - 1
                      ? 'INITIALIZING'
                      : successGlow
                        ? 'READY'
                        : 'VERIFYING'}
                </span>
              </div>

              {/* Phase dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                {SEQUENCE.map((_, i) => (
                  <motion.span
                    key={i}
                    aria-hidden
                    style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%' }}
                    animate={{
                      background: i <= currentLine ? '#FF6B00' : '#1e1e1e',
                      scale:      i === currentLine ? [1, 1.4, 1] : 1,
                    }}
                    transition={
                      i === currentLine
                        ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }
                        : { duration: 0.3 }
                    }
                  />
                ))}

                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize:   '9px',
                    color:      '#282828',
                    marginLeft: '6px',
                  }}
                >
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Film grain on top of everything */}
      <NoiseOverlay opacity={0.034} />
    </motion.div>
  )
})

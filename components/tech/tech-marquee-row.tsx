'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { TechIcon } from '@/components/tech/tech-icon'
import type { TechItem } from '@/data/tech-stack'

interface TechMarqueeRowProps {
  label:     string
  index:     number
  items:     readonly TechItem[]
  direction: 'left' | 'right'
  speed?:    number   // seconds for one full pass (1× content width)
}

/* ── Single item ────────────────────────────────────────────────────────────── */

const MarqueeItem = memo(function MarqueeItem({ item }: { item: TechItem }) {
  const hex = item.glow.startsWith('#') ? item.glow : `#${item.glow}`

  return (
    <span
      style={{
        display:    'inline-flex',
        alignItems: 'center',
        gap:        '7px',
        padding:    '0 22px',
        userSelect: 'none',
        flexShrink: 0,
        opacity:    0.62,
        transition: 'opacity 0.2s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.opacity = '1'
        const name = el.querySelector<HTMLElement>('[data-n]')
        if (name) name.style.color = '#c0c0c0'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.opacity = '0.62'
        const name = el.querySelector<HTMLElement>('[data-n]')
        if (name) name.style.color = '#424242'
      }}
    >
      <TechIcon src={item.icon} name={item.name} size={15} glow={hex} />
      <span
        data-n
        style={{
          fontFamily:    "'JetBrains Mono', monospace",
          fontSize:      '11px',
          fontWeight:    500,
          color:         '#424242',
          letterSpacing: '0.01em',
          whiteSpace:    'nowrap',
          transition:    'color 0.2s ease',
        }}
      >
        {item.name}
      </span>
      {/* separator dot */}
      <span
        aria-hidden
        style={{
          display:      'inline-block',
          width:        '3px',
          height:       '3px',
          borderRadius: '50%',
          background:   'rgba(255,255,255,0.055)',
          marginLeft:   '20px',
          flexShrink:   0,
        }}
      />
    </span>
  )
})

/* ── TechMarqueeRow ─────────────────────────────────────────────────────────── */

export const TechMarqueeRow = memo(function TechMarqueeRow({
  label,
  index,
  items,
  direction,
  speed = 40,
}: TechMarqueeRowProps) {
  // 4× duplication ensures the track always fills any viewport width.
  // animate-left goes 0 → −25%, animate-right goes −25% → 0.
  // Both move exactly 1 content width → perfectly seamless loop.
  const copies   = [...items, ...items, ...items, ...items]
  const animName = direction === 'left' ? 'marquee-left' : 'marquee-right'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true as const, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay:    index * 0.055,
        ease:     [0.16, 1, 0.3, 1] as const,
      }}
      style={{
        borderTop:     '1px solid rgba(255,255,255,0.042)',
        paddingTop:    '15px',
        paddingBottom: '20px',
      }}
    >
      {/* Row label */}
      <div
        style={{
          display:      'flex',
          alignItems:   'center',
          gap:          '10px',
          marginBottom: '13px',
        }}
      >
        <span
          style={{
            fontFamily:    "'JetBrains Mono', monospace",
            fontSize:      '8px',
            color:         '#1c1c1c',
            letterSpacing: '0.08em',
            minWidth:      '18px',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span
          style={{
            fontFamily:    "'JetBrains Mono', monospace",
            fontSize:      '9px',
            color:         '#2a2a2a',
            letterSpacing: '0.11em',
          }}
        >
          {label.toUpperCase()}
        </span>

        <span
          style={{
            marginLeft:    'auto',
            fontFamily:    "'JetBrains Mono', monospace",
            fontSize:      '8px',
            color:         '#FF6B00',
            background:    'rgba(255,107,0,0.05)',
            border:        '1px solid rgba(255,107,0,0.12)',
            borderRadius:  '3px',
            padding:       '1px 5px',
            opacity:       0.55,
            marginRight:   '6px',
          }}
        >
          {items.length}
        </span>

        <span
          style={{
            fontFamily:    "'JetBrains Mono', monospace",
            fontSize:      '8px',
            color:         '#1e1e1e',
            letterSpacing: '0.04em',
          }}
          aria-hidden
        >
          {direction === 'left' ? '→→' : '←←'}
        </span>
      </div>

      {/* Marquee strip — edges fade to transparent via CSS mask */}
      <div
        style={{
          overflow:           'hidden',
          maskImage:          'linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)',
          WebkitMaskImage:    'linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)',
        }}
      >
        <div
          style={{
            display:    'flex',
            width:      'max-content',
            animation:  `${animName} ${speed}s linear infinite`,
            willChange: 'transform',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = 'paused'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = 'running'
          }}
        >
          {copies.map((item, i) => (
            <MarqueeItem key={`${item.slug}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </motion.div>
  )
})
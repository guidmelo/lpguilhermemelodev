'use client'

import { memo }   from 'react'
import { motion } from 'framer-motion'
import * as Tooltip from '@radix-ui/react-tooltip'
import { TechIcon }          from './tech-icon'
import { badgeItemVariants } from '@/data/tech-stack'
import type { TechItem }     from '@/data/tech-stack'

interface TechBadgeProps {
  item:        TechItem
  accentColor: string
}

function onEnter(e: React.MouseEvent, glow: string) {
  const el   = e.currentTarget as HTMLElement
  const hex  = glow.startsWith('#') ? glow : `#${glow}`
  el.style.background  = `${hex}15`
  el.style.borderColor = `${hex}38`
  el.style.color       = '#aaa'
}

function onLeave(e: React.MouseEvent) {
  const el = e.currentTarget as HTMLElement
  el.style.background  = 'rgba(255,255,255,0.025)'
  el.style.borderColor = 'rgba(255,255,255,0.055)'
  el.style.color       = '#383838'
}

export const TechBadge = memo(function TechBadge({ item }: TechBadgeProps) {
  const glowHex = item.glow.startsWith('#') ? item.glow : `#${item.glow}`

  return (
    <Tooltip.Root delayDuration={200}>
      <Tooltip.Trigger asChild>
        <motion.span
          variants={badgeItemVariants}
          onMouseEnter={(e) => onEnter(e, glowHex)}
          onMouseLeave={onLeave}
          style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:           '5px',
            fontFamily:    "'JetBrains Mono', monospace",
            fontSize:      '10px',
            color:         '#383838',
            background:    'rgba(255,255,255,0.025)',
            border:        '1px solid rgba(255,255,255,0.055)',
            borderRadius:  '6px',
            padding:       '4px 9px',
            letterSpacing: '0.02em',
            cursor:        'default',
            transition:    'background 0.18s ease, border-color 0.18s ease, color 0.18s ease',
            userSelect:    'none',
          }}
        >
          <TechIcon src={item.icon} name={item.name} size={12} glow={glowHex} />
          {item.name}
        </motion.span>
      </Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content
          sideOffset={6}
          style={{
            fontFamily:    "'Satoshi', sans-serif",
            fontSize:      '11px',
            color:         '#b0b0b0',
            background:    'rgba(10,10,10,0.96)',
            border:        '1px solid rgba(255,255,255,0.07)',
            borderRadius:  '7px',
            padding:       '6px 10px',
            maxWidth:      '220px',
            lineHeight:    1.55,
            backdropFilter:'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow:     '0 8px 24px rgba(0,0,0,0.45)',
            zIndex:        9990,
          }}
        >
          {item.description}
          <Tooltip.Arrow style={{ fill: 'rgba(255,255,255,0.07)' }} />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
})

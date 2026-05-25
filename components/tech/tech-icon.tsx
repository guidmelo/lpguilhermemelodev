'use client'

import { useState } from 'react'

interface TechIconProps {
  src:   string
  name:  string
  size?: number
  glow?: string
}

const FORMATS = ['.svg', '.png', '.webp'] as const

function basePath(src: string) {
  return src.replace(/\.[^./]+$/, '')
}

function initials(name: string) {
  return name.split(/[\s./]/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

/*
 * Chroma of the brand's glow color.
 * Low chroma (<30): monochrome brand — Next.js, Shadcn, Kafka, LangChain, etc.
 *   → Logo is dark/black on transparent; needs inversion to be visible on dark bg.
 * High chroma: colored brand — React, TypeScript, Docker, etc.
 *   → Logo already carries its own color; no inversion needed.
 */
function chromaOf(hex: string): number {
  const h = hex.replace('#', '').padStart(6, '0')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return Math.max(r, g, b) - Math.min(r, g, b)
}

/*
 * Default: monochrome logos → brightness(0) collapses to black, invert(0.82)
 * lifts to #D1D1D1 — a consistent soft gray regardless of input.
 * Colored logos → very subtle brightness reduction for visual parity.
 */
function buildFilters(glow: string): { def: string; hov: string } {
  const hex = glow.startsWith('#') ? glow : `#${glow}`

  if (chromaOf(hex) < 30) {
    return {
      def: 'brightness(0) invert(0.82)',
      hov: `brightness(0) invert(1) drop-shadow(0 0 5px rgba(240,240,240,0.28))`,
    }
  }

  return {
    def: 'brightness(0.95)',
    hov: `brightness(1.12) saturate(1.18) drop-shadow(0 0 5px ${hex}55)`,
  }
}

export function TechIcon({ src, name, size = 14, glow = '#888' }: TechIconProps) {
  const [fmtIndex, setFmtIndex] = useState(0)

  if (fmtIndex >= FORMATS.length) {
    return (
      <span
        aria-hidden
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          justifyContent: 'center',
          width:          size,
          height:         size,
          fontSize:       Math.max(6, Math.round(size * 0.55)) + 'px',
          fontFamily:     "'JetBrains Mono', monospace",
          fontWeight:     700,
          color:          glow,
          lineHeight:     1,
          flexShrink:     0,
        }}
      >
        {initials(name).slice(0, 2)}
      </span>
    )
  }

  const { def, hov } = buildFilters(glow)

  return (
    <img
      src={basePath(src) + FORMATS[fmtIndex]}
      alt=""
      width={size}
      height={size}
      aria-hidden
      style={{
        width:      size,
        height:     size,
        objectFit: 'contain',
        flexShrink: 0,
        filter:     def,
        transition: 'filter 0.22s ease, transform 0.22s ease',
      }}
      onError={() => setFmtIndex((i) => i + 1)}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter    = hov
        e.currentTarget.style.transform = 'scale(1.14)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter    = def
        e.currentTarget.style.transform = 'scale(1)'
      }}
    />
  )
}

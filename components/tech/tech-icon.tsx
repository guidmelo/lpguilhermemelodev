'use client'

import { useMemo, useState, useEffect, useRef } from 'react'
import { TECH_LOGO_MANIFEST } from '@/data/tech-logo-manifest'

interface TechIconProps {
  src:   string   // icon path from TechItem — e.g. /assets/tech/frontend/react.svg
  name:  string
  size?: number
  glow?: string
}

/* ── Format priority (probe cascade fallback only) ──────────────────────────── */

const FORMATS = ['.svg', '.png', '.jpg', '.jpeg', '.webp'] as const

/* ── Path resolution ────────────────────────────────────────────────────────── */

/*
 * 1. Extract slug from src path (e.g. "react" from ".../react.svg")
 * 2. Check TECH_LOGO_MANIFEST — if found, return single-entry list (zero 404s)
 * 3. Fall back to probe cascade: [exact, lowercase, normalized] × [formats]
 *
 * This means known logos resolve instantly on first request.
 * Unknown future logos auto-probe until found.
 */
function buildSrcList(src: string): readonly string[] {
  // Strip the last extension to get the base path
  const base      = src.replace(/\.[^./]+$/, '')
  const lastSlash = base.lastIndexOf('/')
  const dir       = base.slice(0, lastSlash + 1)   // "/assets/tech/frontend/"
  const slug      = base.slice(lastSlash + 1)       // "react" | "mongoDB" | "OIDC"

  // Manifest fast-path — exact slug match first, then lowercase
  const direct = TECH_LOGO_MANIFEST[slug] ?? TECH_LOGO_MANIFEST[slug.toLowerCase()]
  if (direct) return [direct]

  // Probe cascade for slugs not yet in the manifest
  const slugLower = slug.toLowerCase()
  const slugNorm  = slugLower.replace(/[^a-z0-9]/g, '')

  const seen  = new Set<string>()
  const names: string[] = []
  for (const n of [slug, slugLower, slugNorm]) {
    if (n && !seen.has(n)) { seen.add(n); names.push(n) }
  }

  return names.flatMap((n) => FORMATS.map((ext) => dir + n + ext))
}

function initials(name: string) {
  return name
    .split(/[\s./]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

/* ── Dark-mode filter (chroma-based) ───────────────────────────────────────── */

// Portfolio accent used for all icon hover glows — unified premium feel
const ACCENT = '#FF6B00'

function chromaOf(hex: string): number {
  const h = hex.replace('#', '').padStart(6, '0')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return Math.max(r, g, b) - Math.min(r, g, b)
}

function buildFilters(glow: string): { def: string; hov: string } {
  const hex = glow.startsWith('#') ? glow : `#${glow}`

  if (chromaOf(hex) < 30) {
    // Monochrome brand (Next.js, Shadcn, Kafka…) → lift to soft gray, hover → white + orange glow
    return {
      def: 'brightness(0) invert(0.82)',
      hov: `brightness(0) invert(1) drop-shadow(0 0 6px ${ACCENT}70)`,
    }
  }

  // Colored brand → subtle boost + unified orange accent glow on hover
  return {
    def: 'brightness(0.95)',
    hov: `brightness(1.1) saturate(1.15) drop-shadow(0 0 5px ${ACCENT}55)`,
  }
}

/* ── TechIcon ───────────────────────────────────────────────────────────────── */

export function TechIcon({ src, name, size = 14, glow = '#888' }: TechIconProps) {
  const srcList       = useMemo(() => buildSrcList(src), [src])
  const [idx, setIdx] = useState(0)
  const loggedRef     = useRef(false)

  const exhausted = idx >= srcList.length

  // Dev-only: log when all candidates fail → initials fallback
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    if (exhausted && !loggedRef.current) {
      loggedRef.current = true
      console.debug(`✕ [tech] ${name}  →  initials fallback  (src: ${src})`)
    }
  }, [exhausted, name, src])

  if (exhausted) {
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
  const currentSrc   = srcList[idx] as string

  return (
    <img
      key={currentSrc}
      src={currentSrc}
      alt=""
      width={size}
      height={size}
      aria-hidden
      style={{
        width:      size,
        height:     size,
        objectFit:  'contain',
        flexShrink: 0,
        filter:     def,
        transition: 'filter 0.22s ease, transform 0.22s ease',
      }}
      onLoad={() => {
        if (process.env.NODE_ENV !== 'development') return
        idx === 0
          ? console.debug(`✓ [tech] ${name}`)
          : console.debug(`⚠ [tech] ${name}  ←  fallback: ${currentSrc}`)
      }}
      onError={() => setIdx((i) => i + 1)}
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
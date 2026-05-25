'use client'

import { useMemo, useState, useEffect, useRef } from 'react'

interface TechIconProps {
  src:   string   // icon path from TechItem — extension is stripped internally
  name:  string
  size?: number
  glow?: string
}

/* ── Format priority ────────────────────────────────────────────────────────── */

const FORMATS = ['.svg', '.png', '.jpg', '.jpeg', '.webp'] as const

/* ── Path helpers ───────────────────────────────────────────────────────────── */

/*
 * Build all candidate URLs to try in order.
 *
 * Given src = "/assets/tech/security/OIDC.svg" it generates:
 *   /assets/tech/security/OIDC.svg    ← exact case, first format
 *   /assets/tech/security/OIDC.png
 *   /assets/tech/security/OIDC.jpg
 *   ...
 *   /assets/tech/security/oidc.svg    ← lowercase fallback
 *   /assets/tech/security/oidc.png
 *   ...
 *   /assets/tech/security/oidc.svg    ← normalized (same here, deduped)
 *   ...
 *
 * For mongoDB.png → tries mongoDB.* first, then mongodb.* fallback.
 * For oauth2.0.png → tries oauth2.0.* first, then oauth20.* fallback.
 */
function buildSrcList(src: string): readonly string[] {
  // Strip the sentinel .svg extension to get the base path
  const base      = src.replace(/\.[^./]+$/, '')
  const lastSlash = base.lastIndexOf('/')
  const dir       = base.slice(0, lastSlash + 1)  // "/assets/tech/security/"
  const file      = base.slice(lastSlash + 1)      // "OIDC" | "oauth2.0" | "mongoDB"

  const fileLower = file.toLowerCase()
  const fileNorm  = fileLower.replace(/[^a-z0-9]/g, '')  // remove dots, spaces, hyphens

  // Dedup while preserving priority: exact → lowercase → normalized
  const seen  = new Set<string>()
  const names: string[] = []
  for (const n of [file, fileLower, fileNorm]) {
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
    // Monochrome brand (Next.js, Shadcn, Kafka…) → lift dark logo to soft gray
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

/* ── TechIcon ───────────────────────────────────────────────────────────────── */

export function TechIcon({ src, name, size = 14, glow = '#888' }: TechIconProps) {
  const srcList      = useMemo(() => buildSrcList(src), [src])
  const [idx, setIdx] = useState(0)
  const loggedRef    = useRef(false)

  const exhausted = idx >= srcList.length

  // Dev-only: log when all formats are tried and we fall back to initials
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    if (exhausted && !loggedRef.current) {
      loggedRef.current = true
      console.debug(`✕ [tech] ${name}  →  initials fallback`)
    }
  }, [exhausted, name])

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
        objectFit: 'contain',
        flexShrink: 0,
        filter:     def,
        transition: 'filter 0.22s ease, transform 0.22s ease',
      }}
      onLoad={() => {
        if (process.env.NODE_ENV !== 'development') return
        idx === 0
          ? console.debug(`✓ [tech] ${name}`)
          : console.debug(`⚠ [tech] ${name}  ←  ${currentSrc}`)
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

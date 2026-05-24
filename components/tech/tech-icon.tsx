'use client'

import { useState } from 'react'

interface TechIconProps {
  src:   string
  name:  string
  size?: number
  glow?: string
}

export function TechIcon({ src, name, size = 14, glow }: TechIconProps) {
  const [errored, setErrored] = useState(false)

  const initials = name
    .split(/[\s./]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  if (errored) {
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
          color:          glow ?? '#555',
          lineHeight:     1,
          flexShrink:     0,
        }}
      >
        {initials.slice(0, 2)}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      aria-hidden
      style={{ width: size, height: size, objectFit: 'contain', flexShrink: 0 }}
      onError={() => setErrored(true)}
    />
  )
}

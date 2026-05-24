/* Design System Tokens — single source of truth for JS/TS contexts */

export const colors = {
  black:       '#0A0A0A',
  graphite:    '#171717',
  surface:     '#1c1c1c',
  grayDark:    '#262626',
  grayMid:     '#333333',
  gray:        '#525252',
  muted:       '#737373',
  mutedLight:  '#a3a3a3',
  border:      '#2a2a2a',
  borderLight: '#3a3a3a',
  white:       '#F3F3F3',
  whiteDim:    '#b8b8b8',
  accent:      '#FF6B00',
  accentHover: '#ff7d1a',
  accentGlow:  'rgba(255, 107, 0, 0.10)',
  accentGlowMid:    'rgba(255, 107, 0, 0.18)',
  accentGlowStrong: 'rgba(255, 107, 0, 0.28)',
} as const

export const typography = {
  fontDisplay: "'Clash Display', 'Satoshi', sans-serif",
  fontSans:    "'Satoshi', system-ui, sans-serif",
  fontMono:    "'JetBrains Mono', 'Fira Code', monospace",
} as const

export const spacing = {
  sectionGap:        'clamp(5rem, 10vw, 9rem)',
  containerMax:      '1200px',
  containerPadding:  'clamp(1.25rem, 5vw, 2rem)',
  navbarHeight:      '72px',
} as const

export const easing = {
  expo:      [0.16, 1, 0.3, 1],
  inExpo:    [0.7, 0, 0.84, 0],
  spring:    [0.34, 1.56, 0.64, 1],
  smooth:    [0.87, 0, 0.13, 1],
  outQuart:  [0.25, 1, 0.5, 1],
} as const

export const duration = {
  fast:   150,
  normal: 300,
  slow:   500,
  xslow:  800,
} as const

export const radius = {
  sm:  '6px',
  md:  '10px',
  lg:  '16px',
  xl:  '24px',
  '2xl': '32px',
} as const

export const zIndex = {
  background: -10,
  base:        0,
  elevated:   10,
  sticky:     40,
  overlay:    50,
  modal:      60,
  toast:      70,
  noise:     100,
} as const

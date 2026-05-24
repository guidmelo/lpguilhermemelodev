'use client'

import { memo } from 'react'
import type { MockupVariant } from './types'

interface ProjectMockupProps {
  variant:     MockupVariant
  gradient:    string
  accentColor: string
  /** When true, uses richer detail for the modal's larger preview */
  large?:      boolean
}

/* ── Landing variant ─────────────────────────────────────────────────────── */
const LandingMockup = memo(function LandingMockup({
  accentColor,
  large,
}: {
  accentColor: string
  large?: boolean
}) {
  const a  = accentColor
  const a3 = a + '30'
  const a5 = a + '50'
  const a1 = a + '15'

  return (
    <div className="absolute inset-0" style={{ padding: large ? '18px' : '11px', display: 'flex', flexDirection: 'column', gap: large ? '12px' : '7px' }}>
      {/* Nav row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <div style={{ width: large ? '24px' : '16px', height: '4px', background: a5, borderRadius: '2px' }} />
        <div style={{ flex: 1 }} />
        {[32, 28, 26].map((w, i) => (
          <div key={i} style={{ width: `${w}px`, height: '3px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px' }} />
        ))}
        <div style={{ width: large ? '52px' : '36px', height: large ? '14px' : '10px', background: a3, border: `1px solid ${a5}`, borderRadius: '4px' }} />
      </div>

      {/* Hero content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: large ? '8px' : '5px', paddingTop: large ? '12px' : '6px' }}>
        <div style={{ height: large ? '16px' : '10px', width: '80%', background: 'rgba(255,255,255,0.18)', borderRadius: '3px' }} />
        <div style={{ height: large ? '14px' : '9px', width: '60%', background: 'rgba(255,255,255,0.12)', borderRadius: '3px' }} />
        <div style={{ height: large ? '7px' : '5px', width: '72%', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginTop: large ? '6px' : '3px' }} />
        <div style={{ height: large ? '7px' : '5px', width: '50%', background: 'rgba(255,255,255,0.04)', borderRadius: '2px' }} />

        {/* CTA row */}
        <div style={{ display: 'flex', gap: '6px', marginTop: large ? '12px' : '6px' }}>
          <div style={{ height: large ? '22px' : '14px', width: large ? '80px' : '52px', background: a3, border: `1px solid ${a5}`, borderRadius: '5px' }} />
          <div style={{ height: large ? '22px' : '14px', width: large ? '68px' : '44px', background: 'rgba(255,255,255,0.04)', borderRadius: '5px' }} />
        </div>
      </div>

      {/* Feature pills row */}
      {large && (
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {[60, 80, 70, 55].map((w, i) => (
            <div key={i} style={{ height: '8px', width: `${w}px`, background: a1, borderRadius: '4px' }} />
          ))}
        </div>
      )}
    </div>
  )
})

/* ── SaaS Dashboard variant ──────────────────────────────────────────────── */
const SaasMockup = memo(function SaasMockup({
  accentColor,
  large,
}: {
  accentColor: string
  large?: boolean
}) {
  const a  = accentColor
  const a3 = a + '30'
  const a5 = a + '50'

  const bars = large
    ? [42, 68, 35, 82, 54, 71, 93, 48, 76, 61, 55, 88]
    : [42, 68, 35, 82, 54, 71, 93, 48, 76, 61]

  return (
    <div className="absolute inset-0" style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div
        style={{
          width:       large ? '40px' : '26px',
          flexShrink:  0,
          background:  'rgba(255,255,255,0.025)',
          borderRight: '1px solid rgba(255,255,255,0.04)',
          padding:     large ? '10px 6px' : '6px 4px',
          display:     'flex',
          flexDirection: 'column',
          gap:         '5px',
        }}
      >
        <div style={{ height: '5px', width: '100%', background: a3, borderRadius: '2px' }} />
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{ height: '4px', width: `${70 + (i % 3) * 10}%`, background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }} />
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: large ? '10px' : '7px', display: 'flex', flexDirection: 'column', gap: large ? '8px' : '5px' }}>
        {/* Metric cards row */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {[1,2,3].map(i => (
            <div
              key={i}
              style={{
                flex:         1,
                height:       large ? '30px' : '20px',
                background:   'rgba(255,255,255,0.035)',
                borderRadius: '5px',
                border:       `1px solid ${i === 1 ? a + '30' : 'rgba(255,255,255,0.05)'}`,
                display:      'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding:      '0 5px',
                gap:          '2px',
              }}
            >
              <div style={{ height: large ? '6px' : '4px', width: '50%', background: i === 1 ? a5 : 'rgba(255,255,255,0.12)', borderRadius: '2px' }} />
              <div style={{ height: '3px', width: '70%', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }} />
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div
          style={{
            flex:         1,
            background:   'rgba(255,255,255,0.02)',
            borderRadius: '5px',
            border:       '1px solid rgba(255,255,255,0.04)',
            display:      'flex',
            alignItems:   'flex-end',
            padding:      '5px 5px 0',
            gap:          '3px',
          }}
        >
          {bars.map((h, i) => (
            <div
              key={i}
              style={{
                flex:         1,
                height:       `${h}%`,
                background:   i === 6 ? a3 : 'rgba(255,255,255,0.07)',
                borderRadius: '2px 2px 0 0',
                transition:   'height 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
})

/* ── Systems / ERP variant ───────────────────────────────────────────────── */
const SystemsMockup = memo(function SystemsMockup({
  accentColor,
  large,
}: {
  accentColor: string
  large?: boolean
}) {
  const a  = accentColor
  const a3 = a + '30'

  return (
    <div className="absolute inset-0" style={{ padding: large ? '14px' : '9px', display: 'flex', flexDirection: 'column', gap: large ? '7px' : '5px' }}>
      {/* Toolbar */}
      <div
        style={{
          height:       large ? '20px' : '13px',
          background:   'rgba(255,255,255,0.04)',
          borderRadius: '4px',
          border:       '1px solid rgba(255,255,255,0.06)',
          display:      'flex',
          alignItems:   'center',
          padding:      '0 7px',
          gap:          '5px',
        }}
      >
        <div style={{ height: '4px', width: '30px', background: a3, borderRadius: '2px' }} />
        <div style={{ flex: 1 }} />
        <div style={{ height: large ? '8px' : '6px', width: '40px', background: a + '25', borderRadius: '3px' }} />
      </div>

      {/* Table header */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {[28, 24, 20, 28].map((w, i) => (
          <div key={i} style={{ height: '5px', width: `${w}%`, background: 'rgba(255,255,255,0.09)', borderRadius: '2px' }} />
        ))}
      </div>

      {/* Rows */}
      {(large ? [1,2,3,4,5,6,7] : [1,2,3,4,5]).map((_, i) => (
        <div
          key={i}
          style={{
            display:  'flex',
            gap:      '4px',
            opacity:  1 - i * 0.1,
            padding:  large ? '2px 0' : '1px 0',
            borderBottom: '1px solid rgba(255,255,255,0.03)',
          }}
        >
          <div style={{ height: '4px', width: '27%', background: i === 1 ? a3 : 'rgba(255,255,255,0.06)', borderRadius: '2px' }} />
          <div style={{ height: '4px', width: '23%', background: 'rgba(255,255,255,0.04)', borderRadius: '2px' }} />
          <div style={{ height: '4px', width: '19%', background: 'rgba(255,255,255,0.04)', borderRadius: '2px' }} />
          <div style={{ height: '4px', width: '26%', background: i === 1 ? a + '20' : 'rgba(255,255,255,0.03)', borderRadius: '2px' }} />
        </div>
      ))}
    </div>
  )
})

/* ── ProjectMockup (main export) ─────────────────────────────────────────── */
export const ProjectMockup = memo(function ProjectMockup({
  variant,
  gradient,
  accentColor,
  large = false,
}: ProjectMockupProps) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: gradient }}>
      {/* Accent radial glow */}
      <div
        aria-hidden
        style={{
          position:   'absolute',
          inset:      '-30%',
          background: `radial-gradient(circle at 35% 35%, ${accentColor}18 0%, transparent 55%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Category-specific skeleton */}
      {variant === 'landing'  && <LandingMockup  accentColor={accentColor} large={large} />}
      {variant === 'saas'     && <SaasMockup     accentColor={accentColor} large={large} />}
      {variant === 'systems'  && <SystemsMockup  accentColor={accentColor} large={large} />}

      {/* Bottom fade — blends into card surface below */}
      <div
        aria-hidden
        style={{
          position:   'absolute',
          bottom:     0,
          left:       0,
          right:      0,
          height:     large ? '35%' : '45%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
})

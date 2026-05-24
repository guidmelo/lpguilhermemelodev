'use client'

import { memo } from 'react'
import { motion, useTransform } from 'framer-motion'
import { useMouse } from '@/hooks/use-mouse'

/* ── Shared font style ──────────────────────────────────────────────────── */
const MONO: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  fontSize:   '10.5px',
  lineHeight: '1.65',
}

/* ── Color helpers ──────────────────────────────────────────────────────── */
const C = {
  green:  '#4ade80',
  amber:  '#FF6B00',
  blue:   '#60a5fa',
  purple: '#a78bfa',
  dim:    '#3a3a3a',
  mid:    '#525252',
  light:  '#737373',
  white:  '#c8c8c8',
}

/* ── Blinking cursor (CSS-only, no JS) ───────────────────────────────────── */
const Cursor = () => (
  <span
    aria-hidden
    style={{
      display:    'inline-block',
      width:      '6px',
      height:     '0.8em',
      background: C.amber,
      marginLeft: '2px',
      verticalAlign: 'middle',
      animation:  'typing-cursor 0.9s step-end infinite',
    }}
  />
)

/* ── Status dot ──────────────────────────────────────────────────────────── */
const Dot = ({ color = C.green }: { color?: string }) => (
  <span
    aria-hidden
    style={{
      display:      'inline-block',
      width:        '5px',
      height:       '5px',
      borderRadius: '50%',
      background:   color,
      marginRight:  '5px',
      verticalAlign: 'middle',
      animation:    'status-blink 2s step-end infinite',
    }}
  />
)

/* ── Panel wrapper ───────────────────────────────────────────────────────── */
interface PanelProps {
  children: React.ReactNode
  style?:   React.CSSProperties
  blur?:    number
  opacity?: number
  width?:   number
  delay?:   string
}

const Panel = memo(function Panel({ children, style, blur = 2, opacity = 0.07, width = 260, delay = '0s' }: PanelProps) {
  return (
    <div
      style={{
        position:   'absolute',
        width,
        ...style,
        filter:     `blur(${blur}px)`,
        opacity,
        transform:  'translateZ(0)',
        animation:  `float ${7 + parseFloat(delay) * 2}s ease-in-out ${delay} infinite`,
        pointerEvents: 'none',
        userSelect:    'none',
      }}
    >
      <div
        style={{
          ...MONO,
          background: 'rgba(14, 14, 14, 0.85)',
          border:     '1px solid rgba(255,255,255,0.05)',
          borderRadius: '8px',
          padding:    '12px 14px',
          backdropFilter: 'blur(4px)',
          boxShadow:  '0 8px 32px rgba(0,0,0,0.4)',
          overflow:   'hidden',
        }}
      >
        {children}
      </div>
    </div>
  )
})

/* ── Panel A: Deployment pipeline ────────────────────────────────────────── */
const PanelDeploy = memo(function PanelDeploy() {
  return (
    <Panel opacity={0.065} blur={2.5} width={290} delay="0s">
      <div style={{ color: C.dim, marginBottom: '6px', fontSize: '9px', letterSpacing: '0.08em' }}>
        DEPLOY PIPELINE
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div>
          <span style={{ color: C.mid }}>$ </span>
          <span style={{ color: C.light }}>git push origin main</span>
        </div>
        <div style={{ color: C.mid }}>  Compiling TypeScript...</div>
        <div>
          <span style={{ color: C.mid }}>  Bundling 247 assets</span>
          <span style={{ color: C.amber }}>  [██████ 100%]</span>
        </div>
        <div>
          <span style={{ color: C.amber }}>  ✓ </span>
          <span style={{ color: C.light }}>Build completed in 18.4s</span>
        </div>
        <div>
          <span style={{ color: C.mid }}>  Deploying to edge... </span>
        </div>
        <div>
          <span style={{ color: C.green }}>  ✓ </span>
          <span style={{ color: C.light }}>Prod live — 23 regions</span>
        </div>
        <div>
          <span style={{ color: C.green }}>  ✓ </span>
          <span style={{ color: C.light }}>TTFB: 45ms  Score: 98</span>
          <Cursor />
        </div>
      </div>
    </Panel>
  )
})

/* ── Panel B: API log stream (CSS infinite scroll) ───────────────────────── */
const LOG_LINES = [
  { time: '14:47:01', method: 'POST', path: '/api/automations/run', code: 200, ms: 42  },
  { time: '14:47:03', method: 'GET',  path: '/api/analytics/kpis',  code: 200, ms: 18  },
  { time: '14:47:04', method: 'POST', path: '/api/leads/qualify',   code: 201, ms: 124 },
  { time: '14:47:05', method: 'GET',  path: '/api/users/dashboard', code: 200, ms: 31  },
  { time: '14:47:07', method: 'WS',   path: '/realtime',            code: 101, ms: 0   },
  { time: '14:47:09', method: 'POST', path: '/api/campaigns/fire',  code: 200, ms: 67  },
  { time: '14:47:11', method: 'GET',  path: '/api/reports/week',    code: 200, ms: 88  },
  { time: '14:47:14', method: 'POST', path: '/api/webhooks/stripe', code: 200, ms: 29  },
]

const PanelApiLogs = memo(function PanelApiLogs() {
  /* Double the lines so the CSS scroll loop is seamless */
  const lines = [...LOG_LINES, ...LOG_LINES]

  return (
    <Panel opacity={0.075} blur={2} width={300} delay="1.2s">
      <div style={{ color: C.dim, marginBottom: '6px', fontSize: '9px', letterSpacing: '0.08em' }}>
        REQUEST LOG  <Dot color={C.green} />
      </div>
      {/* Fixed-height scrolling container */}
      <div style={{ height: '108px', overflow: 'hidden' }}>
        <div style={{ animation: 'log-scroll 10s linear infinite' }}>
          {lines.map((l, i) => (
            <div key={i} style={{ display: 'flex', gap: '6px', whiteSpace: 'nowrap' }}>
              <span style={{ color: C.dim, fontSize: '9.5px' }}>{l.time}</span>
              <span style={{ color: l.method === 'POST' ? C.amber : l.method === 'WS' ? C.blue : C.mid, minWidth: '34px' }}>
                {l.method}
              </span>
              <span style={{ color: C.light, flex: 1 }}>{l.path}</span>
              <span style={{ color: l.code >= 200 && l.code < 300 ? C.green : C.amber }}>{l.code}</span>
              {l.ms > 0 && <span style={{ color: C.dim }}>{l.ms}ms</span>}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
})

/* ── Panel C: Services status ────────────────────────────────────────────── */
const PanelServices = memo(function PanelServices() {
  const rows = [
    { name: 'web-app:latest',  cpu: '0.4%',  mem: '112MB', ok: true  },
    { name: 'api-server:v2.1', cpu: '1.2%',  mem: '248MB', ok: true  },
    { name: 'worker-queue',    cpu: '0.8%',  mem: ' 86MB', ok: true  },
    { name: 'cache-redis',     cpu: '0.1%',  mem: ' 24MB', ok: true  },
  ]
  return (
    <Panel opacity={0.055} blur={3.5} width={270} delay="2.5s">
      <div style={{ color: C.dim, marginBottom: '6px', fontSize: '9px', letterSpacing: '0.08em' }}>
        CONTAINER STATUS
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {rows.map((r) => (
          <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Dot color={r.ok ? C.green : C.amber} />
            <span style={{ color: C.light, flex: 1 }}>{r.name}</span>
            <span style={{ color: C.dim }}>{r.cpu}</span>
            <span style={{ color: C.dim }}>{r.mem}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', marginTop: '4px', paddingTop: '4px', color: C.dim }}>
          Uptime: <span style={{ color: C.green }}>99.97%</span>
          {'  '}Health: <span style={{ color: C.green }}>OK</span>
        </div>
      </div>
    </Panel>
  )
})

/* ── Panel D: JSON analytics ─────────────────────────────────────────────── */
const PanelJson = memo(function PanelJson() {
  return (
    <Panel opacity={0.055} blur={3} width={235} delay="0.7s">
      <div style={{ color: C.dim, marginBottom: '6px', fontSize: '9px', letterSpacing: '0.08em' }}>
        ANALYTICS SNAPSHOT
      </div>
      <pre style={{ margin: 0, ...MONO }}>
        <span style={{ color: C.dim }}>{'{'}</span>{'\n'}
        {'  '}<span style={{ color: C.blue }}>&quot;sessions&quot;</span>
        <span style={{ color: C.dim }}>: </span>
        <span style={{ color: C.green }}>8420</span>{',\n'}
        {'  '}<span style={{ color: C.blue }}>&quot;conversion&quot;</span>
        <span style={{ color: C.dim }}>: </span>
        <span style={{ color: C.amber }}>&quot;4.7%&quot;</span>{',\n'}
        {'  '}<span style={{ color: C.blue }}>&quot;revenue&quot;</span>
        <span style={{ color: C.dim }}>: </span>
        <span style={{ color: C.green }}>&quot;+R$18.4k&quot;</span>{',\n'}
        {'  '}<span style={{ color: C.blue }}>&quot;flows&quot;</span>
        <span style={{ color: C.dim }}>: </span>
        <span style={{ color: C.green }}>47</span>{',\n'}
        {'  '}<span style={{ color: C.blue }}>&quot;efficiency&quot;</span>
        <span style={{ color: C.dim }}>: </span>
        <span style={{ color: C.amber }}>&quot;94%&quot;</span>{'\n'}
        <span style={{ color: C.dim }}>{'}'}</span>
        <Cursor />
      </pre>
    </Panel>
  )
})

/* ── Panel E: WebSocket stream ───────────────────────────────────────────── */
const PanelWS = memo(function PanelWS() {
  return (
    <Panel opacity={0.08} blur={1.5} width={280} delay="3.1s">
      <div style={{ color: C.dim, marginBottom: '6px', fontSize: '9px', letterSpacing: '0.08em' }}>
        REALTIME EVENTS  <Dot color={C.green} />
      </div>
      <div style={{ color: C.mid, marginBottom: '4px' }}>
        wss:// connected • latency 6ms
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {[
          ['page_view',  "{ path: '/', user: 'new' }"],
          ['cta_click',  "{ element: '#cta-primary' }"],
          ['form_sub',   "{ email: '***@***.com' }"],
          ['conversion', "{ value: 2840, cur: 'BRL' }"],
        ].map(([ev, data]) => (
          <div key={ev}>
            <span style={{ color: C.blue }}>← </span>
            <span style={{ color: C.amber }}>{ev}</span>
            <span style={{ color: C.dim }}>  {data}</span>
          </div>
        ))}
        <div style={{ marginTop: '4px' }}>
          <Dot color={C.amber} />
          <span style={{ color: C.white }}>1,247 active users</span>
        </div>
      </div>
    </Panel>
  )
})

/* ── Panel F: AI interaction ─────────────────────────────────────────────── */
const PanelAI = memo(function PanelAI() {
  return (
    <Panel opacity={0.06} blur={3} width={270} delay="1.8s">
      <div style={{ color: C.dim, marginBottom: '6px', fontSize: '9px', letterSpacing: '0.08em' }}>
        AI ANALYSIS ENGINE
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <div>
          <span style={{ color: C.amber }}>{'> '}</span>
          <span style={{ color: C.light }}>Analyze lead scoring model</span>
        </div>
        <div>
          <span style={{ color: C.amber }}>{'> '}</span>
          <span style={{ color: C.light }}>Identify high-value segments</span>
        </div>
        <div style={{ marginTop: '4px', color: C.mid }}>
          [Processing 2.4M data points...]
        </div>
        <div>
          <span style={{ color: C.green }}>→ </span>
          <span style={{ color: C.light }}>Found 3 high-conversion segments</span>
        </div>
        <div>
          <span style={{ color: C.green }}>→ </span>
          <span style={{ color: C.light }}>Recommend: retarget cart abandon</span>
        </div>
        <div>
          <span style={{ color: C.green }}>→ </span>
          <span style={{ color: C.amber }}>Estimated revenue lift: +23%</span>
          <Cursor />
        </div>
      </div>
    </Panel>
  )
})

/* ── Panel G: Infra metrics ──────────────────────────────────────────────── */
const PanelInfra = memo(function PanelInfra() {
  return (
    <Panel opacity={0.085} blur={1} width={250} delay="4s">
      <div style={{ color: C.dim, marginBottom: '6px', fontSize: '9px', letterSpacing: '0.08em' }}>
        INFRASTRUCTURE
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {[
          ['web-app',   '0.4%', '112MB', 'p50: 12ms'],
          ['api',       '1.2%', '248MB', 'p50: 28ms'],
          ['worker',    '0.8%',  '86MB', 'p50: 41ms'],
        ].map(([s, cpu, mem, lat]) => (
          <div key={s} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Dot color={C.green} />
            <span style={{ color: C.light, flex: 1 }}>{s}</span>
            <span style={{ color: C.dim }}>{cpu}</span>
            <span style={{ color: C.dim }}>{mem}</span>
            <span style={{ color: C.dim }}>{lat}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', marginTop: '4px', paddingTop: '4px' }}>
          <span style={{ color: C.dim }}>Nodes 3/3  </span>
          <span style={{ color: C.dim }}>p99: </span>
          <span style={{ color: C.green }}>89ms</span>
        </div>
      </div>
    </Panel>
  )
})

/* ── Main exported component ─────────────────────────────────────────────── */
export const AnimatedCodeBg = memo(function AnimatedCodeBg() {
  const { xNorm, yNorm } = useMouse()

  /* Three parallax layers — deeper layers move MORE (appear further away) */
  const deepX  = useTransform(xNorm, [0, 1], [28, -28])
  const deepY  = useTransform(yNorm, [0, 1], [20, -20])
  const midX   = useTransform(xNorm, [0, 1], [14, -14])
  const midY   = useTransform(yNorm, [0, 1], [10, -10])
  const nearX  = useTransform(xNorm, [0, 1], [6, -6])
  const nearY  = useTransform(yNorm, [0, 1], [4, -4])

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* ── Deep layer (most blurred, most parallax) ──── */}
      <motion.div
        className="absolute inset-0"
        style={{ x: deepX, y: deepY }}
      >
        {/* Services — top-left area, behind text */}
        <div style={{ position: 'absolute', top: '10%', left: '12%' }}>
          <PanelServices />
        </div>

        {/* JSON — bottom-left, below text */}
        <div style={{ position: 'absolute', bottom: '14%', left: '2%' }}>
          <PanelJson />
        </div>

        {/* AI — bottom-right, far below */}
        <div style={{ position: 'absolute', bottom: '8%', right: '14%' }}>
          <PanelAI />
        </div>
      </motion.div>

      {/* ── Mid layer ─────────────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        style={{ x: midX, y: midY }}
      >
        {/* API Logs — left edge */}
        <div style={{ position: 'absolute', top: '32%', left: '-2%' }}>
          <PanelApiLogs />
        </div>

        {/* Deploy — top-right */}
        <div style={{ position: 'absolute', top: '8%', right: '-1%' }}>
          <PanelDeploy />
        </div>
      </motion.div>

      {/* ── Near layer (least blur, least parallax) ─────── */}
      <motion.div
        className="absolute inset-0"
        style={{ x: nearX, y: nearY }}
      >
        {/* WebSocket — right side, mid */}
        <div style={{ position: 'absolute', top: '58%', right: '3%' }}>
          <PanelWS />
        </div>

        {/* Infra — positioned just inside the photo area */}
        <div style={{ position: 'absolute', top: '25%', right: '22%' }}>
          <PanelInfra />
        </div>
      </motion.div>

      {/* Depth gradient — fades edges so panels don't look cut off */}
      <div
        style={{
          position:   'absolute',
          inset:      0,
          background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 30%, rgba(10,10,10,0.7) 100%)',
          zIndex:     10,
        }}
      />
    </div>
  )
})

'use client'

import { memo, useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

const BOOT = [
  'sistema inicializado · v2.4.1',
  'módulos: IA, CRM, WhatsApp, Analytics',
  'aguardando instrução...',
] as const

const SEQUENCES = [
  {
    cmd: '> analisar lead do instagram',
    lines: [
      { txt: 'Conectando ao Instagram API',       type: 'info' },
      { txt: 'Lead identificado: João Silva',     type: 'ok'   },
      { txt: 'Intenção de compra: Alta · 94%',    type: 'ok'   },
      { txt: 'Canal preferencial: WhatsApp',      type: 'ok'   },
      { txt: 'Iniciando fluxo comercial',         type: 'run'  },
    ],
  },
  {
    cmd: '> classificar segmento de cliente',
    lines: [
      { txt: 'Analisando histórico de engajamento', type: 'info' },
      { txt: 'Segmento: E-commerce B2C',            type: 'ok'   },
      { txt: 'Score comportamental: 87/100',        type: 'ok'   },
      { txt: 'Adicionando ao pipeline CRM',         type: 'run'  },
      { txt: 'Lead qualificado com sucesso',        type: 'ok'   },
    ],
  },
  {
    cmd: '> gerar fluxo de atendimento',
    lines: [
      { txt: 'Template selecionado: onboarding_v3', type: 'ok'  },
      { txt: 'Personalização aplicada ao perfil',   type: 'ok'  },
      { txt: 'WhatsApp: mensagem enviada 14:32:07', type: 'ok'  },
      { txt: 'Dashboard atualizado em tempo real',  type: 'run' },
    ],
  },
] as const

type LineType = 'info' | 'ok' | 'run'
type Phase    = 'idle' | 'booting' | 'typing' | 'responding' | 'pausing' | 'clearing'

interface RLine { txt: string; type: LineType }

const PREFIX: Record<LineType, string> = { ok: '✓', run: '→', info: '·' }
const COLOR:  Record<LineType, string> = { ok: '#34D399', run: '#FF6B00', info: '#252525' }
const TXTCOL: Record<LineType, string> = { ok: '#4a4a4a', run: '#3a3a3a', info: '#1e1e1e' }

export const PromptTerminal = memo(function PromptTerminal() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const isInView = useInView(wrapRef, { once: true, margin: '-80px' })

  const [phase,     setPhase]     = useState<Phase>('idle')
  const [bootDone,  setBootDone]  = useState<string[]>([])
  const [cmdText,   setCmdText]   = useState('')
  const [resLines,  setResLines]  = useState<RLine[]>([])
  const [cursorOn,  setCursorOn]  = useState(true)
  const seqRef = useRef(0)

  /* cursor blink */
  useEffect(() => {
    const t = setInterval(() => setCursorOn(c => !c), 530)
    return () => clearInterval(t)
  }, [])

  /* trigger boot when visible */
  useEffect(() => {
    if (isInView && phase === 'idle') setPhase('booting')
  }, [isInView, phase])

  /* boot sequence */
  useEffect(() => {
    if (phase !== 'booting') return
    let i = 0, cancelled = false
    const next = () => {
      if (cancelled) return
      if (i < BOOT.length) { setBootDone(p => [...p, BOOT[i++]]); setTimeout(next, 320) }
      else setTimeout(() => { if (!cancelled) setPhase('typing') }, 480)
    }
    setTimeout(next, 260)
    return () => { cancelled = true }
  }, [phase])

  /* typing */
  useEffect(() => {
    if (phase !== 'typing') return
    const full = SEQUENCES[seqRef.current].cmd
    let idx = 0, cancelled = false
    setCmdText(''); setResLines([])
    const type = () => {
      if (cancelled) return
      if (idx < full.length) { setCmdText(full.slice(0, idx + 1)); idx++; setTimeout(type, 40 + Math.random() * 18) }
      else setTimeout(() => { if (!cancelled) setPhase('responding') }, 300)
    }
    const t = setTimeout(type, 180)
    return () => { cancelled = true; clearTimeout(t) }
  }, [phase])

  /* responding */
  useEffect(() => {
    if (phase !== 'responding') return
    const lines = SEQUENCES[seqRef.current].lines as readonly RLine[]
    let idx = 0, cancelled = false
    const next = () => {
      if (cancelled) return
      if (idx < lines.length) { setResLines(p => [...p, lines[idx++]]); setTimeout(next, 290 + Math.random() * 110) }
      else setTimeout(() => { if (!cancelled) setPhase('pausing') }, 180)
    }
    const t = setTimeout(next, 260)
    return () => { cancelled = true; clearTimeout(t) }
  }, [phase])

  /* pause */
  useEffect(() => {
    if (phase !== 'pausing') return
    const t = setTimeout(() => setPhase('clearing'), 3400)
    return () => clearTimeout(t)
  }, [phase])

  /* clear → advance */
  useEffect(() => {
    if (phase !== 'clearing') return
    setCmdText(''); setResLines([])
    seqRef.current = (seqRef.current + 1) % SEQUENCES.length
    const t = setTimeout(() => setPhase('typing'), 360)
    return () => clearTimeout(t)
  }, [phase])

  const showCmd   = phase === 'typing' || phase === 'responding' || phase === 'pausing'
  const showCaret = phase === 'typing'

  return (
    <div
      ref={wrapRef}
      style={{
        background:    'rgba(4,4,4,0.96)',
        border:        '1px solid rgba(255,255,255,0.055)',
        borderRadius:  '12px',
        overflow:      'hidden',
        height:        '100%',
        minHeight:     '360px',
        display:       'flex',
        flexDirection: 'column',
      }}
    >
      {/* chrome */}
      <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.018)', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {['rgba(255,88,88,0.32)', 'rgba(255,176,0,0.22)', 'rgba(40,200,90,0.22)'].map((bg, i) => (
          <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: bg }} />
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#1c1c1c', letterSpacing: '0.07em' }}>
          guilherme.ai / runtime
        </span>
      </div>

      {/* body */}
      <div style={{ padding: '16px 18px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '1px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', lineHeight: 1.85 }}>
        {bootDone.map((ln, i) => (
          <div key={i} style={{ color: '#1e1e1e', display: 'flex', gap: '8px' }}>
            <span style={{ color: '#141414', flexShrink: 0 }}>[init]</span>
            <span>{ln}</span>
          </div>
        ))}

        {bootDone.length > 0 && <div style={{ height: '10px' }} />}

        {showCmd && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#FF6B00' }}>{cmdText}</span>
            {showCaret && (
              <span style={{ display: 'inline-block', width: '6px', height: '12px', background: '#FF6B00', marginLeft: '1px', opacity: cursorOn ? 0.9 : 0, verticalAlign: 'middle' }} />
            )}
          </div>
        )}

        {resLines.length > 0 && <div style={{ height: '5px' }} />}

        {resLines.map((ln, i) => (
          <div key={i} style={{ display: 'flex', gap: '9px', alignItems: 'flex-start' }}>
            <span style={{ color: COLOR[ln.type], flexShrink: 0, width: '11px' }}>{PREFIX[ln.type]}</span>
            <span style={{ color: TXTCOL[ln.type] }}>{ln.txt}</span>
          </div>
        ))}

        <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
          <span style={{ color: '#FF6B00', opacity: 0.3, fontSize: '13px' }}>_</span>
        </div>
      </div>
    </div>
  )
})

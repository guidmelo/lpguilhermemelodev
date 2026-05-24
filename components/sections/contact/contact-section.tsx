'use client'

import { memo, useState, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence }    from 'framer-motion'
import { Container }  from '@/components/layout/container'
import { GradientLine } from '@/components/effects/gradient-line'
import { DigitalScore } from './digital-score'
import {
  INITIAL_STATE, BUSINESS_TYPES, DIGITAL_PRESENCE,
  OBJECTIVES, NEEDS, calculateScore, WHATSAPP_NUMBER,
  type StepState, type FormState,
} from './types'

/* ─── Motion variants ─────────────────────────────────── */
const stepVariants = {
  enter:  (dir: number) => ({ x: dir * 28, opacity: 0, filter: 'blur(5px)' }),
  center: { x: 0,        opacity: 1, filter: 'blur(0px)' },
  exit:   (dir: number) => ({ x: dir * -28, opacity: 0, filter: 'blur(5px)' }),
}
const stepTransition = { duration: 0.38, ease: [0.16, 1, 0.3, 1] as const }

const reveal = (delay: number) => ({
  initial:     { opacity: 0, y: 14, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  viewport:    { once: true as const, margin: '-40px' },
  transition:  { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
})

/* ─── Sub-components ──────────────────────────────────── */
const PremiumInput = memo(function PremiumInput({
  label, placeholder, value, onChange, type = 'text',
}: { label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)

  const onFocus = () => {
    if (wrapRef.current) wrapRef.current.style.borderColor = 'rgba(255,107,0,0.4)'
  }
  const onBlur = () => {
    if (wrapRef.current) wrapRef.current.style.borderColor = 'rgba(255,255,255,0.07)'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#333', letterSpacing: '0.1em' }}>
        {label.toUpperCase()}
      </span>
      <div
        ref={wrapRef}
        style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', background: 'rgba(255,255,255,0.025)', transition: 'border-color 0.2s ease', overflow: 'hidden' }}
      >
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{ display: 'block', width: '100%', background: 'transparent', border: 'none', outline: 'none', padding: '12px 14px', fontFamily: "'Satoshi', sans-serif", fontSize: '14px', color: '#bcbcbc', boxSizing: 'border-box' }}
        />
      </div>
    </div>
  )
})

function ProgressDots({ step }: { step: StepState }) {
  const steps: Array<1 | 2 | 3 | 4 | 5> = [1, 2, 3, 4, 5]
  const current = typeof step === 'number' ? step : step === 'success' ? 6 : 0

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
      {steps.map((s) => {
        const done   = current > s
        const active = current === s
        return (
          <motion.div
            key={s}
            animate={{
              width:            active ? 20 : done ? 14 : 6,
              background:       (active || done) ? '#FF6B00' : 'rgba(255,255,255,0.12)',
              opacity:          done ? 0.6 : 1,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            style={{ height: '4px', borderRadius: '99px' }}
          />
        )
      })}
    </div>
  )
}

/* ─── Main section ────────────────────────────────────── */
export const ContactSection = memo(function ContactSection() {
  const [step,      setStep]      = useState<StepState>('intro')
  const [direction, setDirection] = useState(1)
  const [form,      setForm]      = useState<FormState>(INITIAL_STATE)

  const score = useMemo(() => calculateScore(form), [form])

  const goNext = useCallback((next: StepState) => {
    setDirection(1)
    setStep(next)
  }, [])

  const goBack = useCallback((prev: StepState) => {
    setDirection(-1)
    setStep(prev)
  }, [])

  const set = useCallback((field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
  }, [])

  const toggle = useCallback((field: 'objectives' | 'needs', id: string) => {
    setForm((f) => {
      const arr = f[field] as string[]
      return { ...f, [field]: arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id] }
    })
  }, [])

  const waMsg = useMemo(() => {
    const line1 = `Olá! Acabei de fazer o diagnóstico digital no seu site.`
    const line2 = form.empresa ? `\nEmpresa: ${form.empresa}` : ''
    const line3 = form.name    ? `\nNome: ${form.name}`       : ''
    const line4 = `\nMaturidade digital: ${score}%`
    return encodeURIComponent(line1 + line2 + line3 + line4)
  }, [form.name, form.empresa, score])

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`

  /* ─── Steps ─── */
  const renderStep = () => {
    switch (step) {

      /* INTRO */
      case 'intro': return (
        <div style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
          <div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
            style={{ background: 'rgba(255,107,0,0.06)', border: '1px solid rgba(255,107,0,0.18)' }}
          >
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FF6B00', display: 'inline-block' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#FF6B00', letterSpacing: '0.08em' }}>
              DIAGNÓSTICO DIGITAL GRATUITO
            </span>
          </div>

          <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', fontWeight: 700, color: '#F3F3F3', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Vamos entender sua<br />
            <span style={{ color: '#FF6B00' }}>estrutura digital atual.</span>
          </h2>

          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '15px', color: '#3a3a3a', lineHeight: 1.7, maxWidth: '400px' }}>
            Responda 5 perguntas rápidas e descubra seu índice de maturidade digital. Sem compromisso. Resultado imediato.
          </p>

          <button
            onClick={() => goNext(1)}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#ff7a1a'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#FF6B00'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FF6B00', color: '#0a0a0a', border: 'none', borderRadius: '10px', padding: '13px 28px', fontFamily: "'Satoshi', sans-serif", fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s ease, transform 0.2s ease', letterSpacing: '-0.01em' }}
          >
            Iniciar diagnóstico
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      )

      /* STEP 1 — business type + digital presence */
      case 1: return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Business type */}
          <div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#333', letterSpacing: '0.1em', marginBottom: '12px' }}>
              01 · TIPO DE NEGÓCIO
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '8px' }}>
              {BUSINESS_TYPES.map((opt) => {
                const active = form.businessType === opt.id
                return (
                  <button
                    key={opt.id}
                    onClick={() => set('businessType', opt.id)}
                    style={{ textAlign: 'left', padding: '12px 14px', borderRadius: '10px', background: active ? 'rgba(255,107,0,0.07)' : 'rgba(255,255,255,0.025)', border: `1px solid ${active ? 'rgba(255,107,0,0.35)' : 'rgba(255,255,255,0.07)'}`, cursor: 'pointer', transition: 'background 0.18s ease, border-color 0.18s ease', display: 'flex', flexDirection: 'column', gap: '3px' }}
                  >
                    <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '13.5px', fontWeight: 600, color: active ? '#FF6B00' : '#7a7a7a', letterSpacing: '-0.01em' }}>
                      {opt.label}
                    </span>
                    {opt.desc && (
                      <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '11px', color: '#2a2a2a' }}>
                        {opt.desc}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Digital presence */}
          <div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#333', letterSpacing: '0.1em', marginBottom: '12px' }}>
              02 · PRESENÇA DIGITAL ATUAL
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {DIGITAL_PRESENCE.map((opt) => {
                const active = form.digitalPresence === opt.id
                return (
                  <button
                    key={opt.id}
                    onClick={() => set('digitalPresence', opt.id)}
                    style={{ padding: '8px 16px', borderRadius: '8px', background: active ? 'rgba(255,107,0,0.07)' : 'rgba(255,255,255,0.025)', border: `1px solid ${active ? 'rgba(255,107,0,0.35)' : 'rgba(255,255,255,0.07)'}`, cursor: 'pointer', fontFamily: "'Satoshi', sans-serif", fontSize: '13px', color: active ? '#FF6B00' : '#555', transition: 'all 0.18s ease', letterSpacing: '-0.01em' }}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Nav */}
          <StepNav
            canNext={!!(form.businessType && form.digitalPresence)}
            onBack={() => goBack('intro')}
            onNext={() => goNext(2)}
          />
        </div>
      )

      /* STEP 2 — objectives */
      case 2: return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#333', letterSpacing: '0.1em', marginBottom: '12px' }}>
              03 · O QUE VOCÊ DESEJA MELHORAR?
            </p>
            <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '12px', color: '#2a2a2a', marginBottom: '14px' }}>Selecione todos que se aplicam</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {OBJECTIVES.map((opt) => {
                const active = form.objectives.includes(opt.id)
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggle('objectives', opt.id)}
                    style={{ padding: '8px 16px', borderRadius: '8px', background: active ? 'rgba(255,107,0,0.07)' : 'rgba(255,255,255,0.025)', border: `1px solid ${active ? 'rgba(255,107,0,0.35)' : 'rgba(255,255,255,0.07)'}`, cursor: 'pointer', fontFamily: "'Satoshi', sans-serif", fontSize: '13px', color: active ? '#FF6B00' : '#555', transition: 'all 0.18s ease', letterSpacing: '-0.01em' }}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>

          <StepNav
            canNext={form.objectives.length > 0}
            onBack={() => goBack(1)}
            onNext={() => goNext(3)}
          />
        </div>
      )

      /* STEP 3 — needs */
      case 3: return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#333', letterSpacing: '0.1em', marginBottom: '12px' }}>
              04 · QUAIS ESTRUTURAS VOCÊ PROCURA?
            </p>
            <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '12px', color: '#2a2a2a', marginBottom: '14px' }}>Selecione todos que se aplicam</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {NEEDS.map((opt) => {
                const active = form.needs.includes(opt.id)
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggle('needs', opt.id)}
                    style={{ padding: '8px 16px', borderRadius: '8px', background: active ? 'rgba(255,107,0,0.07)' : 'rgba(255,255,255,0.025)', border: `1px solid ${active ? 'rgba(255,107,0,0.35)' : 'rgba(255,255,255,0.07)'}`, cursor: 'pointer', fontFamily: "'Satoshi', sans-serif", fontSize: '13px', color: active ? '#FF6B00' : '#555', transition: 'all 0.18s ease', letterSpacing: '-0.01em' }}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>

          <StepNav
            canNext={form.needs.length > 0}
            onBack={() => goBack(2)}
            onNext={() => goNext(4)}
          />
        </div>
      )

      /* STEP 4 — score reveal */
      case 4: return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#333', letterSpacing: '0.1em' }}>
            05 · SEU DIAGNÓSTICO
          </p>

          <DigitalScore score={score} />

          <button
            onClick={() => goNext(5)}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#ff7a1a'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#FF6B00'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FF6B00', color: '#0a0a0a', border: 'none', borderRadius: '10px', padding: '13px 28px', fontFamily: "'Satoshi', sans-serif", fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s ease, transform 0.2s ease', letterSpacing: '-0.01em' }}
          >
            Receber diagnóstico completo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <button onClick={() => goBack(3)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#282828', letterSpacing: '0.08em' }}>
            ← VOLTAR
          </button>
        </div>
      )

      /* STEP 5 — contact capture */
      case 5: return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#333', letterSpacing: '0.1em', marginBottom: '16px' }}>
              06 · SEUS DADOS
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
              <PremiumInput label="Nome" placeholder="Seu nome completo"   value={form.name}     onChange={(v) => set('name', v)} />
              <PremiumInput label="WhatsApp" placeholder="(11) 99999-9999" value={form.whatsapp} onChange={(v) => set('whatsapp', v)} type="tel" />
              <PremiumInput label="E-mail"   placeholder="seu@email.com"   value={form.email}    onChange={(v) => set('email', v)} type="email" />
              <PremiumInput label="Empresa"  placeholder="Nome da empresa"  value={form.empresa}  onChange={(v) => set('empresa', v)} />
            </div>
          </div>

          <StepNav
            canNext={!!(form.name && form.whatsapp)}
            onBack={() => goBack(4)}
            onNext={() => goNext('success')}
            nextLabel="Enviar diagnóstico"
          />
        </div>
      )

      /* SUCCESS */
      case 'success': return (
        <div style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
          {/* Check */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
            style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <motion.svg
              width="28" height="28" viewBox="0 0 28 28" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <motion.path
                d="M6 14l6 6 10-12"
                stroke="#34D399"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
              />
            </motion.svg>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#F3F3F3', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Diagnóstico recebido.
            </h3>
            <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '14px', color: '#3a3a3a', lineHeight: 1.7 }}>
              Seu índice de maturidade digital é <span style={{ color: '#FF6B00', fontWeight: 600 }}>{score}%</span>.
              Vou analisar seu perfil e entrar em contato com uma estratégia personalizada.
            </p>
          </div>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#1da85a'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#25D366'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25D366', color: '#fff', borderRadius: '10px', padding: '13px 28px', fontFamily: "'Satoshi', sans-serif", fontSize: '14px', fontWeight: 700, textDecoration: 'none', transition: 'background 0.2s ease, transform 0.2s ease', letterSpacing: '-0.01em' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Continuar no WhatsApp
          </a>
        </div>
      )

      default: return null
    }
  }

  return (
    <section
      id="contato"
      className="relative overflow-hidden"
      style={{ paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      {/* Top separator */}
      <div className="absolute top-0 inset-x-0" style={{ zIndex: 6 }}>
        <GradientLine orientation="horizontal" accentSide="center" />
      </div>

      {/* Ambient */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0, background: 'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(255,107,0,0.025) 0%, transparent 65%)' }} />

      {/* Grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0, backgroundImage: ['linear-gradient(rgba(255,255,255,0.006) 1px, transparent 1px)', 'linear-gradient(90deg, rgba(255,255,255,0.006) 1px, transparent 1px)'].join(', '), backgroundSize: '68px 68px' }} />

      <Container className="relative" style={{ zIndex: 10 } as React.CSSProperties}>
        <div className="max-w-[680px] mx-auto">

          {/* Section label — only when not in form */}
          {step === 'intro' && (
            <motion.div {...reveal(0)} className="mb-14 text-center">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-6"
                style={{ background: 'rgba(255,107,0,0.06)', border: '1px solid rgba(255,107,0,0.18)' }}
              >
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FF6B00', display: 'inline-block' }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#FF6B00', letterSpacing: '0.08em' }}>
                  CONTATO // DIAGNÓSTICO
                </span>
              </div>
            </motion.div>
          )}

          {/* Form card */}
          <motion.div
            {...reveal(0.1)}
            style={{ background: 'rgba(6,6,6,0.96)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: 'clamp(24px, 4vw, 48px)', minHeight: '360px', display: 'flex', flexDirection: 'column', gap: '28px' }}
          >
            {/* Progress dots (visible during steps 1–5) */}
            {typeof step === 'number' && (
              <div style={{ paddingBottom: '4px' }}>
                <ProgressDots step={step} />
              </div>
            )}

            {/* Step content with AnimatePresence */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={String(step)}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={stepTransition}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Bottom note */}
          {step !== 'success' && (
            <motion.p
              {...reveal(0.3)}
              className="mt-6 text-center"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#1e1e1e', letterSpacing: '0.08em' }}
            >
              SEM SPAM · SEM COMPROMISSO · DIAGNÓSTICO GRATUITO
            </motion.p>
          )}
        </div>
      </Container>

      {/* Bottom separator */}
      <div className="absolute bottom-0 inset-x-0" style={{ zIndex: 6 }}>
        <GradientLine orientation="horizontal" accentSide="center" />
      </div>
    </section>
  )
})

/* ─── StepNav ─────────────────────────────────────────── */
function StepNav({
  canNext, onBack, onNext, nextLabel = 'Continuar',
}: { canNext: boolean; onBack: () => void; onNext: () => void; nextLabel?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px' }}>
      <button
        onClick={onBack}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#282828', letterSpacing: '0.08em', padding: '4px 0' }}
      >
        ← VOLTAR
      </button>

      <button
        onClick={onNext}
        disabled={!canNext}
        onMouseEnter={(e) => { if (canNext) { (e.currentTarget as HTMLElement).style.background = '#ff7a1a'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' } }}
        onMouseLeave={(e) => { if (canNext) { (e.currentTarget as HTMLElement).style.background = '#FF6B00'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' } }}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: canNext ? '#FF6B00' : 'rgba(255,107,0,0.15)', color: canNext ? '#0a0a0a' : '#3a3a3a', border: 'none', borderRadius: '8px', padding: '10px 22px', fontFamily: "'Satoshi', sans-serif", fontSize: '13px', fontWeight: 700, cursor: canNext ? 'pointer' : 'not-allowed', transition: 'background 0.2s ease, transform 0.2s ease', letterSpacing: '-0.01em' }}
      >
        {nextLabel}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  )
}

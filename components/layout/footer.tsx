'use client'

import { GradientLine } from '@/components/effects/gradient-line'
import { Container }    from '@/components/layout/container'

const footerLinks = {
  Serviços: ['Desenvolvimento Web', 'Automação', 'SaaS', 'Tráfego Pago'],
  Empresa:  ['Sobre', 'Processo', 'Trabalhos', 'Cases'],
  Contato:  ['hello@guilhermemelo.dev', 'LinkedIn', 'GitHub', 'WhatsApp'],
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative">
      <GradientLine orientation="horizontal" accentSide="left" animate />

      {/* ── Cinematic CTA band ─────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          paddingTop:    '7rem',
          paddingBottom: '7rem',
          background: [
            'radial-gradient(ellipse 70% 80% at 50% 100%, rgba(255,107,0,0.05) 0%, transparent 65%)',
            'radial-gradient(ellipse 40% 50% at 20% 50%,  rgba(255,107,0,0.02) 0%, transparent 65%)',
          ].join(', '),
        }}
      >
        {/* Subtle grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: [
              'linear-gradient(rgba(255,255,255,0.005) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(255,255,255,0.005) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '72px 72px',
          }}
        />

        <Container className="relative text-center">
          <p
            style={{
              fontFamily:    "'JetBrains Mono', monospace",
              fontSize:      '10px',
              color:         '#FF6B00',
              letterSpacing: '0.12em',
              marginBottom:  '20px',
              opacity:       0.7,
            }}
          >
            PRONTO PARA COMEÇAR
          </p>

          <h2
            style={{
              fontFamily:    "'Clash Display', sans-serif",
              fontSize:      'clamp(2rem, 5vw, 3.8rem)',
              fontWeight:    700,
              color:         '#F3F3F3',
              letterSpacing: '-0.035em',
              lineHeight:    1.05,
              marginBottom:  '20px',
            }}
          >
            Vamos construir algo{' '}
            <span style={{ color: '#FF6B00' }}>extraordinário.</span>
          </h2>

          <p
            style={{
              fontFamily:  "'Satoshi', sans-serif",
              fontSize:    '16px',
              color:       '#3a3a3a',
              lineHeight:  1.7,
              maxWidth:    '480px',
              margin:      '0 auto 36px',
            }}
          >
            Uma estrutura digital de alto nível começa com uma conversa.
            Diagnóstico gratuito, sem compromisso.
          </p>

          <a
            href="#contato"
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '8px',
              background:    '#FF6B00',
              color:         '#0a0a0a',
              border:        'none',
              borderRadius:  '12px',
              padding:       '14px 32px',
              fontFamily:    "'Satoshi', sans-serif",
              fontSize:      '15px',
              fontWeight:    700,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              transition:    'background 0.2s ease, transform 0.2s ease',
              boxShadow:     '0 0 32px rgba(255,107,0,0.22)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background  = '#ff7a1a'
              el.style.transform   = 'translateY(-2px)'
              el.style.boxShadow   = '0 0 48px rgba(255,107,0,0.35)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background  = '#FF6B00'
              el.style.transform   = 'translateY(0)'
              el.style.boxShadow   = '0 0 32px rgba(255,107,0,0.22)'
            }}
          >
            Iniciar diagnóstico estratégico
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </Container>
      </div>

      {/* ── Links grid ────────────────────────────────────────────��── */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '52px',
          paddingBottom: '32px',
        }}
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B00 0%, #ff9500 100%)',
                    boxShadow:  '0 0 16px rgba(255,107,0,0.22)',
                  }}
                >
                  <span className="font-display font-bold text-black text-sm select-none">GL</span>
                </div>
                <span className="font-display font-semibold text-white tracking-tight text-[15px]">
                  Guilherme<span className="text-accent">.</span>dev
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize:   '13px',
                  color:      '#404040',
                  lineHeight: 1.7,
                  maxWidth:   '220px',
                }}
              >
                Software house focada em tecnologia, automação e crescimento digital.
              </p>
            </div>

            {/* Nav columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <p
                  style={{
                    fontFamily:    "'JetBrains Mono', monospace",
                    fontSize:      '9px',
                    color:         '#282828',
                    letterSpacing: '0.1em',
                    marginBottom:  '18px',
                  }}
                >
                  {title.toUpperCase()}
                </p>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        style={{
                          fontFamily:  "'Satoshi', sans-serif",
                          fontSize:    '13px',
                          color:       '#383838',
                          textDecoration: 'none',
                          transition:  'color 0.18s ease',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#bcbcbc' }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#383838' }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
          >
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize:   '10px',
                color:      '#222222',
                letterSpacing: '0.05em',
              }}
            >
              © {year} GUILHERME MELO · TODOS OS DIREITOS RESERVADOS
            </p>
            <p
              style={{
                fontFamily:    "'JetBrains Mono', monospace",
                fontSize:      '10px',
                color:         '#1a1a1a',
                letterSpacing: '0.04em',
              }}
            >
              NEXT.JS · FRAMER MOTION · TAILWIND CSS
            </p>
          </div>
        </Container>
      </div>
    </footer>
  )
}

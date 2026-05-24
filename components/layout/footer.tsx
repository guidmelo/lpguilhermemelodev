import { GradientLine } from '@/components/effects/gradient-line'
import { Container }    from '@/components/layout/container'

const footerLinks = {
  Serviços: ['Desenvolvimento Web', 'Automação', 'SaaS', 'Design de Produto'],
  Empresa:  ['Sobre', 'Processo', 'Trabalhos', 'Blog'],
  Contato:  ['hello@guilherme.dev', 'LinkedIn', 'GitHub'],
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative pt-20 pb-8">
      <GradientLine orientation="horizontal" accentSide="left" animate />

      <Container className="pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #FF6B00 0%, #ff9500 100%)',
                  boxShadow:  '0 0 16px rgba(255,107,0,0.25)',
                }}
              >
                <span className="font-display font-bold text-black text-sm">GL</span>
              </div>
              <span className="font-display font-semibold text-white tracking-tight text-[15px]">
                Guilherme<span className="text-accent">.</span>dev
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-[220px]">
              Software house focada em tecnologia, automação e crescimento digital.
            </p>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="text-label text-muted mb-5">{title}</p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted hover:text-white transition-colors duration-200"
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[rgba(255,255,255,0.05)]">
          <p className="text-xs text-muted">
            &copy; {year} Guilherme Melo. Todos os direitos reservados.
          </p>
          <p className="text-xs text-[rgba(255,255,255,0.2)]">
            Construído com Next.js + Framer Motion
          </p>
        </div>
      </Container>
    </footer>
  )
}

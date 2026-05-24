'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Serviços',   href: '#servicos'  },
  { label: 'Trabalhos',  href: '#trabalhos' },
  { label: 'Processo',   href: '#processo'  },
  { label: 'Sobre',      href: '#sobre'     },
]

export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [activeLink,  setActiveLink]  = useState<string | null>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else            document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 inset-x-0 z-40',
          'transition-all duration-500',
          scrolled
            ? 'border-b border-[rgba(255,255,255,0.06)] backdrop-blur-2xl bg-[rgba(10,10,10,0.82)]'
            : 'bg-transparent border-b border-transparent'
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1  }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-10 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <div
              className="w-8 h-8 rounded-[8px] flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #FF6B00 0%, #ff9500 100%)',
                boxShadow:  '0 0 20px rgba(255,107,0,0.3)',
              }}
            >
              <span className="font-display font-bold text-black text-sm tracking-tight">GL</span>
            </div>
            <span className="font-display font-semibold text-white tracking-tight text-[15px]">
              Guilherme<span className="text-accent">.</span>dev
            </span>
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-[8px]',
                  'transition-colors duration-200',
                  activeLink === link.href
                    ? 'text-white'
                    : 'text-muted hover:text-white'
                )}
                onHoverStart={() => setActiveLink(link.href)}
                onHoverEnd={()  => setActiveLink(null)}
              >
                {activeLink === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-[8px] bg-surface"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Entrar em contato
            </Button>
            <Button variant="primary" size="sm">
              Iniciar projeto
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-muted hover:text-white transition-colors rounded-[8px]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[rgba(10,10,10,0.95)] backdrop-blur-2xl"
              onClick={() => setMobileOpen(false)}
            />

            <motion.nav
              className="relative z-10 flex flex-col gap-1 px-6 pt-28 pb-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0,  opacity: 1 }}
              exit={{    y: 10, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-4 text-2xl font-display font-semibold text-white border-b border-border tracking-tight"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0,   opacity: 1 }}
                  transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                className="flex flex-col gap-3 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button variant="secondary" size="lg" fullWidth>
                  Entrar em contato
                </Button>
                <Button variant="primary" size="lg" fullWidth>
                  Iniciar projeto
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

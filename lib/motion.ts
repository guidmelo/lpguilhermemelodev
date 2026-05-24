import type { Variants, Transition } from 'framer-motion'

/* ── Easing presets ─────────────────────────────────────────────────────── */
export const EASE_EXPO  = [0.16, 1, 0.3, 1] as const
export const EASE_SPRING = { type: 'spring', stiffness: 100, damping: 22 } as const
export const EASE_SPRING_STIFF = { type: 'spring', stiffness: 180, damping: 28 } as const
export const EASE_SPRING_SOFT  = { type: 'spring', stiffness: 60,  damping: 18 } as const
export const EASE_SMOOTH = [0.87, 0, 0.13, 1] as const

/* ── Base transition ────────────────────────────────────────────────────── */
export const transition: Transition = {
  duration: 0.65,
  ease: EASE_EXPO,
}

/* ── Fade variants ──────────────────────────────────────────────────────── */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55, ease: EASE_EXPO } },
}

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_EXPO } },
}

export const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_EXPO } },
}

export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE_EXPO } },
}

export const fadeRight: Variants = {
  hidden:  { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE_EXPO } },
}

export const scaleUp: Variants = {
  hidden:  { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE_EXPO } },
}

/* ── Stagger container ──────────────────────────────────────────────────── */
export const staggerContainer = (staggerDelay = 0.1, delayStart = 0): Variants => ({
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delayStart,
    },
  },
})

export const staggerFadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_EXPO },
  },
}

export const staggerFadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_EXPO } },
}

/* ── Reveal (scroll-triggered) ──────────────────────────────────────────── */
export const revealUp: Variants = {
  hidden:  { opacity: 0, y: 40, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: EASE_EXPO },
  },
}

export const revealScale: Variants = {
  hidden:  { opacity: 0, scale: 0.9, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE_EXPO },
  },
}

/* ── Hover interactions ─────────────────────────────────────────────────── */
export const hoverLift = {
  whileHover: { y: -3, transition: EASE_SPRING_STIFF },
  whileTap:   { scale: 0.97, y: 0, transition: { duration: 0.1 } },
}

export const hoverGlow = {
  whileHover: { scale: 1.02, transition: EASE_SPRING },
  whileTap:   { scale: 0.98 },
}

/* ── Line draw ──────────────────────────────────────────────────────────── */
export const drawLine: Variants = {
  hidden:  { scaleX: 0, transformOrigin: 'left' },
  visible: { scaleX: 1, transformOrigin: 'left', transition: { duration: 1, ease: EASE_EXPO } },
}

/* ── Navbar variants ────────────────────────────────────────────────────── */
export const navbarVariants: Variants = {
  top:      { backgroundColor: 'rgba(10,10,10,0)',   borderBottomColor: 'rgba(255,255,255,0)' },
  scrolled: { backgroundColor: 'rgba(10,10,10,0.85)', borderBottomColor: 'rgba(255,255,255,0.06)' },
}

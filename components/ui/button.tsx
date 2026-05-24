'use client'

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'accent-ghost'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?:    Variant
  size?:       Size
  children:    ReactNode
  leftIcon?:   ReactNode
  rightIcon?:  ReactNode
  fullWidth?:  boolean
  loading?:    boolean
}

const variantStyles: Record<Variant, string> = {
  primary: [
    'bg-accent text-black font-semibold',
    'shadow-[0_0_24px_rgba(255,107,0,0.25),inset_0_1px_0_rgba(255,255,255,0.15)]',
    'hover:bg-[#ff7d1a] hover:shadow-[0_0_32px_rgba(255,107,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]',
    'active:scale-[0.98] active:shadow-none',
  ].join(' '),

  secondary: [
    'bg-surface text-white font-medium',
    'border border-border-light',
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
    'hover:bg-gray-dark hover:border-gray-mid',
    'active:scale-[0.98]',
  ].join(' '),

  ghost: [
    'text-muted-light font-medium bg-transparent',
    'hover:text-white hover:bg-surface',
    'active:scale-[0.98]',
  ].join(' '),

  outline: [
    'text-white font-medium bg-transparent',
    'border border-border-light',
    'hover:border-accent hover:text-accent',
    'active:scale-[0.98]',
  ].join(' '),

  'accent-ghost': [
    'text-accent font-medium bg-transparent',
    'hover:bg-[rgba(255,107,0,0.08)]',
    'active:scale-[0.98]',
  ].join(' '),
}

const sizeStyles: Record<Size, string> = {
  sm: 'h-8  px-4  text-sm  gap-1.5 rounded-[8px]',
  md: 'h-10 px-5  text-sm  gap-2   rounded-[10px]',
  lg: 'h-12 px-7  text-base gap-2.5 rounded-[12px]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant   = 'primary',
      size      = 'md',
      children,
      leftIcon,
      rightIcon,
      fullWidth = false,
      loading   = false,
      className,
      disabled,
      ...props
    },
    ref
  ) {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center',
          'font-sans tracking-[-0.01em] whitespace-nowrap',
          'transition-all duration-200',
          'cursor-pointer select-none',
          'disabled:opacity-40 disabled:pointer-events-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <span
            className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            aria-hidden
          />
        ) : (
          <>
            {leftIcon  && <span className="shrink-0" aria-hidden>{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0" aria-hidden>{rightIcon}</span>}
          </>
        )}
      </motion.button>
    )
  }
)

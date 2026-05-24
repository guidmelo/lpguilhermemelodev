import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'accent' | 'outline' | 'dot'

interface BadgeProps {
  children:  ReactNode
  variant?:  BadgeVariant
  dot?:      boolean
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface border border-border-light text-muted-light',
  accent:  'bg-[rgba(255,107,0,0.1)] border border-[rgba(255,107,0,0.25)] text-accent',
  outline: 'bg-transparent border border-border-light text-muted',
  dot:     'bg-surface border border-border-light text-muted-light',
}

export function Badge({ children, variant = 'default', dot, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5',
        'text-[0.6875rem] font-medium tracking-[0.06em] uppercase',
        'px-2.5 py-1 rounded-full',
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'inline-block w-1.5 h-1.5 rounded-full shrink-0',
            variant === 'accent' ? 'bg-accent animate-pulse' : 'bg-muted'
          )}
          aria-hidden
        />
      )}
      {children}
    </span>
  )
}

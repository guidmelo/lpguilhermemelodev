import { ReactNode, ElementType, CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children:   ReactNode
  as?:        ElementType
  size?:      'sm' | 'md' | 'lg' | 'full'
  className?: string
  style?:     CSSProperties
}

const sizeStyles = {
  sm:   'max-w-3xl',
  md:   'max-w-5xl',
  lg:   'max-w-[1200px]',
  full: 'max-w-full',
}

/* Responsive centered container — default max-w maps to 1200px design width */
export function Container({ children, as: Tag = 'div', size = 'lg', className, style }: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-5 md:px-8 lg:px-10',
        sizeStyles[size],
        className
      )}
      style={style}
    >
      {children}
    </Tag>
  )
}

import { memo } from 'react'

/* Subtle technical grid overlay — positioned, never scrolling */
export const AnimatedGrid = memo(function AnimatedGrid({
  opacity     = 0.035,
  lineColor   = 'rgba(255,255,255,1)',
  cellSize    = 80,
  className,
}: {
  opacity?:   number
  lineColor?: string
  cellSize?:  number
  className?: string
}) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${cellSize}' height='${cellSize}'><defs><pattern id='g' width='${cellSize}' height='${cellSize}' patternUnits='userSpaceOnUse'><path d='M ${cellSize} 0 L 0 0 0 ${cellSize}' fill='none' stroke='${encodeURIComponent(lineColor)}' stroke-width='0.5'/></pattern></defs><rect width='100%25' height='100%25' fill='url(%23g)'/></svg>`

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className ?? ''}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,${svg}")`,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        opacity,
        animation: 'grid-fade 8s ease-in-out infinite',
      }}
    />
  )
})

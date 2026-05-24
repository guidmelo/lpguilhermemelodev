'use client'

import { useEffect, useState, useRef } from 'react'

interface ScrollState {
  scrollY:    number
  scrollYProgress: number
  direction:  'up' | 'down' | null
  isAtTop:    boolean
  isAtBottom: boolean
}

export function useScroll(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY:         0,
    scrollYProgress: 0,
    direction:       null,
    isAtTop:         true,
    isAtBottom:      false,
  })

  const prevScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollYProgress = maxScroll > 0 ? scrollY / maxScroll : 0
      const direction = scrollY > prevScrollY.current ? 'down' : 'up'

      prevScrollY.current = scrollY

      setState({
        scrollY,
        scrollYProgress: Math.min(1, Math.max(0, scrollYProgress)),
        direction,
        isAtTop:    scrollY < 10,
        isAtBottom: scrollY >= maxScroll - 10,
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return state
}

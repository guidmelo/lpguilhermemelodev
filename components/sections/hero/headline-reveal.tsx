'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'

interface HeadlineRevealProps {
  text:        string
  accentWords?: string[]
  className?:  string
}

const wordVariant = {
  hidden:  { opacity: 0, y: 26, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y:       0,
    filter:  'blur(0px)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const containerVariant = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.042,
      delayChildren:   0.1,
    },
  },
}

/* Word-by-word cascade reveal — each word fades up with blur.
   accentWords: list of exact words to highlight in accent color. */
export const HeadlineReveal = memo(function HeadlineReveal({
  text,
  accentWords = [],
  className   = '',
}: HeadlineRevealProps) {
  const words = text.split(' ')

  return (
    <motion.h1
      className={className}
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {words.map((word, i) => {
        const isAccent = accentWords.includes(word)

        return (
          <motion.span
            key={`${word}-${i}`}
            variants={wordVariant}
            style={{
              display:     'inline-block',
              marginRight: '0.28em',
              /* Accent words get the orange color */
              color:       isAccent ? '#FF6B00' : undefined,
            }}
            aria-hidden
          >
            {word}
          </motion.span>
        )
      })}
    </motion.h1>
  )
})

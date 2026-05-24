import type { Metadata, Viewport } from 'next'
import './globals.css'
import { RootProvider } from '@/providers/root-provider'

export const metadata: Metadata = {
  title: {
    default:  'Guilherme Melo — Software House',
    template: '%s | Guilherme Melo',
  },
  description:
    'Software house focada em tecnologia, automação, SaaS e crescimento digital. Construímos produtos que escalam.',
  keywords: ['software house', 'desenvolvimento web', 'automação', 'SaaS', 'Next.js', 'React'],
  authors:  [{ name: 'Guilherme Melo' }],
  creator:  'Guilherme Melo',
  openGraph: {
    type:        'website',
    locale:      'pt_BR',
    title:       'Guilherme Melo — Software House',
    description: 'Software house focada em tecnologia, automação, SaaS e crescimento digital.',
    siteName:    'Guilherme Melo',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Guilherme Melo — Software House',
    description: 'Software house focada em tecnologia, automação, SaaS e crescimento digital.',
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  themeColor:   '#0A0A0A',
  colorScheme:  'dark',
  width:        'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Fontshare — Satoshi + Clash Display */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700,800,900&f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        {/* Google Fonts — JetBrains Mono (terminal/mono) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A0A0A] text-[#F3F3F3] antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}

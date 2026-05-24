import type { Metadata, Viewport } from 'next'
import { Analytics }     from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { RootProvider } from '@/providers/root-provider'
import { JsonLd }       from '@/components/seo/json-ld'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://guilhermemelo.dev'

/* ── SEO Metadata ─────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : SITE_URL
  ),

  title: {
    default:  'Guilherme Melo | Software House Recife — Sites, SaaS, Automações e Tráfego Pago',
    template: '%s | Guilherme Melo',
  },
  description:
    'Software house em Recife especializada em criação de sites, landing pages, SaaS, automação WhatsApp, tráfego pago e sistemas inteligentes. Atendemos Recife, Olinda, Jaboatão, Paulista e toda Pernambuco.',

  keywords: [
    'software house recife',
    'criação de sites recife',
    'desenvolvimento web recife',
    'landing page recife',
    'tráfego pago recife',
    'automação whatsapp recife',
    'desenvolvimento saas recife',
    'gestão de tráfego pernambuco',
    'sites para empresas recife',
    'agência digital recife',
    'programador freelancer recife',
    'criação de sites olinda',
    'criação de sites jaboatão',
    'sistema web recife',
    'guilherme melo',
    'next.js',
    'react',
  ],

  authors:   [{ name: 'Guilherme Melo', url: SITE_URL }],
  creator:   'Guilherme Melo',
  publisher: 'Guilherme Melo',

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type:        'website',
    locale:      'pt_BR',
    url:         SITE_URL,
    title:       'Guilherme Melo | Software House Recife',
    description: 'Software house em Recife especializada em criação de sites, SaaS, automação e tráfego pago. Transformamos negócios com tecnologia de alto nível.',
    siteName:    'Guilherme Melo',
    images: [
      {
        url:    '/og-image.png',
        width:  1200,
        height: 630,
        alt:    'Guilherme Melo — Software House Recife',
      },
    ],
  },

  twitter: {
    card:        'summary_large_image',
    title:       'Guilherme Melo | Software House Recife',
    description: 'Software house em Recife especializada em criação de sites, SaaS, automação e tráfego pago.',
    images:      ['/og-image.png'],
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },

  /* Geo meta tags — local SEO for Recife */
  other: {
    'geo.region':    'BR-PE',
    'geo.placename': 'Recife',
    'geo.position':  '-8.05428;-34.88113',
    'ICBM':          '-8.05428, -34.88113',
  },
}

export const viewport: Viewport = {
  themeColor:   '#0A0A0A',
  colorScheme:  'dark',
  width:        'device-width',
  initialScale: 1,
}

/* ── Root Layout ──────────────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* DNS prefetch for external origins */}
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Preconnect — establishes early connections */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Fontshare — Satoshi + Clash Display */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700,800,900&f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        {/* Google Fonts — JetBrains Mono */}
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />

        {/* Structured data */}
        <JsonLd />
      </head>
      <body className="bg-[#0A0A0A] text-[#F3F3F3] antialiased">
        <RootProvider>{children}</RootProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

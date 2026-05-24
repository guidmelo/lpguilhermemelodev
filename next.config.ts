import type { NextConfig } from 'next'

/* Security headers applied to every route */
const SECURITY_HEADERS = [
  { key: 'X-Content-Type-Options',  value: 'nosniff' },
  { key: 'X-Frame-Options',         value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection',        value: '1; mode=block' },
  { key: 'Referrer-Policy',         value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',      value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  /* Strip X-Powered-By header — minor security improvement */
  poweredByHeader: false,

  /* Enable gzip + brotli compression */
  compress: true,

  /* Image optimization */
  images: {
    formats:         ['image/avif', 'image/webp'],
    deviceSizes:     [640, 750, 828, 1080, 1200, 1920],
    imageSizes:      [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year for immutable assets
  },

  /* HTTP headers */
  async headers() {
    return [
      /* Security headers on all pages */
      {
        source:  '/(.*)',
        headers: SECURITY_HEADERS,
      },
      /* Long-lived cache for public assets (images, fonts in /public) */
      {
        source:  '/(.*)\\.(png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default nextConfig

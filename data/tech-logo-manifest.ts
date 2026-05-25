/**
 * Static map of slug → resolved public path.
 * Generated from public/assets/tech/ — add new entries here when dropping new logos.
 * TechIcon checks this first; unknown slugs fall back to the probe cascade.
 */
export const TECH_LOGO_MANIFEST: Record<string, string> = {
  // ── languages ───────────────────────────────────────────────────────────────
  html:          '/assets/tech/languages/html.png',
  css:           '/assets/tech/languages/css.png',
  javascript:    '/assets/tech/languages/javascript.jpg',
  typescript:    '/assets/tech/languages/typescript.png',

  // ── frontend ────────────────────────────────────────────────────────────────
  react:         '/assets/tech/frontend/react.png',
  nextjs:        '/assets/tech/frontend/nextjs.png',
  vue:           '/assets/tech/frontend/vue.png',
  tailwind:      '/assets/tech/frontend/tailwind.png',
  shadcn:        '/assets/tech/frontend/shadcn.png',
  tanstackquery: '/assets/tech/frontend/tanstackquery.png',

  // ── backend ─────────────────────────────────────────────────────────────────
  nodejs:     '/assets/tech/backend/nodejs.png',
  nestjs:     '/assets/tech/backend/nestjs.png',
  express:    '/assets/tech/backend/express.png',
  fastapi:    '/assets/tech/backend/fastapi.png',
  graphql:    '/assets/tech/backend/graphql.png',
  trpc:       '/assets/tech/backend/trpc.png',
  grpc:       '/assets/tech/backend/grpc.png',
  websockets: '/assets/tech/backend/websockets.png',

  // ── devops ──────────────────────────────────────────────────────────────────
  docker:        '/assets/tech/devops/docker.png',
  kubernetes:    '/assets/tech/devops/kubernetes.jpg',
  terraform:     '/assets/tech/devops/terraform.png',
  githubactions: '/assets/tech/devops/githubactions.png',
  prometheus:    '/assets/tech/devops/prometheus.jpg',
  grafana:       '/assets/tech/devops/grafana.png',

  // ── cloud ───────────────────────────────────────────────────────────────────
  aws:               '/assets/tech/cloud/aws.png',
  vercel:            '/assets/tech/cloud/vercel.jpg',
  cloudflareworkers: '/assets/tech/cloud/cloudflareworkers.jpg',

  // ── ai ──────────────────────────────────────────────────────────────────────
  langchain:   '/assets/tech/ai/langchain.png',
  huggingface: '/assets/tech/ai/huggingface.jpg',

  // ── database ────────────────────────────────────────────────────────────────
  postgre:  '/assets/tech/database/postgre.png',
  mongoDB:  '/assets/tech/database/mongoDB.png',
  prisma:   '/assets/tech/database/prisma.png',
  redis:    '/assets/tech/database/redis.jpg',
  pinecone: '/assets/tech/database/pinecone.svg',

  // ── mobile ──────────────────────────────────────────────────────────────────
  reactnative: '/assets/tech/mobile/reactnative.png',
  expo:        '/assets/tech/mobile/expo.png',
  flutter:     '/assets/tech/mobile/flutter.png',

  // ── performance ─────────────────────────────────────────────────────────────
  kafka:    '/assets/tech/performance/kafka.png',
  rabbitmq: '/assets/tech/performance/rabbitmq.png',

  // ── security ────────────────────────────────────────────────────────────────
  'oauth2.0': '/assets/tech/security/oauth2.0.png',
  OIDC:       '/assets/tech/security/OIDC.png',

  // ── testing ─────────────────────────────────────────────────────────────────
  sentry:  '/assets/tech/testing/sentry.webp',
  swagger: '/assets/tech/testing/swagger.png',
}
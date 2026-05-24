export type TechCategory =
  | 'frontend'
  | 'backend'
  | 'cloud'
  | 'ai'
  | 'database'
  | 'mobile'
  | 'performance'
  | 'security'
  | 'testing'

export interface TechItem {
  name:        string
  slug:        string
  category:    TechCategory
  icon:        string
  description: string
  glow:        string
  featured?:   boolean
}

export interface TechCategoryGroup {
  label:  string
  accent: string
  col:    string
  items:  readonly TechItem[]
}

function tech(
  name: string,
  slug: string,
  category: TechCategory,
  description: string,
  glow: string,
  featured?: boolean,
): TechItem {
  return { name, slug, category, icon: `/assets/tech/${category}/${slug}.svg`, description, glow, featured }
}

export const TECH_CATEGORIES: readonly TechCategoryGroup[] = [
  {
    label:  'Front-end Engineering',
    accent: '#FF6B00',
    col:    'lg:col-span-7',
    items: [
      tech('HTML5',       'html5',      'frontend', 'Linguagem de marcação semântica para estrutura web',       '#E34F26', true),
      tech('CSS3',        'css3',       'frontend', 'Folhas de estilo com animações e layouts modernos',        '#1572B6'),
      tech('JavaScript',  'javascript', 'frontend', 'Linguagem de programação da web nativa nos navegadores',   '#F7DF1E'),
      tech('TypeScript',  'typescript', 'frontend', 'JavaScript com tipagem estática para código mais robusto', '#3178C6', true),
      tech('React',       'react',      'frontend', 'Biblioteca para construção de interfaces declarativas',    '#61DAFB', true),
      tech('Next.js',     'nextjs',     'frontend', 'Framework React fullstack com App Router e RSC',           '#F3F3F3', true),
      tech('Vue.js',      'vue',        'frontend', 'Framework progressivo para interfaces reativas e simples', '#4FC08D'),
      tech('TailwindCSS', 'tailwind',   'frontend', 'Framework CSS utilitário para design sistemático e rápido','#06B6D4', true),
      tech('Shadcn UI',   'shadcn',     'frontend', 'Componentes acessíveis e customizáveis construídos com Radix','#F3F3F3'),
    ],
  },
  {
    label:  'Back-end Architecture',
    accent: '#4F8EF7',
    col:    'lg:col-span-5',
    items: [
      tech('Node.js',    'nodejs',     'backend', 'Runtime JavaScript para back-end de alta performance',    '#339933', true),
      tech('NestJS',     'nestjs',     'backend', 'Framework Node.js estruturado com DI e módulos',          '#E0234E', true),
      tech('Express',    'express',    'backend', 'Micro-framework minimalista para APIs rápidas',            '#F3F3F3'),
      tech('FastAPI',    'fastapi',    'backend', 'Framework Python async de alto desempenho para APIs',      '#009688'),
      tech('GraphQL',    'graphql',    'backend', 'Query language flexível para APIs declarativas e tipadas', '#E10098'),
      tech('tRPC',       'trpc',       'backend', 'APIs type-safe end-to-end sem geração de código extra',    '#2596BE'),
      tech('gRPC',       'grpc',       'backend', 'Protocol Buffers para comunicação eficiente entre serviços','#4285F4'),
      tech('WebSockets', 'websockets', 'backend', 'Comunicação bidirecional persistente em tempo real',       '#4F8EF7'),
      tech('OpenAPI',    'openapi',    'backend', 'Especificação padrão para APIs REST bem documentadas',     '#6BA539'),
    ],
  },
  {
    label:  'Cloud & DevOps',
    accent: '#34D399',
    col:    'lg:col-span-5',
    items: [
      tech('Docker',          'docker',      'cloud', 'Containerização de aplicações e ambientes de execução',   '#2496ED', true),
      tech('Kubernetes',      'k8s',         'cloud', 'Orquestração de contêineres em ambientes de produção',    '#326CE5', true),
      tech('Terraform',       'terraform',   'cloud', 'Infrastructure as Code declarativa e versionada',         '#7B42BC'),
      tech('AWS',             'aws',         'cloud', 'Plataforma cloud com mais de 200 serviços gerenciados',   '#FF9900', true),
      tech('Vercel',          'vercel',      'cloud', 'Plataforma de deploy otimizada para Next.js e edge',      '#F3F3F3'),
      tech('GitHub Actions',  'gh-actions',  'cloud', 'CI/CD nativo com workflows YAML integrados ao repositório','#2088FF'),
      tech('Prometheus',      'prometheus',  'cloud', 'Sistema de monitoramento com alertas e séries temporais', '#E6522C'),
      tech('Grafana',         'grafana',     'cloud', 'Visualização de métricas e logs em dashboards interativos','#F46800'),
    ],
  },
  {
    label:  'IA & Automações',
    accent: '#FF6B00',
    col:    'lg:col-span-7',
    items: [
      tech('OpenAI API',         'openai',      'ai', 'Modelos GPT-4o e embeddings para aplicações inteligentes', '#10A37F', true),
      tech('LangChain',          'langchain',   'ai', 'Framework para pipelines com LLMs e agentes autônomos',    '#F3F3F3', true),
      tech('Pinecone',           'pinecone',    'ai', 'Banco vetorial serverless para busca semântica escalável', '#000000'),
      tech('Hugging Face',       'huggingface', 'ai', 'Plataforma com milhares de modelos de ML open-source',    '#FFD21E'),
      tech('AI Agents',          'ai-agents',   'ai', 'Agentes autônomos com ferramentas e memória persistente',  '#FF6B00', true),
      tech('Prompt Engineering', 'prompting',   'ai', 'Técnicas avançadas de design de prompts para LLMs',       '#818CF8'),
    ],
  },
  {
    label:  'Banco de Dados',
    accent: '#818CF8',
    col:    'lg:col-span-4',
    items: [
      tech('PostgreSQL', 'postgres', 'database', 'Banco relacional robusto com suporte a JSON nativo',       '#4169E1', true),
      tech('MongoDB',    'mongodb',  'database', 'Banco NoSQL orientado a documentos e altamente flexível',  '#47A248'),
      tech('Prisma',     'prisma',   'database', 'ORM type-safe com migrations automáticas e schema-first',  '#2D3748', true),
      tech('Redis',      'redis',    'database', 'Cache em memória ultra-rápido para sessões e filas',       '#DC382D'),
      tech('Firebase',   'firebase', 'database', 'Backend-as-a-Service com realtime e autenticação pronta', '#FFCA28'),
      tech('Supabase',   'supabase', 'database', 'Alternativa open-source ao Firebase baseada em Postgres',  '#3ECF8E'),
    ],
  },
  {
    label:  'Mobile Development',
    accent: '#F472B6',
    col:    'lg:col-span-4',
    items: [
      tech('React Native',  'react-native', 'mobile', 'Aplicativos nativos para iOS e Android com React',    '#61DAFB', true),
      tech('Expo',          'expo',         'mobile', 'Plataforma de desenvolvimento React Native simplificada','#F3F3F3'),
      tech('Flutter',       'flutter',      'mobile', 'SDK Dart cross-platform da Google com engine Skia',   '#02569B'),
      tech('Redux Toolkit', 'redux',        'mobile', 'Gerenciamento de estado previsível e escalável',      '#764ABC'),
      tech('React Query',   'react-query',  'mobile', 'Data fetching inteligente com cache e sincronização', '#FF4154'),
    ],
  },
  {
    label:  'Performance & Escala',
    accent: '#34D399',
    col:    'lg:col-span-4',
    items: [
      tech('Bun',         'bun',      'performance', 'Runtime JavaScript ultra-rápido com bundler nativo',      '#F9F1E1'),
      tech('Golang',      'go',       'performance', 'Linguagem compilada de alta concorrência desenvolvida pelo Google','#00ADD8', true),
      tech('Rust',        'rust',     'performance', 'Linguagem de sistemas com segurança de memória garantida', '#CE422B'),
      tech('WebAssembly', 'wasm',     'performance', 'Bytecode de baixo nível para performance máxima no browser','#654FF0'),
      tech('Kafka',       'kafka',    'performance', 'Plataforma de streaming distribuído de eventos em escala', '#231F20'),
      tech('RabbitMQ',    'rabbitmq', 'performance', 'Message broker com filas persistentes e roteamento flexível','#FF6600'),
    ],
  },
  {
    label:  'Segurança',
    accent: '#FBBF24',
    col:    'lg:col-span-6',
    items: [
      tech('OAuth 2.0',          'oauth',      'security', 'Protocolo padrão de autorização delegada para APIs',      '#EB5424'),
      tech('OIDC',               'oidc',       'security', 'Camada de identidade e autenticação sobre OAuth 2.0',     '#F5A623'),
      tech('JWT',                'jwt',        'security', 'Tokens compactos e assinados para autenticação stateless', '#D63AFF'),
      tech('Cloudflare Workers', 'cf-workers', 'security', 'Edge computing com proteção DDoS e WAF integrada',        '#F38020', true),
      tech('Sentry',             'sentry',     'security', 'Monitoramento de erros e rastreamento em tempo real',     '#362D59'),
      tech('HTTPS/TLS',          'tls',        'security', 'Criptografia de transporte e gerenciamento de certificados','#00B388'),
    ],
  },
  {
    label:  'Qualidade & Testes',
    accent: '#A78BFA',
    col:    'lg:col-span-6',
    items: [
      tech('Jest',       'jest',       'testing', 'Framework de testes unitários e de integração para JS',  '#C21325'),
      tech('Playwright', 'playwright', 'testing', 'Automação de browser end-to-end confiável e rápida',     '#45BA4B', true),
      tech('Cypress',    'cypress',    'testing', 'Testes E2E com depuração visual em tempo real',          '#17202C'),
      tech('SonarQube',  'sonarqube',  'testing', 'Análise estática de qualidade e segurança do código',   '#4E9BCD'),
      tech('ESLint',     'eslint',     'testing', 'Linting JavaScript/TypeScript com regras customizáveis', '#4B32C3'),
      tech('Prettier',   'prettier',   'testing', 'Formatação automática e consistente de todo o código',   '#F7B93E'),
    ],
  },
]

export const ALL_TECH: readonly TechItem[] = TECH_CATEGORIES.flatMap((c) => c.items)

export const badgeItemVariants = {
  hidden: { opacity: 0, scale: 0.85 as number, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    scale: 1 as number,
    filter: 'blur(0px)',
    transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] as const },
  },
}

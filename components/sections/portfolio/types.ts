export type MockupVariant = 'landing' | 'saas' | 'systems'

export interface ProjectDef {
  id:          string
  title:       string
  subtitle:    string
  category:    string
  stack:       string[]
  /** CSS gradient for the mockup bg */
  gradient:    string
  accentColor: string
  description: string
  features:    string[]
  mockup:      MockupVariant
  /** Tailwind col-span classes */
  colClass:    string
  featured?:   boolean
}

/* ── Real projects from guidmelo GitHub ─────────────────────────────────── */
export const PROJECTS: ProjectDef[] = [
  {
    id:          'pagodin-burguer',
    title:       'Pagodin Burguer',
    subtitle:    'Landing page premium — hambúrguer artesanal na parrilla',
    category:    'Landing Page',
    stack:       ['Next.js', 'Tailwind', 'Framer Motion'],
    gradient:    'linear-gradient(145deg, #1c0800 0%, #301200 55%, #1a0700 100%)',
    accentColor: '#FF6B00',
    description: 'Experiência digital premium para marca de hambúrguer artesanal em Recife/PE. Interface cinematográfica com motion avançado, transmitindo identidade, sabor e sofisticação de marca.',
    features:    ['Identidade visual premium', 'Motion cinematográfico', 'Alta conversão', 'Mobile-first design'],
    mockup:      'landing',
    colClass:    'lg:col-span-7',
    featured:    true,
  },
  {
    id:          'botopremium',
    title:       'BotoPremium',
    subtitle:    'Landing page ultra premium — plataforma de automações',
    category:    'Landing Page',
    stack:       ['Next.js', 'Three.js', 'GSAP', 'Framer Motion'],
    gradient:    'linear-gradient(145deg, #030810 0%, #071020 55%, #030810 100%)',
    accentColor: '#4F8EF7',
    description: 'Landing page cinematográfica ultra premium para plataforma SaaS de automações. WebGL, Three.js e GSAP ScrollTrigger criam uma experiência tecnológica de alto impacto.',
    features:    ['WebGL / Three.js 3D', 'GSAP ScrollTrigger', 'Parallax avançado', 'UI premium'],
    mockup:      'landing',
    colClass:    'lg:col-span-5',
  },
  {
    id:          'sanflait',
    title:       'Sanflait',
    subtitle:    'SaaS platform — gestão operacional completa',
    category:    'SaaS Platform',
    stack:       ['Next.js', 'Supabase', 'TypeScript', 'Tailwind'],
    gradient:    'linear-gradient(145deg, #040f0c 0%, #091a14 55%, #040f0c 100%)',
    accentColor: '#34D399',
    description: 'Plataforma SaaS completa com autenticação, dashboard analytics em tempo real, gestão de usuários e interface premium. Arquitetura moderna com backend Supabase.',
    features:    ['Auth & roles', 'Dashboard analytics', 'Real-time Supabase', 'API integration'],
    mockup:      'saas',
    colClass:    'lg:col-span-4',
  },
  {
    id:          'holder-condominios',
    title:       'Holder Condomínios',
    subtitle:    'Institucional premium — administração condominial',
    category:    'Site Institucional',
    stack:       ['Next.js', 'Tailwind', 'Framer Motion'],
    gradient:    'linear-gradient(145deg, #050818 0%, #0a1030 55%, #050818 100%)',
    accentColor: '#818CF8',
    description: 'Presença digital sofisticada para administradora de condomínios em Recife/PE. Foco em credibilidade, confiança e conversão com interface premium.',
    features:    ['Brand premium', 'SEO otimizado', 'Formulários integrados', 'Motion refinado'],
    mockup:      'landing',
    colClass:    'lg:col-span-4',
  },
  {
    id:          'cemevet',
    title:       'Cemevet Cursos',
    subtitle:    'Landing page — cursos de medicina veterinária',
    category:    'Landing Page',
    stack:       ['Next.js', 'Tailwind'],
    gradient:    'linear-gradient(145deg, #080d0a 0%, #10180e 55%, #080d0a 100%)',
    accentColor: '#4ADE80',
    description: 'Landing page de captação para cursos de Auxiliar de Medicina Veterinária em Camaragibe/PE. Comunicação clara, conversão otimizada e experiência mobile-first.',
    features:    ['Captação de leads', 'Mobile-first', 'Copy estratégico', 'Alta conversão'],
    mockup:      'landing',
    colClass:    'lg:col-span-4',
  },
  {
    id:          'tropa-dos-gorillas',
    title:       'Tropa dos Gorillas',
    subtitle:    'Landing page premium — crew de corrida urbana',
    category:    'Landing Page',
    stack:       ['Next.js', 'Tailwind', 'Framer Motion'],
    gradient:    'linear-gradient(145deg, #0e0808 0%, #1c0c0c 55%, #0e0808 100%)',
    accentColor: '#F87171',
    description: 'Landing page premium para crew de corrida urbana de Recife. Identidade visual forte, motion energético e experiência digital que transmite a essência da comunidade.',
    features:    ['Identidade forte', 'Motion energético', 'Community vibe', 'Responsivo'],
    mockup:      'landing',
    colClass:    'lg:col-span-5',
  },
  {
    id:          'sucatao-fc',
    title:       'Sucatão FC',
    subtitle:    'Site institucional — clube de futebol',
    category:    'Site Institucional',
    stack:       ['Next.js', 'Tailwind'],
    gradient:    'linear-gradient(145deg, #040810 0%, #08101c 55%, #040810 100%)',
    accentColor: '#60A5FA',
    description: 'Site institucional completo para clube de futebol com calendário de jogos, elenco, galeria e presença digital moderna. Identidade visual coesa e mobile-first.',
    features:    ['Elenco & calendário', 'Galeria interativa', 'Mobile-first', 'Brand identity'],
    mockup:      'landing',
    colClass:    'lg:col-span-4',
  },
  {
    id:          'newway-systems',
    title:       'NewWay Systems',
    subtitle:    'Plataforma de sistemas — gestão empresarial',
    category:    'Sistemas',
    stack:       ['Next.js', 'TypeScript', 'Tailwind'],
    gradient:    'linear-gradient(145deg, #080808 0%, #141414 55%, #080808 100%)',
    accentColor: '#A78BFA',
    description: 'Plataforma de gestão empresarial com arquitetura TypeScript moderna, interface limpa e estrutura escalável para operações de médio porte.',
    features:    ['TypeScript puro', 'Arquitetura escalável', 'Interface limpa', 'Dashboard operacional'],
    mockup:      'systems',
    colClass:    'lg:col-span-3',
  },
]

/* Layout note:
 *  Row 1:  [Pagodin ────── 7] [BotoPremium ─ 5]
 *  Row 2:  [Sanflait ─── 4] [Holder ─── 4] [Cemevet ─── 4]
 *  Row 3:  [Gorillas ─── 5] [Sucatão ── 4] [NewWay ── 3]
 */

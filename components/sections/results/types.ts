export interface MetricDef {
  label:    string
  value:    string
  context?: string
}

export interface CaseDef {
  id:          string
  title:       string
  subtitle:    string
  category:    string
  segment:     string
  gradient:    string
  accentColor: string
  challenge:   string
  solution:    string
  impact:      string
  metrics:     MetricDef[]
  stack:       string[]
  colClass:    string
  featured?:   boolean
  chartPath:   string
  areaPath:    string
}

export const CASES: CaseDef[] = [
  {
    id:          'pagodin-burguer',
    title:       'Pagodin Burguer',
    subtitle:    'Identidade digital premium para hambúrguer artesanal em Recife/PE',
    category:    'Landing Page',
    segment:     'Alimentação',
    gradient:    'linear-gradient(145deg, #1c0800 0%, #2c1200 55%, #1a0700 100%)',
    accentColor: '#FF6B00',
    challenge:   'Marca local com presença digital fraca, sem estrutura que transmitisse o nível premium do produto e sem canal digital de geração de demanda.',
    solution:    'Landing page cinematográfica com identidade visual sofisticada, motion avançado e experiência digital que comunica qualidade, sabor e posicionamento premium.',
    impact:      'Presença digital consolidada como referência premium na região. Canal online ativado como fonte de demanda qualificada e percepção de marca elevada.',
    metrics: [
      { label: 'Autoridade digital',  value: '↑ Alta',     context: 'Canal online ativado' },
      { label: 'Percepção de marca',  value: 'Elevada',    context: 'Feedback de clientes' },
      { label: 'Presença estruturada', value: 'Completa',  context: 'De zero a referência' },
    ],
    stack:       ['Next.js', 'TailwindCSS', 'Framer Motion'],
    colClass:    'lg:col-span-7',
    featured:    true,
    chartPath:   'M0,80 C20,76 40,55 60,35 C75,18 88,8 100,5',
    areaPath:    'M0,80 C20,76 40,55 60,35 C75,18 88,8 100,5 L100,100 L0,100 Z',
  },
  {
    id:          'botopremium',
    title:       'BotoPremium',
    subtitle:    'Landing page ultra premium para plataforma SaaS de automações',
    category:    'SaaS Landing',
    segment:     'Tecnologia',
    gradient:    'linear-gradient(145deg, #030810 0%, #071020 55%, #030810 100%)',
    accentColor: '#4F8EF7',
    challenge:   'Plataforma SaaS sem landing page que comunicasse o nível técnico e premium do produto, resultando em conversão abaixo do potencial.',
    solution:    'Landing page ultra premium com WebGL, Three.js e GSAP ScrollTrigger criando experiência tecnológica de alto impacto e posicionamento premium.',
    impact:      'Produto posicionado como referência premium no mercado de automações. Conversão melhorada e percepção de valor elevada significativamente.',
    metrics: [
      { label: 'Posicionamento',     value: 'Premium',    context: 'Mercado de SaaS' },
      { label: 'Percepção técnica',  value: '↑ Elevada',  context: 'Experiência WebGL' },
      { label: 'Conversão digital',  value: 'Melhorada',  context: 'vs versão anterior' },
    ],
    stack:       ['Next.js', 'Three.js', 'GSAP', 'Framer Motion'],
    colClass:    'lg:col-span-5',
    chartPath:   'M0,82 C35,80 55,72 65,45 C75,20 88,6 100,4',
    areaPath:    'M0,82 C35,80 55,72 65,45 C75,20 88,6 100,4 L100,100 L0,100 Z',
  },
  {
    id:          'sanflait',
    title:       'Sanflait',
    subtitle:    'Plataforma SaaS completa para gestão operacional',
    category:    'SaaS Platform',
    segment:     'Gestão',
    gradient:    'linear-gradient(145deg, #040f0c 0%, #091a14 55%, #040f0c 100%)',
    accentColor: '#34D399',
    challenge:   'Operação manual fragmentada sem sistema centralizado, processos ineficientes e ausência de dados em tempo real para decisão.',
    solution:    'Plataforma SaaS completa com autenticação, dashboard analytics, gestão de usuários e integrações em tempo real via Supabase.',
    impact:      'Operações centralizadas em uma única plataforma, redução de tempo em processos manuais e acesso a dados em tempo real.',
    metrics: [
      { label: 'Processos centralizados', value: '100%',    context: 'Uma única plataforma' },
      { label: 'Tempo operacional',       value: '↓ Menor', context: 'vs gestão manual' },
      { label: 'Dados em tempo real',     value: 'Ativo',   context: 'Analytics live' },
    ],
    stack:       ['Next.js', 'Supabase', 'TypeScript', 'TailwindCSS'],
    colClass:    'lg:col-span-4',
    chartPath:   'M0,75 C25,70 48,56 62,42 C73,28 88,15 100,10',
    areaPath:    'M0,75 C25,70 48,56 62,42 C73,28 88,15 100,10 L100,100 L0,100 Z',
  },
  {
    id:          'cemevet',
    title:       'Cemevet Cursos',
    subtitle:    'Landing page de captação para medicina veterinária',
    category:    'Lead Capture',
    segment:     'Educação',
    gradient:    'linear-gradient(145deg, #080d0a 0%, #10180e 55%, #080d0a 100%)',
    accentColor: '#4ADE80',
    challenge:   'Captação de leads para cursos de forma orgânica e não estruturada, sem funil digital ou processo de conversão definido.',
    solution:    'Landing page de alta conversão com copy estratégico, estrutura mobile-first e formulário otimizado para captação qualificada.',
    impact:      'Geração consistente e previsível de leads qualificados. Canal digital de captação estruturado e funil de vendas definido.',
    metrics: [
      { label: 'Leads gerados',      value: '↑ Constante', context: 'Funil estruturado' },
      { label: 'Canal de captação',  value: 'Ativo',       context: 'De zero a operacional' },
      { label: 'Mobile-first',       value: '100%',        context: 'Performance otimizada' },
    ],
    stack:       ['Next.js', 'TailwindCSS'],
    colClass:    'lg:col-span-4',
    chartPath:   'M0,78 C30,76 52,64 68,38 C80,18 90,9 100,7',
    areaPath:    'M0,78 C30,76 52,64 68,38 C80,18 90,9 100,7 L100,100 L0,100 Z',
  },
  {
    id:          'tropa-dos-gorillas',
    title:       'Tropa dos Gorillas',
    subtitle:    'Identidade digital para crew de corrida urbana em Recife',
    category:    'Landing Page',
    segment:     'Esportes',
    gradient:    'linear-gradient(145deg, #0e0808 0%, #1c0c0c 55%, #0e0808 100%)',
    accentColor: '#F87171',
    challenge:   'Comunidade ativa de corrida urbana sem identidade digital coesa, hub de informações ou presença online que representasse a energia do grupo.',
    solution:    'Landing page premium com identidade visual forte, motion energético e estrutura digital que centraliza informações e transmite a essência da comunidade.',
    impact:      'Hub digital da comunidade estabelecido. Identidade visual consolidada e engajamento digital aumentado com canal centralizado de comunicação.',
    metrics: [
      { label: 'Hub centralizado',    value: 'Criado',     context: 'De ausência a referência' },
      { label: 'Identidade digital',  value: 'Consolidada', context: 'Brand coeso' },
      { label: 'Engajamento',         value: '↑ Alto',     context: 'Comunidade online' },
    ],
    stack:       ['Next.js', 'TailwindCSS', 'Framer Motion'],
    colClass:    'lg:col-span-4',
    chartPath:   'M0,76 C28,72 52,60 68,42 C80,24 92,12 100,9',
    areaPath:    'M0,76 C28,72 52,60 68,42 C80,24 92,12 100,9 L100,100 L0,100 Z',
  },
]

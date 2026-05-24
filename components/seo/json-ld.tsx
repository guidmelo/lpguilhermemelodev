const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://guilhermemelo.dev'

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type':     'Person',
      '@id':       `${SITE_URL}/#person`,
      name:        'Guilherme Melo',
      url:         SITE_URL,
      jobTitle:    'Software Developer & Digital Strategist',
      description: 'Desenvolvedor full-stack e especialista em automação e tráfego pago baseado em Recife, Pernambuco.',
      address: {
        '@type':          'PostalAddress',
        addressLocality:  'Recife',
        addressRegion:    'PE',
        addressCountry:   'BR',
      },
      knowsAbout: [
        'Web Development', 'SaaS', 'Digital Marketing',
        'WhatsApp Automation', 'Next.js', 'React', 'TypeScript',
        'Traffic Management', 'Landing Pages', 'System Design',
      ],
    },
    {
      '@type':       'ProfessionalService',
      '@id':         `${SITE_URL}/#business`,
      name:          'Guilherme Melo — Software House',
      url:           SITE_URL,
      description:   'Software house em Recife especializada em criação de sites, landing pages, SaaS, automação WhatsApp, tráfego pago e sistemas inteligentes para empresas que querem escalar.',
      founder:       { '@id': `${SITE_URL}/#person` },
      areaServed:    [
        'Recife', 'Olinda', 'Jaboatão dos Guararapes',
        'Paulista', 'Camaragibe', 'São Lourenço da Mata',
        'Pernambuco', 'Brasil',
      ],
      serviceType:   [
        'Criação de Sites',
        'Landing Pages',
        'Desenvolvimento SaaS',
        'Automação WhatsApp',
        'Tráfego Pago',
        'Marketing Digital',
        'Desenvolvimento de Sistemas',
      ],
      address: {
        '@type':          'PostalAddress',
        addressLocality:  'Recife',
        addressRegion:    'PE',
        addressCountry:   'BR',
      },
      geo: {
        '@type':    'GeoCoordinates',
        latitude:   '-8.05428',
        longitude:  '-34.88113',
      },
      priceRange: '$$',
      openingHours: 'Mo-Fr 09:00-18:00',
    },
    {
      '@type':       'WebSite',
      '@id':         `${SITE_URL}/#website`,
      url:           SITE_URL,
      name:          'Guilherme Melo — Software House Recife',
      description:   'Software house em Recife — sites, SaaS, automações e tráfego pago.',
      publisher:     { '@id': `${SITE_URL}/#person` },
      inLanguage:    'pt-BR',
    },
  ],
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

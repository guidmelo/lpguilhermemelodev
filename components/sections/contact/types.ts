export type StepState = 'intro' | 1 | 2 | 3 | 4 | 5 | 'success'

export interface FormState {
  businessType:    string
  digitalPresence: string
  objectives:      string[]
  needs:           string[]
  name:            string
  whatsapp:        string
  email:           string
  empresa:         string
}

export const INITIAL_STATE: FormState = {
  businessType:    '',
  digitalPresence: '',
  objectives:      [],
  needs:           [],
  name:            '',
  whatsapp:        '',
  email:           '',
  empresa:         '',
}

export interface Option {
  id:    string
  label: string
  desc?: string
  icon?: string
}

export const BUSINESS_TYPES: Option[] = [
  { id: 'local',     label: 'Negócio Local',       icon: '◈', desc: 'Restaurante, clínica, loja física' },
  { id: 'ecommerce', label: 'E-commerce',           icon: '◉', desc: 'Loja virtual, marketplace' },
  { id: 'saas',      label: 'SaaS / Startup',       icon: '⬡', desc: 'Produto digital, plataforma' },
  { id: 'liberal',   label: 'Profissional Liberal', icon: '◎', desc: 'Consultor, advogado, médico' },
  { id: 'empresa',   label: 'Empresa Estabelecida', icon: '▣', desc: 'Médio/grande porte, B2B' },
]

export const DIGITAL_PRESENCE: Option[] = [
  { id: 'nenhuma',  label: 'Nenhuma ou mínima' },
  { id: 'basica',   label: 'Básica — redes sociais' },
  { id: 'moderada', label: 'Moderada — site + redes' },
  { id: 'avancada', label: 'Avançada — sistema + tráfego' },
]

export const OBJECTIVES: Option[] = [
  { id: 'vendas',       label: 'Aumentar vendas' },
  { id: 'leads',        label: 'Gerar leads' },
  { id: 'marca',        label: 'Profissionalizar marca' },
  { id: 'atendimento',  label: 'Automatizar atendimento' },
  { id: 'sistema',      label: 'Criar sistema' },
  { id: 'saas',         label: 'Criar SaaS' },
  { id: 'presenca',     label: 'Melhorar presença' },
  { id: 'escalar',      label: 'Escalar operação' },
]

export const NEEDS: Option[] = [
  { id: 'site',        label: 'Site institucional' },
  { id: 'landing',     label: 'Landing page' },
  { id: 'trafego',     label: 'Tráfego pago' },
  { id: 'whatsapp',    label: 'Automação WhatsApp' },
  { id: 'chatbot',     label: 'Chatbot' },
  { id: 'crm',         label: 'CRM' },
  { id: 'saas',        label: 'SaaS' },
  { id: 'erp',         label: 'ERP' },
  { id: 'dashboard',   label: 'Dashboard' },
  { id: 'integracoes', label: 'Integrações' },
]

export function calculateScore(state: FormState): number {
  let score = 18
  if (state.digitalPresence === 'basica')   score += 12
  if (state.digitalPresence === 'moderada') score += 27
  if (state.digitalPresence === 'avancada') score += 42
  if (state.businessType === 'empresa')     score += 6
  if (state.businessType === 'saas')        score += 4
  const adv = state.needs.filter(n => ['saas', 'erp', 'crm', 'dashboard', 'integracoes'].includes(n)).length
  if (adv >= 2) score -= 8
  return Math.min(Math.max(score, 14), 68)
}

export function getScoreMessage(score: number): string {
  if (score < 25) return 'Potencial digital inexplorado. Estruturar agora gera vantagem competitiva real.'
  if (score < 42) return 'Estrutura básica presente. Grande oportunidade de aceleração e automação.'
  if (score < 58) return 'Base moderada detectada. Sistemas prontos para escalar com a stack certa.'
  return 'Boa base digital. Oportunidade de automação, integração e crescimento avançado.'
}

/* Replace with your actual WhatsApp number: country code + DDD + number */
export const WHATSAPP_NUMBER = '5500000000000'

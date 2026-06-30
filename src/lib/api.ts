import type { PriceBreakdown, SerreConfig } from '../types'

export interface QuoteContact {
  name: string
  email: string
  phone?: string
  city?: string
  message?: string
}

export interface QuoteResponse {
  id: string
  message: string
  emailSent: boolean
}

export async function submitQuote(
  contact: QuoteContact,
  config: SerreConfig,
  price: PriceBreakdown,
): Promise<QuoteResponse> {
  const res = await fetch('/api/quotes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...contact, config, price }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error ?? 'Aanvraag mislukt')
  }

  return data
}
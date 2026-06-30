import { getQuote } from '../../server/db.js'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const quote = getQuote(req.query.id)
  if (!quote) return res.status(404).json({ error: 'Niet gevonden' })

  return res.status(200).json({
    ...quote,
    config: JSON.parse(quote.config_json),
    price: JSON.parse(quote.price_json),
  })
}
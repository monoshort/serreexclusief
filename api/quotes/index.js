import { randomUUID } from 'crypto'
import { insertQuote, listQuotes } from '../../server/db.js'
import { sendQuoteEmail } from '../../server/email.js'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const key = req.headers['x-admin-key']
    if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
      return res.status(401).json({ error: 'Niet geautoriseerd' })
    }
    return res.status(200).json(listQuotes())
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, phone, city, message, config, price } = req.body ?? {}

    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({ error: 'Naam en e-mail zijn verplicht' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Ongeldig e-mailadres' })
    }
    if (!config || !price) {
      return res.status(400).json({ error: 'Configuratie en prijs ontbreken' })
    }

    const id = randomUUID()
    let emailResult = { sent: false, reason: 'Niet verzonden' }

    try {
      emailResult = await sendQuoteEmail({
        id,
        contact: { name, email, phone, city, message },
        config,
        price,
      })
    } catch (err) {
      console.error('E-mail verzenden mislukt:', err)
      emailResult = { sent: false, reason: 'E-mail server fout' }
    }

    insertQuote({
      id,
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      city: city?.trim() || null,
      message: message?.trim() || null,
      config_json: JSON.stringify(config),
      price_json: JSON.stringify(price),
      email_sent: emailResult.sent ? 1 : 0,
    })

    return res.status(201).json({
      id,
      message: emailResult.sent
        ? 'Uw aanvraag is ontvangen. Wij nemen binnen 1 werkdag contact met u op.'
        : 'Uw aanvraag is opgeslagen. Wij nemen binnen 1 werkdag contact met u op.',
      emailSent: emailResult.sent,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Er ging iets mis bij het verwerken van uw aanvraag' })
  }
}
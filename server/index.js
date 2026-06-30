import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { randomUUID } from 'crypto'
import { existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { insertQuote, getQuote, listQuotes } from './db.js'
import { sendQuoteEmail } from './email.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = Number(process.env.PORT || 3001)
const isProd = process.env.NODE_ENV === 'production'

app.use(cors({ origin: isProd ? false : true }))
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'serreexclusief-api' })
})

app.post('/api/quotes', async (req, res) => {
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

    res.status(201).json({
      id,
      message: emailResult.sent
        ? 'Uw aanvraag is ontvangen. Wij nemen binnen 1 werkdag contact met u op.'
        : 'Uw aanvraag is opgeslagen. Wij nemen binnen 1 werkdag contact met u op.',
      emailSent: emailResult.sent,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Er ging iets mis bij het verwerken van uw aanvraag' })
  }
})

app.get('/api/quotes/:id', (req, res) => {
  const quote = getQuote(req.params.id)
  if (!quote) return res.status(404).json({ error: 'Niet gevonden' })
  res.json({
    ...quote,
    config: JSON.parse(quote.config_json),
    price: JSON.parse(quote.price_json),
  })
})

app.get('/api/quotes', (req, res) => {
  const key = req.headers['x-admin-key']
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Niet geautoriseerd' })
  }
  res.json(listQuotes())
})

if (isProd) {
  const dist = join(__dirname, '..', 'dist')
  if (existsSync(dist)) {
    app.use(express.static(dist))
    app.get(/^(?!\/api).*/, (_req, res) => {
      res.sendFile(join(dist, 'index.html'))
    })
  }
}

app.listen(PORT, () => {
  console.log(`API server op http://localhost:${PORT}`)
})
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = process.env.VERCEL ? '/tmp' : join(__dirname, 'data')
const dbPath = join(dataDir, 'quotes.json')

mkdirSync(dataDir, { recursive: true })

function readAll() {
  if (!existsSync(dbPath)) {
    writeFileSync(dbPath, '[]', 'utf-8')
    return []
  }
  return JSON.parse(readFileSync(dbPath, 'utf-8'))
}

function writeAll(quotes) {
  writeFileSync(dbPath, JSON.stringify(quotes, null, 2), 'utf-8')
}

export function insertQuote(quote) {
  const quotes = readAll()
  quotes.unshift({
    ...quote,
    created_at: new Date().toISOString(),
  })
  writeAll(quotes)
  return quote.id
}

export function getQuote(id) {
  return readAll().find((q) => q.id === id) ?? null
}

export function listQuotes(limit = 50) {
  return readAll()
    .slice(0, limit)
    .map(({ id, created_at, name, email, city, email_sent }) => ({
      id,
      created_at,
      name,
      email,
      city,
      email_sent,
    }))
}
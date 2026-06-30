import nodemailer from 'nodemailer'

const MODEL_NAMES = {
  'serre-uitbouw': 'Serre uitbouw',
  'steellook-serre': 'Steellook Serre',
  'houten-serre': 'Houten Serre',
  'tuinkamer-veranda': 'Tuinkamer / Veranda',
  'minimalistische-schuifpui': 'Minimalistische schuifpui',
}

const OPTION_NAMES = {
  vloerverwarming: 'Vloerverwarming',
  zonwering: 'Zonwering',
  schuifpui: 'Schuifpui (dubbel)',
  lichtstraat: 'Centrale lichtstraat',
  fundering: 'Fundering & vloer',
  'triple-glas-upgrade': 'Triple glas upgrade',
  'zonwering-glas': 'Zonwerend glas',
  'elektrische-ramen': 'Elektrische raamopeners',
}

function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

function formatConfigSummary(config) {
  const options = (config.options ?? [])
    .map((id) => OPTION_NAMES[id])
    .filter(Boolean)
    .join(', ')

  return [
    `Model: ${MODEL_NAMES[config.model] ?? config.model}`,
    `Afmetingen: ${config.width} × ${config.depth} m (${config.width * config.depth} m²)`,
    `Dak: ${config.roof}`,
    config.model === 'houten-serre'
      ? `Houtsoort: ${config.woodType ?? '—'}`
      : `Kozijnkleur: ${config.frameColor}`,
    `Glas: ${config.glass === 'triple' ? 'Triple' : 'HR++'}`,
    options ? `Opties: ${options}` : 'Opties: geen',
  ].join('\n')
}

export async function sendQuoteEmail({ id, contact, config, price }) {
  if (!isSmtpConfigured()) {
    return { sent: false, reason: 'SMTP niet geconfigureerd' }
  }

  const notifyTo = process.env.NOTIFY_EMAIL || 'info@serreexclusief.nl'
  const from = process.env.SMTP_FROM || process.env.SMTP_USER

  const summary = formatConfigSummary(config)
  const priceLine = `€ ${price.range[0].toLocaleString('nl-NL')} – € ${price.range[1].toLocaleString('nl-NL')} (excl. BTW)`

  const text = [
    `Nieuwe offerteaanvraag via configurator (#${id})`,
    '',
    '--- Contact ---',
    `Naam: ${contact.name}`,
    `E-mail: ${contact.email}`,
    contact.phone ? `Telefoon: ${contact.phone}` : null,
    contact.city ? `Plaats: ${contact.city}` : null,
    contact.message ? `Bericht: ${contact.message}` : null,
    '',
    '--- Configuratie ---',
    summary,
    '',
    '--- Prijsindicatie ---',
    priceLine,
  ]
    .filter(Boolean)
    .join('\n')

  const transport = createTransport()
  await transport.sendMail({
    from,
    to: notifyTo,
    replyTo: contact.email,
    subject: `Offerteaanvraag configurator – ${contact.name} (${contact.city || 'onbekend'})`,
    text,
  })

  return { sent: true }
}
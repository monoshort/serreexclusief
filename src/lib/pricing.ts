import { configOptions, models } from '../data'
import type { PriceBreakdown, SerreConfig } from '../types'

export function calculatePrice(config: SerreConfig): PriceBreakdown {
  const model = models.find((m) => m.id === config.model)!
  const area = config.width * config.depth
  const [minSqm, maxSqm] = model.pricePerSqm

  const areaCostMin = area * minSqm
  const areaCostMax = area * maxSqm
  const areaCost = (areaCostMin + areaCostMax) / 2

  let optionsCost = config.options.reduce((sum, optId) => {
    const opt = configOptions.find((o) => o.id === optId)
    return sum + (opt?.price ?? 0)
  }, 0)

  if (config.glass === 'triple' && !config.options.includes('triple-glas-upgrade')) {
    optionsCost += 2800
  }

  if (config.roof === 'lichtstraat' && !config.options.includes('lichtstraat')) {
    optionsCost += 3800
  }

  const base = model.basePrice
  const totalMin = base + areaCostMin + optionsCost * 0.9
  const totalMax = base + areaCostMax + optionsCost * 1.1
  const total = base + areaCost + optionsCost

  return {
    base,
    area,
    areaCost,
    optionsCost,
    total,
    totalInclBtw: total * 1.21,
    range: [Math.round(totalMin), Math.round(totalMax)],
  }
}

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount)
}
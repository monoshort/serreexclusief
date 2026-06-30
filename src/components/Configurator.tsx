import { useEffect, useMemo, useState } from 'react'
import { configOptions, contact, models, ralColors } from '../data'
import { submitQuote } from '../lib/api'
import { CONFIGURATOR_LOAD_EVENT, getConfigFromHash } from '../lib/configuratorNav'
import { getDefaultConfigForModel, getRoofTypesForModel } from '../lib/modelDefaults'
import { calculatePrice, formatEuro } from '../lib/pricing'
import type { RoofType, SerreConfig, WoodType } from '../types'
import ConfigSpecs from './ConfigSpecs'
import PreviewPanel from './PreviewPanel'
import SectionHeading from './SectionHeading'

const defaultConfig = getDefaultConfigForModel('serre-uitbouw')

const steps = ['Model', 'Afmetingen', 'Uiterlijk', 'Opties', 'Offerte']

export default function Configurator() {
  const [step, setStep] = useState(0)
  const [config, setConfig] = useState<SerreConfig>(() => getConfigFromHash() ?? defaultConfig)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [quoteId, setQuoteId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', message: '' })

  const price = useMemo(() => calculatePrice(config), [config])
  const selectedModel = models.find((m) => m.id === config.model)!
  const roofOptions = useMemo(() => getRoofTypesForModel(config.model), [config.model])

  useEffect(() => {
    const applyPreset = () => {
      const preset = getConfigFromHash()
      if (!preset) return
      setConfig(preset)
      setStep(0)
      setSubmitted(false)
      setSubmitError(null)
    }

    applyPreset()
    window.addEventListener('hashchange', applyPreset)
    window.addEventListener(CONFIGURATOR_LOAD_EVENT, applyPreset)
    return () => {
      window.removeEventListener('hashchange', applyPreset)
      window.removeEventListener(CONFIGURATOR_LOAD_EVENT, applyPreset)
    }
  }, [])

  const update = <K extends keyof SerreConfig>(key: K, value: SerreConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const toggleOption = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      options: prev.options.includes(id)
        ? prev.options.filter((o) => o !== id)
        : [...prev.options, id],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)

    try {
      const result = await submitQuote(
        {
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          city: form.city || undefined,
          message: form.message || undefined,
        },
        config,
        price,
      )
      setQuoteId(result.id)
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Aanvraag mislukt')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="configurator" className="py-24 sm:py-32 bg-forest-dark relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Online configurator"
          title="Ontwerp uw serre"
          description="Stel stap voor stap uw droomserre samen in 3D en ontvang direct een prijsindicatie."
          light
          className="mb-10"
        />

        <div className="mb-8">
          <div className="flex justify-between text-xs text-cream/50 mb-2 px-1">
            <span>Stap {step + 1} van {steps.length}</span>
            <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-forest rounded-full overflow-hidden">
            <div
              className="h-full progress-shimmer rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-hide">
          <div className="inline-flex gap-2 p-1.5 bg-forest/60 rounded-2xl border border-white/8">
            {steps.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => setStep(i)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 min-h-[44px] rounded-xl text-sm whitespace-nowrap transition-all ${
                  i === step
                    ? 'bg-gold text-forest-dark font-semibold shadow-lg shadow-gold/20'
                    : i < step
                      ? 'text-cream/90 hover:bg-white/5'
                      : 'text-cream/40 hover:text-cream/60'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    i <= step ? 'bg-forest-dark/15' : 'bg-white/5'
                  }`}
                >
                  {i < step ? '✓' : i + 1}
                </span>
                <span className="text-xs sm:text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Preview panel — onder formulier op mobiel */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start space-y-4 order-2 lg:order-1">
            <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] ring-1 ring-white/10">
              <PreviewPanel config={config} />
            </div>
            <ConfigSpecs config={config} />
            <div className="bg-forest/80 backdrop-blur rounded-2xl p-5 sm:p-6 border border-gold/25 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <p className="text-cream/60 text-sm mb-1">Prijsindicatie (excl. BTW)</p>
              <p className="font-display text-2xl sm:text-3xl text-gold font-semibold">
                {formatEuro(price.range[0])} – {formatEuro(price.range[1])}
              </p>
              <p className="text-cream/50 text-xs mt-2">
                {config.width}×{config.depth}m = {price.area} m² · {selectedModel.name}
              </p>
              <p className="text-cream/40 text-xs mt-1">
                Incl. BTW: {formatEuro(price.range[0] * 1.21)} – {formatEuro(price.range[1] * 1.21)}
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-cream/45">
                <svg className="w-4 h-4 text-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Indicatie op basis van uw configuratie
              </div>
            </div>
          </div>

          {/* Config panel — eerst op mobiel */}
          <div className="lg:col-span-7 order-1 lg:order-2 bg-white rounded-3xl p-5 sm:p-6 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)] ring-1 ring-white/10">
            <div key={step} className="step-enter">
            {step === 0 && (
              <div className="space-y-4">
                <h3 className="font-display text-2xl text-forest font-semibold mb-4">Kies uw model</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => {
                        setConfig(getDefaultConfigForModel(model.id))
                        setStep(0)
                      }}
                      className={`text-left rounded-xl overflow-hidden border-2 transition-all ${
                        config.model === model.id
                          ? 'border-gold shadow-md'
                          : 'border-cream-dark hover:border-gold/50'
                      }`}
                    >
                      <img src={model.image} alt={model.name} className="w-full h-28 object-cover" />
                      <div className="p-3">
                        <p className="font-semibold text-forest text-sm">{model.name}</p>
                        <p className="text-xs text-charcoal/60 mt-1">vanaf {formatEuro(model.basePrice)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <h3 className="font-display text-2xl text-forest font-semibold">Afmetingen</h3>
                <div>
                  <label className="flex justify-between text-sm font-medium text-charcoal mb-2">
                    <span>Breedte</span>
                    <span className="text-gold font-semibold">{config.width} meter</span>
                  </label>
                  <input
                    type="range"
                    min={2}
                    max={8}
                    step={0.5}
                    value={config.width}
                    onChange={(e) => update('width', parseFloat(e.target.value))}
                    className="w-full accent-gold"
                  />
                  <div className="flex justify-between text-xs text-charcoal/50 mt-1">
                    <span>2m</span>
                    <span>8m</span>
                  </div>
                </div>
                <div>
                  <label className="flex justify-between text-sm font-medium text-charcoal mb-2">
                    <span>Diepte</span>
                    <span className="text-gold font-semibold">{config.depth} meter</span>
                  </label>
                  <input
                    type="range"
                    min={2}
                    max={6}
                    step={0.5}
                    value={config.depth}
                    onChange={(e) => update('depth', parseFloat(e.target.value))}
                    className="w-full accent-gold"
                  />
                  <div className="flex justify-between text-xs text-charcoal/50 mt-1">
                    <span>2m</span>
                    <span>6m</span>
                  </div>
                </div>
                <div className="bg-cream rounded-xl p-4 text-sm">
                  <span className="text-charcoal/70">Oppervlakte: </span>
                  <span className="font-semibold text-forest">{config.width * config.depth} m²</span>
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal mb-3 block">Daktype</label>
                  <div className={`grid gap-3 ${roofOptions.length === 1 ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3'}`}>
                    {roofOptions.map((roofId) => {
                      const labels: Record<RoofType, string> = {
                        plat: 'Plat dak',
                        lichtstraat: 'Lichtstraat',
                        schuin: 'Schuin dak',
                      }
                      return (
                        <button
                          key={roofId}
                          type="button"
                          onClick={() => update('roof', roofId)}
                          className={`py-3 px-2 rounded-xl text-sm border-2 transition-all ${
                            config.roof === roofId
                              ? 'border-gold bg-gold/10 text-forest font-semibold'
                              : 'border-cream-dark text-charcoal/70 hover:border-gold/50'
                          }`}
                        >
                          {labels[roofId]}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="font-display text-2xl text-forest font-semibold">Uiterlijk & glas</h3>

                {config.model === 'houten-serre' && (
                  <div>
                    <label className="text-sm font-medium text-charcoal mb-3 block">Houtsoort</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {(['iroko', 'meranti', 'accoya'] as WoodType[]).map((wood) => (
                        <button
                          key={wood}
                          type="button"
                          onClick={() => update('woodType', wood)}
                          className={`py-3 rounded-xl text-sm border-2 capitalize transition-all ${
                            config.woodType === wood
                              ? 'border-gold bg-gold/10 font-semibold text-forest'
                              : 'border-cream-dark text-charcoal/70'
                          }`}
                        >
                          {wood}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {config.model !== 'houten-serre' && (
                  <div>
                    <label className="text-sm font-medium text-charcoal mb-3 block">Kozijnkleur (RAL)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {ralColors.map((color) => (
                        <button
                          key={color.code}
                          type="button"
                          onClick={() => update('frameColor', color.code)}
                          className={`flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all ${
                            config.frameColor === color.code
                              ? 'border-gold'
                              : 'border-transparent hover:border-cream-dark'
                          }`}
                        >
                          <div
                            className="w-10 h-10 rounded-full border border-black/10 shadow-inner"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-[10px] text-charcoal/70 text-center leading-tight">
                            {color.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-charcoal mb-3 block">Beglazing</label>
                  <div className="grid grid-cols-2 gap-3">
                    {([
                      { id: 'hr-plus-plus', label: 'HR++ glas', desc: 'Standaard isolatie' },
                      { id: 'triple', label: 'Triple glas', desc: 'Maximale isolatie' },
                    ] as const).map((glass) => (
                      <button
                        key={glass.id}
                        type="button"
                        onClick={() => update('glass', glass.id)}
                        className={`p-4 rounded-xl text-left border-2 transition-all ${
                          config.glass === glass.id
                            ? 'border-gold bg-gold/10'
                            : 'border-cream-dark hover:border-gold/50'
                        }`}
                      >
                        <p className="font-semibold text-sm text-forest">{glass.label}</p>
                        <p className="text-xs text-charcoal/60 mt-1">{glass.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-display text-2xl text-forest font-semibold mb-2">Extra opties</h3>
                <p className="text-sm text-charcoal/60 mb-4">Selecteer de gewenste extra's voor uw serre.</p>
                <div className="space-y-3">
                  {configOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        config.options.includes(opt.id)
                          ? 'border-gold bg-gold/5'
                          : 'border-cream-dark hover:border-gold/30'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={config.options.includes(opt.id)}
                        onChange={() => toggleOption(opt.id)}
                        className="mt-1 accent-gold w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-forest">{opt.name}</p>
                        <p className="text-xs text-charcoal/60 mt-0.5">{opt.description}</p>
                      </div>
                      <span className="text-sm font-medium text-gold whitespace-nowrap">
                        +{formatEuro(opt.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h3 className="font-display text-2xl text-forest font-semibold">Samenvatting & offerte</h3>

                <div className="bg-cream rounded-xl p-5 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-charcoal/70">Model</span>
                    <span className="font-medium">{selectedModel.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/70">Afmetingen</span>
                    <span className="font-medium">{config.width} × {config.depth} m ({price.area} m²)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/70">Dak</span>
                    <span className="font-medium capitalize">{config.roof}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/70">Glas</span>
                    <span className="font-medium">{config.glass === 'triple' ? 'Triple' : 'HR++'}</span>
                  </div>
                  {config.options.length > 0 && (
                    <div className="pt-2 border-t border-cream-dark">
                      <span className="text-charcoal/70">Opties: </span>
                      <span className="font-medium">
                        {config.options.map((id) => configOptions.find((o) => o.id === id)?.name).join(', ')}
                      </span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-cream-dark flex justify-between">
                    <span className="font-semibold text-forest">Prijsindicatie</span>
                    <span className="font-display text-xl text-gold font-semibold">
                      {formatEuro(price.range[0])} – {formatEuro(price.range[1])}
                    </span>
                  </div>
                </div>

                {submitted ? (
                  <div className="bg-forest/10 border border-forest/20 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-forest rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="font-display text-xl text-forest font-semibold mb-2">Bedankt voor uw aanvraag!</h4>
                    <p className="text-sm text-charcoal/70">
                      Wij nemen binnen 1 werkdag contact met u op voor een vrijblijvend adviesgesprek.
                    </p>
                    {quoteId && (
                      <p className="text-xs text-charcoal/50 mt-3">
                        Referentie: <span className="font-mono">{quoteId.slice(0, 8)}</span>
                      </p>
                    )}
                    <p className="text-xs text-charcoal/50 mt-4">
                      Vragen? Bel{' '}
                      <a href={contact.phoneHref} className="text-forest font-medium hover:text-gold">
                        {contact.phone}
                      </a>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-sm text-charcoal/60">
                      Vul uw gegevens in voor een vrijblijvende offerte op maat.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        required
                        placeholder="Naam *"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="input-field"
                      />
                      <input
                        required
                        type="email"
                        placeholder="E-mail *"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="input-field"
                      />
                      <input
                        placeholder="Telefoon"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="input-field"
                      />
                      <input
                        placeholder="Plaats"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="input-field"
                      />
                    </div>
                    <textarea
                      placeholder="Eventuele opmerkingen of wensen..."
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="input-field resize-none"
                    />
                    {submitError && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                        {submitError}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-gold text-forest-dark font-semibold rounded-xl hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Versturen…' : 'Offerte aanvragen'}
                    </button>
                  </form>
                )}
              </div>
            )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-cream-dark">
              <button
                type="button"
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="px-6 py-2.5 text-sm text-charcoal/70 hover:text-forest disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Vorige
              </button>
              {step < 4 && (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 bg-forest text-cream text-sm font-semibold rounded-full hover:bg-forest-light transition-colors"
                >
                  Volgende →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
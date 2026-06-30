import { processSteps } from '../data'
import { useStaggerReveal } from '../hooks/useStaggerReveal'
import SectionHeading from './SectionHeading'

const stepIcons = [
  'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
]

export default function Process() {
  const { ref, visible } = useStaggerReveal(processSteps.length)

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Het traject"
          title="Van droom tot realisatie"
          description="In vier stappen naar uw serre op maat — helder, persoonlijk en zorgeloos."
          className="mb-16"
        />

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          {processSteps.map((item, i) => (
            <div
              key={item.step}
              className={`relative group transition-all duration-700 ${
                visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {i < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-14 left-[55%] w-full z-0">
                  <div className="h-px bg-gradient-to-r from-gold/40 via-gold/20 to-transparent" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold/30" />
                </div>
              )}

              <div className="relative bg-cream rounded-3xl overflow-hidden h-full border border-cream-dark/50 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-500 card-shine">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="w-9 h-9 rounded-xl bg-gold text-forest-dark flex items-center justify-center text-xs font-bold shadow-lg">
                      {item.step}
                    </span>
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-[10px] text-forest font-medium rounded-full uppercase tracking-wider">
                      {item.duration}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stepIcons[i]} />
                    </svg>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl text-forest font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
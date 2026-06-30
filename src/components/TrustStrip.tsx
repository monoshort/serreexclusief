const items = [
  '20+ jaar ervaring',
  'Volledig project A–Z',
  'Eigen monteursteam',
  'Gratis advies thuis',
  'Heel Nederland',
  'Showroom in Borne',
  '3D online configurator',
  'Vrijblijvende offerte',
]

export default function TrustStrip() {
  const doubled = [...items, ...items]

  return (
    <div className="bg-forest-dark border-y border-white/6 overflow-hidden py-3.5">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee-item">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
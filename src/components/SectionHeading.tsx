interface Props {
  eyebrow: string
  title: string
  description?: string
  light?: boolean
  className?: string
}

export default function SectionHeading({ eyebrow, title, description, light, className = '' }: Props) {
  return (
    <div className={`text-center max-w-3xl mx-auto ${className}`}>
      <div className="flex items-center justify-center gap-4 mb-5">
        <span className={`h-px w-12 sm:w-16 bg-gradient-to-r from-transparent ${light ? 'to-gold/60' : 'to-gold'}`} />
        <p className="text-sm tracking-[0.35em] uppercase font-medium text-gold">{eyebrow}</p>
        <span className={`h-px w-12 sm:w-16 bg-gradient-to-l from-transparent ${light ? 'to-gold/60' : 'to-gold'}`} />
      </div>
      <h2
        className={`font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold leading-tight mb-5 ${
          light ? 'text-white' : 'text-forest'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-base sm:text-lg leading-relaxed ${light ? 'text-cream/75' : 'text-charcoal/65'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
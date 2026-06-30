import { brand } from '../data'

type LogoVariant = 'light' | 'dark' | 'icon'

interface Props {
  variant?: LogoVariant
  className?: string
  showTagline?: boolean
}

export default function Logo({ variant = 'light', className = '', showTagline = false }: Props) {
  const src = variant === 'dark' ? brand.logoDark : brand.logoLight
  const height = variant === 'icon' ? 'h-9' : showTagline ? 'h-11 sm:h-12' : 'h-8 sm:h-9'

  if (variant === 'icon') {
    return (
      <img
        src={brand.logoIcon}
        alt={brand.name}
        className={`${height} w-auto object-contain ${className}`}
      />
    )
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <img
        src={src}
        alt={brand.name}
        className={`${height} w-auto object-contain object-left`}
      />
      {showTagline && (
        <span
          className={`text-[10px] tracking-[0.28em] uppercase mt-0.5 ${
            variant === 'light' ? 'text-gold/80' : 'text-forest/55'
          }`}
        >
          {brand.tagline}
        </span>
      )}
    </div>
  )
}
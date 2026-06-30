interface Props {
  variant?: 'cream' | 'forest' | 'white'
  flip?: boolean
}

const fills = {
  cream: '#f7f4ef',
  forest: '#0f2419',
  white: '#ffffff',
}

export default function SectionDivider({ variant = 'cream', flip = false }: Props) {
  return (
    <div className={`relative h-12 sm:h-16 -mt-px ${flip ? 'rotate-180' : ''}`} aria-hidden>
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <path
          d="M0,24 C360,48 720,0 1080,24 C1260,36 1380,40 1440,24 L1440,48 L0,48 Z"
          fill={fills[variant]}
        />
      </svg>
    </div>
  )
}
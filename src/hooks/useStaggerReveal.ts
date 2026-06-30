import { useEffect, useRef, useState } from 'react'

export function useStaggerReveal(count: number, threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<boolean[]>(() => Array(count).fill(false))

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < count; i++) {
            setTimeout(() => {
              setVisible((prev) => {
                const next = [...prev]
                next[i] = true
                return next
              })
            }, i * 120)
          }
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [count, threshold])

  return { ref, visible }
}
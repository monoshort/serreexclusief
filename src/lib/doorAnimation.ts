/** Unity-style SmoothDamp — natuurlijke vertraging aan begin en einde */
export function smoothDamp(
  current: number,
  target: number,
  velocity: { value: number },
  smoothTime: number,
  delta: number,
  maxSpeed = Infinity,
): number {
  const st = Math.max(0.0001, smoothTime)
  const omega = 2 / st
  const x = omega * delta
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)
  let change = current - target
  const maxChange = maxSpeed * st
  change = Math.sign(change) * Math.min(Math.abs(change), maxChange)
  const temp = (velocity.value + omega * change) * delta
  velocity.value = (velocity.value - omega * temp) * exp
  return target + (change + temp) * exp
}

export function easeInOutCubic(t: number): number {
  const c = Math.max(0, Math.min(1, t))
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2
}

/** Vertraagd paneel — achterste panelen volgen iets later */
export function staggeredProgress(global: number, index: number, count: number, gap = 0.12): number {
  if (count <= 1) return global
  const span = 1 - gap * (count - 1)
  const start = index * gap
  return easeInOutCubic(Math.max(0, Math.min(1, (global - start) / span)))
}

export interface PanelMotion {
  direction: number
  slideDistance: number
  stackZ: number
  zSlide: number
}

export function getPanelMotion(
  index: number,
  panelCount: number,
  paneW: number,
): PanelMotion {
  if (panelCount === 2) {
    return {
      direction: index === 0 ? -1 : 1,
      slideDistance: paneW * 0.94,
      stackZ: index * 0.05,
      zSlide: 0.14,
    }
  }

  if (panelCount === 3) {
    if (index === 0) {
      return { direction: -1, slideDistance: paneW * 1.02, stackZ: 0, zSlide: 0.1 }
    }
    if (index === 1) {
      return { direction: -1, slideDistance: paneW * 0.96, stackZ: 0.08, zSlide: 0.16 }
    }
    return { direction: 1, slideDistance: paneW * 0.94, stackZ: 0.04, zSlide: 0.12 }
  }

  const dir = index < panelCount / 2 ? -1 : 1
  const order = index < panelCount / 2 ? index : panelCount - 1 - index
  return {
    direction: dir,
    slideDistance: paneW * (0.9 - order * 0.04),
    stackZ: order * 0.06,
    zSlide: 0.1 + order * 0.03,
  }
}
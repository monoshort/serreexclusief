import type { FrameProps } from './types'

function FrameMaterial({ frame }: { frame: FrameProps }) {
  if (frame.isWood && frame.woodMap) {
    return (
      <meshStandardMaterial
        map={frame.woodMap}
        normalMap={frame.woodNormal}
        normalScale={[0.35, 0.35]}
        color={frame.hex}
        metalness={frame.metalness}
        roughness={frame.roughness}
        envMapIntensity={0.65}
      />
    )
  }

  if (frame.clearcoat > 0) {
    return (
      <meshPhysicalMaterial
        color={frame.hex}
        metalness={frame.metalness}
        roughness={frame.roughness}
        clearcoat={1}
        clearcoatRoughness={frame.isSteel ? 0.04 : 0.07}
        envMapIntensity={frame.isSteel ? 2.2 : 1.7}
        reflectivity={0.95}
        sheen={frame.isSteel ? 0.15 : 0}
        sheenRoughness={0.4}
        sheenColor={frame.hex}
      />
    )
  }

  return (
    <meshStandardMaterial
      color={frame.hex}
      metalness={frame.metalness}
      roughness={frame.roughness}
      envMapIntensity={0.85}
    />
  )
}

/** L-shaped aluminium kozijnprofiel */
export function ProfileBar({
  length,
  axis,
  position,
  frame,
  flip = false,
}: {
  length: number
  axis: 'x' | 'y' | 'z'
  position: [number, number, number]
  frame: FrameProps
  flip?: boolean
}) {
  const f = frame.frame
  const depth = frame.isWood ? f * 1.05 : f * 1.35
  const face = f
  const sign = flip ? -1 : 1

  const mainSize: [number, number, number] =
    axis === 'x' ? [length, face, depth] : axis === 'y' ? [face, length, depth] : [depth, face, length]

  if (frame.isWood) {
    return (
      <group position={position}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={mainSize} />
          <FrameMaterial frame={frame} />
        </mesh>
      </group>
    )
  }

  const lipSize: [number, number, number] =
    axis === 'x'
      ? [length, face * 0.55, face * 0.7]
      : axis === 'y'
        ? [face * 0.55, length, face * 0.7]
        : [face * 0.7, face * 0.55, length]

  const lipOffset: [number, number, number] =
    axis === 'x'
      ? [0, sign * face * 0.28, sign * depth * 0.22]
      : axis === 'y'
        ? [sign * face * 0.28, 0, sign * depth * 0.22]
        : [sign * depth * 0.22, sign * face * 0.28, 0]

  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={mainSize} />
        <FrameMaterial frame={frame} />
      </mesh>
      <mesh position={lipOffset} castShadow>
        <boxGeometry args={lipSize} />
        <FrameMaterial frame={frame} />
      </mesh>
    </group>
  )
}

/** Zwarte EPDM-kitrand tussen glas en kozijn */
export function GasketSeal({
  size,
  position,
}: {
  size: [number, number, number]
  position: [number, number, number]
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#141414" roughness={0.95} metalness={0.05} />
    </mesh>
  )
}
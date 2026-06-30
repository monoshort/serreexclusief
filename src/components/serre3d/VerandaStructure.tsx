import type { Texture } from 'three'
import type { SerreConfig } from '../../types'
import { ProfileBar } from './FrameProfile'
import type { FrameProps } from './types'

export function VerandaStructure({
  config,
  width,
  depth,
  height,
  frame,
  roofMap,
  roofNormal,
  tint = '#eaf6ff',
}: {
  config: SerreConfig
  width: number
  depth: number
  height: number
  frame: FrameProps
  roofMap: Texture
  roofNormal: Texture
  tint?: string
}) {
  const f = frame.frame
  const posts = Math.max(3, Math.round(config.width * 0.7))
  const postSpacing = width / (posts - 1)

  return (
    <group>
      {/* Hoek- en tussenpalen */}
      {Array.from({ length: posts }, (_, i) => (
        <group key={i} position={[-width / 2 + i * postSpacing, 0, depth / 2 - f]}>
          <ProfileBar length={height - f} axis="y" position={[0, (height - f) / 2 + f, 0]} frame={frame} />
        </group>
      ))}
      {[
        [-width / 2, -depth / 2],
        [width / 2, -depth / 2],
        [-width / 2, depth / 2],
        [width / 2, depth / 2],
      ].map(([x, z], i) => (
        <group key={`c${i}`} position={[x, 0, z]}>
          <ProfileBar length={height - f} axis="y" position={[0, (height - f) / 2 + f, 0]} frame={frame} />
        </group>
      ))}

      {/* Dakbalken */}
      {Array.from({ length: posts }, (_, i) => (
        <ProfileBar
          key={`b${i}`}
          length={depth + 0.2}
          axis="z"
          position={[-width / 2 + i * postSpacing, height - f * 0.5, 0]}
          frame={frame}
        />
      ))}
      <ProfileBar length={width + f} axis="x" position={[0, height - f * 0.5, -depth / 2]} frame={frame} />
      <ProfileBar length={width + f} axis="x" position={[0, height - f * 0.5, depth / 2]} frame={frame} />

      {/* Plat dak */}
      <mesh position={[0, height + 0.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.2, 0.06, depth + 0.2]} />
        <meshStandardMaterial
          map={roofMap}
          normalMap={roofNormal}
          normalScale={[0.35, 0.35]}
          roughness={0.58}
          metalness={0.18}
          envMapIntensity={0.55}
        />
      </mesh>

      {config.options.includes('zonwering') && (
        <mesh position={[0, height + 0.1, 0]} castShadow>
          <boxGeometry args={[width - 0.1, 0.03, depth - 0.1]} />
          <meshStandardMaterial color="#e8e4dc" roughness={0.72} side={2} />
        </mesh>
      )}

      {/* Lage zijwand links */}
      <group position={[-width / 2 + f, f + 0.55, 0]}>
        <ProfileBar length={1.1} axis="y" position={[0, 0.55, 0]} frame={frame} />
        <mesh position={[f * 0.5, 0.55, 0]}>
          <boxGeometry args={[0.02, 1.05, depth - f]} />
          <meshPhysicalMaterial
            color={tint}
            transmission={0.92}
            roughness={0.03}
            thickness={0.14}
            ior={1.52}
            transparent
            envMapIntensity={1.4}
          />
        </mesh>
      </group>

      {/* Lage zijwand rechts */}
      <group position={[width / 2 - f, f + 0.55, 0]}>
        <ProfileBar length={1.1} axis="y" position={[0, 0.55, 0]} frame={frame} />
        <mesh position={[-f * 0.5, 0.55, 0]}>
          <boxGeometry args={[0.02, 1.05, depth - f]} />
          <meshPhysicalMaterial
            color={tint}
            transmission={0.92}
            roughness={0.03}
            thickness={0.14}
            ior={1.52}
            transparent
            envMapIntensity={1.4}
          />
        </mesh>
      </group>
    </group>
  )
}
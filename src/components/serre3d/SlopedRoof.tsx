import { useMemo } from 'react'
import * as THREE from 'three'
import type { SchuinGeometry } from '../../lib/roofSlope'
import type { Texture } from 'three'
import { ProfileBar } from './FrameProfile'
import type { FrameProps } from './types'

function SlopedGlassPane({
  size,
  position,
  tint,
}: {
  size: [number, number, number]
  position: [number, number, number]
  tint: string
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshPhysicalMaterial
        color={tint}
        transmission={0.94}
        roughness={0.02}
        thickness={0.2}
        ior={1.52}
        transparent
        envMapIntensity={1.65}
        clearcoat={0.25}
      />
    </mesh>
  )
}

function GableEnd({
  side,
  width,
  geo,
  frame,
}: {
  side: -1 | 1
  width: number
  geo: SchuinGeometry
  frame: FrameProps
}) {
  const geoMesh = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(
        [
          0, 0, 0,
          0, -geo.rise, geo.run,
          0, -geo.backWallHeight, 0,
        ],
        3,
      ),
    )
    g.setIndex([0, 1, 2])
    g.computeVertexNormals()
    return g
  }, [geo])

  return (
    <mesh
      position={[side * (width / 2 - frame.frame / 2), 0, 0]}
      geometry={geoMesh}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={frame.hex}
        map={frame.isWood ? frame.woodMap : undefined}
        normalMap={frame.isWood ? frame.woodNormal : undefined}
        normalScale={frame.isWood ? [0.35, 0.35] : undefined}
        metalness={frame.metalness}
        roughness={frame.roughness}
        side={THREE.DoubleSide}
        envMapIntensity={frame.isWood ? 0.5 : 1.2}
      />
    </mesh>
  )
}

interface Props {
  width: number
  geo: SchuinGeometry
  frame: FrameProps
  roofMap: Texture
  roofNormal: Texture
  tint: string
}

/** Dakvlak — verankerd op (backTopY, backZ), lokaal Z=0..run */
export function SlopedRoof({ width, geo, frame, roofMap, roofNormal, tint }: Props) {
  const f = frame.frame
  const isWood = frame.isWood
  const cols = width >= 5 ? 3 : 2
  const innerW = width - f * 1.8
  const paneW = innerW / cols - f * 0.18
  const roofThick = isWood ? 0.09 : 0.045

  return (
    <group position={[0, geo.backTopY, geo.backZ]}>
      <ProfileBar length={width} axis="x" position={[0, 0, 0]} frame={frame} />

      <mesh position={[0, -f * 0.35, -f * 0.1]} castShadow receiveShadow>
        <boxGeometry args={[width + f * 0.1, f * 0.7, f * 0.65]} />
        <meshStandardMaterial
          color={frame.hex}
          map={isWood ? frame.woodMap : undefined}
          normalMap={isWood ? frame.woodNormal : undefined}
          metalness={frame.metalness}
          roughness={frame.roughness}
          envMapIntensity={0.8}
        />
      </mesh>

      <group rotation={[geo.pitch, 0, 0]}>
        {isWood ? (
          <mesh position={[0, -roofThick / 2, geo.roofLength / 2]} castShadow receiveShadow>
            <boxGeometry args={[innerW, roofThick, geo.roofLength]} />
            <meshStandardMaterial
              map={roofMap}
              normalMap={roofNormal}
              normalScale={[0.45, 0.45]}
              roughness={0.65}
              metalness={0.1}
              envMapIntensity={0.6}
            />
          </mesh>
        ) : (
          Array.from({ length: cols }, (_, col) => (
            <SlopedGlassPane
              key={col}
              position={[
                -innerW / 2 + paneW / 2 + col * (paneW + f * 0.18),
                -roofThick / 2,
                geo.roofLength / 2,
              ]}
              size={[paneW, roofThick, geo.roofLength - f * 0.2]}
              tint={tint}
            />
          ))
        )}

        {isWood &&
          Array.from({ length: Math.max(1, Math.floor(geo.run / 0.55)) }, (_, i) => (
            <mesh key={i} position={[0, roofThick * 0.3, 0.35 + i * 0.55]} castShadow>
              <boxGeometry args={[innerW + 0.04, 0.012, 0.04]} />
              <meshStandardMaterial color="#5a5048" roughness={0.8} />
            </mesh>
          ))}

        <mesh position={[0, -roofThick * 0.6, geo.roofLength / 2]} receiveShadow>
          <boxGeometry args={[innerW + f * 0.15, f * 0.25, geo.roofLength - f * 0.1]} />
          <meshStandardMaterial color="#4a4a48" roughness={0.85} metalness={0.08} />
        </mesh>
      </group>

      <group position={[0, -geo.rise, geo.run]}>
        <ProfileBar length={width + f * 0.15} axis="x" position={[0, 0, 0]} frame={frame} flip />
        <mesh position={[0, -f * 0.42, f * 0.2]} castShadow>
          <boxGeometry args={[width + 0.14, 0.055, 0.09]} />
          <meshPhysicalMaterial color="#2a2a2a" metalness={0.92} roughness={0.18} clearcoat={0.6} />
        </mesh>
      </group>

      <GableEnd side={-1} width={width} geo={geo} frame={frame} />
      <GableEnd side={1} width={width} geo={geo} frame={frame} />

      {[-1, 1].map((side) => (
        <group key={side} position={[side * (width / 2 - f / 2), 0, 0]} rotation={[geo.pitch, 0, 0]}>
          <ProfileBar length={geo.roofLength} axis="z" position={[0, 0, geo.roofLength / 2]} frame={frame} />
        </group>
      ))}
    </group>
  )
}
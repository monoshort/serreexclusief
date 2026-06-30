import { useMemo } from 'react'
import * as THREE from 'three'
import type { SchuinGeometry } from '../../lib/roofSlope'
import { ProfileBar } from './FrameProfile'
import type { FrameProps } from './types'

function TrapezoidPane({
  thickness,
  geo,
  tint,
  quality,
}: {
  thickness: number
  geo: SchuinGeometry
  tint: string
  quality: 'high' | 'medium'
}) {
  const meshGeo = useMemo(() => {
    const d = thickness / 2
    const g = new THREE.BufferGeometry()
    g.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(
        [
          -d, 0, 0,
          d, 0, 0,
          d, geo.frontWallHeight, geo.run,
          -d, geo.backWallHeight, 0,
        ],
        3,
      ),
    )
    g.setIndex([0, 1, 2, 0, 2, 3])
    g.computeVertexNormals()
    return g
  }, [thickness, geo])

  return (
    <mesh geometry={meshGeo} castShadow receiveShadow>
      <meshPhysicalMaterial
        color={tint}
        transmission={quality === 'high' ? 0.94 : 0.9}
        roughness={0.02}
        thickness={0.18}
        ior={1.52}
        transparent
        side={THREE.DoubleSide}
        envMapIntensity={1.55}
        clearcoat={0.15}
      />
    </mesh>
  )
}

interface Props {
  geo: SchuinGeometry
  x: number
  frame: FrameProps
  tint: string
  quality?: 'high' | 'medium'
}

/** Zijgevel — lokaal Z=0 achter, Z=run voor; bovenkant volgt dakhelling */
export function SlopedGlassWall({ geo, x, frame, tint, quality = 'medium' }: Props) {
  const f = frame.frame
  const slopeLen = geo.roofLength

  return (
    <group position={[x, geo.floorY, geo.backZ]}>
      <TrapezoidPane thickness={f * 0.5} geo={geo} tint={tint} quality={quality} />

      <ProfileBar
        length={geo.backWallHeight}
        axis="y"
        position={[0, geo.backWallHeight / 2, 0]}
        frame={frame}
      />
      <ProfileBar
        length={geo.frontWallHeight}
        axis="y"
        position={[0, geo.frontWallHeight / 2, geo.run]}
        frame={frame}
        flip
      />

      <group position={[0, geo.backWallHeight, 0]} rotation={[geo.pitch, 0, 0]}>
        <ProfileBar length={slopeLen} axis="z" position={[0, 0, slopeLen / 2]} frame={frame} />
      </group>

      <ProfileBar length={geo.run} axis="z" position={[0, f / 2, geo.run / 2]} frame={frame} flip />
    </group>
  )
}
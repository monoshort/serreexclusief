import type { SchuinGeometry } from '../../lib/roofSlope'
import { HOUSE_DEPTH, getHousePlacement } from '../../lib/housePlacement'
import type { FrameProps } from './types'

interface Props {
  width: number
  depth: number
  geo: SchuinGeometry
  frame: FrameProps
}

/** Aansluiting schuindak op de woninggevel */
export function SchuinHouseJunction({ width, depth, geo, frame }: Props) {
  const f = frame.frame
  const { groupZ } = getHousePlacement(depth)
  const houseFrontZ = groupZ + HOUSE_DEPTH / 2
  const gapZ = (geo.backZ + houseFrontZ) / 2

  return (
    <group>
      <mesh position={[0, geo.backTopY - f * 0.08, gapZ]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.2, f * 0.55, 0.18]} />
        <meshPhysicalMaterial
          color={frame.hex}
          metalness={frame.isWood ? 0.05 : 0.88}
          roughness={frame.isWood ? 0.75 : 0.2}
          clearcoat={frame.isWood ? 0 : 0.7}
          envMapIntensity={1.2}
        />
      </mesh>

      <mesh position={[0, geo.backTopY - f * 0.45, geo.backZ - f * 0.25]} castShadow>
        <boxGeometry args={[width - f * 0.3, f * 0.35, 0.08]} />
        <meshStandardMaterial color="#3a3a38" metalness={0.85} roughness={0.25} />
      </mesh>

      <mesh position={[0, geo.backWallHeight * 0.55 + geo.floorY, houseFrontZ + 0.04]} receiveShadow>
        <boxGeometry args={[width * 0.92, geo.backWallHeight * 0.88, 0.06]} />
        <meshStandardMaterial color="#f0ece4" roughness={0.9} />
      </mesh>
    </group>
  )
}
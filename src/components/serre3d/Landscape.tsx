import { Cloud } from '@react-three/drei'
import type { Texture } from 'three'

export function GroundPlane({
  grassMap,
  grassNormal,
  pavingMap,
  pavingNormal,
}: {
  grassMap: Texture
  grassNormal: Texture
  pavingMap: Texture
  pavingNormal: Texture
}) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.5, 0, 0]} receiveShadow>
        <planeGeometry args={[32, 26]} />
        <meshStandardMaterial
          map={grassMap}
          normalMap={grassNormal}
          normalScale={[0.6, 0.6]}
          roughness={0.94}
          metalness={0}
          envMapIntensity={0.35}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0.15]} receiveShadow>
        <planeGeometry args={[7, 6]} />
        <meshStandardMaterial
          map={pavingMap}
          normalMap={pavingNormal}
          normalScale={[0.45, 0.45]}
          roughness={0.42}
          metalness={0.08}
          envMapIntensity={0.9}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.007, -0.8]} receiveShadow>
        <planeGeometry args={[2.2, 0.35]} />
        <meshStandardMaterial color="#8a8580" roughness={0.68} metalness={0.04} />
      </mesh>
    </group>
  )
}

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.16, 1.2, 10]} />
        <meshStandardMaterial color="#3d2e22" roughness={0.92} />
      </mesh>
      {[
        [0, 1.5, 0, 0.82, 1.7],
        [0.12, 1.95, 0.08, 0.62, 1.25],
        [-0.1, 2.35, -0.05, 0.45, 0.95],
      ].map(([x, y, z, r, h], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <coneGeometry args={[r, h, 12]} />
          <meshStandardMaterial color={['#2a5230', '#356038', '#3d6a42'][i]} roughness={0.84} />
        </mesh>
      ))}
    </group>
  )
}

function Hedge({ position, size }: { position: [number, number, number]; size: [number, number, number] }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#2d5230" roughness={0.94} />
    </mesh>
  )
}

export function GardenDecor({ depth }: { depth: number }) {
  return (
    <group>
      <Tree position={[-6.5, 0, -4]} scale={1.2} />
      <Tree position={[7.5, 0, -3]} scale={1} />
      <Tree position={[8, 0, 5]} scale={1.1} />
      <Tree position={[-5, 0, 5.5]} scale={0.85} />
      <Hedge position={[-4.2, 0.38, depth * 0.72]} size={[3.2, 0.75, 0.5]} />
      <Hedge position={[4.8, 0.34, depth * 0.78]} size={[2.6, 0.65, 0.45]} />
      <Cloud position={[-7, 7, -10]} speed={0.1} opacity={0.38} bounds={[5, 1.8, 2.5]} segments={22} color="#fff8f0" />
      <Cloud position={[9, 8.5, -8]} speed={0.06} opacity={0.3} bounds={[6, 1.4, 3]} segments={20} color="#fff4e8" />
      <Cloud position={[2, 9, -12]} speed={0.08} opacity={0.22} bounds={[4, 1, 2]} segments={16} color="#ffffff" />
    </group>
  )
}
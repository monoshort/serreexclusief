import type { Texture } from 'three'
import type { InteriorVariant } from '../../lib/impressionSceneMatch'

interface Props {
  width: number
  depth: number
  height: number
  woodMap: Texture
  woodNormal: Texture
  variant?: InteriorVariant
  warm?: boolean
  /** Geen losse vloer/plafond — kamer-shell levert die al (schuifpui) */
  hideShell?: boolean
}

export function InteriorLifestyle({
  width,
  depth,
  height,
  woodMap,
  woodNormal,
  variant = 'living',
  warm = false,
  hideShell = false,
}: Props) {
  const sofaColor =
    variant === 'living' ? '#3d6b50' : variant === 'cozy' ? '#3d5a48' : variant === 'plants' ? '#8a9a8e' : '#9a9a96'
  const floorRoughness = variant === 'dining' || variant === 'cozy' ? 0.55 : 0.38
  const showDining = variant === 'dining' || variant === 'scandinavian'
  const showPlants = variant !== 'minimal'
  const plantDensity = variant === 'plants' || variant === 'scandinavian' ? 1.4 : 1
  const showCozyLamp = variant === 'cozy'
  const showPendant = variant === 'living' || variant === 'dining' || warm

  const floorY = hideShell ? 0.04 : 0.14

  return (
    <group position={[0, floorY, 0]}>
      {!hideShell && (
        <>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]} receiveShadow>
            <planeGeometry args={[width - 0.22, depth - 0.22]} />
            <meshStandardMaterial
              map={variant === 'cozy' || variant === 'dining' ? undefined : woodMap}
              color={variant === 'cozy' || variant === 'dining' ? '#c8a080' : '#ffffff'}
              normalMap={variant === 'cozy' || variant === 'dining' ? undefined : woodNormal}
              normalScale={[0.4, 0.4]}
              roughness={floorRoughness}
              metalness={variant === 'dining' ? 0.02 : 0.1}
              envMapIntensity={1.15}
            />
          </mesh>

          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, height - 0.18, 0]}>
            <planeGeometry args={[width - 0.28, depth - 0.28]} />
            <meshStandardMaterial color="#faf8f4" roughness={0.94} side={2} />
          </mesh>
        </>
      )}

      {variant !== 'minimal' && variant !== 'plants' && (
        <group position={[width * 0.18, 0.38, -depth * 0.08]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.65, 0.38, 0.82]} />
            <meshStandardMaterial color={sofaColor} roughness={0.82} />
          </mesh>
          <mesh position={[0, 0.32, -0.32]} castShadow>
            <boxGeometry args={[1.65, 0.48, 0.18]} />
            <meshStandardMaterial color={sofaColor} roughness={0.82} />
          </mesh>
          <mesh position={[-0.72, 0.32, 0]} castShadow>
            <boxGeometry args={[0.18, 0.48, 0.82]} />
            <meshStandardMaterial color={sofaColor} roughness={0.82} />
          </mesh>
          {variant === 'cozy' && (
            <mesh position={[0.1, 0.45, 0.1]} castShadow>
              <boxGeometry args={[0.7, 0.08, 0.5]} />
              <meshStandardMaterial color="#d8a878" roughness={0.9} />
            </mesh>
          )}
        </group>
      )}

      {variant === 'plants' && (
        <group position={[0, 0.35, 0]}>
          {[
            [-width * 0.25, 0, -depth * 0.1],
            [width * 0.2, 0, depth * 0.05],
            [-width * 0.05, 0, depth * 0.15],
          ].map(([x, , z], i) => (
            <group key={i} position={[x, 0, z]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.2, 0.16, 0.38, 12]} />
                <meshStandardMaterial color="#8a6848" roughness={0.75} />
              </mesh>
              <mesh position={[0, 0.55, 0]} castShadow>
                <cylinderGeometry args={[0.38, 0.32, 0.5, 8]} />
                <meshStandardMaterial color="#4a8a42" roughness={0.72} />
              </mesh>
            </group>
          ))}
          <mesh position={[width * 0.15, 0.42, -depth * 0.12]} castShadow>
            <boxGeometry args={[0.55, 0.42, 0.55]} />
            <meshStandardMaterial color="#b8a890" roughness={0.88} />
          </mesh>
        </group>
      )}

      {variant !== 'dining' && variant !== 'plants' && (
        <group position={[-width * 0.12, 0.28, depth * 0.05]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.38, 0.4, 0.05, 20]} />
            <meshStandardMaterial color="#c8a878" roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.22, 0]} castShadow>
            <cylinderGeometry args={[0.035, 0.04, 0.42, 10]} />
            <meshStandardMaterial color="#8a7060" metalness={0.2} roughness={0.35} />
          </mesh>
        </group>
      )}

      {showDining && (
        <group position={[0, 0.42, -depth * 0.05]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.35, 0.06, 0.75]} />
            <meshStandardMaterial color="#c8a878" roughness={0.42} />
          </mesh>
          {[[-0.45, 0.32], [0.45, 0.32], [-0.45, -0.32], [0.45, -0.32]].map(([x, z], i) => (
            <group key={i} position={[x, 0, z]}>
              <mesh position={[0, 0.28, 0]} castShadow>
                <boxGeometry args={[0.4, 0.04, 0.4]} />
                <meshStandardMaterial color="#d8c8a8" roughness={0.5} />
              </mesh>
              <mesh position={[0, 0.52, -0.14]} castShadow>
                <boxGeometry args={[0.4, 0.42, 0.04]} />
                <meshStandardMaterial color="#d8c8a8" roughness={0.5} />
              </mesh>
            </group>
          ))}
          <mesh position={[0, 0.58, 0]} castShadow>
            <sphereGeometry args={[0.12, 10, 8]} />
            <meshStandardMaterial color="#f0e8e0" roughness={0.4} />
          </mesh>
        </group>
      )}

      {showPlants &&
        [
          [-width * 0.32, depth * 0.22, 0.32],
          [width * 0.28, -depth * 0.08, 0.28],
          [-width * 0.1, depth * 0.28, 0.22],
        ].map(([x, z, r], i) => (
          <group key={i} position={[x, 0.5, z]} scale={plantDensity}>
            <mesh castShadow>
              <cylinderGeometry args={[0.18, 0.14, 0.38, 12]} />
              <meshStandardMaterial color="#6a5040" roughness={0.75} />
            </mesh>
            <mesh position={[0, 0.42, 0]} castShadow>
              <sphereGeometry args={[r, 12, 10]} />
              <meshStandardMaterial color={i === 0 ? '#3d7a38' : '#4a8a42'} roughness={0.72} />
            </mesh>
          </group>
        ))}

      {showPendant && (
        <group position={[0, height - 0.05, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.008, 0.008, 0.55, 6]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.58, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.26, 0.28, 16]} />
            <meshPhysicalMaterial
              color="#f5e8d0"
              emissive="#ffd8a0"
              emissiveIntensity={warm ? 0.55 : 0.25}
              roughness={0.35}
            />
          </mesh>
          <pointLight
            position={[0, -0.65, 0]}
            intensity={warm ? 1.1 : 0.6}
            color="#ffe8c8"
            distance={5}
            decay={2}
            castShadow
          />
        </group>
      )}

      {showCozyLamp && (
        <group position={[width * 0.28, 0, depth * 0.12]}>
          <mesh position={[0, 0.55, 0]} castShadow>
            <cylinderGeometry args={[0.025, 0.03, 1.1, 8]} />
            <meshStandardMaterial color="#2a2420" metalness={0.7} roughness={0.25} />
          </mesh>
          <mesh position={[0, 1.12, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.2, 0.22, 12]} />
            <meshStandardMaterial color="#e8a060" roughness={0.3} emissive="#ff9040" emissiveIntensity={0.45} />
          </mesh>
          <pointLight position={[0, 1.05, 0]} intensity={0.8} color="#ffb060" distance={3.5} decay={2} />
        </group>
      )}
    </group>
  )
}
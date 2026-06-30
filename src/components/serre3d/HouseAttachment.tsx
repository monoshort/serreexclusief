import type { Texture } from 'three'
import { HOUSE_DEPTH, getHousePlacement } from '../../lib/housePlacement'

interface Props {
  conservatoryWidth: number
  conservatoryDepth: number
  conservatoryHeight: number
  brickMap: Texture
  brickNormal: Texture
  brickRough: Texture
  roofMap: Texture
  roofNormal: Texture
  frameHex: string
  isFacade?: boolean
  hidePatioDoor?: boolean
}

function WindowFrame({
  x,
  y,
  z,
  w,
  h,
}: {
  x: number
  y: number
  z: number
  w: number
  h: number
}) {
  return (
    <group position={[x, y, z]}>
      <mesh castShadow>
        <boxGeometry args={[w + 0.14, h + 0.14, 0.06]} />
        <meshStandardMaterial color="#f0ece4" roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[w, h, 0.02]} />
        <meshPhysicalMaterial
          color="#d8ecff"
          transmission={0.9}
          roughness={0.03}
          thickness={0.12}
          ior={1.52}
          transparent
          envMapIntensity={1.2}
        />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.04, h, 0.015]} />
        <meshStandardMaterial color="#f0ece4" roughness={0.3} />
      </mesh>
      <mesh position={[0, h * 0.15, 0.05]}>
        <boxGeometry args={[w, 0.04, 0.015]} />
        <meshStandardMaterial color="#f0ece4" roughness={0.3} />
      </mesh>
      <mesh position={[0, -h * 0.42, 0.06]} castShadow>
        <boxGeometry args={[w + 0.08, 0.05, 0.1]} />
        <meshStandardMaterial color="#d0ccc4" roughness={0.4} />
      </mesh>
    </group>
  )
}

function FacadeBrick({
  position,
  size,
  brickMap,
  brickNormal,
  brickRough,
}: {
  position: [number, number, number]
  size: [number, number, number]
  brickMap: Texture
  brickNormal: Texture
  brickRough: Texture
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        map={brickMap}
        normalMap={brickNormal}
        normalScale={[0.55, 0.55]}
        roughnessMap={brickRough}
        roughness={0.88}
        envMapIntensity={0.45}
      />
    </mesh>
  )
}

export function HouseAttachment({
  conservatoryWidth,
  conservatoryDepth,
  conservatoryHeight,
  brickMap,
  brickNormal,
  brickRough,
  roofMap,
  roofNormal,
  frameHex: _frameHex,
  isFacade = false,
  hidePatioDoor = false,
}: Props) {
  const houseW = Math.max(conservatoryWidth + 2.4, 6)
  const houseD = HOUSE_DEPTH
  const houseH = Math.max(conservatoryHeight + 3, 6.2)
  const { groupZ } = getHousePlacement(isFacade ? 0 : conservatoryDepth)
  const localFacadeZ = houseD / 2 + 0.12

  const openW = conservatoryWidth + 0.1
  const openH = conservatoryHeight - 0.06
  const openBottom = 0.12
  const openTop = openBottom + openH
  const sideW = (houseW - openW) / 2
  const lintelH = houseH - openTop
  const lintelY = openTop + lintelH / 2
  const leftX = -houseW / 2 + sideW / 2
  const rightX = houseW / 2 - sideW / 2
  const sideY = openBottom + openH / 2

  const brickProps = { brickMap, brickNormal, brickRough }

  return (
    <group position={[0, 0, groupZ]}>
      {isFacade ? (
        <>
          <FacadeBrick position={[leftX, houseH / 2, 0]} size={[sideW, houseH, houseD]} {...brickProps} />
          <FacadeBrick position={[rightX, houseH / 2, 0]} size={[sideW, houseH, houseD]} {...brickProps} />
          <FacadeBrick position={[0, lintelY, 0]} size={[houseW, lintelH, houseD]} {...brickProps} />
          <FacadeBrick position={[0, openBottom / 2, 0]} size={[houseW, openBottom, houseD]} {...brickProps} />
          <FacadeBrick position={[0, houseH / 2, -houseD / 2]} size={[houseW, houseH, 0.22]} {...brickProps} />

          <FacadeBrick position={[leftX, sideY, houseD / 2]} size={[sideW, openH, 0.22]} {...brickProps} />
          <FacadeBrick position={[rightX, sideY, houseD / 2]} size={[sideW, openH, 0.22]} {...brickProps} />
          <FacadeBrick position={[0, lintelY, houseD / 2]} size={[houseW, lintelH, 0.22]} {...brickProps} />
          <FacadeBrick position={[0, openBottom / 2, houseD / 2]} size={[houseW, openBottom, 0.22]} {...brickProps} />
        </>
      ) : (
        <mesh position={[0, houseH / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[houseW, houseH, houseD]} />
          <meshStandardMaterial
            map={brickMap}
            normalMap={brickNormal}
            normalScale={[0.55, 0.55]}
            roughnessMap={brickRough}
            roughness={0.88}
            envMapIntensity={0.45}
          />
        </mesh>
      )}

      {!isFacade && (
        <mesh position={[0, houseH / 2, houseD / 2]} castShadow receiveShadow>
          <boxGeometry args={[houseW, houseH, 0.22]} />
          <meshStandardMaterial
            map={brickMap}
            normalMap={brickNormal}
            normalScale={[0.55, 0.55]}
            roughnessMap={brickRough}
            roughness={0.88}
            envMapIntensity={0.45}
          />
        </mesh>
      )}

      <mesh position={[-houseW / 2, houseH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.22, houseH, houseD]} />
        <meshStandardMaterial
          map={brickMap}
          normalMap={brickNormal}
          normalScale={[0.55, 0.55]}
          roughnessMap={brickRough}
          roughness={0.88}
          envMapIntensity={0.45}
        />
      </mesh>
      <mesh position={[houseW / 2, houseH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.22, houseH, houseD]} />
        <meshStandardMaterial
          map={brickMap}
          normalMap={brickNormal}
          normalScale={[0.55, 0.55]}
          roughnessMap={brickRough}
          roughness={0.88}
          envMapIntensity={0.45}
        />
      </mesh>

      <group position={[0, houseH + 0.55, 0.1]}>
        <mesh rotation={[0, 0, 0]} position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[houseW + 0.5, 0.12, houseD + 0.7]} />
          <meshStandardMaterial
            map={roofMap}
            normalMap={roofNormal}
            normalScale={[0.4, 0.4]}
            roughness={0.72}
            envMapIntensity={0.55}
          />
        </mesh>
        <mesh position={[-houseW / 2 - 0.08, 0.2, 0]} rotation={[0, 0, 0.42]} castShadow>
          <boxGeometry args={[0.14, 0.9, houseD + 0.5]} />
          <meshStandardMaterial map={roofMap} normalMap={roofNormal} roughness={0.75} />
        </mesh>
        <mesh position={[houseW / 2 + 0.08, 0.2, 0]} rotation={[0, 0, -0.42]} castShadow>
          <boxGeometry args={[0.14, 0.9, houseD + 0.5]} />
          <meshStandardMaterial map={roofMap} normalMap={roofNormal} roughness={0.75} />
        </mesh>
      </group>

      <mesh position={[-houseW * 0.28, houseH + 1.15, -0.3]} castShadow>
        <boxGeometry args={[0.48, 0.9, 0.42]} />
        <meshStandardMaterial
          map={brickMap}
          normalMap={brickNormal}
          normalScale={[0.55, 0.55]}
          roughnessMap={brickRough}
          roughness={0.88}
        />
      </mesh>

      <mesh position={[0, houseH + 0.15, houseD / 2 + 0.18]} castShadow>
        <boxGeometry args={[houseW + 0.3, 0.07, 0.12]} />
        <meshPhysicalMaterial color="#3a3a38" metalness={0.85} roughness={0.22} />
      </mesh>

      <mesh position={[0, 0.18, houseD / 2 + 0.02]} castShadow receiveShadow>
        <boxGeometry args={[houseW + 0.05, 0.36, 0.28]} />
        <meshStandardMaterial color="#8a8478" roughness={0.75} />
      </mesh>

      {!isFacade && (
        <>
          <WindowFrame x={-houseW * 0.28} y={1.35} z={localFacadeZ} w={0.95} h={1.25} />
          <WindowFrame x={houseW * 0.28} y={1.35} z={localFacadeZ} w={0.95} h={1.25} />
          <WindowFrame x={-houseW * 0.28} y={3.35} z={localFacadeZ} w={0.85} h={1.05} />
          <WindowFrame x={houseW * 0.28} y={3.35} z={localFacadeZ} w={0.85} h={1.05} />
          <WindowFrame x={0} y={3.45} z={localFacadeZ} w={0.7} h={0.95} />
        </>
      )}

      {!isFacade && !hidePatioDoor && (
        <group position={[0, 1.12, localFacadeZ]}>
          <mesh castShadow>
            <boxGeometry args={[conservatoryWidth * 0.55, 2.15, 0.1]} />
            <meshPhysicalMaterial color={_frameHex} metalness={0.7} roughness={0.22} clearcoat={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <boxGeometry args={[conservatoryWidth * 0.48, 2.02, 0.03]} />
            <meshPhysicalMaterial
              color="#eef8ff"
              transmission={0.92}
              roughness={0.02}
              thickness={0.16}
              ior={1.52}
              transparent
              envMapIntensity={1.4}
            />
          </mesh>
          <mesh position={[0, 1.08, 0.08]} castShadow>
            <boxGeometry args={[conservatoryWidth * 0.52, 0.05, 0.06]} />
            <meshStandardMaterial color="#f0ece4" roughness={0.35} />
          </mesh>
          <mesh position={[conservatoryWidth * 0.22, 0, 0.1]}>
            <sphereGeometry args={[0.035, 10, 8]} />
            <meshPhysicalMaterial color="#c9a96e" metalness={0.95} roughness={0.08} />
          </mesh>
        </group>
      )}

    </group>
  )
}
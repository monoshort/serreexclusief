import { MeshTransmissionMaterial, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, type MutableRefObject } from 'react'
import type { Group } from 'three'
import {
  getPanelMotion,
  smoothDamp,
  staggeredProgress,
} from '../../lib/doorAnimation'
import { GasketSeal, ProfileBar } from './FrameProfile'
import type { FrameProps } from './types'
import { useSceneInteraction } from './SceneInteractionContext'

const OPEN_SMOOTH = 0.42
const CLOSE_SMOOTH = 0.52

function DoorGlass({
  size,
  tint,
  quality = 'high',
}: {
  size: [number, number, number]
  tint: string
  quality?: 'high' | 'medium'
}) {
  const [w, h, d] = size
  const hi = quality === 'high'

  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        {hi ? (
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.12}
            samples={6}
            resolution={512}
            transmission={0.97}
            roughness={0.012}
            thickness={0.26}
            ior={1.52}
            chromaticAberration={0.02}
            anisotropy={0.1}
            distortion={0.05}
            distortionScale={0.12}
            color={tint}
            attenuationColor={tint}
            attenuationDistance={4}
            envMapIntensity={2.1}
            clearcoat={0.18}
            clearcoatRoughness={0.04}
          />
        ) : (
          <meshPhysicalMaterial
            color={tint}
            transmission={0.94}
            roughness={0.02}
            thickness={0.22}
            ior={1.52}
            transparent
            envMapIntensity={1.6}
            clearcoat={0.2}
            clearcoatRoughness={0.04}
            reflectivity={0.92}
          />
        )}
      </mesh>
      {hi && d > 0.02 && (
        <mesh position={[0, 0, d * 0.16]}>
          <boxGeometry args={[w * 0.97, h * 0.97, d * 0.3]} />
          <meshPhysicalMaterial
            color={tint}
            transmission={0.86}
            roughness={0.018}
            thickness={0.06}
            ior={1.52}
            transparent
            envMapIntensity={1.3}
          />
        </mesh>
      )}
    </group>
  )
}

function PanelFrame({
  paneW,
  rowH,
  depth,
  frame,
}: {
  paneW: number
  rowH: number
  depth: number
  frame: FrameProps
}) {
  const f = frame.frame * 0.72
  return (
    <group>
      <mesh position={[0, rowH / 2 - f / 2, 0]} castShadow>
        <boxGeometry args={[paneW, f, depth * 1.05]} />
        <meshPhysicalMaterial
          color={frame.hex}
          metalness={frame.metalness}
          roughness={frame.roughness}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={frame.isSteel ? 2.4 : 1.8}
        />
      </mesh>
      <mesh position={[0, -rowH / 2 + f / 2, 0]} castShadow>
        <boxGeometry args={[paneW, f, depth * 1.05]} />
        <meshPhysicalMaterial
          color={frame.hex}
          metalness={frame.metalness}
          roughness={frame.roughness}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={frame.isSteel ? 2.4 : 1.8}
        />
      </mesh>
      <mesh position={[-paneW / 2 + f / 2, 0, 0]} castShadow>
        <boxGeometry args={[f, rowH - f * 0.4, depth * 1.05]} />
        <meshPhysicalMaterial
          color={frame.hex}
          metalness={frame.metalness}
          roughness={frame.roughness}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={frame.isSteel ? 2.4 : 1.8}
        />
      </mesh>
      <mesh position={[paneW / 2 - f / 2, 0, 0]} castShadow>
        <boxGeometry args={[f, rowH - f * 0.4, depth * 1.05]} />
        <meshPhysicalMaterial
          color={frame.hex}
          metalness={frame.metalness}
          roughness={frame.roughness}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={frame.isSteel ? 2.4 : 1.8}
        />
      </mesh>
    </group>
  )
}

function DoorHandle({ paneW, rowH, depth }: { paneW: number; rowH: number; depth: number }) {
  return (
    <group position={[paneW * 0.34, -rowH * 0.08, depth / 2 + 0.018]}>
      <mesh castShadow>
        <boxGeometry args={[0.018, 0.14, 0.032]} />
        <meshPhysicalMaterial color="#b8a070" metalness={0.96} roughness={0.1} clearcoat={1} />
      </mesh>
      <mesh position={[0, -0.05, 0.012]} castShadow>
        <boxGeometry args={[0.022, 0.04, 0.018]} />
        <meshPhysicalMaterial color="#c9a96e" metalness={0.95} roughness={0.08} clearcoat={1} />
      </mesh>
    </group>
  )
}

function SlidingPanel({
  baseX,
  y,
  paneW,
  rowH,
  depth,
  tint,
  motion,
  panelIndex,
  panelCount,
  progressRef,
  showHandle,
  quality,
  frame,
}: {
  baseX: number
  y: number
  paneW: number
  rowH: number
  depth: number
  tint: string
  motion: ReturnType<typeof getPanelMotion>
  panelIndex: number
  panelCount: number
  progressRef: MutableRefObject<number>
  showHandle: boolean
  quality: 'high' | 'medium'
  frame: FrameProps
}) {
  const groupRef = useRef<Group>(null)
  const visualX = useRef(baseX)
  const visualZ = useRef(motion.stackZ)
  const velX = useRef({ value: 0 })
  const velZ = useRef({ value: 0 })
  const { toggleDoors } = useSceneInteraction()
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const pf = frame.frame * 0.72
  const glassW = paneW - pf * 1.6
  const glassH = rowH - pf * 1.6

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const p = staggeredProgress(progressRef.current, panelIndex, panelCount, 0.1)
    const targetX = baseX + motion.direction * motion.slideDistance * p
    const targetZ = motion.stackZ + p * motion.zSlide

    visualX.current = smoothDamp(visualX.current, targetX, velX.current, 0.09, delta)
    visualZ.current = smoothDamp(visualZ.current, targetZ, velZ.current, 0.11, delta)

    groupRef.current.position.x = visualX.current
    groupRef.current.position.z = visualZ.current
  })

  return (
    <group
      ref={groupRef}
      position={[baseX, y, motion.stackZ]}
      onClick={(e) => {
        e.stopPropagation()
        toggleDoors()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
    >
      <PanelFrame paneW={paneW} rowH={rowH} depth={depth} frame={frame} />
      <DoorGlass size={[glassW, glassH, depth * 0.55]} tint={tint} quality={quality} />
      <GasketSeal size={[glassW + 0.01, 0.005, depth * 0.6]} position={[0, glassH / 2 + 0.003, 0]} />
      <GasketSeal size={[glassW + 0.01, 0.005, depth * 0.6]} position={[0, -glassH / 2 - 0.003, 0]} />
      <GasketSeal size={[0.005, glassH + 0.006, depth * 0.6]} position={[-glassW / 2 - 0.003, 0, 0]} />
      <GasketSeal size={[0.005, glassH + 0.006, depth * 0.6]} position={[glassW / 2 + 0.003, 0, 0]} />

      {[-paneW * 0.38, paneW * 0.38].map((rx, i) => (
        <mesh
          key={i}
          position={[rx, -rowH / 2 + pf * 0.35, -depth * 0.08]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.012, 0.012, paneW * 0.12, 10]} />
          <meshPhysicalMaterial color="#3a3a3a" metalness={0.92} roughness={0.18} />
        </mesh>
      ))}

      {showHandle && <DoorHandle paneW={paneW} rowH={rowH} depth={depth} />}
    </group>
  )
}

function DoorTracks({
  innerW,
  height,
  depth,
  frame,
  floorToCeiling,
}: {
  innerW: number
  height: number
  depth: number
  frame: FrameProps
  floorToCeiling: boolean
}) {
  const f = frame.frame
  const trackH = f * (floorToCeiling ? 0.28 : 0.38)
  const rail = f * (floorToCeiling ? 0.2 : 0.55)
  const bottomY = -height / 2 + rail
  const topY = height / 2 - rail

  return (
    <group>
      <mesh position={[0, bottomY, depth * 0.12]} castShadow receiveShadow>
        <boxGeometry args={[innerW + f * 0.4, trackH, depth * 1.1]} />
        <meshPhysicalMaterial
          color={frame.hex}
          metalness={0.92}
          roughness={0.14}
          clearcoat={1}
          clearcoatRoughness={0.06}
          envMapIntensity={2}
        />
      </mesh>
      <mesh position={[0, bottomY + trackH * 0.15, depth * 0.22]} receiveShadow>
        <boxGeometry args={[innerW + f * 0.2, trackH * 0.35, depth * 0.35]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.55} metalness={0.4} />
      </mesh>

      <mesh position={[0, topY, -depth * 0.08]} castShadow>
        <boxGeometry args={[innerW + f * 0.3, trackH * 0.85, depth * 0.75]} />
        <meshPhysicalMaterial
          color={frame.hex}
          metalness={0.9}
          roughness={0.16}
          clearcoat={1}
          clearcoatRoughness={0.06}
          envMapIntensity={1.8}
        />
      </mesh>
    </group>
  )
}

interface Props {
  width: number
  height: number
  depth: number
  x: number
  y: number
  z: number
  frame: FrameProps
  tint: string
  panelCount?: number
  transomRows?: number
  quality?: 'high' | 'medium'
  floorToCeiling?: boolean
}

export function SlidingDoorWall({
  width,
  height,
  depth,
  x,
  y,
  z,
  frame,
  tint,
  panelCount = 2,
  transomRows = 1,
  quality = 'high',
  floorToCeiling = false,
}: Props) {
  const { doorsOpen } = useSceneInteraction()
  const progress = useRef(0)
  const velocity = useRef({ value: 0 })

  const f = frame.frame
  const fullHeight = floorToCeiling && transomRows === 0
  const rail = f * (fullHeight ? 0.2 : 0.55)
  const innerW = width - f * (fullHeight ? 0.75 : 2.2)
  const innerH = height - rail * 2
  const totalRows = transomRows + 1
  const rowH = fullHeight
    ? innerH - f * 0.06
    : innerH / totalRows - f * 0.15
  const doorRowY = fullHeight ? 0 : -innerH / 2 + rowH / 2 + f * 0.1
  const transomY = innerH / 2 - rowH / 2 - f * 0.05
  const paneW = innerW / panelCount - f * (fullHeight ? 0.14 : 0.22)
  const topBarY = height / 2 - rail / 2
  const bottomBarY = -height / 2 + rail / 2

  useFrame((_, delta) => {
    const target = doorsOpen ? 1 : 0
    const smoothTime = doorsOpen ? OPEN_SMOOTH : CLOSE_SMOOTH
    progress.current = smoothDamp(progress.current, target, velocity.current, smoothTime, delta)
  })

  return (
    <group position={[x, y, z]}>
      <ProfileBar length={width} axis="x" position={[0, topBarY, 0]} frame={frame} />
      <ProfileBar length={width} axis="x" position={[0, bottomBarY, 0]} frame={frame} flip />
      <ProfileBar length={height - rail} axis="y" position={[-width / 2 + f / 2, 0, 0]} frame={frame} />
      <ProfileBar length={height - rail} axis="y" position={[width / 2 - f / 2, 0, 0]} frame={frame} flip />

      <DoorTracks
        innerW={innerW}
        height={height}
        depth={depth}
        frame={frame}
        floorToCeiling={floorToCeiling}
      />

      {transomRows > 0 &&
        Array.from({ length: panelCount }, (_, col) => {
          const px = -innerW / 2 + paneW / 2 + col * (paneW + f * 0.22)
          return (
            <group key={`transom-${col}`} position={[px, transomY, 0]}>
              <PanelFrame paneW={paneW} rowH={rowH} depth={depth} frame={frame} />
              <DoorGlass size={[paneW - f * 1.1, rowH - f * 1.1, depth * 0.55]} tint={tint} quality={quality} />
            </group>
          )
        })}

      {transomRows > 0 && (
        <ProfileBar
          length={innerW}
          axis="x"
          position={[0, transomY - rowH / 2 - f * 0.15, 0]}
          frame={frame}
          flip
        />
      )}

      {Array.from({ length: panelCount - 1 }, (_, i) => (
        <ProfileBar
          key={`mullion-${i}`}
          length={rowH + f * 0.15}
          axis="y"
          position={[-innerW / 2 + (i + 1) * (innerW / panelCount), doorRowY, 0]}
          frame={frame}
        />
      ))}

      {Array.from({ length: panelCount }, (_, i) => {
        const baseX = -innerW / 2 + paneW / 2 + i * (paneW + f * 0.22)
        const motion = getPanelMotion(i, panelCount, paneW)
        return (
          <SlidingPanel
            key={`door-${i}`}
            baseX={baseX}
            y={doorRowY}
            paneW={paneW}
            rowH={rowH}
            depth={depth}
            tint={tint}
            motion={motion}
            panelIndex={i}
            panelCount={panelCount}
            progressRef={progress}
            showHandle={i === panelCount - 1}
            quality={quality}
            frame={frame}
          />
        )
      })}

      <mesh position={[0, bottomBarY - f * 0.12, depth / 2 + 0.04]} receiveShadow castShadow>
        <boxGeometry args={[innerW + f * 0.2, 0.04, 0.1]} />
        <meshPhysicalMaterial color="#2e2e2e" metalness={0.88} roughness={0.22} clearcoat={0.4} />
      </mesh>
      <mesh position={[0, bottomBarY - f * 0.22, depth / 2 + 0.09]} receiveShadow>
        <boxGeometry args={[innerW * 0.92, 0.012, 0.04]} />
        <meshStandardMaterial color="#4a4a48" roughness={0.35} metalness={0.5} />
      </mesh>
    </group>
  )
}
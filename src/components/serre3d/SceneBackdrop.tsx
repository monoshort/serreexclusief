import { Environment } from '@react-three/drei'
import { Suspense } from 'react'
import {
  getAIEnvironment,
  getImagineRenderSettings,
} from '../../lib/aiBackdrops'
import type { SceneMood } from '../../lib/impressionSceneMatch'
import type { ViewMode3D } from '../../lib/sceneInteraction'

function ImagineGround({ color }: { color: string }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 0]} receiveShadow raycast={() => null}>
      <circleGeometry args={[20, 96]} />
      <meshStandardMaterial color={color} roughness={0.92} metalness={0.03} envMapIntensity={0.5} />
    </mesh>
  )
}

function ImagineEnvironment({
  envSrc,
  mood,
  viewMode,
}: {
  envSrc: string
  mood: SceneMood
  viewMode: ViewMode3D
}) {
  const settings = getImagineRenderSettings(mood, viewMode)

  return (
    <>
      <color attach="background" args={['#000000']} />
      <Environment
        files={envSrc}
        background
        backgroundIntensity={settings.backgroundIntensity}
        backgroundBlurriness={viewMode === 'interior' ? 0.15 : 0.04}
        environmentIntensity={settings.environmentIntensity}
        resolution={1024}
      />
      <ImagineGround color={settings.groundColor} />
    </>
  )
}

export function SceneBackdrop({
  mood,
  viewMode,
}: {
  mood: SceneMood
  viewMode: ViewMode3D
}) {
  const envSrc = getAIEnvironment(mood, viewMode)

  return (
    <Suspense fallback={null}>
      <ImagineEnvironment envSrc={envSrc} mood={mood} viewMode={viewMode} />
    </Suspense>
  )
}

export function getSceneFog(mood: SceneMood, viewMode: ViewMode3D): {
  color: string
  near: number
  far: number
} {
  const settings = getImagineRenderSettings(mood, viewMode)
  const fogColors: Record<SceneMood, string> = {
    day: '#b8d0e0',
    bright: '#c8dce8',
    'golden-hour': '#e0c0a0',
    evening: '#3a4868',
    rainy: '#8a98a8',
  }
  return {
    color: fogColors[mood] ?? fogColors.day,
    near: settings.fogNear,
    far: settings.fogFar,
  }
}
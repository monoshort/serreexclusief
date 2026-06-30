import { Component, type ErrorInfo, type ReactNode } from 'react'
import type { ImpressionSceneMatch } from '../../lib/impressionSceneMatch'
import type { SerreConfig } from '../../types'
import RealisticConservatory from './RealisticConservatory'
import { TexturesProvider, useFallbackTextures } from './textures'

function FallbackConservatory({
  config,
  scene,
  cinematic,
}: {
  config: SerreConfig
  scene?: ImpressionSceneMatch
  cinematic?: boolean
}) {
  const textures = useFallbackTextures()
  return (
    <TexturesProvider textures={textures}>
      <RealisticConservatory config={config} scene={scene} cinematic={cinematic} />
    </TexturesProvider>
  )
}

class SceneErrorBoundary extends Component<
  { children: ReactNode; config: SerreConfig; scene?: ImpressionSceneMatch },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('3D scene error:', error.message, info.componentStack)
  }

  render() {
    if (this.state.failed) {
      return (
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#c9a96e" />
        </mesh>
      )
    }
    return this.props.children
  }
}

export default function ConservatoryScene({
  config,
  scene,
  cinematic,
}: {
  config: SerreConfig
  scene?: ImpressionSceneMatch
  cinematic?: boolean
}) {
  return (
    <SceneErrorBoundary config={config} scene={scene}>
      <FallbackConservatory config={config} scene={scene} cinematic={cinematic} />
    </SceneErrorBoundary>
  )
}
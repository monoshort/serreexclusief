import { OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import {
  getExteriorCamera,
  getInteriorCamera,
  lerp3,
  type CameraPreset,
  type ViewMode3D,
} from '../../lib/sceneInteraction'
import type { SerreConfig } from '../../types'

interface Props {
  config: SerreConfig
  viewMode: ViewMode3D
}

export function ViewCameraRig({ config, viewMode }: Props) {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const { camera } = useThree()
  const current = useRef<CameraPreset>(getExteriorCamera('exterior'))
  const target = useRef<CameraPreset>(
    viewMode === 'interior' ? getInteriorCamera(config) : getExteriorCamera('exterior'),
  )
  const transitioning = useRef(false)
  const [userOrbited, setUserOrbited] = useState(false)

  useEffect(() => {
    target.current =
      viewMode === 'interior' ? getInteriorCamera(config) : getExteriorCamera('exterior')
    transitioning.current = true
    setUserOrbited(false)
  }, [viewMode, config.width, config.depth, config.model])

  useFrame((_, delta) => {
    if (!transitioning.current || userOrbited) return

    const t = Math.min(1, delta * 2.8)
    current.current = {
      position: lerp3(current.current.position, target.current.position, t),
      target: lerp3(current.current.target, target.current.target, t),
      fov: current.current.fov + (target.current.fov - current.current.fov) * t,
    }

    camera.position.set(...current.current.position)
    if ('fov' in camera) {
      camera.fov = current.current.fov
      camera.updateProjectionMatrix()
    }
    controlsRef.current?.target.set(...current.current.target)
    controlsRef.current?.update()

    if (t >= 0.99) transitioning.current = false
  })

  const isInterior = viewMode === 'interior'

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}
      enableRotate
      enableZoom
      autoRotate={!isInterior && !userOrbited}
      autoRotateSpeed={0.85}
      minDistance={isInterior ? 1.5 : 4.5}
      maxDistance={isInterior ? 6 : 18}
      minPolarAngle={isInterior ? Math.PI / 5 : Math.PI / 6}
      maxPolarAngle={isInterior ? Math.PI / 1.9 : Math.PI / 2.05}
      minAzimuthAngle={-Math.PI * 0.85}
      maxAzimuthAngle={Math.PI * 0.85}
      target={current.current.target}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.7}
      zoomSpeed={0.85}
      onStart={() => {
        setUserOrbited(true)
        transitioning.current = false
      }}
    />
  )
}
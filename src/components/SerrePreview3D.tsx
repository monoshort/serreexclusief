import { Canvas } from '@react-three/fiber'
import { Suspense, useCallback, useMemo, useState } from 'react'
import * as THREE from 'three'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { getImagineRenderSettings } from '../lib/aiBackdrops'
import {
  getSceneMatch,
  type ImpressionSceneMatch,
} from '../lib/impressionSceneMatch'
import { getModelImpressions } from '../lib/modelImpressions'
import { getExteriorCamera, type ViewMode3D } from '../lib/sceneInteraction'
import { getModelVisual, hasSchuifpui } from '../lib/modelVisuals'
import type { SerreConfig } from '../types'
import PhotorealPreview from './PhotorealPreview'
import Preview3DControls, { type RenderMode3D } from './Preview3DControls'
import ConservatoryScene from './serre3d/ConservatoryScene'
import { SceneInteractionProvider } from './serre3d/SceneInteractionContext'
import { getSceneFog, SceneBackdrop } from './serre3d/SceneBackdrop'
import SafePostEffects from './serre3d/SafePostEffects'
import SceneLighting from './serre3d/SceneLighting'
import { ViewCameraRig } from './serre3d/ViewCameraRig'

interface Props {
  config: SerreConfig
  impressionSrc?: string
}

function Scene({
  config,
  scene,
  viewMode,
}: {
  config: SerreConfig
  scene: ImpressionSceneMatch
  viewMode: ViewMode3D
}) {
  return (
    <>
      <SceneBackdrop mood={scene.mood} viewMode={viewMode} />
      <SceneLighting
        mood={scene.mood}
        warmInterior={scene.warmInterior || viewMode === 'interior'}
        gardenLights={scene.gardenLights && viewMode === 'exterior'}
        useBackdrop
      />
      <ConservatoryScene config={config} scene={scene} cinematic />
      <ViewCameraRig config={config} viewMode={viewMode} />
      <SafePostEffects cinematic mood={scene.mood} />
    </>
  )
}

export default function SerrePreview3D({ config, impressionSrc }: Props) {
  const scene = useMemo(() => getSceneMatch(config.model), [config.model])
  const vis = getModelVisual(config)
  const showDoorControls = hasSchuifpui(config)
  const exteriorCam = getExteriorCamera(scene.camera)

  const aiSlide = useMemo(() => {
    const slides = getModelImpressions(config).slides
    const match = impressionSrc ? slides.find((s) => s.src === impressionSrc) : undefined
    return match ?? slides.find((s) => s.type === 'ai') ?? slides[0]
  }, [config, impressionSrc])

  const isMobile = useMediaQuery('(max-width: 1023px)')
  const [doorsOpen, setDoorsOpen] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode3D>('exterior')
  const [renderMode, setRenderMode] = useState<RenderMode3D>('interactive')

  const toggleDoors = useCallback(() => setDoorsOpen((o) => !o), [])

  const handleViewMode = useCallback((mode: ViewMode3D) => {
    setViewMode(mode)
    if (mode === 'interior') setDoorsOpen(true)
  }, [])

  const interaction = useMemo(
    () => ({
      doorsOpen,
      toggleDoors,
      setDoorsOpen,
      viewMode,
      setViewMode: handleViewMode,
    }),
    [doorsOpen, toggleDoors, viewMode, handleViewMode],
  )

  const activeFog = useMemo(
    () => getSceneFog(scene.mood, viewMode),
    [scene.mood, viewMode],
  )
  const activeSettings = useMemo(
    () => getImagineRenderSettings(scene.mood, viewMode),
    [scene.mood, viewMode],
  )

  return (
    <div className="relative w-full aspect-[4/3] min-h-[240px] sm:min-h-[280px] lg:min-h-[300px] rounded-xl overflow-hidden bg-gradient-to-b from-[#c8dce8] to-[#dce8d4]">
      <Preview3DControls
        doorsOpen={doorsOpen}
        onToggleDoors={toggleDoors}
        viewMode={viewMode}
        onViewMode={handleViewMode}
        renderMode={renderMode}
        onRenderMode={setRenderMode}
        showDoorControls={showDoorControls}
      />

      {renderMode === 'photoreal' ? (
        <PhotorealPreview
          config={config}
          imageSrc={aiSlide.src}
          caption={aiSlide.caption}
        />
      ) : (
        <div className="absolute inset-0 touch-none cursor-grab active:cursor-grabbing">
          <Canvas
            shadows={!isMobile}
            dpr={isMobile ? [1, 1.25] : [1, 2]}
            camera={{
              position: exteriorCam.position,
              fov: exteriorCam.fov,
              near: 0.1,
              far: 120,
            }}
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: 'high-performance',
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: activeSettings.exposure,
            }}
            onCreated={({ gl }) => {
              gl.shadowMap.enabled = true
              gl.shadowMap.type = THREE.PCFSoftShadowMap
              gl.outputColorSpace = THREE.SRGBColorSpace
            }}
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            <fog attach="fog" args={[activeFog.color, activeFog.near, activeFog.far]} />
            <SceneInteractionProvider value={interaction}>
              <Suspense fallback={null}>
                <Scene config={config} scene={scene} viewMode={viewMode} />
              </Suspense>
            </SceneInteractionProvider>
          </Canvas>
        </div>
      )}

      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 pointer-events-none flex flex-col gap-1 max-w-[45%]">
        <span className="px-2.5 py-1 bg-forest/90 backdrop-blur text-cream text-[10px] font-semibold rounded-full truncate">
          {vis.label}
        </span>
        {renderMode === 'interactive' && showDoorControls && doorsOpen && (
          <span className="hidden sm:inline px-2 py-0.5 bg-forest/75 backdrop-blur text-cream text-[9px] font-medium rounded-full">
            Schuifpui open
          </span>
        )}
        {renderMode === 'interactive' && (
          <span className="hidden sm:inline px-2 py-0.5 bg-gold/80 backdrop-blur text-forest-dark text-[9px] font-medium rounded-full">
            ✦ Imagine 360°
          </span>
        )}
      </div>

      <div className="absolute bottom-14 sm:bottom-3 left-2 right-2 sm:left-3 sm:right-3 z-10 flex justify-between text-[10px] sm:text-xs text-charcoal/70 pointer-events-none">
        <span>
          {renderMode === 'photoreal'
            ? 'Fotorealistische render'
            : viewMode === 'interior'
              ? 'Interieurweergave'
              : vis.feature}
        </span>
        <span>
          {config.width}m × {config.depth}m
        </span>
      </div>
    </div>
  )
}
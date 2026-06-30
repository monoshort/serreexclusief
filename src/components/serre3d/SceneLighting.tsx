import { ContactShadows } from '@react-three/drei'
import type { SceneMood } from '../../lib/impressionSceneMatch'

const MOOD: Record<
  SceneMood,
  {
    sun: [number, number, number]
    ambient: number
    ambientColor: string
    sunIntensity: number
    sunColor: string
    fill: [number, number, number]
    fillIntensity: number
  }
> = {
  day: {
    sun: [10, 12, 7],
    ambient: 0.18,
    ambientColor: '#fff6ee',
    sunIntensity: 1.85,
    sunColor: '#fff4e0',
    fill: [-5, 6, -7],
    fillIntensity: 0.42,
  },
  bright: {
    sun: [9, 14, 6],
    ambient: 0.22,
    ambientColor: '#fffaf4',
    sunIntensity: 2.2,
    sunColor: '#fff8ec',
    fill: [-4, 7, -5],
    fillIntensity: 0.48,
  },
  'golden-hour': {
    sun: [12, 6, 5],
    ambient: 0.16,
    ambientColor: '#ffe8cc',
    sunIntensity: 1.65,
    sunColor: '#ffbc78',
    fill: [-7, 4, -4],
    fillIntensity: 0.35,
  },
  evening: {
    sun: [-5, 4, -7],
    ambient: 0.1,
    ambientColor: '#8a9ab8',
    sunIntensity: 0.55,
    sunColor: '#b8c8e8',
    fill: [5, 3, 6],
    fillIntensity: 0.28,
  },
  rainy: {
    sun: [3, 9, 3],
    ambient: 0.24,
    ambientColor: '#d0d8e0',
    sunIntensity: 0.75,
    sunColor: '#e0e8f0',
    fill: [-2, 5, -3],
    fillIntensity: 0.38,
  },
}

interface Props {
  mood?: SceneMood
  warmInterior?: boolean
  gardenLights?: boolean
  useBackdrop?: boolean
}

export default function SceneLighting({
  mood = 'day',
  warmInterior = false,
  gardenLights = false,
  useBackdrop = false,
}: Props) {
  const m = MOOD[mood]
  const imagine = useBackdrop

  return (
    <>
      <ambientLight
        intensity={imagine ? m.ambient * 0.85 : m.ambient}
        color={m.ambientColor}
      />
      <hemisphereLight
        args={[
          mood === 'evening' ? '#7a8aa8' : '#fff8f2',
          imagine ? '#2a3e28' : '#1e3a22',
          imagine ? 0.55 : 0.48,
        ]}
      />

      <directionalLight
        position={m.sun}
        intensity={imagine ? m.sunIntensity * 0.75 : m.sunIntensity}
        color={m.sunColor}
        castShadow
        shadow-mapSize={[4096, 4096]}
        shadow-camera-far={55}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
        shadow-bias={-0.00008}
        shadow-normalBias={0.015}
      />
      <directionalLight
        position={m.fill}
        intensity={m.fillIntensity}
        color={mood === 'evening' ? '#a0b0d0' : '#c8dff8'}
      />

      {warmInterior && (
        <>
          <pointLight
            position={[0, 2.1, 0.2]}
            intensity={mood === 'evening' ? 1.6 : 0.65}
            color="#ffd8a0"
            distance={10}
            decay={2}
          />
          <pointLight
            position={[-1.8, 1.5, -0.4]}
            intensity={mood === 'evening' ? 0.55 : 0.28}
            color="#ffb878"
            distance={6}
            decay={2}
          />
        </>
      )}

      {gardenLights && (
        <>
          <pointLight position={[2.8, 0.5, 3.2]} intensity={0.55} color="#ffd090" distance={5} decay={2} />
          <pointLight position={[-2.2, 0.45, 3]} intensity={0.42} color="#ffc878" distance={4.5} decay={2} />
          <spotLight
            position={[0, 3.5, 4]}
            angle={0.45}
            penumbra={0.6}
            intensity={0.35}
            color="#ffe8c8"
            distance={12}
            castShadow={false}
          />
        </>
      )}

      <ContactShadows
        position={[0, 0.008, 0]}
        opacity={mood === 'evening' ? 0.82 : 0.7}
        scale={28}
        blur={3.2}
        far={18}
        resolution={1024}
        color="#141e14"
      />
    </>
  )
}
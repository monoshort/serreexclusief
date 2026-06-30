import { Bloom, BrightnessContrast, EffectComposer, N8AO, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import type { SceneMood } from '../../lib/impressionSceneMatch'

export default function PostEffects({
  cinematic = false,
  mood = 'day',
}: {
  cinematic?: boolean
  mood?: SceneMood
}) {
  const isEvening = mood === 'evening' || mood === 'golden-hour'
  const isRainy = mood === 'rainy'

  return (
    <EffectComposer multisampling={cinematic ? 8 : 4}>
      <N8AO
        aoRadius={cinematic ? 0.85 : 0.7}
        intensity={cinematic ? 2.2 : 1.8}
        distanceFalloff={0.8}
        quality="ultra"
        halfRes={false}
      />
      <Bloom
        intensity={isEvening ? 0.35 : cinematic ? 0.28 : 0.18}
        luminanceThreshold={isEvening ? 0.72 : 0.84}
        luminanceSmoothing={0.42}
        mipmapBlur
        radius={0.55}
        blendFunction={BlendFunction.ADD}
      />
      <BrightnessContrast
        brightness={isRainy ? -0.02 : isEvening ? 0.03 : 0.01}
        contrast={cinematic ? 0.08 : 0.04}
      />
      <Vignette eskil={false} offset={0.12} darkness={cinematic ? 0.22 : 0.32} />
    </EffectComposer>
  )
}
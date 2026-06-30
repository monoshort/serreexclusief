import { createContext, useContext, type ReactNode } from 'react'
import type { ViewMode3D } from '../../lib/sceneInteraction'

export interface SceneInteractionValue {
  doorsOpen: boolean
  toggleDoors: () => void
  setDoorsOpen: (open: boolean) => void
  viewMode: ViewMode3D
  setViewMode: (mode: ViewMode3D) => void
}

const SceneInteractionContext = createContext<SceneInteractionValue | null>(null)

export function SceneInteractionProvider({
  value,
  children,
}: {
  value: SceneInteractionValue
  children: ReactNode
}) {
  return <SceneInteractionContext.Provider value={value}>{children}</SceneInteractionContext.Provider>
}

export function useSceneInteraction(): SceneInteractionValue {
  const ctx = useContext(SceneInteractionContext)
  if (!ctx) {
    return {
      doorsOpen: false,
      toggleDoors: () => {},
      setDoorsOpen: () => {},
      viewMode: 'exterior',
      setViewMode: () => {},
    }
  }
  return ctx
}
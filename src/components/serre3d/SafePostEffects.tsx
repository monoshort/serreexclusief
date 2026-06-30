import { Component, type ReactNode } from 'react'
import type { SceneMood } from '../../lib/impressionSceneMatch'
import PostEffects from './PostEffects'

export default class SafePostEffects extends Component<
  { cinematic?: boolean; mood?: SceneMood },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render(): ReactNode {
    if (this.state.failed) return null
    return <PostEffects cinematic={this.props.cinematic} mood={this.props.mood} />
  }
}
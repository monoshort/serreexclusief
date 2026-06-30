import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  onRetry?: () => void
}

interface State {
  hasError: boolean
}

export default class PreviewErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('3D preview error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full aspect-[4/3] min-h-[280px] rounded-xl bg-cream-dark/30 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <p className="text-sm text-charcoal/70">3D-weergave kon niet worden geladen.</p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false })
              this.props.onRetry?.()
            }}
            className="px-4 py-2 text-xs font-semibold bg-forest text-cream rounded-full"
          >
            Opnieuw proberen
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
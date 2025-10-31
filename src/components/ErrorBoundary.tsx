import { Component } from "react";
import type { ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(error: Error) { return { hasError: true, error }; }
  componentDidCatch(error: Error, info: any) {
    console.error("UI error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h2>Algo deu errado.</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{String(this.state.error)}</pre>
          <button onClick={() => this.setState({ hasError: false, error: undefined })}>
            Tentar novamente
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

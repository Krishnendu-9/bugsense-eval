import { Component } from 'react';

// Reports render errors through the SDK's documented manual-capture call,
// with React's component stack as the free-text context.
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    window.BugSense.captureError(error, info.componentStack);
  }

  render() {
    if (this.state.failed) return <p role="alert">Something went wrong.</p>;
    return this.props.children;
  }
}

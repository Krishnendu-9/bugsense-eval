import { Component, useState } from 'react';
import { createRoot } from 'react-dom/client';

// ?boundary=1|0  wrap the broken component in an error boundary
// ?capture=1|0   the boundary's componentDidCatch calls BugSense.captureError(error, info.componentStack)
const params = new URLSearchParams(window.location.search);
const BOUNDARY = params.get('boundary') === '1';
const CAPTURE = params.get('capture') === '1';
window.__didCatch = 0;

class Boundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error, info) {
    window.__didCatch++;
    if (CAPTURE && window.BugSense) window.BugSense.captureError(error, info.componentStack);
  }
  render() {
    return this.state.failed ? <p>failed</p> : this.props.children;
  }
}

function Reviews({ product }) {
  // Same defect shape as fixture incident B1.
  return <ul>{product.reviews.map((r) => <li key={r}>{r}</li>)}</ul>;
}

function App() {
  const [show, setShow] = useState(false);
  const broken = <Reviews product={{ id: 'mp-8' }} />;
  return (
    <main>
      <button id="go" type="button" onClick={() => setShow(true)}>Show reviews</button>
      {show && (BOUNDARY ? <Boundary>{broken}</Boundary> : broken)}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
document.body.dataset.ready = '1';

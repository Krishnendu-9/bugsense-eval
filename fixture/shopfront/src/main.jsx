import { createRoot } from 'react-dom/client';
import { findRoute } from './routes.jsx';
import { Page, useReady } from './ui.jsx';

function Home() {
  useReady();
  return <Page title="Shopfront">Welcome.</Page>;
}

const route = findRoute(window.location.pathname);
const Screen = route ? route.component : Home;

createRoot(document.getElementById('root')).render(<Screen />);

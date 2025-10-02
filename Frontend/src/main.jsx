import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

// Handle client-side routing for GitHub Pages
if (window.location.search.startsWith('/?')) {
  const path = window.location.search.slice(2).split('&')[0].replace(/~and~/g, '&');
  window.history.replaceState(null, '', path);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/Assignment-1-copy">
      <App />
    </BrowserRouter>
  </StrictMode>
);

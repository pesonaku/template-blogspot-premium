import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initBloggerSettings } from './utils/bloggerSettings';

// Inisialisasi pembacaan konfigurasi dari widget DOM Blogger
initBloggerSettings();

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('[Blogspot Template] Root container (#root) not found.');
}


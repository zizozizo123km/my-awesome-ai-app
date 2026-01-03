import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'; // Global styles (likely including Tailwind base styles)
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
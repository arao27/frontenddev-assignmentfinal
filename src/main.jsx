import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// App is already wrapped with StatsProvider and AuthProvider inside App.jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CallProvider } from './store/calls';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CallProvider>
      <App />
    </CallProvider>
  </React.StrictMode>
);

// src/app/main.jsx
// TODO: Adjust paths to match your exact project structure

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Providers from './providers';
import '../styles/index.css';

// Importing these files executes the module, 
// which runs the factory and attaches interceptors to userApi and adminApi.
import '../shared/api/axios'; 
import '../shared/api/adminAxios'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);





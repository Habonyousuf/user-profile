import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the App component
import './App.css'; // Import the App CSS file

// Render the App component into the root div
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
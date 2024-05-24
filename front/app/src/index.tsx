// Index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App'; // Import the App component
import './index.css'; // Base styling, often for resetting browser defaults

// Get the container into which the app will be rendered.
const container = document.getElementById('root')!;

// Create a root.
const root = createRoot(container); // Create a root for the app using the container

// Render the App into the root.
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
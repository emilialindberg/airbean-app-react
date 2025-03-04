import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './global.scss';
import router from './router';
import { StoreProvider } from './store/Store';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <StoreProvider> {/* Wrappa hela appen med StoreProvider */}
        <RouterProvider router={router} /> {/* Använd RouterProvider */}
      </StoreProvider>
    </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import MoviesProvider from './context/MoviesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MoviesProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </MoviesProvider>
);


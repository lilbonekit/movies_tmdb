import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import MoviesProvider from './context/MoviesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MoviesProvider>
        <App />
    </MoviesProvider>
);


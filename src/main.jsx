import React from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';

import App from './App.jsx';
import Theme from "./configs/theme.jsx";

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const consultaCepUrl = import.meta.env.VITE_CONSULTA_CEP_URL || '';

const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-eval';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https: blob:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' ${apiUrl} ${consultaCepUrl} https:;
  frame-ancestors 'none';
`.replace(/\s+/g, ' ');

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <Helmet>
                <meta httpEquiv="Content-Security-Policy" content={csp.trim()} />
                <title>Sacramentum | Sistema de Gerenciamento de Festividades</title>
            </Helmet>

            <ThemeProvider theme={Theme}>
                <CssBaseline />
                <Router>
                    <App />
                    <Toaster position="top-right" />
                </Router>
            </ThemeProvider>
        </HelmetProvider>
    </React.StrictMode>
);
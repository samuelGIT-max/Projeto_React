import './index.css'
import App from './App.tsx'
import React from 'react';
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext"; // ou "@/context/ThemeContext"
import { ErrorBoundary } from "./components/ErrorBoundary";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
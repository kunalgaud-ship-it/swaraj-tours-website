import { lazy, Suspense } from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { stripBase } from './pages';
import './index.css';

const AdminPanel = lazy(() => import('./components/AdminPanel').then((module) => ({ default: module.AdminPanel })));

// Global error handlers for Google Maps Platform quota monitoring
(window as unknown as { gm_authFailure?: () => void }).gm_authFailure = () => {
  window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
};
const origError = console.error;
console.error = (...args: unknown[]) => {
  origError.apply(console, args);
  const msg = args.map((a) => String(a)).join(' ');
  if (msg.includes('OverQuotaMapError') || msg.includes('QuotaExceededError')) {
    window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
  }
};

const isAdminRoute = stripBase(window.location.pathname) === '/admin';
createRoot(document.getElementById('root')!).render(
  isAdminRoute ? <Suspense fallback={<div className="min-h-screen bg-slate-950" />}><AdminPanel /></Suspense> : <App />,
);

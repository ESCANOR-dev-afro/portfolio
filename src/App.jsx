import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import { ThemeProvider } from './context/ThemeContext';
import PortfolioHome from './pages/PortfolioHome';
import OfflineStatusOverlay from './components/OfflineStatusOverlay';

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function AdminLoadingFallback() {
  return (
    <div className="min-h-screen bg-[#07090D] flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 border-2 border-t-transparent border-cyber-orange rounded-full animate-spin shadow-[0_0_15px_rgba(255,106,0,0.5)]" />
        <span className="font-mono text-xs text-white/50 tracking-widest uppercase">
          INITIALIZING ESCANOR SYS.ADMIN...
        </span>
      </div>
    </div>
  );
}

/**
 * Top-Level Application Entry
 * Configures ThemeProvider, PortfolioDataProvider, React Router, and global Offline Resiliency Overlay.
 */
export default function App() {
  return (
    <ThemeProvider>
      <PortfolioDataProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Portfolio Home */}
            <Route path="/" element={<PortfolioHome />} />

            {/* Secure Admin Dashboard (Lazy-Loaded for Fast Mobile FCP) */}
            <Route
              path="/admin"
              element={
                <Suspense fallback={<AdminLoadingFallback />}>
                  <AdminDashboard />
                </Suspense>
              }
            />

            {/* Catch-all Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>

        {/* Global Offline Network Status & Interactive Mini-Game Fallback */}
        <OfflineStatusOverlay />
      </PortfolioDataProvider>
    </ThemeProvider>
  );
}

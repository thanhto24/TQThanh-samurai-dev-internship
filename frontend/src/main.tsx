import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import SigninPage from './pages/signin.tsx'
import SignupPage from './pages/signup.tsx'
import DashboardPage from './pages/dashboard.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import { ModeToggle } from './components/mode-toggle.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
        <ModeToggle />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
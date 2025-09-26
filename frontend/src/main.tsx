import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import SigninPage from './pages/signin.tsx'
import SignupPage from './pages/signup.tsx'
import DashboardPage from './pages/dashboard.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import { ModeToggle } from './components/mode-toggle.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './lib/store'; // import store của bạn
import { PrivateRoute } from './components/private-route.tsx';
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider storageKey="vite-ui-theme">
          <Routes>
            <Route path="/" element={<SigninPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
          </Routes>
          <Toaster position="top-right" />
          <ModeToggle />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
)

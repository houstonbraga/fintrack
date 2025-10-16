import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import { Toaster } from './components/ui/sonner'
import { AuthContextProvider } from './contexts/auth'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import NotFoundPage from './pages/page-not-found'
import SignUpPage from './pages/signup'

const clientQuery = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={clientQuery}>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
      <ReactQueryDevtools />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
)

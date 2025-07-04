import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './components/providers/theme-provider.tsx'
import { RouterProvider } from 'react-router'
import router from './routes/index.ts'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { Toaster } from './components/ui/sonner.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <Toaster />
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)

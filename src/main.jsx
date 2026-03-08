import { StrictMode, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import createAppTheme from './theme/theme'
import './index.css'

const STORAGE_KEY = 'portfolio-theme-mode'

function getInitialMode() {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function RootApp() {
  const [mode, setMode] = useState(getInitialMode)
  const theme = useMemo(() => createAppTheme(mode), [mode])

  const handleToggleColorMode = () => {
    setMode((prev) => {
      const nextMode = prev === 'light' ? 'dark' : 'light'
      window.localStorage.setItem(STORAGE_KEY, nextMode)
      return nextMode
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App mode={mode} onToggleColorMode={handleToggleColorMode} />
      </BrowserRouter>
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
)

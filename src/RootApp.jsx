import { useMemo, useState } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import createAppTheme from './theme/theme'

// Persist the user's last-selected color mode so the portfolio
// can restore the same look and feel on the next visit.
const STORAGE_KEY = 'portfolio-theme-mode'

function getInitialMode() {
  // Prefer an explicit saved preference. If none exists, fall back
  // to the operating system color-scheme setting.
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function RootApp() {
  // Theme mode lives at the top level so routing and page transitions
  // all render inside the same MUI theme context.
  const [mode, setMode] = useState(getInitialMode)
  const theme = useMemo(() => createAppTheme(mode), [mode])

  const handleToggleColorMode = () => {
    // Update React state and localStorage together so the toggle
    // stays in sync across refreshes.
    setMode((prev) => {
      const nextMode = prev === 'light' ? 'dark' : 'light'
      window.localStorage.setItem(STORAGE_KEY, nextMode)
      return nextMode
    })
  }

  return (
    // The provider stack establishes the app-wide visual baseline,
    // CSS reset, and client-side routing.
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App mode={mode} onToggleColorMode={handleToggleColorMode} />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default RootApp

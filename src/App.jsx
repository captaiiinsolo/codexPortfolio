import AppRoutes from './routes/AppRoutes'

function App({ mode, onToggleColorMode }) {
  // Keep the top-level app component minimal and forward shared UI state
  // into the routing layer where the shell and pages are rendered.
  return <AppRoutes mode={mode} onToggleColorMode={onToggleColorMode} />
}

export default App

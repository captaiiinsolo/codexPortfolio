import AppRoutes from './routes/AppRoutes'

function App({ mode, onToggleColorMode }) {
  return <AppRoutes mode={mode} onToggleColorMode={onToggleColorMode} />
}

export default App

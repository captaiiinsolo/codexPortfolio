import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RootApp from './RootApp'
import './index.css'

// Mount the portfolio once into the root element while keeping
// React's development-only StrictMode checks enabled.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
)

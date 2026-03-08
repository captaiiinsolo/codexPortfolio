import { Suspense, lazy } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

const AppShell = lazy(() => import('../components/layout/AppShell'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const HomePage = lazy(() => import('../pages/HomePage'))
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'))
const ResumePage = lazy(() => import('../pages/ResumePage'))

function RouteLoader() {
  return (
    <Box
      sx={{
        minHeight: '42vh',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <CircularProgress size={26} />
    </Box>
  )
}

function AppRoutes({ mode, onToggleColorMode }) {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route element={<AppShell mode={mode} onToggleColorMode={onToggleColorMode} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes

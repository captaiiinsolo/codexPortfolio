import { Suspense, lazy } from 'react'
import { Box, Skeleton, Stack } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

// Lazy-load the shell and page modules so the first paint stays light
// and each route can be fetched on demand.
const AppShell = lazy(() => import('../components/layout/AppShell'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const HomePage = lazy(() => import('../pages/HomePage'))
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'))
const ResumePage = lazy(() => import('../pages/ResumePage'))

function RouteLoader() {
  return (
    // Match the site's card-heavy layout while route chunks are loading
    // so the transition feels intentional instead of abrupt.
    <Stack spacing={2.5} sx={{ py: 2 }}>
      <Skeleton variant="rounded" height={58} sx={{ borderRadius: 3 }} />
      <Skeleton variant="rounded" height={220} sx={{ borderRadius: 3 }} />
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Skeleton variant="rounded" height={170} sx={{ flex: 1, borderRadius: 3 }} />
        <Skeleton variant="rounded" height={170} sx={{ flex: 1, borderRadius: 3 }} />
      </Stack>
      <Box>
        <Skeleton variant="text" width="42%" height={38} />
        <Skeleton variant="text" width="78%" />
        <Skeleton variant="text" width="64%" />
      </Box>
    </Stack>
  )
}

function AppRoutes({ mode, onToggleColorMode }) {
  return (
    // Render a shared shell around every route and redirect any unknown
    // path back to the homepage for a simple portfolio experience.
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

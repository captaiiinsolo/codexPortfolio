import { Suspense, lazy } from 'react'
import { Box, Skeleton, Stack } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

const AppShell = lazy(() => import('../components/layout/AppShell'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const HomePage = lazy(() => import('../pages/HomePage'))
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'))
const ResumePage = lazy(() => import('../pages/ResumePage'))

function RouteLoader() {
  return (
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

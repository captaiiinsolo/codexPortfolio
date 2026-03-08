import { DarkMode, LightMode } from '@mui/icons-material'
import { Box, Button, Container, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Resume', to: '/resume' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact Me', to: '/contact' },
]

const routePrefetchers = {
  '/': () => import('../../pages/HomePage'),
  '/about': () => import('../../pages/AboutPage'),
  '/resume': () => import('../../pages/ResumePage'),
  '/projects': () => import('../../pages/ProjectsPage'),
  '/contact': () => import('../../pages/ContactPage'),
}

const prefetchedRoutes = new Set()

function prefetchRoute(route) {
  const loadRoute = routePrefetchers[route]
  if (!loadRoute || prefetchedRoutes.has(route)) {
    return
  }

  prefetchedRoutes.add(route)
  loadRoute().catch(() => {
    prefetchedRoutes.delete(route)
  })
}

function getNavButtonSx(mode) {
  const isDark = mode === 'dark'

  return {
    color: 'text.secondary',
    px: 1.75,
    py: 1,
    borderRadius: 999,
    minHeight: 36,
    fontSize: '0.95rem',
    whiteSpace: 'nowrap',
    '&.active': {
      color: 'primary.main',
      bgcolor: isDark ? 'rgba(45, 212, 191, 0.14)' : 'rgba(15, 118, 110, 0.12)',
    },
    '&:hover': {
      bgcolor: isDark ? 'rgba(45, 212, 191, 0.1)' : 'rgba(15, 118, 110, 0.08)',
    },
  }
}

function AppShell({ mode, onToggleColorMode }) {
  const location = useLocation()
  const navButtonSx = getNavButtonSx(mode)

  return (
    <>
      <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 4 } }}>
        <Stack spacing={3}>
          <Box
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: mode === 'dark' ? 'rgba(15, 23, 42, 0.74)' : 'rgba(255, 255, 255, 0.74)',
              backdropFilter: 'blur(14px)',
              p: { xs: 1.5, md: 2 },
              boxShadow:
                mode === 'dark'
                  ? '0 18px 40px -30px rgba(2, 6, 23, 0.95)'
                  : '0 18px 40px -30px rgba(15, 23, 42, 0.65)',
            }}
          >
            <Box
              sx={{
                overflowX: { xs: 'auto', md: 'visible' },
                pb: 0.5,
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              <Stack
                direction="row"
                spacing={0.75}
                useFlexGap
                flexWrap={{ xs: 'nowrap', md: 'wrap' }}
                sx={{ width: 'max-content', minWidth: '100%' }}
              >
                {navItems.map((item) => (
                  <Button
                    key={item.to}
                    component={NavLink}
                    to={item.to}
                    onMouseEnter={() => prefetchRoute(item.to)}
                    onFocus={() => prefetchRoute(item.to)}
                    onTouchStart={() => prefetchRoute(item.to)}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    sx={navButtonSx}
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>
            </Box>
          </Box>

          <Box key={location.pathname} className="page-transition">
            <Outlet />
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ px: 0.5, pb: { xs: 3, md: 1 } }}>
            Crafted with React and MUI.
          </Typography>
        </Stack>
      </Container>

      <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
        <IconButton
          onClick={onToggleColorMode}
          aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          sx={{
            position: 'fixed',
            right: { xs: 14, md: 22 },
            bottom: { xs: 14, md: 22 },
            zIndex: 1300,
            width: 52,
            height: 52,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            boxShadow:
              mode === 'dark'
                ? '0 16px 36px -20px rgba(2, 6, 23, 0.95)'
                : '0 16px 36px -20px rgba(15, 23, 42, 0.55)',
            '&:hover': {
              bgcolor: 'background.paper',
            },
          }}
        >
          {mode === 'dark' ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Tooltip>
    </>
  )
}

export default AppShell

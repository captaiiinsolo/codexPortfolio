import { DarkMode, LightMode, Menu } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { Box, Button, Container, Drawer, IconButton, Stack, Tooltip, Typography } from '@mui/material'
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname])

  return (
    <>
      <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 4 } }}>
        <Stack spacing={3}>
          <Box
            sx={{
              borderRadius: { xs: 0, sm: 3 },
              border: { xs: 'none', sm: '1px solid' },
              borderColor: 'divider',
              bgcolor: {
                xs: 'transparent',
                sm: mode === 'dark' ? 'rgba(15, 23, 42, 0.74)' : 'rgba(255, 255, 255, 0.74)',
              },
              backdropFilter: { xs: 'none', sm: 'blur(14px)' },
              p: { xs: 0.5, sm: 2 },
              boxShadow: {
                xs: 'none',
                sm:
                  mode === 'dark'
                    ? '0 18px 40px -30px rgba(2, 6, 23, 0.95)'
                    : '0 18px 40px -30px rgba(15, 23, 42, 0.65)',
              },
            }}
          >
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'flex-start' }}>
              <Tooltip title="Open menu">
                <IconButton
                  onClick={() => setMobileNavOpen(true)}
                  aria-label="Open navigation menu"
                  sx={{
                    width: 44,
                    height: 44,
                    border: '1px solid',
                    borderColor: 'divider',
                    color: 'text.primary',
                  }}
                >
                  <Menu />
                </IconButton>
              </Tooltip>
            </Box>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
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

      <Drawer
        anchor="left"
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            p: 2,
            bgcolor: mode === 'dark' ? 'rgba(15, 23, 42, 0.96)' : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(18px)',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        <Stack spacing={1} sx={{ pt: 1 }}>
          <Typography variant="overline" sx={{ px: 1, letterSpacing: '0.14em', color: 'text.secondary', fontWeight: 700 }}>
            Navigation
          </Typography>
          {navItems.map((item) => (
            <Button
              key={item.to}
              component={NavLink}
              to={item.to}
              onMouseEnter={() => prefetchRoute(item.to)}
              onFocus={() => prefetchRoute(item.to)}
              onTouchStart={() => prefetchRoute(item.to)}
              className={({ isActive }) => (isActive ? 'active' : '')}
              sx={{
                ...navButtonSx,
                justifyContent: 'flex-start',
                width: '100%',
                minHeight: 44,
                px: 1.5,
                borderRadius: 2,
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Drawer>

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

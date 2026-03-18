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

function getDesktopNavButtonSx(mode) {
  const isDark = mode === 'dark'

  return {
    position: 'relative',
    px: { sm: 2.1, md: 2.4 },
    py: 1.1,
    minHeight: 46,
    fontSize: '0.98rem',
    color: isDark ? 'rgba(226, 232, 240, 0.78)' : 'rgba(15, 23, 42, 0.78)',
    border: '1px solid transparent',
    transition:
      'transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease, border-color 180ms ease, color 180ms ease',
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 'auto 18px 8px',
      height: 2,
      borderRadius: 999,
      background: isDark
        ? 'linear-gradient(90deg, rgba(45, 212, 191, 0) 0%, rgba(45, 212, 191, 0.75) 50%, rgba(45, 212, 191, 0) 100%)'
        : 'linear-gradient(90deg, rgba(15, 118, 110, 0) 0%, rgba(15, 118, 110, 0.72) 50%, rgba(15, 118, 110, 0) 100%)',
      opacity: 0,
      transform: 'scaleX(0.45)',
      transition: 'transform 180ms ease, opacity 180ms ease',
    },
    '&:hover': {
      color: 'text.primary',
      borderColor: isDark ? 'rgba(45, 212, 191, 0.18)' : 'rgba(15, 118, 110, 0.16)',
      bgcolor: isDark ? 'rgba(15, 23, 42, 0.38)' : 'rgba(255, 255, 255, 0.62)',
      boxShadow: isDark
        ? '0 14px 28px -22px rgba(2, 6, 23, 0.95)'
        : '0 14px 28px -22px rgba(15, 23, 42, 0.38)',
    },
    '&.active': {
      color: 'primary.main',
      borderColor: isDark ? 'rgba(45, 212, 191, 0.22)' : 'rgba(15, 118, 110, 0.2)',
      bgcolor: isDark ? 'rgba(45, 212, 191, 0.12)' : 'rgba(240, 253, 250, 0.92)',
      boxShadow: isDark
        ? 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 18px 34px -24px rgba(45, 212, 191, 0.4)'
        : 'inset 0 1px 0 rgba(255, 255, 255, 0.75), 0 18px 34px -24px rgba(15, 118, 110, 0.3)',
    },
    '&.active::after': {
      opacity: 1,
      transform: 'scaleX(1)',
    },
  }
}

function AppShell({ mode, onToggleColorMode }) {
  const location = useLocation()
  const navButtonSx = getNavButtonSx(mode)
  const desktopNavButtonSx = getDesktopNavButtonSx(mode)
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
              border: { xs: 'none', sm: 'none' },
              bgcolor: {
                xs: 'transparent',
                sm: 'transparent',
              },
              backdropFilter: { xs: 'none', sm: 'none' },
              p: { xs: 0.5, sm: 0 },
              boxShadow: {
                xs: 'none',
                sm: 'none',
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
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 999,
                  p: { sm: 0.9, md: 1 },
                  border: '1px solid',
                  borderColor: mode === 'dark' ? 'rgba(148, 163, 184, 0.22)' : 'rgba(15, 23, 42, 0.16)',
                  bgcolor: mode === 'dark' ? 'rgba(15, 23, 42, 0.72)' : 'rgba(255, 255, 255, 0.88)',
                  backdropFilter: 'blur(16px)',
                  boxShadow:
                    mode === 'dark'
                      ? 'inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 18px 34px -26px rgba(2, 6, 23, 0.92)'
                      : 'inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 18px 34px -26px rgba(15, 23, 42, 0.28)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: mode === 'dark'
                      ? 'linear-gradient(115deg, rgba(45, 212, 191, 0.1), rgba(15, 23, 42, 0) 42%, rgba(249, 115, 22, 0.1))'
                      : 'linear-gradient(115deg, rgba(45, 212, 191, 0.12), rgba(255, 255, 255, 0.18) 42%, rgba(249, 115, 22, 0.1))',
                    pointerEvents: 'none',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 1,
                    borderRadius: 999,
                    border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.03)' : '1px solid rgba(255, 255, 255, 0.55)',
                    pointerEvents: 'none',
                  },
                }}
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
                    sx={{ ...navButtonSx, ...desktopNavButtonSx }}
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
            Cybersecurity-focused portfolio built with React and MUI.
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

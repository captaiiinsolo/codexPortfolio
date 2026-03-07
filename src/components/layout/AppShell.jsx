import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Resume', to: '/resume' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact Me', to: '/contact' },
]

const linkStyle = ({ isActive }) => ({
  color: isActive ? '#1976d2' : 'inherit',
})

function AppShell() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h3" component="h1" sx={{ mb: 1 }}>
            Portfolio
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={NavLink}
                to={item.to}
                sx={linkStyle}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Box>
        <Outlet />
      </Stack>
    </Container>
  )
}

export default AppShell

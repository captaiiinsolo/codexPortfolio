import { ArrowForward, NorthEast, TrendingUp } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import RevealOnScroll from '../components/motion/RevealOnScroll'

const focusAreas = [
  {
    title: 'Product-Ready Frontends',
    description: 'Component systems that scale with feature velocity while keeping UX consistent.',
  },
  {
    title: 'Performance Discipline',
    description: 'Fast interactions, lean bundles, and measurable web-vitals improvements.',
  },
  {
    title: 'Cross-Team Execution',
    description: 'Tight handoff between product, design, and engineering from idea to launch.',
  },
]

const impactStats = [
  { label: 'Projects shipped', value: '12+' },
  { label: 'Primary stack', value: 'React + MUI' },
  { label: 'Focus areas', value: 'UI, UX, DX' },
]

function HomePage() {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 30 })

  return (
    <Stack spacing={{ xs: 3.5, md: 4.5 }}>
      <RevealOnScroll delay={30}>
        <Card
          elevation={0}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect()
            const x = ((event.clientX - rect.left) / rect.width) * 100
            const y = ((event.clientY - rect.top) / rect.height) * 100
            setSpotlight({ x, y })
          }}
          sx={(theme) => ({
            overflow: 'hidden',
            background:
              theme.palette.mode === 'dark'
                ? `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(45,212,191,0.2) 0%, rgba(45,212,191,0) 34%), linear-gradient(132deg, rgba(15,23,42,0.9) 0%, rgba(17,24,39,0.86) 38%, rgba(15,118,110,0.22) 100%)`
                : `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(15,118,110,0.14) 0%, rgba(15,118,110,0) 30%), linear-gradient(130deg, rgba(15,118,110,0.14) 0%, rgba(255,255,255,0.94) 40%, rgba(249,115,22,0.12) 100%)`,
          })}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Grid container spacing={{ xs: 3.5, md: 4.5 }} alignItems="center">
              <Grid size={{ xs: 12, md: 8 }}>
                <Stack spacing={{ xs: 2, md: 2.5 }}>
                  <Typography
                    variant="overline"
                    sx={{ letterSpacing: '0.16em', color: 'text.secondary', fontWeight: 700 }}
                  >
                    Solomon Santos
                  </Typography>
                  <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                      fontSize: { xs: '2.25rem', md: '3.25rem' },
                      maxWidth: 820,
                      lineHeight: { xs: 1.08, md: 1.04 },
                    }}
                  >
                    Design-minded frontend engineering with production-level rigor.
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ maxWidth: 660, fontSize: { xs: '1rem', md: '1.04rem' } }}
                  >
                    I build modern web interfaces that feel polished, stay performant, and are easy for teams to
                    evolve over time.
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                    <Button
                      component={RouterLink}
                      to="/projects"
                      variant="contained"
                      endIcon={<ArrowForward />}
                      sx={{ minHeight: 48, px: 2.25 }}
                    >
                      Explore Projects
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/contact"
                      variant="outlined"
                      endIcon={<NorthEast />}
                      sx={{ minHeight: 48, px: 2.25 }}
                    >
                      Start A Conversation
                    </Button>
                  </Stack>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Card
                  elevation={0}
                  sx={(theme) => ({
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(15, 23, 42, 0.7)'
                        : 'rgba(255, 255, 255, 0.88)',
                    borderColor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(148, 163, 184, 0.24)'
                        : 'rgba(15, 23, 42, 0.08)',
                  })}
                >
                  <CardContent sx={{ p: { xs: 2.25, md: 2.5 } }}>
                    <Stack spacing={1.75}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <TrendingUp color="primary" fontSize="small" />
                        <Typography
                          variant="overline"
                          sx={{ letterSpacing: '0.14em', color: 'text.secondary', fontWeight: 700 }}
                        >
                          Snapshot
                        </Typography>
                      </Stack>
                      {impactStats.map((item) => (
                        <Box key={item.label}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.04em' }}>
                            {item.label}
                          </Typography>
                          <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
                            {item.value}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <Box>
          <Stack spacing={0.75} sx={{ mb: 2.25 }}>
            <Typography variant="overline" sx={{ letterSpacing: '0.14em', color: 'text.secondary', fontWeight: 700 }}>
              What I Bring
            </Typography>
            <Typography variant="h5">How I Add Value</Typography>
          </Stack>
          <Grid container spacing={2}>
            {focusAreas.map((item, index) => (
              <Grid key={item.title} size={{ xs: 12, md: 4 }}>
                <RevealOnScroll delay={140 + index * 70}>
                  <Card
                    elevation={0}
                    sx={(theme) => ({
                      height: '100%',
                      background:
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(180deg, rgba(15,23,42,0.84) 0%, rgba(15,23,42,0.7) 100%)'
                          : 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.96) 100%)',
                    })}
                  >
                    <CardContent sx={{ p: { xs: 2.5, md: 2.75 } }}>
                      <Typography variant="h6" sx={{ mb: 1.1 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </RevealOnScroll>
              </Grid>
            ))}
          </Grid>
        </Box>
      </RevealOnScroll>
    </Stack>
  )
}

export default HomePage

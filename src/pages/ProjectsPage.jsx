import { ArrowForward, ArrowOutward } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import RevealOnScroll from '../components/motion/RevealOnScroll'

const projects = [
  {
    title: 'Portfolio Platform Refresh',
    role: 'Frontend Engineer',
    summary: 'Redesigned information architecture and interaction model to increase clarity and conversion intent.',
    outcomes: ['Improved content scan-ability', 'Cleaner responsive breakpoints', 'Higher visual consistency'],
    stack: ['React', 'MUI', 'Vite'],
    detail:
      'Focused on hierarchy, motion discipline, and conversion-oriented CTA placement while preserving maintainability.',
  },
  {
    title: 'Component System Foundation',
    role: 'UI Architecture Lead',
    summary: 'Created reusable UI primitives and shared patterns to ship faster with less visual drift.',
    outcomes: ['Reduced duplicate components', 'Faster feature implementation', 'More predictable QA'],
    stack: ['Design Tokens', 'Story-driven development', 'Accessibility'],
    detail:
      'Defined foundational component APIs and documentation-first patterns to align design and engineering output.',
  },
  {
    title: 'Contact Funnel Optimization',
    role: 'Product Engineer',
    summary: 'Built a streamlined inquiry flow with validation and reliable delivery integration.',
    outcomes: ['Lower form drop-off risk', 'Clear submission feedback', 'Scheduling CTA integration'],
    stack: ['EmailJS', 'Form Validation', 'Conversion UX'],
    detail:
      'Introduced progressive validation and clear success/error states to reduce friction and improve user confidence.',
  },
]

const faceCardSx = {
  position: 'absolute',
  inset: 0,
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  transformStyle: 'preserve-3d',
  WebkitTransformStyle: 'preserve-3d',
  willChange: 'transform',
}

function FlipAction({ side = 'right', reversed = false, onToggle }) {
  const isLeft = side === 'left'

  return (
    <Box
      sx={{
        position: 'absolute',
        left: isLeft ? 12 : 'auto',
        right: isLeft ? 'auto' : 12,
        bottom: 12,
        display: 'flex',
        alignItems: 'center',
        flexDirection: isLeft ? 'row-reverse' : 'row',
      }}
    >
      <Box
        className="flip-hint"
        sx={(theme) => ({
          mr: isLeft ? 0 : 1,
          ml: isLeft ? 1 : 0,
          px: 1.1,
          py: 0.45,
          borderRadius: 99,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.96)' : 'rgba(255, 255, 255, 0.96)',
          color: 'text.secondary',
          fontSize: { xs: '0.66rem', sm: '0.74rem' },
          fontWeight: 600,
          whiteSpace: 'nowrap',
          opacity: { xs: 0, md: 0 },
          transform: isLeft ? 'translateX(-14px)' : 'translateX(14px)',
          filter: 'blur(1.5px)',
          transition: 'opacity 260ms ease, transform 260ms ease, filter 260ms ease',
          pointerEvents: 'none',
        })}
      >
        Click for more details
      </Box>
      <Button
        type="button"
        onClick={onToggle}
        aria-label="Flip project card"
        sx={{
          minWidth: 0,
          p: 0,
          width: 34,
          height: 34,
          borderRadius: '50%',
          border: '1px solid',
          borderColor: 'divider',
          display: 'grid',
          placeItems: 'center',
          color: 'primary.main',
          bgcolor: 'background.paper',
          zIndex: 1,
          '&:hover': {
            bgcolor: 'background.paper',
          },
        }}
      >
        <ArrowForward fontSize="small" sx={{ transform: reversed ? 'rotate(180deg)' : 'none' }} />
      </Button>
    </Box>
  )
}

function ProjectsPage() {
  const [flipped, setFlipped] = useState({})

  const toggleCard = (title) => {
    setFlipped((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <Stack spacing={{ xs: 2.25, md: 3 }}>
      <RevealOnScroll delay={30}>
        <Box>
          <Typography variant="h3" component="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.6rem' }, mb: 1 }}>
            Selected Work
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, fontSize: { xs: '0.98rem', md: '1rem' } }}>
            A few examples of how I approach product decisions, frontend architecture, and delivery quality.
          </Typography>
        </Box>
      </RevealOnScroll>

      <Grid container spacing={{ xs: 1.5, md: 2 }}>
        {projects.map((project, index) => {
          const isFlipped = Boolean(flipped[project.title])

          return (
            <Grid key={project.title} size={{ xs: 12, md: 6 }}>
              <RevealOnScroll delay={120 + index * 80}>
                <Box sx={{ perspective: '1600px' }}>
                  <Box
                    sx={{
                      position: 'relative',
                      minHeight: { xs: 332, md: 360 },
                      outline: 'none',
                      borderRadius: 2,
                      '&:hover .flip-hint, &:focus-within .flip-hint': {
                        opacity: 1,
                        transform: 'translateX(0)',
                        filter: 'blur(0)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        transformStyle: 'preserve-3d',
                        WebkitTransformStyle: 'preserve-3d',
                        transition: 'transform 620ms cubic-bezier(0.2, 0.9, 0.2, 1)',
                        willChange: 'transform',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      }}
                    >
                      <Card
                        elevation={0}
                        sx={{
                          ...faceCardSx,
                          transform: 'rotateY(0deg) translateZ(0.1px)',
                          pointerEvents: isFlipped ? 'none' : 'auto',
                          '&:hover': {
                            transform: 'rotateY(0deg) translateZ(0.1px)',
                          },
                        }}
                      >
                        <CardContent sx={{ p: { xs: 2.25, md: 3 }, height: '100%', position: 'relative', pb: 7 }}>
                          <Stack spacing={{ xs: 1.5, md: 2 }}>
                            <Box>
                              <Typography variant="h5" sx={{ mb: 0.5, fontSize: { xs: '1.6rem', md: '2rem' } }}>
                                {project.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {project.role}
                              </Typography>
                            </Box>

                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.93rem', md: '0.95rem' } }}>
                              {project.summary}
                            </Typography>

                            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                              {project.stack.map((tech) => (
                                <Chip key={tech} label={tech} size="small" variant="outlined" />
                              ))}
                            </Stack>
                          </Stack>

                          <FlipAction side="right" onToggle={() => toggleCard(project.title)} />
                        </CardContent>
                      </Card>

                      <Card
                        elevation={0}
                        sx={{
                          ...faceCardSx,
                          transform: 'rotateY(180deg) translateZ(0.1px)',
                          pointerEvents: isFlipped ? 'auto' : 'none',
                          '&:hover': {
                            transform: 'rotateY(180deg) translateZ(0.1px)',
                          },
                        }}
                      >
                        <CardContent sx={{ p: { xs: 2.25, md: 3 }, height: '100%', position: 'relative', pb: 7 }}>
                          <Stack spacing={{ xs: 1, md: 1.25 }}>
                            <Typography variant="h6" sx={{ color: 'primary.main', fontSize: { xs: '1.1rem', md: '1.2rem' } }}>
                              {project.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.92rem', md: '0.95rem' } }}>
                              {project.detail}
                            </Typography>
                            <Stack spacing={0.75} sx={{ pt: 0.5 }}>
                              {project.outcomes.map((outcome) => (
                                <Typography key={outcome} variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.88rem', md: '0.92rem' } }}>
                                  - {outcome}
                                </Typography>
                              ))}
                            </Stack>
                          </Stack>

                          <FlipAction side="left" reversed onToggle={() => toggleCard(project.title)} />
                        </CardContent>
                      </Card>
                    </Box>
                  </Box>
                </Box>
              </RevealOnScroll>
            </Grid>
          )
        })}
      </Grid>

      <RevealOnScroll delay={260}>
        <Card elevation={0}>
          <CardContent sx={{ p: { xs: 2.25, md: 3 } }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
            >
              <Box>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Want deeper case studies?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  I can walk through architecture decisions, tradeoffs, and implementation details.
                </Typography>
              </Box>
              <Button component={RouterLink} to="/contact" variant="contained" endIcon={<ArrowOutward />}>
                Request A Walkthrough
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </RevealOnScroll>
    </Stack>
  )
}

export default ProjectsPage

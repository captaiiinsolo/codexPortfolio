import { ArrowOutward } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import RevealOnScroll from '../components/motion/RevealOnScroll'

// Portfolio case-study summaries that feed both the desktop carousel
// and the stacked mobile layout.
const projects = [
  {
    title: 'Security-Focused Portfolio Refresh',
    role: 'Builder / Frontend Developer',
    summary: 'Reframed site architecture and messaging to present a cybersecurity-first profile with clearer professional intent.',
    outcomes: ['Sharper role alignment', 'Cleaner information hierarchy', 'More credible technical positioning'],
    stack: ['React', 'MUI', 'Vite'],
    detail:
      'Focused on trust-building copy, maintainable UI structure, and a presentation that supports cybersecurity hiring conversations.',
  },
  {
    title: 'Reusable Interface System',
    role: 'Frontend Engineer',
    summary: 'Created reusable UI patterns that improve consistency, maintainability, and safer iteration across the site.',
    outcomes: ['Reduced duplicate patterns', 'More predictable updates', 'Stronger accessibility baseline'],
    stack: ['Component Architecture', 'Accessibility', 'Design Systems'],
    detail:
      'This work reflects the discipline needed in security-conscious environments where consistency and reduced complexity matter.',
  },
  {
    title: 'Trustworthy Contact Workflow',
    role: 'Full-Stack Oriented Web Developer',
    summary: 'Built a contact flow with validation, clearer feedback, and dependable message delivery integration.',
    outcomes: ['Better form validation', 'Clearer success and error handling', 'Improved user confidence'],
    stack: ['EmailJS', 'Form Validation', 'UX Reliability'],
    detail:
      'The form work emphasizes input validation, dependable processing, and user trust, all of which connect closely to secure application thinking.',
  },
]

function getDesktopCardMotion(offset, isExpanded) {
  // Convert a card's distance from the active index into the transforms
  // needed for the faux-3D desktop carousel.
  const absOffset = Math.abs(offset)
  const isActive = offset === 0

  return {
    translateX: offset * 220,
    rotateY: offset * -24,
    translateZ: isActive ? (isExpanded ? 150 : 118) : -72 - absOffset * 42,
    scale: isActive ? (isExpanded ? 1.05 : 1) : Math.max(0.74, 0.9 - absOffset * 0.08),
    opacity: absOffset > 2 ? 0 : Math.max(0.26, 1 - absOffset * 0.22),
  }
}

function ProjectsPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState(-1)

  const scrollToCard = (index) => {
    // Clamp keyboard navigation so focus never moves past the available cards.
    const nextIndex = Math.max(0, Math.min(index, projects.length - 1))
    setActiveIndex(nextIndex)
  }

  const handleCardClick = (index) => {
    // Clicking the focused card toggles details. Clicking a side card
    // first brings it forward, then expands it.
    if (index === activeIndex) {
      setExpandedIndex((current) => (current === index ? -1 : index))
      return
    }

    setActiveIndex(index)
    setExpandedIndex(index)
  }

  const handleRailKeyDown = (event) => {
    // Mirror the pointer-based carousel interaction with keyboard support.
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollToCard(activeIndex + 1)
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollToCard(activeIndex - 1)
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleCardClick(activeIndex)
    }
  }

  return (
    <Stack spacing={{ xs: 2.5, md: 3.5 }}>
      <RevealOnScroll delay={30}>
        {/* Intro copy explains the interaction model before the user
            gets into the carousel itself. */}
        <Stack spacing={1.25}>
          <Typography variant="h3" component="h2" sx={{ fontSize: { xs: '1.85rem', md: '2.7rem' } }}>
            Selected Work
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, fontSize: { xs: '0.98rem', md: '1rem' } }}>
            Explore the work sideways. Each card opens a fuller case-study snapshot focused on secure-minded implementation,
            resilient UX, and maintainable architecture.
          </Typography>
        </Stack>
      </RevealOnScroll>

      <RevealOnScroll delay={110}>
        {/* The main project stage renders as an interactive 3D rail on
            desktop and degrades to a stacked tap-to-expand list on mobile. */}
        <Card
          elevation={0}
          sx={(theme) => ({
            overflow: 'visible',
            background:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 118, 110, 0.18) 58%, rgba(249, 115, 22, 0.12) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(240,253,250,0.98) 58%, rgba(255,237,213,0.84) 100%)',
          })}
        >
          <CardContent sx={{ p: { xs: 2.25, md: 3 }, overflow: 'visible' }}>
            <Stack spacing={2.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1.5}>
                <Box>
                  <Typography variant="overline" sx={{ letterSpacing: '0.14em', color: 'text.secondary', fontWeight: 700 }}>
                    Project Carousel
                  </Typography>
                  <Typography variant="h5" sx={{ fontSize: { xs: '1.2rem', md: '1.45rem' } }}>
                    A 3D-style view of the work
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Move your cursor across the stage to shift focus, then click the centered card to expand it.
                  </Typography>
                </Box>
              </Stack>

              <Box
                role="listbox"
                aria-label="Project carousel"
                tabIndex={0}
                onKeyDown={handleRailKeyDown}
                onMouseMove={(event) => {
                  // Divide the rail into hover zones so the centered card
                  // changes smoothly as the pointer moves across the stage.
                  if (window.innerWidth < 900) {
                    return
                  }

                  const rect = event.currentTarget.getBoundingClientRect()
                  const x = event.clientX - rect.left
                  const zoneWidth = rect.width / projects.length
                  const nextIndex = Math.max(0, Math.min(projects.length - 1, Math.floor(x / zoneWidth)))
                  const zoneProgress = (x - nextIndex * zoneWidth) / zoneWidth

                  if (nextIndex > activeIndex && zoneProgress < 0.35) {
                    return
                  }

                  if (nextIndex < activeIndex && zoneProgress > 0.65) {
                    return
                  }

                  if (nextIndex !== activeIndex) {
                    setActiveIndex(nextIndex)
                  }
                }}
                sx={{
                  position: 'relative',
                  perspective: { xs: 'none', md: '1800px' },
                  px: { xs: 0, md: 1 },
                  pb: { xs: 0, md: expandedIndex === activeIndex ? 12 : 4 },
                  outline: 'none',
                  cursor: { xs: 'default', md: 'ew-resize' },
                  overflow: 'visible',
                  transition: 'padding-bottom 320ms ease',
                }}
              >
                <Box
                  sx={(theme) => ({
                    display: { xs: 'none', md: 'block' },
                    position: 'relative',
                    height: 390,
                    transformStyle: 'preserve-3d',
                    overflow: 'visible',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: '50%',
                      bottom: -8,
                      width: '78%',
                      height: 44,
                      transform: 'translateX(-50%)',
                      borderRadius: '50%',
                      background: theme.palette.mode === 'dark'
                        ? 'radial-gradient(circle, rgba(2,6,23,0.5) 0%, rgba(2,6,23,0) 72%)'
                        : 'radial-gradient(circle, rgba(15,23,42,0.16) 0%, rgba(15,23,42,0) 72%)',
                      pointerEvents: 'none',
                      filter: 'blur(8px)',
                    },
                  })}
                >
                  {/* Desktop cards are absolutely positioned and animated in
                      3D space relative to the active index. */}
                  {projects.map((project, index) => {
                    const offset = index - activeIndex
                    const absOffset = Math.abs(offset)
                    const isActive = offset === 0
                    const isExpanded = expandedIndex === index
                    const motion = getDesktopCardMotion(offset, isExpanded && isActive)

                    return (
                      <Box
                        key={project.title}
                        component="button"
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => handleCardClick(index)}
                        sx={(theme) => ({
                          position: 'absolute',
                          top: isExpanded && isActive ? -26 : 12,
                          left: '50%',
                          width: 'min(420px, 68vw)',
                          minHeight: isExpanded && isActive ? 430 : 340,
                          p: 0,
                          border: 'none',
                          background: 'transparent',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transformStyle: 'preserve-3d',
                          transform: `translateX(calc(-50% + ${motion.translateX}px)) translateZ(${motion.translateZ}px) rotateY(${motion.rotateY}deg) scale(${motion.scale})`,
                          opacity: motion.opacity,
                          zIndex: isExpanded && isActive ? 40 : 20 - absOffset,
                          transition:
                            'transform 620ms cubic-bezier(0.2, 0.85, 0.2, 1), opacity 360ms ease, top 360ms cubic-bezier(0.2, 0.85, 0.2, 1), filter 360ms ease',
                          filter: isActive ? 'none' : `saturate(${Math.max(0.66, 0.9 - absOffset * 0.1)}) blur(${absOffset > 1 ? 0.2 : 0}px)`,
                          outline: 'none',
                          '&:focus-visible': {
                            boxShadow: theme.palette.mode === 'dark'
                              ? '0 0 0 3px rgba(45, 212, 191, 0.32)'
                              : '0 0 0 3px rgba(15, 118, 110, 0.2)',
                            borderRadius: 18,
                          },
                        })}
                      >
                        <Card
                          elevation={0}
                          sx={(theme) => ({
                            height: '100%',
                            minHeight: isExpanded && isActive ? 430 : 340,
                            overflow: 'hidden',
                            backdropFilter: 'none',
                            backgroundColor: theme.palette.mode === 'dark' ? '#111c31' : '#f8fbfb',
                            borderColor: isActive
                              ? theme.palette.mode === 'dark'
                                ? 'rgba(45, 212, 191, 0.5)'
                                : 'rgba(15, 118, 110, 0.4)'
                              : 'divider',
                            background: isActive
                              ? theme.palette.mode === 'dark'
                                ? 'linear-gradient(180deg, #131d34 0%, #1b3745 100%)'
                                : 'linear-gradient(180deg, #ffffff 0%, #edf8f6 100%)'
                              : theme.palette.mode === 'dark'
                                ? 'linear-gradient(180deg, #162136 0%, #131c2e 100%)'
                                : 'linear-gradient(180deg, #ffffff 0%, #f4f7f8 100%)',
                            boxShadow: isActive
                              ? theme.palette.mode === 'dark'
                                ? '0 34px 60px -30px rgba(45, 212, 191, 0.34)'
                                : '0 34px 60px -30px rgba(15, 118, 110, 0.28)'
                              : theme.palette.mode === 'dark'
                                ? '0 20px 38px -28px rgba(2, 6, 23, 0.85)'
                                : '0 20px 38px -28px rgba(15, 23, 42, 0.32)',
                            transition:
                              'border-color 300ms ease, box-shadow 420ms cubic-bezier(0.2, 0.85, 0.2, 1), background 320ms ease',
                          })}
                        >
                          <CardContent sx={{ p: { xs: 2.25, md: 2.75 }, height: '100%' }}>
                            <Stack spacing={{ xs: 1.6, md: 1.9 }} sx={{ height: '100%' }}>
                              <Stack direction="row" justifyContent="space-between" spacing={1} alignItems="flex-start">
                                <Box>
                                  <Typography
                                    variant="h5"
                                    sx={{
                                      fontSize: { xs: '1.3rem', md: isActive ? '1.62rem' : '1.46rem' },
                                      lineHeight: 1.08,
                                      letterSpacing: '-0.03em',
                                      mb: 0.65,
                                      maxWidth: isActive ? '100%' : '92%',
                                    }}
                                  >
                                    {project.title}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontSize: '0.82rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}
                                  >
                                    {project.role}
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    px: 1.1,
                                    py: 0.55,
                                    borderRadius: 999,
                                    bgcolor: isActive ? 'primary.main' : 'action.hover',
                                    color: isActive ? 'primary.contrastText' : 'text.secondary',
                                    fontWeight: 700,
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                  }}
                                >
                                  {isActive ? 'Center' : `0${index + 1}`}
                                </Typography>
                              </Stack>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  fontSize: { xs: '0.93rem', md: '0.98rem' },
                                  lineHeight: 1.58,
                                  maxWidth: '32ch',
                                }}
                              >
                                {project.summary}
                              </Typography>

                              <Stack direction="row" spacing={0.85} useFlexGap flexWrap="wrap">
                                {project.stack.map((tech) => (
                                  <Chip key={tech} label={tech} size="small" variant={isActive ? 'filled' : 'outlined'} />
                                ))}
                              </Stack>

                              {isExpanded && isActive ? (
                                <Stack spacing={1.05} sx={{ pt: 0.65 }}>
                                  <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600, letterSpacing: '-0.01em' }}>
                                    Project details
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.62 }}>
                                    {project.detail}
                                  </Typography>
                                  {project.outcomes.map((outcome) => (
                                    <Typography key={outcome} variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                                      {`\u2022 ${outcome}`}
                                    </Typography>
                                  ))}
                                  <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 700, pt: 0.5 }}>
                                    Click again to collapse
                                  </Typography>
                                </Stack>
                              ) : (
                                <Box sx={{ mt: 'auto', pt: 1.5 }}>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '-0.01em' }}
                                  >
                                    {isActive ? 'Click to expand this card' : 'Move here and click to bring forward'}
                                  </Typography>
                                </Box>
                              )}
                            </Stack>
                          </CardContent>
                        </Card>
                      </Box>
                    )
                  })}
                </Box>

                <Stack spacing={1.5} sx={{ display: { xs: 'flex', md: 'none' } }}>
                  {/* Mobile keeps the same content but swaps the carousel
                      illusion for a simpler stacked interaction. */}
                  {projects.map((project, index) => {
                    const isActive = index === activeIndex
                    const isExpanded = expandedIndex === index

                    return (
                      <Box
                        key={project.title}
                        component="button"
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => handleCardClick(index)}
                        sx={(theme) => ({
                          p: 0,
                          border: 'none',
                          background: 'transparent',
                          textAlign: 'left',
                          cursor: 'pointer',
                          outline: 'none',
                          transform: isActive ? 'scale(1)' : 'scale(0.98)',
                          transition: 'transform 220ms ease',
                          '&:focus-visible': {
                            boxShadow: theme.palette.mode === 'dark'
                              ? '0 0 0 3px rgba(45, 212, 191, 0.32)'
                              : '0 0 0 3px rgba(15, 118, 110, 0.2)',
                            borderRadius: 18,
                          },
                        })}
                      >
                        <Card
                          elevation={0}
                          sx={(theme) => ({
                            backdropFilter: 'none',
                            backgroundColor: theme.palette.mode === 'dark' ? '#111c31' : '#f8fbfb',
                            borderColor: isActive
                              ? theme.palette.mode === 'dark'
                                ? 'rgba(45, 212, 191, 0.5)'
                                : 'rgba(15, 118, 110, 0.4)'
                              : 'divider',
                            background:
                              theme.palette.mode === 'dark'
                                ? isActive
                                  ? 'linear-gradient(180deg, #131d34 0%, #183442 100%)'
                                  : 'linear-gradient(180deg, #162136 0%, #131c2e 100%)'
                                : isActive
                                  ? 'linear-gradient(180deg, #ffffff 0%, #edf8f6 100%)'
                                  : 'linear-gradient(180deg, #ffffff 0%, #f4f7f8 100%)',
                          })}
                        >
                          <CardContent sx={{ p: 2.25 }}>
                            <Stack spacing={1.4}>
                              <Typography variant="h6" sx={{ lineHeight: 1.12, letterSpacing: '-0.02em' }}>
                                {project.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.82rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                                {project.role}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.56 }}>
                                {project.summary}
                              </Typography>
                              <Stack direction="row" spacing={0.85} useFlexGap flexWrap="wrap">
                                {project.stack.map((tech) => (
                                  <Chip key={tech} label={tech} size="small" variant={isActive ? 'filled' : 'outlined'} />
                                ))}
                              </Stack>
                              {isExpanded && isActive ? (
                                <Stack spacing={1}>
                                  <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                                    Project details
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                    {project.detail}
                                  </Typography>
                                  {project.outcomes.map((outcome) => (
                                    <Typography key={outcome} variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                                      {`\u2022 ${outcome}`}
                                    </Typography>
                                  ))}
                                  <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 700 }}>
                                    Tap again to collapse
                                  </Typography>
                                </Stack>
                              ) : (
                                <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 700 }}>
                                  {isActive ? 'Tap to expand this card' : 'Tap to select'}
                                </Typography>
                              )}
                            </Stack>
                          </CardContent>
                        </Card>
                      </Box>
                    )
                  })}
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </RevealOnScroll>

      <RevealOnScroll delay={260}>
        {/* Final CTA gives visitors a clear next step after browsing the work. */}
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
                  I can walk through implementation decisions, security-minded tradeoffs, and how my web background supports cybersecurity work.
                </Typography>
              </Box>
              <Button component={RouterLink} to="/contact" variant="contained" endIcon={<ArrowOutward />} sx={{ whiteSpace: 'nowrap' }}>
                Start A Conversation
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </RevealOnScroll>
    </Stack>
  )
}

export default ProjectsPage

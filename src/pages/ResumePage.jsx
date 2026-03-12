import { FileDownload, OpenInNew, Verified, WorkHistory } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material'
import RevealOnScroll from '../components/motion/RevealOnScroll'

const highlights = [
  'Frontend engineering with React, component architecture, and design systems.',
  'Accessibility-conscious implementations with practical UX polish.',
  'Performance-minded builds with clean, maintainable code structures.',
]

const experience = [
  {
    period: 'Recent',
    title: 'Frontend Projects',
    description:
      'Built and refined production-ready web interfaces with a focus on clarity, responsiveness, and maintainability.',
  },
  {
    period: 'Ongoing',
    title: 'Technical Growth',
    description:
      'Expanding depth across product thinking, frontend architecture, and measurable performance optimization.',
  },
]

const certifications = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2025',
    credentialId: 'Available on request',
    credentialUrl: '',
    status: 'Completed',
  },
  {
    name: 'Meta Front-End Developer Certificate',
    issuer: 'Meta',
    date: '2024',
    credentialId: 'Available on request',
    credentialUrl: '',
    status: 'Completed',
  },
  {
    name: 'Google UX Design Certificate',
    issuer: 'Google',
    date: 'Expected 2026',
    credentialId: 'Pending',
    credentialUrl: '',
    status: 'In Progress',
  },
]

const sortCertifications = (a, b) => {
  const rank = (status) => (status === 'In Progress' ? 0 : 1)
  return rank(a.status) - rank(b.status)
}

function ResumePage() {
  return (
    <Stack spacing={3}>
      <RevealOnScroll delay={30}>
        <Card elevation={0}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Stack spacing={2}>
              <Typography variant="h3" component="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
                Resume Overview
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 780 }}>
                A quick snapshot of my strengths and experience. If you would like the full PDF version, add your
                resume file URL below.
              </Typography>
              <Button
                variant="outlined"
                startIcon={<FileDownload />}
                component="a"
                href="#"
                disabled
                sx={{ width: 'fit-content' }}
              >
                Download Resume (Coming Soon)
              </Button>

              <Box sx={{ pt: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <Verified fontSize="small" color="primary" />
                  <Typography variant="h6">Certifications</Typography>
                </Stack>

                <Grid container spacing={1.5}>
                  {[...certifications].sort(sortCertifications).map((item) => {
                    const isInProgress = item.status === 'In Progress'

                    return (
                      <Grid key={item.name} size={{ xs: 12, md: 4 }}>
                        <Box
                          sx={(theme) => ({
                            p: 2,
                            borderRadius: 2.5,
                            border: '1px solid',
                            borderColor:
                              theme.palette.mode === 'dark' ? 'rgba(110,231,183,0.3)' : 'rgba(167,243,208,0.34)',
                            background:
                              theme.palette.mode === 'dark'
                                ? 'linear-gradient(145deg, #2f6e5b 0%, #2b644f 100%)'
                                : 'linear-gradient(145deg, #59b89b 0%, #56b48f 100%)',
                            boxShadow:
                              theme.palette.mode === 'dark'
                                ? '0 12px 24px rgba(2,10,8,0.45), inset 0 1px 0 rgba(255,255,255,0.08)'
                                : '0 12px 26px rgba(22,101,52,0.22), inset 0 1px 0 rgba(255,255,255,0.26)',
                            minHeight: 190,
                            height: '100%',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              inset: 0,
                              background:
                                theme.palette.mode === 'dark'
                                  ? 'radial-gradient(circle at 84% 14%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 44%)'
                                  : 'radial-gradient(circle at 84% 14%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 44%)',
                              pointerEvents: 'none',
                            },
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              borderColor:
                                theme.palette.mode === 'dark' ? 'rgba(167,243,208,0.46)' : 'rgba(236,253,245,0.72)',
                              boxShadow:
                                theme.palette.mode === 'dark'
                                  ? '0 16px 32px rgba(2,10,8,0.56), 0 0 0 1px rgba(167,243,208,0.16)'
                                  : '0 16px 30px rgba(22,101,52,0.28), 0 0 0 1px rgba(236,253,245,0.34)',
                            },
                          })}
                        >
                          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.25 }}>
                            <Typography
                              variant="overline"
                              sx={(theme) => ({
                                letterSpacing: 1.1,
                                color:
                                  theme.palette.mode === 'dark' ? 'rgba(220,252,231,0.86)' : 'rgba(236,253,245,0.88)',
                                display: 'block',
                              })}
                            >
                              Certified
                            </Typography>
                            <Chip
                              size="small"
                              label={item.status}
                              sx={(theme) => ({
                                height: 20,
                                fontSize: '0.68rem',
                                fontWeight: 700,
                                color: isInProgress
                                  ? '#064e3b'
                                  : theme.palette.mode === 'dark'
                                    ? '#d1fae5'
                                    : '#ecfdf5',
                                backgroundColor: isInProgress
                                  ? 'rgba(253,224,71,0.92)'
                                  : theme.palette.mode === 'dark'
                                    ? 'rgba(16,185,129,0.28)'
                                    : 'rgba(236,253,245,0.2)',
                                border: '1px solid',
                                borderColor: isInProgress
                                  ? 'rgba(161,98,7,0.4)'
                                  : theme.palette.mode === 'dark'
                                    ? 'rgba(167,243,208,0.38)'
                                    : 'rgba(236,253,245,0.35)',
                              })}
                            />
                          </Stack>
                          <Typography
                            variant="subtitle1"
                            sx={(theme) => ({
                              fontWeight: 700,
                              mb: 0.5,
                              lineHeight: 1.35,
                              color: theme.palette.mode === 'dark' ? '#dcfce7' : '#ecfdf5',
                            })}
                          >
                            {item.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={(theme) => ({
                              fontWeight: 500,
                              color: theme.palette.mode === 'dark' ? 'rgba(220,252,231,0.9)' : 'rgba(236,253,245,0.92)',
                            })}
                          >
                            {item.issuer}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={(theme) => ({
                              display: 'block',
                              mt: 1.25,
                              color: theme.palette.mode === 'dark' ? 'rgba(220,252,231,0.84)' : 'rgba(236,253,245,0.88)',
                            })}
                          >
                            {isInProgress ? 'Target:' : 'Earned:'} {item.date}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={(theme) => ({
                              display: 'block',
                              mt: 0.5,
                              color: theme.palette.mode === 'dark' ? 'rgba(220,252,231,0.84)' : 'rgba(236,253,245,0.88)',
                            })}
                          >
                            Credential ID: {item.credentialId}
                          </Typography>
                          {item.credentialUrl && (
                            <Button
                              size="small"
                              variant="text"
                              component="a"
                              href={item.credentialUrl}
                              target="_blank"
                              rel="noreferrer"
                              endIcon={<OpenInNew fontSize="inherit" />}
                              sx={(theme) => ({
                                mt: 1.25,
                                px: 0,
                                minWidth: 0,
                                color: theme.palette.mode === 'dark' ? '#dcfce7' : '#ecfdf5',
                                '&:hover': {
                                  backgroundColor:
                                    theme.palette.mode === 'dark' ? 'rgba(220,252,231,0.12)' : 'rgba(236,253,245,0.08)',
                                },
                              })}
                            >
                              View Credential
                            </Button>
                          )}
                        </Box>
                      </Grid>
                    )
                  })}
                </Grid>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </RevealOnScroll>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 5 }}>
          <RevealOnScroll delay={120}>
            <Card elevation={0} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1.5 }}>
                  Core Highlights
                </Typography>
                <Stack spacing={1.5}>
                  {highlights.map((item) => (
                    <Typography key={item} variant="body2" color="text.secondary">
                      - {item}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </RevealOnScroll>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <RevealOnScroll delay={190}>
            <Card elevation={0} sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <WorkHistory fontSize="small" color="primary" />
                  <Typography variant="h6">Experience Narrative</Typography>
                </Stack>
                <Stack spacing={2}>
                  {experience.map((item) => (
                    <Box key={item.title}>
                      <Typography variant="caption" color="text.secondary">
                        {item.period}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </RevealOnScroll>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default ResumePage

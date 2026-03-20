import { FileDownload, OpenInNew, Verified, WorkHistory } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material'
import RevealOnScroll from '../components/motion/RevealOnScroll'

// Resume talking points shown as short supporting bullets.
const highlights = [
  'Cybersecurity is my primary career target, supported by hands-on web application experience.',
  'Frontend and full-stack fundamentals help me understand how modern applications are built and exposed to risk.',
  'AWS cloud knowledge, accessibility awareness, and maintainable engineering habits strengthen my technical foundation.',
]

// Lightweight experience framing used instead of a full timeline.
const experience = [
  {
    period: 'Recent',
    title: 'Cybersecurity Transition Projects',
    description:
      'Built and refined web projects that highlight secure-minded thinking, dependable UX, and maintainable implementation.',
  },
  {
    period: 'Ongoing',
    title: 'Security and Web Development Growth',
    description:
      'Expanding depth across cybersecurity concepts, cloud foundations, and full-stack development capabilities.',
  },
]

// Certification data powers the featured cards near the top of the page.
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

// Keep the downloadable resume path in one place so the CTA and any
// future links stay consistent.
const resumeFileUrl = '/SolomonSantos_CSResume-2026.pdf'

const sortCertifications = (a, b) => {
  // Surface the in-progress certification first so current growth is
  // immediately visible.
  const rank = (status) => (status === 'In Progress' ? 0 : 1)
  return rank(a.status) - rank(b.status)
}

function ResumePage() {
  return (
    <Stack spacing={3}>
      <RevealOnScroll delay={30}>
        {/* Open with the downloadable resume and a visually prominent
            certification strip. */}
        <Card elevation={0}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Stack spacing={2}>
              <Typography variant="h3" component="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
                Resume Overview
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 780 }}>
                A quick snapshot of the skills and credentials I am using to pursue cybersecurity roles, with
                full-stack web development as a secondary track. The full PDF version is available below.
              </Typography>
              <Button
                variant="outlined"
                startIcon={<FileDownload />}
                component="a"
                href={resumeFileUrl}
                download="SolomonSantos_CSResume-2026.pdf"
                sx={{ width: 'fit-content' }}
              >
                Download Resume
              </Button>

              <Box sx={{ pt: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <Verified fontSize="small" color="primary" />
                  <Typography variant="h6">Certifications</Typography>
                </Stack>

                <Box
                  sx={{
                    overflowX: { xs: 'auto', md: 'visible' },
                    pb: { xs: 1, md: 0 },
                    mx: { xs: -0.5, md: 0 },
                    px: { xs: 0.5, md: 0 },
                    scrollbarWidth: 'thin',
                  }}
                >
                  {/* Mobile uses a horizontal scroll tray while desktop
                      spreads the credential cards into three columns. */}
                  <Box
                    sx={{
                      display: { xs: 'flex', md: 'grid' },
                      gridTemplateColumns: { md: 'repeat(3, minmax(0, 1fr))' },
                      gap: 1.5,
                      minWidth: { xs: 'max-content', md: 0 },
                    }}
                  >
                    {[...certifications].sort(sortCertifications).map((item) => {
                      const isInProgress = item.status === 'In Progress'

                      return (
                        <Box
                          key={item.name}
                          sx={{
                            minWidth: { xs: 280, sm: 320, md: 'auto' },
                            width: { xs: 280, sm: 320, md: 'auto' },
                          }}
                        >
                          <Box
                            sx={(theme) => ({
                              p: 2,
                              borderRadius: 2.5,
                              border: '1px solid',
                              borderColor: isInProgress
                                ? theme.palette.mode === 'dark'
                                  ? 'rgba(148,163,184,0.34)'
                                  : 'rgba(100,116,139,0.24)'
                                : theme.palette.mode === 'dark'
                                  ? 'rgba(110,231,183,0.3)'
                                  : 'rgba(167,243,208,0.34)',
                              background: isInProgress
                                ? theme.palette.mode === 'dark'
                                  ? 'linear-gradient(145deg, #334155 0%, #293445 100%)'
                                  : 'linear-gradient(145deg, #d7dde6 0%, #cbd5e1 100%)'
                                : theme.palette.mode === 'dark'
                                  ? 'linear-gradient(145deg, #2f6e5b 0%, #2b644f 100%)'
                                  : 'linear-gradient(145deg, #59b89b 0%, #56b48f 100%)',
                              boxShadow: isInProgress
                                ? theme.palette.mode === 'dark'
                                  ? '0 12px 24px rgba(15,23,42,0.42), inset 0 1px 0 rgba(255,255,255,0.06)'
                                  : '0 12px 26px rgba(100,116,139,0.18), inset 0 1px 0 rgba(255,255,255,0.32)'
                                : theme.palette.mode === 'dark'
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
                                background: isInProgress
                                  ? theme.palette.mode === 'dark'
                                    ? 'radial-gradient(circle at 84% 14%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 44%)'
                                    : 'radial-gradient(circle at 84% 14%, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 44%)'
                                  : theme.palette.mode === 'dark'
                                    ? 'radial-gradient(circle at 84% 14%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 44%)'
                                    : 'radial-gradient(circle at 84% 14%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 44%)',
                                pointerEvents: 'none',
                              },
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                borderColor: isInProgress
                                  ? theme.palette.mode === 'dark'
                                    ? 'rgba(203,213,225,0.48)'
                                    : 'rgba(148,163,184,0.42)'
                                  : theme.palette.mode === 'dark'
                                    ? 'rgba(167,243,208,0.46)'
                                    : 'rgba(236,253,245,0.72)',
                                boxShadow: isInProgress
                                  ? theme.palette.mode === 'dark'
                                    ? '0 16px 32px rgba(15,23,42,0.54), 0 0 0 1px rgba(203,213,225,0.14)'
                                    : '0 16px 30px rgba(100,116,139,0.24), 0 0 0 1px rgba(226,232,240,0.4)'
                                  : theme.palette.mode === 'dark'
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
                                  color: isInProgress
                                    ? theme.palette.mode === 'dark'
                                      ? 'rgba(226,232,240,0.86)'
                                      : 'rgba(51,65,85,0.82)'
                                    : theme.palette.mode === 'dark'
                                      ? 'rgba(220,252,231,0.86)'
                                      : 'rgba(236,253,245,0.88)',
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
                                    ? theme.palette.mode === 'dark'
                                      ? '#e2e8f0'
                                      : '#334155'
                                    : theme.palette.mode === 'dark'
                                      ? '#d1fae5'
                                      : '#ecfdf5',
                                  backgroundColor: isInProgress
                                    ? theme.palette.mode === 'dark'
                                      ? 'rgba(148,163,184,0.2)'
                                      : 'rgba(241,245,249,0.48)'
                                    : theme.palette.mode === 'dark'
                                      ? 'rgba(16,185,129,0.28)'
                                      : 'rgba(236,253,245,0.2)',
                                  border: '1px solid',
                                  borderColor: isInProgress
                                    ? theme.palette.mode === 'dark'
                                      ? 'rgba(148,163,184,0.34)'
                                      : 'rgba(148,163,184,0.34)'
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
                                color: isInProgress
                                  ? theme.palette.mode === 'dark'
                                    ? '#f8fafc'
                                    : '#1e293b'
                                  : theme.palette.mode === 'dark'
                                    ? '#dcfce7'
                                    : '#ecfdf5',
                              })}
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={(theme) => ({
                                fontWeight: 500,
                                color: isInProgress
                                  ? theme.palette.mode === 'dark'
                                    ? 'rgba(226,232,240,0.9)'
                                    : 'rgba(51,65,85,0.86)'
                                  : theme.palette.mode === 'dark'
                                    ? 'rgba(220,252,231,0.9)'
                                    : 'rgba(236,253,245,0.92)',
                              })}
                            >
                              {item.issuer}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={(theme) => ({
                                display: 'block',
                                mt: 1.25,
                                color: isInProgress
                                  ? theme.palette.mode === 'dark'
                                    ? 'rgba(226,232,240,0.82)'
                                    : 'rgba(51,65,85,0.78)'
                                  : theme.palette.mode === 'dark'
                                    ? 'rgba(220,252,231,0.84)'
                                    : 'rgba(236,253,245,0.88)',
                              })}
                            >
                              {isInProgress ? 'Target:' : 'Earned:'} {item.date}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={(theme) => ({
                                display: 'block',
                                mt: 0.5,
                                color: isInProgress
                                  ? theme.palette.mode === 'dark'
                                    ? 'rgba(226,232,240,0.82)'
                                    : 'rgba(51,65,85,0.78)'
                                  : theme.palette.mode === 'dark'
                                    ? 'rgba(220,252,231,0.84)'
                                    : 'rgba(236,253,245,0.88)',
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
                                  color: isInProgress
                                    ? theme.palette.mode === 'dark'
                                      ? '#e2e8f0'
                                      : '#334155'
                                    : theme.palette.mode === 'dark'
                                      ? '#dcfce7'
                                      : '#ecfdf5',
                                  '&:hover': {
                                    backgroundColor: isInProgress
                                      ? theme.palette.mode === 'dark'
                                        ? 'rgba(226,232,240,0.08)'
                                        : 'rgba(255,255,255,0.26)'
                                      : theme.palette.mode === 'dark'
                                        ? 'rgba(220,252,231,0.12)'
                                        : 'rgba(236,253,245,0.08)',
                                  },
                                })}
                              >
                                View Credential
                              </Button>
                            )}
                          </Box>
                        </Box>
                      )
                    })}
                  </Box>
                </Box>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </RevealOnScroll>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 5 }}>
          <RevealOnScroll delay={120}>
            {/* Supporting highlights summarize the strongest role-fit points. */}
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
            {/* The experience card keeps the narrative concise while still
                giving hiring readers additional context. */}
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

import { FileDownload, WorkHistory } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
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

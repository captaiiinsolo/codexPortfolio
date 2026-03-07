import { Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material'

const strengths = [
  'React and component-driven frontend architecture',
  'Responsive UI implementation with clean design systems',
  'Performance-focused development and optimization',
  'Product collaboration from idea to shipped feature',
]

const workflow = [
  'Understand goals and user outcomes first.',
  'Break work into clear, testable milestones.',
  'Ship quickly, then iterate with measurable improvements.',
]

function AboutPage() {
  return (
    <Stack spacing={4}>
      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Stack spacing={2.5}>
            <Chip label="About Me" color="primary" sx={{ width: 'fit-content' }} />
            <Typography variant="h3" component="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              I build thoughtful digital experiences that are clean, fast, and maintainable.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 850 }}>
              I am a frontend developer focused on creating modern web interfaces with React. I care about
              UI quality, accessibility, and scalable code structure, while keeping product goals and user
              experience at the center of every decision.
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={0} sx={{ height: '100%', border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Strengths
              </Typography>
              <Stack spacing={1.5}>
                {strengths.map((item) => (
                  <Typography key={item} variant="body2" color="text.secondary">
                    - {item}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={0} sx={{ height: '100%', border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>
                How I Work
              </Typography>
              <Stack spacing={1.5}>
                {workflow.map((step) => (
                  <Typography key={step} variant="body2" color="text.secondary">
                    - {step}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default AboutPage

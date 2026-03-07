import { ArrowForward } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

function HomePage() {
  return (
    <Stack spacing={4}>
      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Stack spacing={3}>
            <Chip label="Open To Work" color="primary" sx={{ width: 'fit-content' }} />
            <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
              Building clean, scalable web experiences.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
              I am a frontend-focused developer who builds modern, performant applications with React and
              component-driven architecture.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                component={RouterLink}
                to="/projects"
                variant="contained"
                endIcon={<ArrowForward />}
              >
                View Projects
              </Button>
              <Button component={RouterLink} to="/contact" variant="outlined">
                Contact Me
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          What I Focus On
        </Typography>
        <Grid container spacing={2}>
          {[
            {
              title: 'Frontend Engineering',
              description: 'Responsive UI development with React, reusable components, and accessibility-first patterns.',
            },
            {
              title: 'Performance',
              description: 'Fast page loads, optimized bundles, and practical improvements based on real metrics.',
            },
            {
              title: 'Product Collaboration',
              description: 'Working closely with design and product teams to ship clear, maintainable features.',
            },
          ].map((item) => (
            <Grid key={item.title} size={{ xs: 12, md: 4 }}>
              <Card elevation={0} sx={{ height: '100%', border: '1px solid', borderColor: 'divider' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  )
}

export default HomePage

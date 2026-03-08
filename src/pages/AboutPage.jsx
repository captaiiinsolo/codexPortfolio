import { Bolt, DesignServices, Groups } from '@mui/icons-material'
import { Box, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material'
import RevealOnScroll from '../components/motion/RevealOnScroll'

const strengths = [
  {
    icon: <DesignServices color="primary" fontSize="small" />,
    title: 'Interface Craft',
    description: 'Building clear, responsive interfaces with reusable component patterns and visual consistency.',
  },
  {
    icon: <Bolt color="primary" fontSize="small" />,
    title: 'Execution Speed',
    description: 'Breaking down work into focused milestones so teams can ship quickly with lower risk.',
  },
  {
    icon: <Groups color="primary" fontSize="small" />,
    title: 'Collaboration',
    description: 'Aligning product goals, design intent, and technical constraints into practical decisions.',
  },
]

const workflow = [
  'Align on user outcomes before implementation.',
  'Build with scalable patterns from day one.',
  'Measure quality through performance and usability.',
]

function AboutPage() {
  return (
    <Stack spacing={4}>
      <RevealOnScroll delay={30}>
        <Card
          elevation={0}
          sx={(theme) => ({
            background:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(126deg, rgba(15,23,42,0.88) 0%, rgba(30,41,59,0.82) 42%, rgba(15,118,110,0.18) 100%)'
                : 'linear-gradient(120deg, rgba(15,118,110,0.12) 0%, rgba(255,255,255,0.94) 44%, rgba(249,115,22,0.1) 100%)',
          })}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Stack spacing={2.5}>
              <Chip label="About Me" color="primary" sx={{ width: 'fit-content' }} />
              <Typography variant="h3" component="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
                I build thoughtful digital experiences that are clean, fast, and maintainable.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 850 }}>
                I am a frontend developer focused on shipping modern web interfaces with React. I care about UI
                quality, accessibility, and scalable code structures while keeping product outcomes at the center.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </RevealOnScroll>

      <Grid container spacing={2}>
        {strengths.map((item, index) => (
          <Grid key={item.title} size={{ xs: 12, md: 4 }}>
            <RevealOnScroll delay={120 + index * 70}>
              <Card elevation={0} sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                    {item.icon}
                    <Typography variant="h6">{item.title}</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </RevealOnScroll>
          </Grid>
        ))}
      </Grid>

      <RevealOnScroll delay={220}>
        <Card elevation={0}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1.5 }}>
              How I Work
            </Typography>
            <Stack spacing={1.5}>
              {workflow.map((step, index) => (
                <Box key={step}>
                  <Typography variant="caption" color="text.secondary">
                    Step {index + 1}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </RevealOnScroll>
    </Stack>
  )
}

export default AboutPage

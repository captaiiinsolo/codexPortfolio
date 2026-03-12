import { Bolt, DesignServices, Groups, NorthEast } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
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
    <Stack spacing={{ xs: 3.5, md: 4.5 }}>
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
            <Stack spacing={{ xs: 2, md: 2.5 }}>
              <Typography variant="overline" sx={{ letterSpacing: '0.14em', color: 'text.secondary', fontWeight: 700 }}>
                About
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{ fontSize: { xs: '2rem', md: '2.6rem' }, maxWidth: 920, lineHeight: { xs: 1.12, md: 1.08 } }}
              >
                I build thoughtful digital experiences that are clean, fast, and maintainable.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, fontSize: { xs: '1rem', md: '1.03rem' } }}>
                I am a frontend developer focused on shipping modern web interfaces with React. I care about UI
                quality, accessibility, and scalable code structures while keeping product outcomes at the center.
              </Typography>
              <Box>
                <Button component={RouterLink} to="/contact" variant="outlined" endIcon={<NorthEast />} sx={{ minHeight: 48, px: 2.25 }}>
                  Start A Conversation
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </RevealOnScroll>

      <Box>
        <Stack spacing={0.75} sx={{ mb: 2.25 }}>
          <Typography variant="overline" sx={{ letterSpacing: '0.14em', color: 'text.secondary', fontWeight: 700 }}>
            Strengths
          </Typography>
          <Typography variant="h5">What I Focus On</Typography>
        </Stack>
        <Grid container spacing={2}>
          {strengths.map((item, index) => (
            <Grid key={item.title} size={{ xs: 12, md: 4 }}>
              <RevealOnScroll delay={120 + index * 70}>
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
      </Box>

      <RevealOnScroll delay={220}>
        <Card
          elevation={0}
          sx={(theme) => ({
            background:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg, rgba(15,23,42,0.84) 0%, rgba(15,23,42,0.72) 100%)'
                : 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.96) 100%)',
          })}
        >
          <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
            <Stack spacing={0.75} sx={{ mb: 2 }}>
              <Typography variant="overline" sx={{ letterSpacing: '0.14em', color: 'text.secondary', fontWeight: 700 }}>
                Process
              </Typography>
              <Typography variant="h6">How I Work</Typography>
            </Stack>
            <Stack spacing={1.75}>
              {workflow.map((step, index) => (
                <Box key={step}>
                  <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: '0.04em' }}>
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

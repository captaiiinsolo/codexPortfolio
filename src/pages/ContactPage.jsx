import { InfoOutlined } from '@mui/icons-material'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import confetti from 'canvas-confetti'
import { Alert, AlertTitle, Box, Button, Card, CardContent, Stack, TextField, Tooltip, Typography } from '@mui/material'
import RevealOnScroll from '../components/motion/RevealOnScroll'

const EMAIL_REGEX = /^(?=.{6,254}$)(?=.{1,64}@)[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9])?@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/
const PHONE_REGEX = /^\(\d{3}\)\s\d{3}-\d{4}$/

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
}

function fireSuccessConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  confetti({
    particleCount: 80,
    spread: 64,
    origin: { y: 0.6 },
  })
}

function formatPhoneNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 10)

  if (digits.length === 0) {
    return ''
  }

  if (digits.length < 4) {
    return `(${digits}`
  }

  if (digits.length < 7) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

function ContactPage() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitState, setSubmitState] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const appointmentUrl = import.meta.env.VITE_GOOGLE_CALENDAR_APPOINTMENT_URL

  const validate = () => {
    const nextErrors = {}

    if (!values.firstName.trim()) {
      nextErrors.firstName = 'First Name is required.'
    }

    if (!values.lastName.trim()) {
      nextErrors.lastName = 'Last Name is required.'
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!EMAIL_REGEX.test(values.email.trim())) {
      nextErrors.email = 'Enter a valid email address (example: name@domain.com).'
    }

    if (values.phone.trim() && !PHONE_REGEX.test(values.phone.trim())) {
      nextErrors.phone = 'Enter phone number as (xxx) xxx-xxxx.'
    }

    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    const nextValue = name === 'phone' ? formatPhoneNumber(value) : value
    setValues((prev) => ({ ...prev, [name]: nextValue }))

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }

    if (submitState.type) {
      setSubmitState({ type: '', message: '' })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState({ type: '', message: '' })
      return
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setSubmitState({
        type: 'error',
        message:
          'Email delivery is not configured yet. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to your .env file.',
      })
      return
    }

    const templateParams = {
      to_email: 'hello@solomonsantos.me',
      first_name: values.firstName.trim(),
      last_name: values.lastName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim() || 'Not provided',
      message: values.message.trim() || 'No message provided',
      schedule_call_link: appointmentUrl || 'Not configured',
    }

    try {
      setIsSubmitting(true)
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      setSubmitState({
        type: 'success',
        message: 'Your message was sent successfully. I will follow up soon.',
      })
      fireSuccessConfetti()
      setValues(initialValues)
      setErrors({})
    } catch {
      setSubmitState({
        type: 'error',
        message: 'Unable to send message right now. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <RevealOnScroll delay={40}>
      <Card
        elevation={0}
        sx={(theme) => ({
          border: '1px solid',
          borderColor: 'divider',
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(126deg, rgba(15,23,42,0.88) 0%, rgba(30,41,59,0.8) 36%, rgba(15,118,110,0.16) 100%)'
              : 'linear-gradient(125deg, rgba(15,118,110,0.1) 0%, rgba(255,255,255,0.96) 36%, rgba(249,115,22,0.09) 100%)',
        })}
      >
        <CardContent sx={{ p: { xs: 2.25, sm: 2.75, md: 4 } }}>
          <Stack spacing={{ xs: 2.25, md: 3 }} component="form" onSubmit={handleSubmit} noValidate>
            <Typography variant="h3" component="h2" sx={{ fontSize: { xs: '1.65rem', sm: '1.85rem', md: '2.3rem' } }}>
              Contact Me
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.92rem', md: '0.95rem' } }}>
              Share a bit about your project or role, and I will respond with next steps.
            </Typography>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1.5, md: 2 }}>
              <TextField
                size="small"
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
                fullWidth
                required
              />
              <TextField
                size="small"
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
                fullWidth
                required
              />
            </Stack>

            <TextField
              size="small"
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              fullWidth
              required
            />

            <TextField
              size="small"
              label="Phone Number"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              fullWidth
              inputProps={{ maxLength: 14 }}
            />

            <TextField
              label={
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6 }}>
                  Message
                  <Tooltip title="Include project scope, timeline, and what success looks like." placement="top">
                    <InfoOutlined sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                  </Tooltip>
                </Box>
              }
              name="message"
              value={values.message}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={4}
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1.25, sm: 2 }}>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit'}
              </Button>
              <Button
                type="button"
                variant="outlined"
                component="a"
                href={appointmentUrl || '#'}
                target="_blank"
                rel="noreferrer"
                disabled={!appointmentUrl}
              >
                Schedule a 15-Minute Call
              </Button>
            </Stack>

            {!appointmentUrl && (
              <Alert severity="warning">
                Add VITE_GOOGLE_CALENDAR_APPOINTMENT_URL to your .env file to enable call booking.
              </Alert>
            )}

            {submitState.type === 'success' && (
              <Alert severity="success" sx={{ alignItems: 'flex-start' }}>
                <AlertTitle>Message Sent</AlertTitle>
                {submitState.message}
              </Alert>
            )}

            {submitState.type === 'error' && <Alert severity="error">{submitState.message}</Alert>}
          </Stack>
        </CardContent>
      </Card>
    </RevealOnScroll>
  )
}

export default ContactPage

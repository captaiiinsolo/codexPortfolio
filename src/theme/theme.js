import { createTheme } from '@mui/material/styles'

function createAppTheme(mode = 'light') {
  const isDark = mode === 'dark'

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#2dd4bf' : '#0f766e',
        light: '#5eead4',
        dark: '#115e59',
      },
      secondary: {
        main: '#f97316',
      },
      background: {
        default: isDark ? '#020617' : '#f3f4f6',
        paper: isDark ? '#0f172a' : '#ffffff',
      },
      text: {
        primary: isDark ? '#e2e8f0' : '#0f172a',
        secondary: isDark ? '#94a3b8' : '#334155',
      },
      divider: isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(15, 23, 42, 0.12)',
    },
    shape: {
      borderRadius: 16,
    },
    typography: {
      fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
      h1: {
        fontFamily: '"Sora", "Segoe UI", sans-serif',
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontFamily: '"Sora", "Segoe UI", sans-serif',
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontFamily: '"Sora", "Segoe UI", sans-serif',
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        letterSpacing: '0.01em',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            color: isDark ? '#e2e8f0' : '#0f172a',
            background: isDark
              ? 'radial-gradient(circle at 16% 20%, rgba(45, 212, 191, 0.2) 0%, rgba(45, 212, 191, 0) 34%), radial-gradient(circle at 90% 12%, rgba(249, 115, 22, 0.17) 0%, rgba(249, 115, 22, 0) 28%), linear-gradient(180deg, #020617 0%, #0f172a 100%)'
              : 'radial-gradient(circle at 10% 20%, rgba(45, 212, 191, 0.2) 0%, rgba(45, 212, 191, 0) 32%), radial-gradient(circle at 88% 10%, rgba(249, 115, 22, 0.14) 0%, rgba(249, 115, 22, 0) 32%), linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
            transition: 'background-color 260ms ease, color 260ms ease',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 18,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: isDark ? '1px solid rgba(148, 163, 184, 0.18)' : '1px solid rgba(15, 23, 42, 0.08)',
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.72)' : 'rgba(255, 255, 255, 0.84)',
            backdropFilter: 'blur(8px)',
            boxShadow: isDark
              ? '0 16px 40px -26px rgba(2, 6, 23, 0.9)'
              : '0 16px 40px -26px rgba(15, 23, 42, 0.45)',
            transition: 'transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              borderColor: isDark ? 'rgba(45, 212, 191, 0.44)' : 'rgba(15, 118, 110, 0.32)',
              boxShadow: isDark
                ? '0 24px 48px -28px rgba(2, 6, 23, 0.98)'
                : '0 24px 48px -28px rgba(15, 23, 42, 0.55)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingInline: 20,
            minHeight: 42,
            transition: 'transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            fontWeight: 600,
            transition: 'background-color 180ms ease, color 180ms ease, border-color 180ms ease',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              transition: 'box-shadow 180ms ease, border-color 180ms ease',
            },
            '& .MuiOutlinedInput-root.Mui-focused': {
              boxShadow: isDark ? '0 0 0 4px rgba(45, 212, 191, 0.18)' : '0 0 0 4px rgba(15, 118, 110, 0.12)',
            },
          },
        },
      },
    },
  })
}

export default createAppTheme

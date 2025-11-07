'use client';
import { createTheme } from '@mui/material/styles';

// There is no need to define `light` or `dark` variations as in their absence MUI calculates those variants from the `main` color.
const theme = createTheme({
  cssVariables: true,
  palette: {
    common: { black: '#000', white: '#FFF' },
    primary: {
      main: 'rgba(127, 61, 243, 1)',
      contrastText: '#FFF',
    },
    secondary: {
      main: 'rgba(11, 31, 49, 1)',
      contrastText: '#FFF',
    },
    error: {
      main: 'rgba(204, 51, 77, 1)',
      contrastText: '#FFF',
    },
    warning: {
      main: 'rgba(214, 65, 0, 1)',
      contrastText: '#FFF',
    },
    info: {
      main: 'rgba(79,93, 106, 1)',
      contrastText: '#FFF',
    },
    success: {
      main: 'rgba(0, 138, 33, 1)',
      contrastText: '#FFF',
    },

    grey: {
      50: '#EAECED',
      100: '#CBCFD3',
      200: '#ACB3B9',
      300: '#8D969F',
      400: '#6E7984',
      500: '#4F5D6A',
      600: '#304050',
      700: '#263340',
      800: '#1D2630',
      900: '#131A20',
    },
    text: {
      primary: 'rgba(29, 38, 48, 0.87)',
      secondary: 'rgba(29, 38, 48, 0.6)',
      disabled: 'rgba(29, 38, 48, 0.38)',
    },
    background: {
      paper: '#FFF',
      default: '#F5F6F6',
    },
    action: {
      active: 'rgba(29, 38, 48, 0.54)',
      hover: 'rgba(29, 38, 48, 0.04)',
      selected: 'rgba(29, 38, 48, 0.08)',
      disabled: 'rgba(29, 38, 48, 0.26)',
      disabledBackground: 'rgba(29, 38, 48, 0.12)',
      focus: 'rgba(29, 38, 48, 0.12)',
    }
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: '#CBCFD3',
        },
      },
    },
  },

  typography: {
    fontFamily: 'var(--font-inter)',
    h1: {
      fontSize: 32,
      fontWeight: 700,
      letterSpacing: '-4%',
      lineHeight: '120%',
    },
    h2: {
      fontSize: 30,
      fontWeight: 700,
      letterSpacing: '-4%',
      lineHeight: '115%',
    },
    h3: {
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: '-3%',
      lineHeight: '115%',
    },
    h4: {
      fontSize: 26,
      fontWeight: 500,
      letterSpacing: '-2%',
      lineHeight: '115%',
    },
    h5: {
      fontSize: 24,
      fontWeight: 500,
      letterSpacing: '-2%',
      lineHeight: '115%',
    },
    h6: {
      fontSize: 22,
      textDecoration: 'none',
      fontWeight: 500,
      letterSpacing: '-2%',
      lineHeight: '120%',
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      letterSpacing: '0%',
      lineHeight: '125%',
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
      letterSpacing: '0%',
      lineHeight: '125%',
    },
    subtitle1: {
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: '-2%',
      lineHeight: '24px',
    },
    subtitle2: {
      fontSize: 18,
      fontWeight: 400,
      letterSpacing: '-1%',
      lineHeight: '120%',
    },
    overline: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '8%',
      lineHeight: '135%',
      textCase: 'uppercase',
    },
    button: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '145%',
      letterSpacing: '0%',
    },

    caption: {
      fontSize: 12,
      fontWeight: 400,
      letterSpacing: '2%',
      lineHeight: '133%',
    },
  },
  shape: {
    borderRadius: 4,
  },
  shadows: [
    'none',
    '0px 2px 8px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
    '0px 2px 8px 0px #131A200A, 0px 8px 16px 0px #131A200A, 0px 16px 32px 0px #131A200A, 0px 24px 48px 0px #131A200A',
  ],
})

export default theme

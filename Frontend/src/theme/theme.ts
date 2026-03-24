import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1a1a1a',          // Near black - main text & elements
      light: '#404040',         // Dark gray
      dark: '#000000',          // Pure black
      contrastText: '#fff',
    },
    secondary: {
      main: '#1565c0',          // Dark blue - accent color
      light: '#1976d2',         // Medium blue
      dark: '#0d47a1',          // Very dark blue
      contrastText: '#fff',
    },
    background: {
      default: '#f5f9fb',       // Subtle blue-tinted white
      paper: '#ffffff',         // Pure white
    },
    text: {
      primary: '#1a1a1a',       // Near black text
      secondary: '#717171',     // Medium gray text
    },
    success: {
      main: '#4cae50',          // Professional green
    },
    error: {
      main: '#e53935',          // Professional red
    },
    warning: {
      main: '#fb8c00',          // Professional orange
    },
    info: {
      main: '#1565c0',          // Dark blue for info
    },
    divider: '#bbdefb',         // Light blue dividers
    action: {
      active: '#1565c0',
      hover: '#e3f2fd',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#1a1a1a',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#1a1a1a',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1a1a1a',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1a1a1a',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#1a1a1a',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#1a1a1a',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#1a1a1a',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
      color: '#717171',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          color: '#1a1a1a',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          borderBottom: '3px solid #1565c0',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          border: '1px solid #e0e0e0',
          backgroundColor: '#ffffff',
          borderLeft: '4px solid #1565c0',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(21, 101, 192, 0.15)',
            transition: 'all 0.3s ease',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
          fontSize: '0.95rem',
          fontWeight: 500,
          padding: '8px 20px',
          transition: 'all 0.2s ease',
        },
        containedPrimary: {
          background: '#1a1a1a',
          color: '#fff',
          '&:hover': {
            background: '#000000',
          },
        },
        containedSecondary: {
          background: '#1565c0',
          color: '#fff',
          '&:hover': {
            background: '#0d47a1',
          },
        },
        outlined: {
          borderColor: '#1565c0',
          color: '#1565c0',
          '&:hover': {
            borderColor: '#0d47a1',
            backgroundColor: '#e3f2fd',
          },
        },
        text: {
          color: '#1565c0',
          '&:hover': {
            backgroundColor: '#e3f2fd',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            backgroundColor: '#f5f9fb',
            '&:hover fieldset': {
              borderColor: '#1565c0',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1565c0',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            color: '#717171',
            '&.Mui-focused': {
              color: '#1565c0',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#bbdefb',
        },
        head: {
          backgroundColor: '#e3f2fd',
          fontWeight: 600,
          color: '#1565c0',
          borderColor: '#bbdefb',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#bbdefb',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#1a1a1a',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#e3f2fd',
          color: '#1565c0',
          fontWeight: 500,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#717171',
          '&.Mui-selected': {
            color: '#1565c0',
            borderBottomColor: '#1565c0',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#1565c0',
          cursor: 'pointer',
          '&:hover': {
            color: '#0d47a1',
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#1a1a1a',
          '&:hover': {
            backgroundColor: '#e3f2fd',
          },
        },
        colorPrimary: {
          color: '#1565c0',
          '&:hover': {
            backgroundColor: '#e3f2fd',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-hover': {
            backgroundColor: '#f0f9fb',
          },
        },
      },
    },
  },
});

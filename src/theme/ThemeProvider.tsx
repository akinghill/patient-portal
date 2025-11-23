import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

type ThemeContextValue = {
  mode: PaletteMode;
  toggle: () => void;
};

export const ColorModeContext = createContext<ThemeContextValue>({
  mode: 'light',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggle: () => {},
});

const STORAGE_KEY = 'portal-theme-mode';

export function ThemeProvider({ children }: { children: ReactNode }): JSX.Element {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>('light');

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as PaletteMode | null) ?? null;
    setMode(saved ?? (prefersDark ? 'dark' : 'light'));
  }, [prefersDark]);

  const toggle = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#0466C8' : '#4C9AFF',
          },
          secondary: {
            main: mode === 'light' ? '#7A9E9F' : '#9FD8DF',
          },
          background: {
            default: mode === 'light' ? '#fafafa' : '#0f1115',
            paper: mode === 'light' ? '#ffffff' : '#151922',
          },
        },
        shape: {
          borderRadius: 10,
        },
        typography: {
          fontFamily:
            'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
        },
        components: {
          MuiLink: {
            styleOverrides: {
              root: {
                '&:focus-visible': {
                  outline: '2px solid #4c8bf5',
                  outlineOffset: 2,
                },
              },
            },
          },
          MuiButtonBase: {
            defaultProps: {
              disableRipple: true,
            },
          },
        },
      }),
    [mode],
  );

  const value = useMemo(() => ({ mode, toggle }), [mode, toggle]);

  return (
    <ColorModeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}

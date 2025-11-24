import { StrictMode, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { AppRoutes } from './routes/AppRoutes';
import { ThemeProvider } from './theme/ThemeProvider';
import { MockApolloProvider } from './apollo/MockApolloProvider';

const root = document.getElementById('root')!;

createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <MockApolloProvider>
          <Suspense fallback={null}>
            <AppRoutes />
          </Suspense>
        </MockApolloProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);

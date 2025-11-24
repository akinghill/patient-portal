import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { Suspense, startTransition, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import { ErrorBoundary } from '../components/ErrorBoundary';

const DRAWER_WIDTH_EXPANDED = 240;
const DRAWER_WIDTH_COLLAPSED = 72;

export function MainLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sidebar-collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const [selected, setSelected] = useState<any>('');

  const handleToggle = () => setCollapsed((v) => !v);
  const handleSelect = (href: any) => {
    setSelected(href);
    startTransition(() => {
      navigate(href);
    });
  };

  useEffect(() => {
    try {
      localStorage.setItem('sidebar-collapsed', String(collapsed));
    } catch {}
  }, [collapsed]);

  useEffect(() => {
    const path = location.pathname;
    const id = path === '/' ? '/' : path.replace(/^\//, '');
    setSelected(id);
  }, [location.pathname]);

  const leftOffset = isMobile ? 0 : collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH_EXPANDED;

  return (
    <>
      <Sidebar collapsed={collapsed} onToggleCollapsed={handleToggle} selected={selected} onSelect={handleSelect} />
      <Box
        component="main"
        sx={{
          ml: `${leftOffset}px`,
          p: 3,
        }}
      >
        <ErrorBoundary>
          <Suspense
            fallback={
              <Box display="flex" alignItems="center" justifyContent="center" minHeight={120}>
                <CircularProgress size={24} />
              </Box>
            }
          >
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </Box>
    </>
  );
}

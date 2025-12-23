import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { MainLayout } from '../layouts/MainLayout';

const LoginPage = lazy(() => import('../features/auth/LoginPage'));
const DashboardPage = lazy(() => import('../features/dashboard/DashboardPage'));
const AppointmentsPage = lazy(() => import('../features/appointments/AppointmentsPage'));
const LabResultsPage = lazy(() => import('../features/labs/LabResultsPage'));
const MessagesPage = lazy(() => import('../features/messages/MessagesPage'));

export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="lab-results" element={<LabResultsPage />} />
        <Route path="messages" element={<MessagesPage />} />
      </Route>
    </Routes>
  );
}

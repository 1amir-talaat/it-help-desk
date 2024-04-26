import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import BrowserRouter
import GeneralError from './pages/errors/general-error';
import NotFoundError from './pages/errors/not-found-error';
import MaintenanceError from './pages/errors/maintenance-error';
import SignIn from './pages/auth/sign-in';
import SignUp from './pages/auth/sign-up';
import AppShell from './components/app-shell';
import Dashboard from './pages/dashboard';
import Tickets from '@/pages/tickets';
import Customers from '@/pages/customers';
import Apps from '@/pages/apps';
import Settings from './pages/settings';
import Profile from './pages/settings/profile';
import { useAuth } from "./hooks/use-auth"

const AppRouter = () => {
  const {user} = useAuth();

  console.log(user);

  return (
    <BrowserRouter> {/* Wrap the Router around your Routes */}
      <Routes>
        {/* Auth routes */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Main routes */}
        <Route path="/admin" element={<AppShell /> }>
            <Route index element={<Dashboard />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="apps" element={<Apps />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<Settings />}>
              <Route index element={<Profile />} />
            </Route>
          </Route>
        
        {/* Error routes */}
        <Route path="/500" element={<GeneralError />} />
        <Route path="/404" element={<NotFoundError />} />
        <Route path="/503" element={<MaintenanceError />} />

        {/* Fallback 404 route */}
        <Route path="*" element={<NotFoundError />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

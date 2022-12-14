import React from 'react';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth/pages/LoginPage';
import { CalendarPage } from '../calendar/pages/CalendarPage';
import { useAuthStore } from '../hooks/useAuthStore';

export const AppRouter = () => {
  // const authStatus = 'not-authenticated';

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
      {status === 'authenticated' ? (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login/" />} />
        </>
      )}
    </Routes>
  );
};

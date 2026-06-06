import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntersectObserver from '@/components/common/IntersectObserver';
import { Toaster } from '@/components/ui/sonner';

import { routes } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute, AuthRoute } from './components/common/RouteGuard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <IntersectObserver />
        <Routes>
          {routes.map((route, index) => {
            if (route.public) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <AuthRoute>
                      {route.element}
                    </AuthRoute>
                  }
                />
              );
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <ProtectedRoute requiredRole={route.requiredRole}>
                    {route.element}
                  </ProtectedRoute>
                }
              />
            );
          })}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
};

export default App;

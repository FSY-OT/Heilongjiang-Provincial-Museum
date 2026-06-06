import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { routes } from '../../routes';

interface RouteGuardProps {
  children: React.ReactNode;
}

export function RouteGuard({ children }: RouteGuardProps) {
  return <React.Fragment>{children}</React.Fragment>;
}

export function ProtectedRoute({ children, requiredRole }: { 
  children: React.ReactNode; 
  requiredRole?: 'admin' | 'manager' | 'viewer';
}) {
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole && role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-white mb-2">权限不足</h1>
          <p className="text-slate-400">您没有访问此页面的权限</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-6 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-lg transition-colors"
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

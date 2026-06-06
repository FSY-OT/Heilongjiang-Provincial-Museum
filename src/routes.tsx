import Dashboard from './pages/Dashboard';
import DataManagement from './pages/DataManagement';
import Login from './pages/Login';
import type { ReactNode } from 'react';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  /** Accessible without login. Routes without this flag require authentication. Has no effect when RouteGuard is not in use. */
  public?: boolean;
  /** Required role for this route. Only applies when RouteGuard is in use. */
  requiredRole?: 'admin' | 'manager' | 'viewer';
}

export const routes: RouteConfig[] = [
  {
    name: '登录',
    path: '/login',
    element: <Login />,
    public: true,
  },
  {
    name: '黑龙江博物馆大屏',
    path: '/',
    element: <Dashboard />,
    public: false,
  },
  {
    name: '数据管理中心',
    path: '/data',
    element: <DataManagement />,
    public: false,
    requiredRole: 'admin',
  }
];

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'admin' | 'manager' | 'viewer';

export interface User {
  id: string;
  username: string;
  realName: string;
  role: Role;
  email: string;
  phone: string;
  avatar: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  role: Role | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock用户数据
export const mockUsers: Record<string, { password: string; user: User }> = {
  'admin': {
    password: 'admin123',
    user: {
      id: '1',
      username: 'admin',
      realName: '张管理员',
      role: 'admin',
      email: 'admin@museum.com',
      phone: '13800138001',
      avatar: '👨‍💼'
    }
  },
  'admin2': {
    password: 'admin456',
    user: {
      id: '2',
      username: 'admin2',
      realName: '李主管',
      role: 'admin',
      email: 'admin2@museum.com',
      phone: '13800138002',
      avatar: '👩‍💼'
    }
  },
  'manager': {
    password: 'manager123',
    user: {
      id: '3',
      username: 'manager',
      realName: '王经理',
      role: 'manager',
      email: 'manager@museum.com',
      phone: '13800138003',
      avatar: '👨‍💼'
    }
  },
  'manager2': {
    password: 'manager456',
    user: {
      id: '4',
      username: 'manager2',
      realName: '陈经理',
      role: 'manager',
      email: 'manager2@museum.com',
      phone: '13800138004',
      avatar: '👩‍💼'
    }
  },
  'viewer': {
    password: 'viewer123',
    user: {
      id: '5',
      username: 'viewer',
      realName: '刘访客',
      role: 'viewer',
      email: 'viewer@museum.com',
      phone: '13800138005',
      avatar: '👁️'
    }
  },
  'viewer2': {
    password: 'viewer456',
    user: {
      id: '6',
      username: 'viewer2',
      realName: '赵访客',
      role: 'viewer',
      email: 'viewer2@museum.com',
      phone: '13800138006',
      avatar: '👁️'
    }
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    const userData = mockUsers[username];
    if (userData && userData.password === password) {
      setUser(userData.user);
      localStorage.setItem('museum_user', JSON.stringify(userData.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('museum_user');
  };

  // 初始化时检查本地存储
  React.useEffect(() => {
    const storedUser = localStorage.getItem('museum_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('museum_user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, role: user?.role || null }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import { Button } from '@/components/ui/button';
import TopKPI from './components/TopKPI';
import CoreKPI from './components/CoreKPI';
import CulturalCreative from './components/CulturalCreative';
import Collection from './components/Collection';
import HistoryComparison from './components/HistoryComparison';
import CenterArea from './components/CenterArea';
import PassengerFlow from './components/PassengerFlow';
import Facility from './components/Facility';
import NewsTicker from './components/NewsTicker';
import Clock from './components/Clock';
import { useAuth } from '../../contexts/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, role, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleManageData = () => {
    if (role === 'admin') {
      navigate('/data');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleLabels: Record<string, string> = {
    admin: '管理员',
    manager: '经理',
    viewer: '访客',
  };

  const roleColors: Record<string, string> = {
    admin: 'bg-red-500/20 text-red-400 border-red-500/40',
    manager: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    viewer: 'bg-slate-500/20 text-slate-400 border-slate-500/40',
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏛️</span>
            <span className="text-white font-bold text-lg">黑龙江博物馆智慧运营大屏</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {role === 'admin' && (
            <Button 
              size="sm"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white text-xs px-4 py-1.5 rounded-md shadow-lg shadow-green-500/30 transition-all hover:scale-105 active:scale-95"
              onClick={handleManageData}
              style={{ cursor: 'pointer' }}
            >
              ⚙️ 数据管理
            </Button>
          )}
          
          <div className="relative z-[100]">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
              }}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-300 border ${
                showUserMenu 
                  ? 'bg-gradient-to-r from-sky-600/40 to-blue-600/40 border-sky-400/40 shadow-lg shadow-sky-500/20' 
                  : 'bg-slate-800/70 backdrop-blur-md border-sky-500/20 hover:border-sky-400/40 hover:bg-slate-700/70'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
                showUserMenu ? 'bg-sky-500/30' : 'bg-slate-700/50'
              }`}>
                {user?.avatar || '👤'}
              </div>
              <div className="text-left">
                <div className="text-xs text-white font-semibold leading-tight">{user?.realName}</div>
                <div className={`text-[9px] px-1.5 py-0.5 rounded-full border ${roleColors[role || 'viewer']}`}>
                  {roleLabels[role || 'viewer']}
                </div>
              </div>
              <svg className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showUserMenu && (
              <div ref={userMenuRef} className="absolute right-0 top-full mt-2 w-56 bg-gradient-to-br from-slate-800 to-slate-900 border border-sky-500/30 rounded-2xl shadow-2xl shadow-sky-500/20 overflow-hidden z-[9999]" style={{ position: 'fixed', opacity: 1, background: 'linear-gradient(135deg, rgb(30, 41, 59) 0%, rgb(15, 23, 42) 100%)' }}>
                <div className="p-4 border-b border-slate-700/40 bg-gradient-to-r from-sky-900/30 to-transparent">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 border border-sky-500/30 flex items-center justify-center text-2xl">
                      {user?.avatar || '👤'}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-white font-semibold">{user?.realName}</div>
                      <div className="text-xs text-sky-400">@{user?.username}</div>
                    </div>
                    <div className={`px-2 py-1 text-[10px] rounded-full border ${roleColors[role || 'viewer']}`}>
                      {roleLabels[role || 'viewer']}
                    </div>
                  </div>
                </div>
                <div className="p-3 space-y-1 bg-slate-900">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider px-1 mb-2">个人信息</div>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-700/30 transition-colors">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs text-white">{user?.email || '未设置邮箱'}</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-700/30 transition-colors">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-xs text-white">{user?.phone || '未设置电话'}</span>
                  </div>
                </div>
                <div className="px-3 pb-3 bg-slate-900">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-medium hover:bg-red-500/20 hover:border-red-500/50 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    退出登录
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <Clock />
        </div>
      </div>

      <TopKPI />

      <CoreKPI />

      <div className="dashboard-main">
        <div className="dashboard-left">
          <CulturalCreative />
          <Collection />
          <HistoryComparison />
        </div>

        <div className="dashboard-center">
          <CenterArea />
        </div>

        <div className="dashboard-right">
          <PassengerFlow />
          <Facility />
          {role !== 'viewer' && <NewsTicker />}
        </div>
      </div>
    </div>
  );
}

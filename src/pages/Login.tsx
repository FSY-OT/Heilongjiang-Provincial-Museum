import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemoUsers, setShowDemoUsers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('请输入用户名和密码');
      return;
    }

    setIsLoading(true);
    // 模拟登录延迟
    setTimeout(() => {
      const success = login(username, password);
      if (!success) {
        setError('用户名或密码错误');
      }
      setIsLoading(false);
    }, 500);
  };

  const demoUsers = [
    { username: 'admin', password: 'admin123', role: '管理员', color: 'red' },
    { username: 'admin2', password: 'admin456', role: '管理员', color: 'red' },
    { username: 'manager', password: 'manager123', role: '经理', color: 'blue' },
    { username: 'manager2', password: 'manager456', role: '经理', color: 'blue' },
    { username: 'viewer', password: 'viewer123', role: '访客', color: 'green' },
    { username: 'viewer2', password: 'viewer456', role: '访客', color: 'green' },
  ];

  const handleDemoLogin = (demoUser: typeof demoUsers[0]) => {
    setUsername(demoUser.username);
    setPassword(demoUser.password);
  };

  const roleColorMap: Record<string, string> = {
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
    blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/8 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
        
        {/* 网格背景 */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(rgba(147, 197, 253, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 197, 253, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>
      
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl border border-sky-500/20 rounded-2xl p-8 shadow-2xl shadow-sky-500/10 border-t-sky-500/30">
          {/* Logo区域 */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-sky-500/20 to-blue-500/20 rounded-2xl border border-sky-500/30 flex items-center justify-center text-4xl shadow-lg shadow-sky-500/10">
                🏛️
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-[10px] text-white">✓</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 tracking-wide">黑龙江博物馆</h1>
            <p className="text-sky-400 text-sm">数据可视化管理系统</p>
          </div>

          {/* 登录表单 */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 用户名输入 */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-sky-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                用户名
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="请输入用户名"
                  className="w-full bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:border-sky-500/70 focus:ring-2 focus:ring-sky-500/20 rounded-xl h-12 transition-all"
                  disabled={isLoading}
                />
                {username && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* 密码输入 */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-sky-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                密码
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:border-sky-500/70 focus:ring-2 focus:ring-sky-500/20 rounded-xl h-12 transition-all"
                disabled={isLoading}
              />
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="flex items-start gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* 登录按钮 */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-400 hover:to-blue-400 text-white font-semibold h-12 rounded-xl shadow-lg shadow-sky-500/30 transition-all hover:scale-[1.02] hover:shadow-sky-500/50 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  登录中...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  登录系统
                </span>
              )}
            </Button>
          </form>

          {/* 演示账号区域 */}
          <div className="mt-6">
            <button
              onClick={() => setShowDemoUsers(!showDemoUsers)}
              className="w-full flex items-center justify-center gap-2 text-sky-400 hover:text-sky-300 text-sm transition-colors"
            >
              <svg className={`w-4 h-4 transition-transform ${showDemoUsers ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {showDemoUsers ? '隐藏演示账号' : '查看演示账号'}
            </button>
            
            {showDemoUsers && (
              <div className="mt-4 space-y-2">
                <div className="text-xs text-slate-400 text-center mb-3">点击以下账号快速填充：</div>
                <div className="grid grid-cols-2 gap-2">
                  {demoUsers.map((user, index) => (
                    <button
                      key={index}
                      onClick={() => handleDemoLogin(user)}
                      className="flex flex-col items-center justify-center px-3 py-3 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30 rounded-xl transition-all hover:scale-[1.02] hover:border-sky-500/30"
                    >
                      <span className="text-white text-sm font-medium">{user.username}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full border mt-1 ${roleColorMap[user.color]}`}>
                        {user.role}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 版权信息 */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 text-slate-500 text-xs">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span>系统运行正常</span>
          </div>
          <div className="text-slate-600 text-xs mt-2">
            © 2026 黑龙江博物馆 · 智慧展厅管理系统
          </div>
        </div>
      </div>
    </div>
  );
}

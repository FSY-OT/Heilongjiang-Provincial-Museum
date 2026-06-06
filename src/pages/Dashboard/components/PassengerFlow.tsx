import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, Cell } from 'recharts';
import PanelBox from './PanelBox';
import { useData } from '../../../contexts/DataContext';

export default function PassengerFlow() {
  const { data } = useData();
  
  const passengerFlowData = data.operations.find(op => op.module === '客流高峰');
  const guideServiceData = data.operations.find(op => op.module === '讲解服务');
  const securityData = data.operations.find(op => op.module === '智慧安防');
  const congestionData = data.operations.find(op => op.module === '展厅拥堵排行');
  const environmentData = data.operations.find(op => op.module === '环境监控');

  const hourlyTrend = [
    { hour: '09:00', value: 420 },
    { hour: '10:00', value: 1280 },
    { hour: '11:00', value: 2480 },
    { hour: '12:00', value: 1850 },
    { hour: '13:00', value: 980 },
    { hour: '14:00', value: 1650 },
    { hour: '15:00', value: 2100 },
    { hour: '16:00', value: 1450 },
    { hour: '17:00', value: 820 },
  ];

  const congestionRanking = [
    { name: '自然展厅', value: 85, color: '#ef4444' },
    { name: '冰雪文化区', value: 72, color: '#f59e0b' },
    { name: '鄂伦春展区', value: 65, color: '#8b5cf6' },
    { name: '历史展厅', value: 45, color: '#06b6d4' },
    { name: '艺术展厅', value: 38, color: '#3b82f6' },
  ];

  return (
    <PanelBox title="客流·安防·服务" icon="👥">
      <div className="space-y-2.5 text-[10px]">
        {/* 客流高峰 */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 backdrop-blur-sm border border-blue-500/20 rounded-xl p-2 text-center">
            <div className="text-blue-300 text-[9px] mb-1">峰值时间</div>
            <div className="text-white text-sm font-bold">{passengerFlowData?.detail1?.split(':')[1]?.trim() || '10:30-11:30'}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 backdrop-blur-sm border border-blue-500/20 rounded-xl p-2 text-center">
            <div className="text-blue-300 text-[9px] mb-1">峰值人数</div>
            <div className="text-white text-sm font-bold">{passengerFlowData?.detail2?.split(':')[1]?.trim() || '2,480'}</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900/40 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-2 text-center">
            <div className="text-emerald-300 text-[9px] mb-1">承载量</div>
            <div className="text-white text-sm font-bold">72%</div>
            <div className="text-[8px] text-emerald-400 mt-0.5">{passengerFlowData?.alert || '绿色预警'}</div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/15 rounded-xl p-2">
          <div className="text-[9px] text-blue-300 mb-1 text-center font-medium">今日客流趋势</div>
          <div className="h-[75px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyTrend} margin={{ top: 2, right: 2, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" tick={{ fill: '#94a3b8', fontSize: 7 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '6px',
                    fontSize: '10px',
                    color: '#fff',
                    padding: '6px 10px',
                  }}
                  formatter={(value: number) => [`${value.toLocaleString()} 人`, '客流']}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fill="url(#colorFlow)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 讲解服务 */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-xl p-2 text-center">
            <div className="text-blue-300 text-[9px] mb-1">免费讲解</div>
            <div className="text-white text-sm font-bold">{guideServiceData?.detail1?.split(':')[1]?.trim() || '45场'}</div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-xl p-2 text-center">
            <div className="text-blue-300 text-[9px] mb-1">团队预约</div>
            <div className="text-white text-sm font-bold">{guideServiceData?.detail2?.split(':')[1]?.trim() || '67个'}</div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-xl p-2 text-center">
            <div className="text-blue-300 text-[9px] mb-1">中/英</div>
            <div className="text-white text-sm font-bold">38/7</div>
          </div>
        </div>

        {/* 智慧安防 */}
        <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/20 backdrop-blur-sm border border-emerald-500/25 rounded-xl p-2.5">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-emerald-300 text-[9px]">监控点位: {securityData?.detail1?.split(':')[1]?.trim() || '368个'}</div>
              <div className="text-emerald-300 text-[9px]">巡更记录: {securityData?.detail2?.split(':')[1]?.trim() || '24次'}</div>
            </div>
            <div className="text-right">
              <div className="text-emerald-400 font-bold text-sm">{securityData?.alert || '正常'}</div>
              <div className="text-emerald-300/70 text-[8px]">自检: 全部通过</div>
            </div>
          </div>
        </div>

        {/* 展厅拥堵排行 */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-red-500/15 rounded-xl p-2">
          <div className="text-red-300 text-[9px] mb-1.5 font-medium">展厅拥堵排行</div>
          <div className="h-[75px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={congestionRanking} layout="vertical" margin={{ left: 0, right: 8, top: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={60} tick={{ fill: '#94a3b8', fontSize: 7 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '6px',
                    fontSize: '10px',
                    color: '#fff',
                    padding: '6px 10px',
                  }}
                  formatter={(value: number) => [`拥挤度: ${value}%`, '']}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={10}>
                  {congestionRanking.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 环境监控 */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/40 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-2 text-center">
            <div className="text-cyan-300 text-[9px] mb-1">温度</div>
            <div className="text-white text-sm font-bold">{environmentData?.detail1?.split(':')[1]?.trim() || '22.5°C'}</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/40 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-2 text-center">
            <div className="text-cyan-300 text-[9px] mb-1">湿度</div>
            <div className="text-white text-sm font-bold">{environmentData?.detail2?.split(':')[1]?.trim() || '51%'}</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/40 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-2 text-center">
            <div className="text-cyan-300 text-[9px] mb-1">光照</div>
            <div className="text-white text-sm font-bold">≤50 lux</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900/40 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-2 text-center">
            <div className="text-emerald-300 text-[9px] mb-1">状态</div>
            <div className="text-emerald-400 text-sm font-bold">达标</div>
          </div>
        </div>
      </div>
    </PanelBox>
  );
}

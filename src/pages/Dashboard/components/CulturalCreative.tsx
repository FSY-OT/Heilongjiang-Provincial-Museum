import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import PanelBox from './PanelBox';
import { useData } from '../../../contexts/DataContext';
import EditModeDialog from './EditModeDialog';
import { Button } from '@/components/ui/button';

const statIcons: Record<string, string> = {
  '总销售额': '💰',
  '爆款单品': '🔥',
  '线上UV': '👁️',
  '散客:团体': '👥',
};

export default function CulturalCreative() {
  const { data } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<Record<string, any> | null>(null);
  
  const salesData = data.culturalProducts.find(p => p.dimension === '总销售额');
  const hotItemData = data.culturalProducts.find(p => p.dimension === '爆款单品');
  const onlineUVData = data.culturalProducts.find(p => p.dimension === '官网/小程序UV');
  const ageData = data.culturalProducts.find(p => p.dimension === '年龄构成');
  const provinceData = data.culturalProducts.find(p => p.dimension === '省外游客');
  
  const rankingData = data.culturalProducts
    .filter(p => p.ranking && p.ranking.includes('.'))
    .slice(0, 4)
    .map((p, index) => {
      const match = p.ranking.match(/(\d+)\.\s*([^\(]+)\s*\(\s*占比\s*(\d+)%\s*\)/);
      return {
        name: match ? match[2].trim() : p.ranking,
        value: match ? parseInt(match[3]) : (35 - index * 5),
        color: ['#3b82f6', '#06b6d4', '#8b5cf6', '#f59e0b'][index],
      };
    });

  const ageGroups = [
    { name: '18-35岁', value: ageData ? parseInt(ageData.trend) : 58, color: '#3b82f6' },
    { name: '36-55岁', value: 28, color: '#06b6d4' },
    { name: '55岁以上', value: 10, color: '#8b5cf6' },
    { name: '18岁以下', value: 4, color: '#f59e0b' },
  ];

  const handleAdd = () => {
    setEditingData(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: Record<string, any>) => {
    setEditingData(item);
    setDialogOpen(true);
  };

  const handleSuccess = () => {
    setDialogOpen(false);
    setEditingData(null);
  };

  const stats = [
    { key: '总销售额', value: salesData?.today || '¥84,230', trend: salesData?.trend || '+12%', positive: true },
    { key: '爆款单品', value: hotItemData?.today || '"铜坐龙"冰箱贴', trend: hotItemData?.trend || '日销526件', positive: true },
    { key: '线上UV', value: onlineUVData?.today || '18,457', trend: onlineUVData?.trend || '-8%', positive: false },
    { key: '散客:团体', value: '65% : 35%', trend: '', positive: true },
  ];

  return (
    <>
      <PanelBox title="文创·电商·流量" icon="🎭">
        <div className="flex justify-end mb-2">
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 hover:shadow-emerald-500/50"
            onClick={handleAdd}
          >
            + 添加数据
          </Button>
        </div>
        
        <div className="space-y-3 text-[10px]">
          {/* 统计卡片 */}
          <div className="grid grid-cols-2 gap-2">
            {stats.map((stat, index) => {
              const colors = [
                'from-blue-900/50 via-slate-900/50 to-cyan-900/30 border-blue-500/30 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)]',
                'from-purple-900/50 via-slate-900/50 to-pink-900/30 border-purple-500/30 hover:border-purple-400/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.25)]',
                'from-emerald-900/50 via-slate-900/50 to-teal-900/30 border-emerald-500/30 hover:border-emerald-400/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]',
                'from-amber-900/50 via-slate-900/50 to-orange-900/30 border-amber-500/30 hover:border-amber-400/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]',
              ];
              return (
                <div 
                  key={stat.key}
                  className={`relative bg-gradient-to-br ${colors[index]} backdrop-blur-md rounded-xl p-3 transition-all duration-300 group overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-white/80 text-[9px] font-semibold tracking-wide">{stat.key}</span>
                      <span className="text-xl drop-shadow-lg">{statIcons[stat.key] || '📊'}</span>
                    </div>
                    <div className="text-white text-lg font-bold leading-tight truncate drop-shadow">
                      {stat.value}
                    </div>
                    {stat.trend && (
                      <div className={`text-[10px] mt-1 font-medium ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {stat.trend}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleEdit({ dimension: stat.key, today: stat.value, trend: stat.trend })}
                    className="absolute top-1.5 right-1.5 text-xs text-white/60 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                    title="编辑"
                  >
                    ✏️
                  </button>
                </div>
              );
            })}
          </div>

          {/* 图表区域 */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-md border border-purple-500/20 rounded-xl p-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              <div className="relative">
                <div className="text-[9px] text-purple-300 text-center mb-1.5 font-semibold tracking-wide">热门商品排行</div>
                <div className="h-[85px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={rankingData}
                        cx="50%"
                        cy="50%"
                        innerRadius={24}
                        outerRadius={42}
                        dataKey="value"
                        stroke="none"
                        label={({ value }) => `${value}%`}
                        labelLine={false}
                        fontSize={7}
                        fill="#8884d8"
                      >
                        {rankingData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.95)',
                          border: '1px solid rgba(168, 85, 247, 0.4)',
                          borderRadius: '8px',
                          fontSize: '10px',
                          color: '#fff',
                          padding: '8px 12px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* 图例 */}
                <div className="flex flex-wrap justify-center gap-x-2 gap-y-0.5 mt-1">
                  {rankingData.map((item, index) => (
                    <div key={index} className="flex items-center gap-0.5">
                      <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                      <span className="text-[8px] text-white/70 truncate max-w-[35px]">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-md border border-cyan-500/20 rounded-xl p-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              <div className="relative">
                <div className="text-[9px] text-cyan-300 text-center mb-1.5 font-semibold tracking-wide">游客年龄构成</div>
                <div className="h-[85px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ageGroups} layout="vertical" margin={{ left: 0, right: 4, top: 0, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={50} tick={{ fill: '#a1a1aa', fontSize: 7 }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.95)',
                          border: '1px solid rgba(34, 211, 238, 0.4)',
                          borderRadius: '8px',
                          fontSize: '10px',
                          color: '#fff',
                          padding: '8px 12px',
                        }}
                        formatter={(value: number) => [`${value}%`, '占比']}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={9}>
                        {ageGroups.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* 省外游客信息 */}
          <div className="bg-gradient-to-r from-emerald-900/40 via-slate-900/50 to-teal-900/30 backdrop-blur-md border border-emerald-500/30 rounded-xl p-3 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none" />
            <div className="relative">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl drop-shadow-lg">🌍</span>
                  <div>
                    <div className="text-emerald-300 text-[9px] font-semibold tracking-wide">省外游客占比</div>
                    <div className="text-emerald-400/70 text-[8px]">Visitor from other provinces</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white text-xl font-bold drop-shadow">{provinceData?.today || '48%'}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50 animate-pulse"></span>
                <span className="text-[9px] text-white/70 truncate">主要来源: {provinceData?.trend || '吉林、辽宁、广东'}</span>
              </div>
            </div>
          </div>
        </div>
      </PanelBox>

      <EditModeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        dataType="kpi"
        data={editingData}
        onSuccess={handleSuccess}
      />
    </>
  );
}

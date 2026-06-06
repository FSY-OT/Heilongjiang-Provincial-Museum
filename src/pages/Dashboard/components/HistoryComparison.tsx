import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import PanelBox from './PanelBox';
import { useData } from '../../../contexts/DataContext';
import EditModeDialog from './EditModeDialog';
import { Button } from '@/components/ui/button';

export default function HistoryComparison() {
  const { data } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<Record<string, any> | null>(null);
  
  const weeklyVisitorTrend = [
    { day: '周一', visitors: 5200, sales: 68000 },
    { day: '周二', visitors: 4800, sales: 62000 },
    { day: '周三', visitors: 5100, sales: 65000 },
    { day: '周四', visitors: 5300, sales: 71000 },
    { day: '周五', visitors: 5800, sales: 78000 },
    { day: '周六', visitors: 6820, sales: 84230 },
    { day: '周日', visitors: 6500, sales: 82000 },
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

  return (
    <>
      <PanelBox title="历史对比与预警" icon="📊">
        <div className="flex justify-end mb-2">
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 hover:shadow-cyan-500/50"
            onClick={handleAdd}
          >
            + 添加统计
          </Button>
        </div>
        <div className="space-y-2.5 text-[10px]">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/15 rounded-xl p-2">
            <div className="flex justify-center gap-4 mb-1">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-[8px] text-slate-400">入馆人次</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span className="text-[8px] text-slate-400">文创销售</span>
              </div>
            </div>
            <div className="h-[65px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyVisitorTrend} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 8 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '6px',
                      fontSize: '10px',
                      color: '#fff',
                      padding: '6px 10px',
                    }}
                    formatter={(value: number, name: string) => {
                      const label = name === 'visitors' ? '入馆人次' : '文创销售';
                      return [`${value.toLocaleString()}`, label];
                    }}
                  />
                  <Line type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2, fill: '#3b82f6' }} activeDot={{ r: 4, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="sales" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2, fill: '#f59e0b' }} activeDot={{ r: 4, fill: '#f59e0b', stroke: '#fff', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 overflow-y-auto pr-1 custom-scrollbar" style={{ maxHeight: '150px' }}>
            {data.visitorStats.map((item) => (
              <div key={item.id} className="p-2 rounded-lg bg-gradient-to-r from-slate-800/40 to-slate-900/30 border border-slate-700/30 hover:border-cyan-500/20 transition-all group">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sky-200 font-medium text-[10px]">{item.item}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-bold text-sm">{item.today}</span>
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-xs text-blue-400 hover:text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="编辑"
                    >
                      ✏️
                    </button>
                  </div>
                </div>
                <div className="flex justify-between text-[9px]">
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-medium ${item.wow.startsWith('+') ? 'bg-emerald-500/20 text-emerald-400' : item.wow.startsWith('-') ? 'bg-red-500/20 text-red-400' : 'bg-slate-700/30 text-slate-400'}`}>
                    环比: {item.wow}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-medium ${item.yoy.startsWith('+') ? 'bg-emerald-500/20 text-emerald-400' : item.yoy.startsWith('-') ? 'bg-red-500/20 text-red-400' : 'bg-slate-700/30 text-slate-400'}`}>
                    同比: {item.yoy}
                  </span>
                </div>
                {item.insight && (
                  <div className="text-[8px] text-slate-500 mt-1 truncate">{item.insight}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </PanelBox>

      <EditModeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        dataType="visitor"
        data={editingData}
        onSuccess={handleSuccess}
      />
    </>
  );
}

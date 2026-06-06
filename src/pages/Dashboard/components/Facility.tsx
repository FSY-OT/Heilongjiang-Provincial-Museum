import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import PanelBox from './PanelBox';
import { useData } from '../../../contexts/DataContext';
import EditModeDialog from './EditModeDialog';
import { Button } from '@/components/ui/button';

export default function Facility() {
  const { data } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<Record<string, any> | null>(null);
  
  const usageData = [
    { name: '直饮水', usage: 98.5, target: 100 },
    { name: '轮椅', usage: 85, target: 100 },
    { name: '导览器', usage: 92, target: 100 },
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
      <PanelBox title="设备·能源·应急" icon="⚙️">
        <div className="flex justify-end mb-2">
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-400 hover:to-violet-400 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg shadow-purple-500/30 transition-all hover:scale-105 hover:shadow-purple-500/50"
            onClick={handleAdd}
          >
            + 添加设备
          </Button>
        </div>
        <div className="space-y-2 text-[10px]">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/15 rounded-xl p-2">
            <div className="h-[70px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 8 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      borderRadius: '6px',
                      fontSize: '10px',
                      color: '#fff',
                      padding: '6px 10px',
                    }}
                    formatter={(value: number) => [`${value}%`, '使用率']}
                  />
                  <Bar dataKey="usage" radius={[4, 4, 0, 0]} barSize={20}>
                    <Cell fill="#8b5cf6" />
                    <Cell fill="#a855f7" />
                    <Cell fill="#d946ef" />
                  </Bar>
                  <Bar dataKey="target" fill="rgba(148, 163, 184, 0.15)" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 max-h-[100px] overflow-y-auto pr-1 custom-scrollbar">
            {data.facilities.map((item) => (
              <div key={item.id} className="p-2 rounded-lg bg-gradient-to-r from-slate-800/40 to-slate-900/30 border border-slate-700/30 hover:border-purple-500/20 transition-all group">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sky-200 font-medium">{item.name}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-bold text-sm">{item.todayUsage}</span>
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-xs text-blue-400 hover:text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="编辑"
                    >
                      ✏️
                    </button>
                  </div>
                </div>
                <div className="flex justify-between text-[9px] text-slate-400">
                  {item.monthlyUsage !== '-' && <span>本月: {item.monthlyUsage}</span>}
                  {item.fault !== '-' && (
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-medium ${item.fault.includes('损坏') || item.fault.includes('需维保') ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {item.fault}
                    </span>
                  )}
                </div>
                {item.carbon !== '-' && (
                  <div className="text-[8px] text-emerald-400 mt-0.5 flex items-center gap-1">
                    <span>🌱</span>
                    {item.carbon}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </PanelBox>

      <EditModeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        dataType="facility"
        data={editingData}
        onSuccess={handleSuccess}
      />
    </>
  );
}

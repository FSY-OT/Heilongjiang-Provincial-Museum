import { useState } from 'react';
import { useData } from '../../../contexts/DataContext';
import EditModeDialog from './EditModeDialog';

const kpiIcons: Record<string, string> = {
  '馆藏总资产': '🏛️',
  '今日总预约': '📅',
  '年累计客流': '📊',
  '安全无故障': '✅',
  '环境达标率': '🌡️',
  '历史最高客流': '🏆',
};

export default function TopKPI() {
  const { data } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<Record<string, any> | null>(null);

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
      <div className="grid grid-cols-6 gap-3 px-4 py-3">
        {data.kpis.map((kpi) => (
          <div
            key={kpi.dimension}
            className="kpi-card flex flex-col items-center justify-center text-center px-3 py-3 relative group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-sky-500/15 rounded-xl transition-all hover:border-sky-500/30 hover:shadow-[0_0_15px_rgba(56,189,248,0.12)]"
          >
            <div className="text-xl mb-1.5">{kpiIcons[kpi.dimension] || '📊'}</div>
            <div className="text-[9px] text-sky-300 mb-1 font-medium tracking-wide">{kpi.dimension}</div>
            <div className="text-xl font-bold text-white leading-tight tabular-nums drop-shadow-lg">
              {kpi.value}
            </div>
            <div className="text-[8px] text-slate-400 mt-0.5">{kpi.unit}</div>
            <div className="text-[8px] text-emerald-400 mt-1 leading-tight">{kpi.trend}</div>
            {kpi.comparedToYesterday && kpi.comparedToYesterday !== '-' && (
              <div
                className={`text-[8px] mt-0.5 ${
                  kpi.comparedToYesterday.startsWith('+')
                    ? 'text-emerald-400'
                    : kpi.comparedToYesterday.startsWith('-')
                    ? 'text-red-400'
                    : 'text-sky-300'
                }`}
              >
                {kpi.comparedToYesterday}
              </div>
            )}
            <button
              onClick={() => handleEdit(kpi)}
              className="absolute top-1.5 right-1.5 text-xs text-blue-400 hover:text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity"
              title="编辑"
            >
              ✏️
            </button>
          </div>
        ))}
      </div>

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

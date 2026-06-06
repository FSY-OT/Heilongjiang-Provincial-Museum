import { useState, useEffect, useRef } from 'react';
import { useData } from '../../../contexts/DataContext';
import EditModeDialog from './EditModeDialog';
import type { CoreKPI } from '../../../contexts/DataContext';
import { loadCoreKPIs } from '../../../services/kpiService';

const kpiIcons: Record<string, string> = {
  '收入': '💰',
  '支出': '',
  '客流': '',
  '转化率': '',
  '满意度': '⭐',
  '复购率': '',
  '默认': '',
};

export default function CoreKPI() {
  const { data, updateCoreKPIs } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<CoreKPI | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const kpis = await loadCoreKPIs();
        if (kpis.length > 0) {
          updateCoreKPIs(kpis);
        }
      } catch (error) {
        console.error('加载 KPI 数据失败:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (data.coreKPIs.length <= 4) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % (data.coreKPIs.length - 3));
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [data.coreKPIs.length]);

  const handleEdit = (item: CoreKPI) => {
    setEditingData(item);
    setDialogOpen(true);
  };

  const handleSuccess = () => {
    setDialogOpen(false);
    setEditingData(null);
  };

  if (data.coreKPIs.length === 0) {
    return null;
  }

  const visibleKPIs = data.coreKPIs.slice(currentIndex, currentIndex + 4);

  return (
    <>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white tracking-wide">核心经营指标</h3>
          <button
            onClick={() => handleEdit({ id: 0, dimension: '', value: '', unit: '', comparedToYesterday: '', trend: '' } as CoreKPI)}
            className="text-xs bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-3 py-1.5 rounded-lg transition-all shadow-lg shadow-blue-500/20"
          >
            + 添加指标
          </button>
        </div>

        <div ref={scrollRef} className="grid grid-cols-4 gap-3">
          {visibleKPIs.map((kpi) => (
            <div
              key={kpi.id}
              className="relative group bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-md border border-blue-500/20 rounded-xl p-3 overflow-hidden transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              <div className="relative">
                <div className="text-2xl mb-1.5 drop-shadow-lg">{kpiIcons[kpi.dimension] || kpiIcons['默认']}</div>
                <div className="text-[9px] text-blue-300 mb-1 font-semibold tracking-wide truncate">{kpi.dimension}</div>
                <div className="text-xl font-bold text-white leading-tight tabular-nums drop-shadow">
                  {kpi.value}
                </div>
                <div className="text-[8px] text-white/60 mt-0.5">{kpi.unit}</div>
                {kpi.trend && (
                  <div className={`text-[8px] mt-1 font-medium ${
                    kpi.trend.startsWith('+') ? 'text-emerald-400' :
                    kpi.trend.startsWith('-') ? 'text-red-400' :
                    'text-sky-300'
                  }`}>
                    {kpi.trend}
                  </div>
                )}
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
              </div>
              <button
                onClick={() => handleEdit(kpi)}
                className="absolute top-1.5 right-1.5 text-xs text-white/60 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                title="编辑"
              >
                ✏️
              </button>
            </div>
          ))}
        </div>

        {data.coreKPIs.length > 4 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {Array.from({ length: data.coreKPIs.length - 3 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-blue-500 w-3'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`查看第${index + 1}组数据`}
              />
            ))}
          </div>
        )}
      </div>

      <EditModeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        dataType="coreKPI"
        data={editingData}
        onSuccess={handleSuccess}
      />
    </>
  );
}

import { useEffect, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import PanelBox from './PanelBox';
import { useData } from '../../../contexts/DataContext';
import EditModeDialog from './EditModeDialog';
import { Button } from '@/components/ui/button';

export default function Collection() {
  const { data } = useData();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<Record<string, any> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      currentIndexRef.current = (currentIndexRef.current + 1) % data.collections.length;
      setCurrentIndex(currentIndexRef.current);
      
      if (scrollRef.current) {
        const children = scrollRef.current.children;
        const nextIndex = currentIndexRef.current;
        const element = children[nextIndex] as HTMLElement;
        if (element) {
          const container = scrollRef.current;
          const elementTop = element.offsetTop;
          const containerTop = container.scrollTop;
          const containerHeight = container.clientHeight;
          const elementHeight = element.offsetHeight;
          
          if (elementTop < containerTop || elementTop + elementHeight > containerTop + containerHeight) {
            container.scrollTo({
              top: elementTop - 10,
              behavior: 'smooth'
            });
          }
        }
      }
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data.collections.length]);

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
      <PanelBox title="馆藏·文物·保护" icon="🏛️">
        <div className="flex justify-end mb-2">
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-blue-500/50"
            onClick={handleAdd}
          >
            + 添加文物
          </Button>
        </div>
        <div className="space-y-2 text-[10px]">
          <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-md border border-blue-500/20 rounded-xl p-3 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            <div className="relative">
              <div className="text-[9px] text-blue-300 text-center mb-2 font-semibold tracking-wide">藏品数量统计</div>
              <div className="h-[95px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.collections.slice(0, 4)} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <XAxis dataKey="category" tick={{ fill: '#a1a1aa', fontSize: 7.5 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        border: '1px solid rgba(59, 130, 246, 0.4)',
                        borderRadius: '8px',
                        fontSize: '10px',
                        color: '#fff',
                        padding: '8px 12px',
                      }}
                      formatter={(value: number, name: string) => {
                        const label = name === 'total' ? '总数量' : name === 'onDisplay' ? '展出' : name === 'level1' ? '一级文物' : name;
                        return [`${value.toLocaleString()}`, label];
                      }}
                    />
                    <Bar dataKey="total" name="total" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={14}>
                      {data.collections.slice(0, 4).map((_, index) => (
                        <Cell key={`total-${index}`} fill={['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'][index]} />
                      ))}
                    </Bar>
                    <Bar dataKey="onDisplay" name="onDisplay" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={14}>
                      {data.collections.slice(0, 4).map((_, index) => (
                        <Cell key={`display-${index}`} fill={['#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc'][index]} />
                      ))}
                    </Bar>
                    <Bar dataKey="level1" name="level1" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={14}>
                      {data.collections.slice(0, 4).map((_, index) => (
                        <Cell key={`level-${index}`} fill={['#f59e0b', '#fbbf24', '#fcd34d', '#fde68a'][index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1 custom-scrollbar">
            {data.collections.map((item, index) => {
              const colors = ['#3b82f6', '#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981'];
              return (
                <div
                  key={item.id}
                  className={`relative flex items-center gap-2.5 py-2 px-2.5 rounded-xl border transition-all duration-500 group overflow-hidden ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-blue-900/50 via-slate-900/50 to-cyan-900/30 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.25)]'
                      : 'bg-gradient-to-r from-slate-800/40 to-slate-900/30 border-slate-700/40 hover:border-blue-500/30 hover:bg-slate-800/60'
                  }`}
                >
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
                  )}
                  <div className="relative">
                    <div 
                      className="w-2 h-6 rounded-full flex-shrink-0 shadow-md" 
                      style={{ 
                        backgroundColor: colors[index % 6],
                        boxShadow: index === currentIndex ? `0 0 8px ${colors[index % 6]}40` : 'none'
                      }} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className={`font-semibold truncate ${index === currentIndex ? 'text-white' : 'text-white/80'}`}>
                        {item.category}
                      </span>
                      <span className="text-white font-bold text-sm tabular-nums drop-shadow">
                        {typeof item.total === 'number' ? item.total.toLocaleString() : item.total}件
                      </span>
                    </div>
                    <div className="flex justify-between text-[9px] text-white/60">
                      <span>展出: {typeof item.onDisplay === 'number' ? item.onDisplay.toLocaleString() : item.onDisplay}</span>
                      <span className="text-amber-400">一级: {item.level1}</span>
                    </div>
                    {item.note && (
                      <div className="text-[8px] text-white/50 truncate mt-0.5">{item.note}</div>
                    )}
                  </div>
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-xs text-white/60 hover:text-white opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                    title="编辑"
                  >
                    ✏️
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </PanelBox>

      <EditModeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        dataType="collection"
        data={editingData}
        onSuccess={handleSuccess}
      />
    </>
  );
}
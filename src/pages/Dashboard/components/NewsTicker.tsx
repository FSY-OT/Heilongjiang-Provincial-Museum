import { useEffect, useRef, useState } from 'react';
import PanelBox from './PanelBox';
import { useData } from '../../../contexts/DataContext';
import EditModeDialog from './EditModeDialog';
import { Button } from '@/components/ui/button';

export default function NewsTicker() {
  const { data } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<Record<string, any> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.newsTicker.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data.newsTicker.length]);

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
      <PanelBox title="滚动信息" icon="📢">
        <div className="flex justify-end mb-3">
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg shadow-orange-500/30 transition-all hover:scale-105 hover:shadow-orange-500/50"
            onClick={handleAdd}
          >
            + 添加信息
          </Button>
        </div>
        <div className="flex flex-col gap-2 h-[calc(100%-40px)]">
          {data.newsTicker.map((news, index) => (
            <div
              key={news.id}
              className={`flex-1 min-h-[60px] p-3 rounded-xl border transition-all duration-500 group ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-amber-900/40 to-orange-900/30 border-amber-500/40 shadow-[0_0_15px_rgba(249,115,22,0.2)]'
                  : 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/40 hover:border-amber-500/30 hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-400 tabular-nums font-medium">{news.time}</span>
                  <span className="px-2 py-0.5 text-[8px] bg-amber-500/25 text-amber-300 rounded-md font-medium border border-amber-500/20">{news.type}</span>
                </div>
                <button
                  onClick={() => handleEdit(news)}
                  className="text-[10px] text-blue-400 hover:text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="编辑"
                >
                  ✏️
                </button>
              </div>
              <div className="text-[10px] text-slate-200 leading-relaxed font-light">{news.content}</div>
            </div>
          ))}
        </div>
      </PanelBox>

      <EditModeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        dataType="news"
        data={editingData}
        onSuccess={handleSuccess}
      />
    </>
  );
}
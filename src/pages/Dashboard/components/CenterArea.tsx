import { useState } from 'react';

const hotspots = [
  { id: 1, x: 28, y: 45, label: '历史展厅', detail: '展出历史文物 2,140 件' },
  { id: 2, x: 52, y: 35, label: '自然展厅', detail: '猛犸象化石镇馆之宝' },
  { id: 3, x: 65, y: 55, label: '冰雪文化区', detail: '体验式展览 人洔1,680' },
  { id: 4, x: 40, y: 68, label: '少数民族展厅', detail: '赫哲族·鄂伦春族文化' },
  { id: 5, x: 72, y: 40, label: '艺术展厅', detail: '冰雪画派·北大荒版画' },
];

export default function CenterArea() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl border border-sky-500/20">
      {/* 背景图 */}
      <img
        src="https://miaoda-conversation-file.cdn.bcebos.com/user-7wvoy7ho0glc/app-buovwyuyvzlt/20260524/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-05-24%20110544.png"
        alt="黑龙江博物馆航拍"
        className="w-full h-full object-cover"
        style={{ filter: 'brightness(0.7)' }}
      />

      {/* 遮罩层 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/50" />

      {/* 点位标注 */}
      {hotspots.map((spot) => (
        <div
          key={spot.id}
          className="absolute"
          style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div
            className="relative cursor-pointer group"
            onMouseEnter={() => setActiveId(spot.id)}
            onMouseLeave={() => setActiveId(null)}
          >
            {/* 脉冲环 */}
            <div className="absolute inset-0 w-5 h-5 -m-2 rounded-full bg-red-500/30 animate-ping" />
            <div className="absolute inset-0 w-5 h-5 -m-2 rounded-full bg-red-500/20 animate-pulse" />

            {/* 点标 */}
            <div className="relative w-3 h-3 rounded-full bg-red-500 border-2 border-white shadow-lg shadow-red-500/50" />

            {/* 信息卡片 */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap transition-all duration-300 ${
                activeId === spot.id
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
            >
              <div className="bg-slate-900/90 backdrop-blur-sm border border-sky-500/30 rounded-lg px-3 py-2 shadow-xl">
                <div className="text-xs font-bold text-sky-300">{spot.label}</div>
                <div className="text-[10px] text-slate-300">{spot.detail}</div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-slate-900/90 border-r border-b border-sky-500/30 rotate-45" />
            </div>
          </div>
        </div>
      ))}

      {/* 底部说明 */}
      <div className="absolute bottom-3 left-3 right-3 flex justify-center">
        <div className="bg-slate-900/70 backdrop-blur-sm border border-sky-500/20 rounded-lg px-4 py-1.5 text-center">
          <div className="text-xs font-bold text-sky-300">黑龙江省博物馆 · 哪吒文化广场</div>
          <div className="text-[9px] text-slate-400">建筑面积 5.8万㎡ · 展览面积 2.4万㎡ · 年接待能力 200万人次</div>
        </div>
      </div>
    </div>
  );
}

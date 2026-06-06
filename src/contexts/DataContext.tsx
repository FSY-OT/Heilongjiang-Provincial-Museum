import { createContext, useContext, useState, ReactNode } from 'react';

// 定义数据类型
interface VisitorStat {
  id: number;
  item: string;
  today: string;
  wow: string;
  yoy: string;
  insight: string;
}

interface NewsItem {
  id: number;
  time: string;
  type: string;
  content: string;
}

interface Facility {
  id: number;
  name: string;
  todayUsage: string;
  monthlyUsage: string;
  fault: string;
  carbon: string;
}

interface Operation {
  id: number;
  module: string;
  detail1: string;
  detail2: string;
  alert: string;
  trend: 'high' | 'normal' | 'warning';
}

interface Collection {
  id: number;
  category: string;
  total: number;
  onDisplay: number;
  level1: number;
  note: string;
}

interface CulturalProduct {
  id: number;
  module: string;
  dimension: string;
  today: string;
  trend: string;
  ranking: string;
}

interface KPI {
  id: number;
  dimension: string;
  value: string;
  unit: string;
  comparedToYesterday: string;
  trend: string;
}

interface CoreKPI {
  id: number;
  dimension: string;
  value: string;
  unit: string;
  comparedToYesterday: string;
  trend: string;
}

interface DashboardData {
  visitorStats: VisitorStat[];
  newsTicker: NewsItem[];
  facilities: Facility[];
  operations: Operation[];
  collections: Collection[];
  culturalProducts: CulturalProduct[];
  kpis: KPI[];
  coreKPIs: CoreKPI[];
}

interface DataContextType {
  data: DashboardData;
  updateVisitorStats: (data: VisitorStat[]) => void;
  updateNewsTicker: (data: NewsItem[]) => void;
  updateFacilities: (data: Facility[]) => void;
  updateOperations: (data: Operation[]) => void;
  updateCollections: (data: Collection[]) => void;
  updateCulturalProducts: (data: CulturalProduct[]) => void;
  updateKPIs: (data: KPI[]) => void;
  updateCoreKPIs: (data: CoreKPI[]) => void;
}

// 初始数据
const initialData: DashboardData = {
  visitorStats: [
    { id: 1, item: '入馆人次', today: '6,820', wow: '-2.10%', yoy: '+15.40%', insight: '周末效应，外地游客增加' },
    { id: 2, item: '文创收入', today: '¥84,230', wow: '+5.80%', yoy: '+22.10%', insight: '新推出的"铜坐龙"周边带火' },
    { id: 3, item: '团队预约', today: '37团', wow: '-12%', yoy: '+8%', insight: '研学团队减少，旅游团恢复' },
    { id: 4, item: '讲解场次', today: '45场', wow: '-3场', yoy: '+10场', insight: '金牌讲解员轮休影响' },
    { id: 5, item: '馆内停留时长', today: '2.1小时', wow: '持平', yoy: '+0.3小时', insight: '"冰雪展"提升了留客时间' },
  ],
  newsTicker: [
    { id: 1, time: '10:32', type: '新展预告', content: '《黑水文明·黑龙江省古代文物菁华展》将于6月1日开幕' },
    { id: 2, time: '09:45', type: '安全检查', content: '3楼"历史剧场"消防联动测试，10分钟内会有短时警报声' },
    { id: 3, time: '08:30', type: '荣誉通报', content: '荣获"2026年度全国智慧博物馆示范案例"称号' },
    { id: 4, time: '09:00', type: '社教活动', content: '《小小考古家·模拟挖掘猛犸象》活动报名仅剩3个名额' },
  ],
  facilities: [
    { id: 1, name: '直饮水机', todayUsage: '98.5% (流量)', monthlyUsage: '-', fault: '3台需维保', carbon: '-' },
    { id: 2, name: '轮椅/童车', todayUsage: '借出 27次', monthlyUsage: '354次', fault: '1台车胎损坏', carbon: '-' },
    { id: 3, name: '语音导览器', todayUsage: '在线使用 412次', monthlyUsage: '13,050次', fault: '无', carbon: '-' },
    { id: 4, name: '公共能耗', todayUsage: '用电量: 1,207 kWh', monthlyUsage: '预估电费 ¥860', fault: '(与区域电网联动)', carbon: '目标: 节约3%' },
  ],
  operations: [
    { id: 1, module: '客流高峰', detail1: '峰值时间: 10:30-11:30', detail2: '峰值负荷: 2,480人', alert: '绿色预警: 承载量约72%', trend: 'high' },
    { id: 2, module: '讲解服务', detail1: '免费定点讲解: 45场', detail2: '已预约团队: 67个', alert: '今日金牌讲师排满', trend: 'high' },
    { id: 3, module: '智慧安防', detail1: '监控点位: 368个', detail2: '巡更记录: 24次', alert: '正常: 无入侵报警, 无火情', trend: 'normal' },
    { id: 4, module: '展厅拥堵排行', detail1: '1. 自然展厅(猛犸象区)', detail2: '2. 冰雪文化体验区', alert: '3. 鄂伦春族猎马展区', trend: 'warning' },
    { id: 5, module: '环境监控', detail1: '温度: 22.5°C', detail2: '湿度: 51% RH', alert: '光照: ≤50 lux (符合国标)', trend: 'normal' },
  ],
  collections: [
    { id: 1, category: '历史文物', total: 8520, onDisplay: 2140, level1: 156, note: '以"铜坐龙"、"金代官印"为代表' },
    { id: 2, category: '自然标本', total: 5640, onDisplay: 1850, level1: 52, note: '"松花江猛犸象化石"为镇馆之宝' },
    { id: 3, category: '少数民族文物', total: 3110, onDisplay: 870, level1: 18, note: '赫哲族鱼皮衣、鄂伦春桦皮船' },
    { id: 4, category: '艺术藏品', total: 4203, onDisplay: 1050, level1: 2, note: '近代冰雪画派作品、北大荒版画' },
    { id: 5, category: '待修复文物', total: 112, onDisplay: 0, level1: 6, note: '正在进行"纸质文物脱酸处理"' },
    { id: 6, category: '数字藏品', total: 28, onDisplay: 0, level1: 0, note: '超星系列: 冰河时代猛犸象3D模型' },
  ],
  culturalProducts: [
    { id: 1, module: '文创产品', dimension: '总销售额', today: '¥84,230', trend: '+12%', ranking: '1. 猛犸象毛绒玩偶 (占比35%)' },
    { id: 2, module: '文创产品', dimension: '爆款单品', today: '"铜坐龙"冰箱贴', trend: '日销526件', ranking: '2. 冰城雪景书签 (占比28%)' },
    { id: 3, module: '线上访问', dimension: '官网/小程序UV', today: '18,457', trend: '-8%', ranking: '3. 鱼皮工艺品 (占比15%)' },
    { id: 4, module: '线上访问', dimension: '公众号推文', today: '《猛犸象家谱揭秘》', trend: '阅读量10W+', ranking: '4. 金代玉石吊坠 (占比10%)' },
    { id: 5, module: '游客画像', dimension: '年龄构成', today: '18-35岁', trend: '58%', ranking: '散客:团体 = 65%:35%' },
    { id: 6, module: '游客画像', dimension: '省外游客', today: '48%', trend: '主要来自:吉林、辽宁、广东', ranking: '' },
  ],
  kpis: [
    { id: 1, dimension: '馆藏总资产', value: '21,473', unit: '件/套', comparedToYesterday: '12', trend: '稳定增长' },
    { id: 2, dimension: '今日总预约', value: '6,820', unit: '人次', comparedToYesterday: '-3.20%', trend: '略降' },
    { id: 3, dimension: '年累计客流', value: '1,032,674', unit: '人次', comparedToYesterday: '(累计)', trend: '超全年目标 85%' },
    { id: 4, dimension: '安全无故障', value: '2,104', unit: '天', comparedToYesterday: '连续', trend: '安全生产' },
    { id: 5, dimension: '环境达标率', value: '99.7%', unit: '恒温恒湿', comparedToYesterday: '达标', trend: '藏品状态优' },
    { id: 6, dimension: '历史最高客流', value: '9,528', unit: '人次/单日', comparedToYesterday: '-', trend: '2026 年春节' },
  ],
  coreKPIs: [],
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DashboardData>(initialData);

  const updateVisitorStats = (newData: VisitorStat[]) => {
    setData(prev => ({ ...prev, visitorStats: newData }));
  };

  const updateNewsTicker = (newData: NewsItem[]) => {
    setData(prev => ({ ...prev, newsTicker: newData }));
  };

  const updateFacilities = (newData: Facility[]) => {
    setData(prev => ({ ...prev, facilities: newData }));
  };

  const updateOperations = (newData: Operation[]) => {
    setData(prev => ({ ...prev, operations: newData }));
  };

  const updateCollections = (newData: Collection[]) => {
    setData(prev => ({ ...prev, collections: newData }));
  };

  const updateCulturalProducts = (newData: CulturalProduct[]) => {
    setData(prev => ({ ...prev, culturalProducts: newData }));
  };

  const updateKPIs = (newData: KPI[]) => {
    setData(prev => ({ ...prev, kpis: newData }));
  };

  const updateCoreKPIs = (newData: CoreKPI[]) => {
    setData(prev => ({ ...prev, coreKPIs: newData }));
  };

  return (
    <DataContext.Provider
      value={{
        data,
        updateVisitorStats,
        updateNewsTicker,
        updateFacilities,
        updateOperations,
        updateCollections,
        updateCulturalProducts,
        updateKPIs,
        updateCoreKPIs,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export type {
  VisitorStat,
  NewsItem,
  Facility,
  Operation,
  Collection,
  CulturalProduct,
  KPI,
  CoreKPI,
  DashboardData,
};

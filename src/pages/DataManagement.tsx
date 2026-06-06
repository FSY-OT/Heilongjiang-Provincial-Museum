import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useData, VisitorStat, NewsItem, Facility, Operation, Collection, CulturalProduct, KPI } from '../contexts/DataContext';

// 游客统计数据
const initialVisitorStats = [
  { id: 1, item: '入馆人次', today: '6,820', wow: '-2.10%', yoy: '+15.40%', insight: '周末效应，外地游客增加' },
  { id: 2, item: '文创收入', today: '¥84,230', wow: '+5.80%', yoy: '+22.10%', insight: '新推出的"铜坐龙"周边带火' },
  { id: 3, item: '团队预约', today: '37团', wow: '-12%', yoy: '+8%', insight: '研学团队减少，旅游团恢复' },
  { id: 4, item: '讲解场次', today: '45场', wow: '-3场', yoy: '+10场', insight: '金牌讲解员轮休影响' },
  { id: 5, item: '馆内停留时长', today: '2.1小时', wow: '持平', yoy: '+0.3小时', insight: '"冰雪展"提升了留客时间' },
];

// 滚动信息数据
const initialNewsTicker = [
  { id: 1, time: '10:32', type: '新展预告', content: '《黑水文明·黑龙江省古代文物菁华展》将于6月1日开幕' },
  { id: 2, time: '09:45', type: '安全检查', content: '3楼"历史剧场"消防联动测试，10分钟内会有短时警报声' },
  { id: 3, time: '08:30', type: '荣誉通报', content: '荣获"2026年度全国智慧博物馆示范案例"称号' },
  { id: 4, time: '09:00', type: '社教活动', content: '《小小考古家·模拟挖掘猛犸象》活动报名仅剩3个名额' },
];

// 设施服务数据
const initialFacilities = [
  { id: 1, name: '直饮水机', todayUsage: '98.5% (流量)', monthlyUsage: '-', fault: '3台需维保', carbon: '-' },
  { id: 2, name: '轮椅/童车', todayUsage: '借出 27次', monthlyUsage: '354次', fault: '1台车胎损坏', carbon: '-' },
  { id: 3, name: '语音导览器', todayUsage: '在线使用 412次', monthlyUsage: '13,050次', fault: '无', carbon: '-' },
  { id: 4, name: '公共能耗', todayUsage: '用电量: 1,207 kWh', monthlyUsage: '预估电费 ¥860', fault: '(与区域电网联动)', carbon: '目标: 节约3%' },
];

// 运营模块数据
const initialOperations = [
  { id: 1, module: '客流高峰', detail1: '峰值时间: 10:30-11:30', detail2: '峰值负荷: 2,480人', alert: '绿色预警: 承载量约72%', trend: 'high' },
  { id: 2, module: '讲解服务', detail1: '免费定点讲解: 45场', detail2: '已预约团队: 67个', alert: '今日金牌讲师排满', trend: 'high' },
  { id: 3, module: '智慧安防', detail1: '监控点位: 368个', detail2: '巡更记录: 24次', alert: '正常: 无入侵报警, 无火情', trend: 'normal' },
  { id: 4, module: '展厅拥堵排行', detail1: '1. 自然展厅(猛犸象区)', detail2: '2. 冰雪文化体验区', alert: '3. 鄂伦春族猎马展区', trend: 'warning' },
  { id: 5, module: '环境监控', detail1: '温度: 22.5°C', detail2: '湿度: 51% RH', alert: '光照: ≤50 lux (符合国标)', trend: 'normal' },
];

// 藏品类别数据
const initialCollections = [
  { id: 1, category: '历史文物', total: 8520, onDisplay: 2140, level1: 156, note: '以"铜坐龙"、"金代官印"为代表' },
  { id: 2, category: '自然标本', total: 5640, onDisplay: 1850, level1: 52, note: '"松花江猛犸象化石"为镇馆之宝' },
  { id: 3, category: '少数民族文物', total: 3110, onDisplay: 870, level1: 18, note: '赫哲族鱼皮衣、鄂伦春桦皮船' },
  { id: 4, category: '艺术藏品', total: 4203, onDisplay: 1050, level1: 2, note: '近代冰雪画派作品、北大荒版画' },
  { id: 5, category: '待修复文物', total: 112, onDisplay: 0, level1: 6, note: '正在进行"纸质文物脱酸处理"' },
  { id: 6, category: '数字藏品', total: 28, onDisplay: 0, level1: 0, note: '超星系列: 冰河时代猛犸象3D模型' },
];

// 文创产品数据
const initialCulturalProducts = [
  { id: 1, module: '文创产品', dimension: '总销售额', today: '¥84,230', trend: '+12%', ranking: '1. 猛犸象毛绒玩偶 (占比35%)' },
  { id: 2, module: '文创产品', dimension: '爆款单品', today: '"铜坐龙"冰箱贴', trend: '日销526件', ranking: '2. 冰城雪景书签 (占比28%)' },
  { id: 3, module: '线上访问', dimension: '官网/小程序UV', today: '18,457', trend: '-8%', ranking: '3. 鱼皮工艺品 (占比15%)' },
  { id: 4, module: '线上访问', dimension: '公众号推文', today: '《猛犸象家谱揭秘》', trend: '阅读量10W+', ranking: '4. 金代玉石吊坠 (占比10%)' },
  { id: 5, module: '游客画像', dimension: '年龄构成', today: '18-35岁', trend: '58%', ranking: '散客:团体 = 65%:35%' },
  { id: 6, module: '游客画像', dimension: '省外游客', today: '48%', trend: '主要来自:吉林、辽宁、广东', ranking: '' },
];

// 核心KPI数据
const initialKPIs = [
  { id: 1, dimension: '馆藏总资产', value: '21,473', unit: '件/套', comparedToYesterday: '12', trend: '稳定增长' },
  { id: 2, dimension: '今日总预约', value: '6,820', unit: '人次', comparedToYesterday: '-3.20%', trend: '略降' },
  { id: 3, dimension: '年累计客流', value: '1,032,674', unit: '人次', comparedToYesterday: '(累计)', trend: '超全年目标85%' },
  { id: 4, dimension: '安全无故障', value: '2,104', unit: '天', comparedToYesterday: '连续', trend: '安全生产' },
  { id: 5, dimension: '环境达标率', value: '99.7%', unit: '恒温恒湿', comparedToYesterday: '达标', trend: '藏品状态优' },
  { id: 6, dimension: '历史最高客流', value: '9,528', unit: '人次/单日', comparedToYesterday: '-', trend: '2026年春节' },
];

type TableType = 'visitor' | 'news' | 'facility' | 'operation' | 'collection' | 'cultural' | 'kpi';

interface FieldDefinition {
  key: string;
  label: string;
  required: boolean;
  type?: string;
  options?: string[];
}

interface EditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tableType: TableType;
  data: Record<string, any> | null;
  onSave: (data: Record<string, any>) => void;
}

function EditDialog({ open, onOpenChange, tableType, data, onSave }: EditDialogProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const getFields = (): FieldDefinition[] => {
    switch (tableType) {
      case 'visitor':
        return [
          { key: 'item', label: '项目名称', required: true },
          { key: 'today', label: '今日数值', required: true },
          { key: 'wow', label: '周环比', required: false },
          { key: 'yoy', label: '年同比', required: false },
          { key: 'insight', label: '洞察说明', required: false, type: 'textarea' },
        ];
      case 'news':
        return [
          { key: 'time', label: '时间', required: true },
          { key: 'type', label: '类别', required: true },
          { key: 'content', label: '内容', required: true, type: 'textarea' },
        ];
      case 'facility':
        return [
          { key: 'name', label: '设施/服务', required: true },
          { key: 'todayUsage', label: '本日使用', required: true },
          { key: 'monthlyUsage', label: '本月累计', required: false },
          { key: 'fault', label: '故障报修', required: false },
          { key: 'carbon', label: '碳排放(能耗)', required: false },
        ];
      case 'operation':
        return [
          { key: 'module', label: '运营模块', required: true },
          { key: 'detail1', label: '详细数据①', required: true },
          { key: 'detail2', label: '详细数据②', required: false },
          { key: 'alert', label: '实时预警/动态', required: false },
          { key: 'trend', label: '趋势状态', required: false, options: ['high', 'normal', 'warning'] },
        ];
      case 'collection':
        return [
          { key: 'category', label: '藏品类别', required: true },
          { key: 'total', label: '总数量(件)', required: true, type: 'number' },
          { key: 'onDisplay', label: '今日展出', required: true },
          { key: 'level1', label: '一级文物数', required: true },
          { key: 'note', label: '保护评级/备注', required: false, type: 'textarea' },
        ];
      case 'cultural':
        return [
          { key: 'module', label: '数据模块', required: true },
          { key: 'dimension', label: '具体维度', required: true },
          { key: 'today', label: '今日数值', required: true },
          { key: 'trend', label: '7日趋势', required: false },
          { key: 'ranking', label: '热门排行/占比', required: false },
        ];
      case 'kpi':
        return [
          { key: 'dimension', label: '战略维度', required: true },
          { key: 'value', label: '数据值', required: true },
          { key: 'unit', label: '单位/状态', required: true },
          { key: 'comparedToYesterday', label: '同比上日', required: false },
          { key: 'trend', label: '数据趋势', required: false },
        ];
      default:
        return [];
    }
  };

  const handleSubmit = () => {
    const fields = getFields();
    const requiredFields = fields.filter(f => f.required);
    const missingFields = requiredFields.filter(f => !formData[f.key]);
    
    if (missingFields.length > 0) {
      alert(`请填写必填字段：${missingFields.map(f => f.label).join('、')}`);
      return;
    }

    onSave(formData);
    onOpenChange(false);
  };

  const fields = getFields();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-sky-500/30 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-sky-300">
            {data ? '编辑' : '添加'}数据
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4 pr-4">
            {fields.map((field) => (
              <div key={field.key} className="space-y-1">
                <Label htmlFor={field.key} className="text-sky-400 text-xs">
                  {field.label} {field.required && <span className="text-red-400">*</span>}
                </Label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.key}
                    className="w-full p-2 bg-slate-800 border border-sky-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-sky-400 resize-none"
                    rows={3}
                    placeholder={`请输入${field.label}`}
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  />
                ) : field.options ? (
                  <select
                    id={field.key}
                    className="w-full p-2 bg-slate-800 border border-sky-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-sky-400"
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  >
                    <option value="">请选择</option>
                    {field.options.map(opt => (
                      <option key={opt} value={opt}>{opt === 'high' ? '高' : opt === 'normal' ? '正常' : '警告'}</option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id={field.key}
                    type={field.type || 'text'}
                    placeholder={`请输入${field.label}`}
                    className="bg-slate-800 border-sky-500/30 text-white placeholder:text-slate-500 focus:border-sky-400 text-sm"
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <DialogFooter className="flex gap-2 mt-4">
          <Button
            variant="outline"
            className="border-sky-500/50 text-sky-300 hover:bg-sky-500/20 text-sm"
            onClick={() => onOpenChange(false)}
          >
            取消
          </Button>
          <Button
            className="bg-sky-600 hover:bg-sky-500 text-sm"
            onClick={handleSubmit}
          >
            {data ? '保存修改' : '添加数据'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function DataManagement() {
  const { data, updateVisitorStats, updateNewsTicker, updateFacilities, updateOperations, updateCollections, updateCulturalProducts, updateKPIs } = useData();
  
  const [activeTab, setActiveTab] = useState<TableType>('visitor');
  const [visitorStats, setVisitorStats] = useState<VisitorStat[]>(data.visitorStats.length > 0 ? data.visitorStats : initialVisitorStats as VisitorStat[]);
  const [newsTicker, setNewsTicker] = useState<NewsItem[]>(data.newsTicker.length > 0 ? data.newsTicker : initialNewsTicker as NewsItem[]);
  const [facilities, setFacilities] = useState<Facility[]>(data.facilities.length > 0 ? data.facilities : initialFacilities as Facility[]);
  const [operations, setOperations] = useState<Operation[]>(data.operations.length > 0 ? data.operations : initialOperations as Operation[]);
  const [collections, setCollections] = useState<Collection[]>(data.collections.length > 0 ? data.collections : initialCollections as Collection[]);
  const [culturalProducts, setCulturalProducts] = useState<CulturalProduct[]>(data.culturalProducts.length > 0 ? data.culturalProducts : initialCulturalProducts as CulturalProduct[]);
  const [kpis, setKpis] = useState<KPI[]>(data.kpis.length > 0 ? data.kpis : initialKPIs as KPI[]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<Record<string, any> | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'visitor' as TableType, label: '游客统计', icon: '📊' },
    { id: 'news' as TableType, label: '滚动信息', icon: '📢' },
    { id: 'facility' as TableType, label: '设施服务', icon: '🔧' },
    { id: 'operation' as TableType, label: '运营模块', icon: '⚙️' },
    { id: 'collection' as TableType, label: '藏品类别', icon: '🏛️' },
    { id: 'cultural' as TableType, label: '文创产品', icon: '🎁' },
    { id: 'kpi' as TableType, label: '核心KPI', icon: '⭐' },
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'visitor': return visitorStats;
      case 'news': return newsTicker;
      case 'facility': return facilities;
      case 'operation': return operations;
      case 'collection': return collections;
      case 'cultural': return culturalProducts;
      case 'kpi': return kpis;
      default: return [];
    }
  };

  const getTableColumns = () => {
    switch (activeTab) {
      case 'visitor':
        return [
          { key: 'item', label: '对比项' },
          { key: 'today', label: '今日' },
          { key: 'wow', label: '对比上周' },
          { key: 'yoy', label: '对比去年' },
          { key: 'insight', label: '数据解读' },
        ];
      case 'news':
        return [
          { key: 'time', label: '时间' },
          { key: 'type', label: '类别' },
          { key: 'content', label: '内容' },
        ];
      case 'facility':
        return [
          { key: 'name', label: '设施/服务' },
          { key: 'todayUsage', label: '本日使用' },
          { key: 'monthlyUsage', label: '本月累计' },
          { key: 'fault', label: '故障报修' },
          { key: 'carbon', label: '碳排放' },
        ];
      case 'operation':
        return [
          { key: 'module', label: '运营模块' },
          { key: 'detail1', label: '详细数据①' },
          { key: 'detail2', label: '详细数据②' },
          { key: 'alert', label: '实时预警' },
          { key: 'trend', label: '趋势' },
        ];
      case 'collection':
        return [
          { key: 'category', label: '藏品类别' },
          { key: 'total', label: '总数量(件)' },
          { key: 'onDisplay', label: '今日展出' },
          { key: 'level1', label: '一级文物数' },
          { key: 'note', label: '保护评级/备注' },
        ];
      case 'cultural':
        return [
          { key: 'module', label: '数据模块' },
          { key: 'dimension', label: '具体维度' },
          { key: 'today', label: '今日数值' },
          { key: 'trend', label: '7日趋势' },
          { key: 'ranking', label: '热门排行/占比' },
        ];
      case 'kpi':
        return [
          { key: 'dimension', label: '战略维度' },
          { key: 'value', label: '数据值' },
          { key: 'unit', label: '单位/状态' },
          { key: 'comparedToYesterday', label: '同比上日' },
          { key: 'trend', label: '数据趋势' },
        ];
      default:
        return [];
    }
  };

  const handleAdd = () => {
    setEditingData(null);
    setDialogOpen(true);
  };

  const handleEdit = (data: Record<string, any>) => {
    setEditingData(data);
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm('确定要删除这条数据吗？')) return;
    
    switch (activeTab) {
      case 'visitor': {
        const updated = visitorStats.filter(item => item.id !== id);
        setVisitorStats(updated);
        updateVisitorStats(updated);
        break;
      }
      case 'news': {
        const updated = newsTicker.filter(item => item.id !== id);
        setNewsTicker(updated);
        updateNewsTicker(updated);
        break;
      }
      case 'facility': {
        const updated = facilities.filter(item => item.id !== id);
        setFacilities(updated);
        updateFacilities(updated);
        break;
      }
      case 'operation': {
        const updated = operations.filter(item => item.id !== id);
        setOperations(updated);
        updateOperations(updated);
        break;
      }
      case 'collection': {
        const updated = collections.filter(item => item.id !== id);
        setCollections(updated);
        updateCollections(updated);
        break;
      }
      case 'cultural': {
        const updated = culturalProducts.filter(item => item.id !== id);
        setCulturalProducts(updated);
        updateCulturalProducts(updated);
        break;
      }
      case 'kpi': {
        const updated = kpis.filter(item => item.id !== id);
        setKpis(updated);
        updateKPIs(updated);
        break;
      }
    }
  };

  const handleSave = (data: Record<string, any>) => {
    if (editingData) {
      // 编辑模式
      switch (activeTab) {
        case 'visitor': {
          const updated = visitorStats.map(item => item.id === editingData.id ? ({ ...data, id: editingData.id } as VisitorStat) : item);
          setVisitorStats(updated);
          updateVisitorStats(updated);
          break;
        }
        case 'news': {
          const updated = newsTicker.map(item => item.id === editingData.id ? ({ ...data, id: editingData.id } as NewsItem) : item);
          setNewsTicker(updated);
          updateNewsTicker(updated);
          break;
        }
        case 'facility': {
          const updated = facilities.map(item => item.id === editingData.id ? ({ ...data, id: editingData.id } as Facility) : item);
          setFacilities(updated);
          updateFacilities(updated);
          break;
        }
        case 'operation': {
          const updated = operations.map(item => item.id === editingData.id ? ({ ...data, id: editingData.id } as Operation) : item);
          setOperations(updated);
          updateOperations(updated);
          break;
        }
        case 'collection': {
          const updated = collections.map(item => item.id === editingData.id ? ({ ...data, id: editingData.id } as Collection) : item);
          setCollections(updated);
          updateCollections(updated);
          break;
        }
        case 'cultural': {
          const updated = culturalProducts.map(item => item.id === editingData.id ? ({ ...data, id: editingData.id } as CulturalProduct) : item);
          setCulturalProducts(updated);
          updateCulturalProducts(updated);
          break;
        }
        case 'kpi': {
          const updated = kpis.map(item => item.id === editingData.id ? ({ ...data, id: editingData.id } as KPI) : item);
          setKpis(updated);
          updateKPIs(updated);
          break;
        }
      }
    } else {
      // 添加模式
      const newId = Date.now();
      switch (activeTab) {
        case 'visitor': {
          const updated = [...visitorStats, { ...data, id: newId } as VisitorStat];
          setVisitorStats(updated);
          updateVisitorStats(updated);
          break;
        }
        case 'news': {
          const updated = [...newsTicker, { ...data, id: newId } as NewsItem];
          setNewsTicker(updated);
          updateNewsTicker(updated);
          break;
        }
        case 'facility': {
          const updated = [...facilities, { ...data, id: newId } as Facility];
          setFacilities(updated);
          updateFacilities(updated);
          break;
        }
        case 'operation': {
          const updated = [...operations, { ...data, id: newId } as Operation];
          setOperations(updated);
          updateOperations(updated);
          break;
        }
        case 'collection': {
          const updated = [...collections, { ...data, id: newId } as Collection];
          setCollections(updated);
          updateCollections(updated);
          break;
        }
        case 'cultural': {
          const updated = [...culturalProducts, { ...data, id: newId } as CulturalProduct];
          setCulturalProducts(updated);
          updateCulturalProducts(updated);
          break;
        }
        case 'kpi': {
          const updated = [...kpis, { ...data, id: newId } as KPI];
          setKpis(updated);
          updateKPIs(updated);
          break;
        }
      }
    }
    setEditingData(null);
  };

  const currentData = getCurrentData();
  const columns = getTableColumns();
  const filteredData = currentData.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return Object.values(item).some(val => String(val).toLowerCase().includes(query));
  });

  return (
    <div className="dashboard-screen min-h-screen p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">数据管理中心</h1>
        <div className="flex items-center gap-3">
          <Input
            type="text"
            placeholder="搜索数据..."
            className="w-64 bg-slate-800 border-sky-500/30 text-white placeholder:text-slate-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white px-6"
            onClick={handleAdd}
          >
            <span className="mr-2">+</span> 添加数据
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map(tab => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'outline'}
            className={cn(
              'text-sm px-4',
              activeTab === tab.id 
                ? 'bg-sky-600 hover:bg-sky-500' 
                : 'border-sky-500/50 text-sky-300 hover:bg-sky-500/20'
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="mr-1.5">{tab.icon}</span>
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-sky-500/30 rounded-xl shadow-lg shadow-sky-500/5 overflow-hidden">
        <div className="p-3 bg-gradient-to-r from-sky-900/50 to-slate-800/50 flex items-center justify-between border-b border-sky-500/20">
          <span className="text-sky-300 text-sm">
            当前表格：<strong className="text-sky-200">{tabs.find(t => t.id === activeTab)?.label}</strong>
            <span className="ml-2 text-slate-400">({filteredData.length} 条记录)</span>
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-green-500/50 text-green-300 hover:bg-green-500/20 text-xs"
              onClick={handleAdd}
            >
              + 新增
            </Button>
          </div>
        </div>
        <div className="h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
          <Table className="h-full">
            <TableHeader className="bg-gradient-to-r from-slate-800/90 to-slate-700/70 sticky top-0 z-10">
              <TableRow className="border-b border-sky-500/20">
                {columns.map(col => (
                  <TableHead key={col.key} className="text-sky-300 text-xs font-medium px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-sky-400 rounded-full"></span>
                      {col.label}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="text-sky-300 text-xs font-medium w-32 px-4">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-700/30">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <TableRow 
                    key={item.id} 
                    className={`transition-all duration-200 hover:bg-sky-500/10 hover:border-sky-500/30 ${
                      index % 2 === 0 ? 'bg-slate-800/30' : 'bg-slate-900/30'
                    }`}
                  >
                    {columns.map(col => (
                      <TableCell key={col.key} className="text-white text-xs px-4 py-3">
                        {col.key === 'trend' ? (
                          <Badge className={cn(
                            'text-[10px] px-2 py-1',
                            (item as any)[col.key] === 'high' ? 'bg-green-500/25 text-green-400 border border-green-500/30' :
                            (item as any)[col.key] === 'warning' ? 'bg-yellow-500/25 text-yellow-400 border border-yellow-500/30' :
                            'bg-sky-500/25 text-sky-400 border border-sky-500/30'
                          )}>
                            {(item as any)[col.key] === 'high' ? '📈 高' : (item as any)[col.key] === 'warning' ? '⚠️ 警告' : '✅ 正常'}
                          </Badge>
                        ) : (
                          <span className={col.key === 'insight' || col.key === 'content' || col.key === 'note' || col.key === 'ranking' ? 'max-w-sm truncate text-slate-300' : 'text-slate-200'}>
                            {(item as any)[col.key] || '-'}
                          </span>
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="flex gap-1.5 px-4 py-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-500/50 text-blue-300 hover:bg-blue-500/20 text-[10px] px-2 py-1 rounded-md"
                        onClick={() => handleEdit(item)}
                      >
                        ✏️
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/50 text-red-300 hover:bg-red-500/20 text-[10px] px-2 py-1 rounded-md"
                        onClick={() => handleDelete(item.id)}
                      >
                        🗑️
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center py-12 text-slate-500">
                    <div className="text-4xl mb-2">📭</div>
                    <div className="text-sm">暂无数据</div>
                    <Button
                      size="sm"
                      className="mt-3 bg-sky-600 hover:bg-sky-500 text-xs"
                      onClick={handleAdd}
                    >
                      + 添加数据
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <EditDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        tableType={activeTab}
        data={editingData}
        onSave={handleSave}
      />
    </div>
  );
}
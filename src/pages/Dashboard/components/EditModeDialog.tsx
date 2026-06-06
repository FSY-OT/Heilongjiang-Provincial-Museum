import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useData, VisitorStat, NewsItem, Facility, Collection, KPI, CoreKPI } from '../../../contexts/DataContext';

interface EditModeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dataType: string;
  data: Record<string, any> | null;
  onSuccess: () => void;
}

export default function EditModeDialog({ open, onOpenChange, dataType, data, onSuccess }: EditModeDialogProps) {
  const { updateVisitorStats, updateNewsTicker, updateFacilities, updateOperations, updateCollections, updateCulturalProducts, updateKPIs, updateCoreKPIs, data: contextData } = useData();
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (data) {
      setFormData(data);
    } else {
      setFormData({});
    }
  }, [data]);

  const getFields = () => {
    switch (dataType) {
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
      case 'collection':
        return [
          { key: 'category', label: '藏品类别', required: true },
          { key: 'total', label: '总数量(件)', required: true, type: 'number' },
          { key: 'onDisplay', label: '今日展出', required: true },
          { key: 'level1', label: '一级文物数', required: true },
          { key: 'note', label: '保护评级/备注', required: false, type: 'textarea' },
        ];
      case 'kpi':
        return [
          { key: 'dimension', label: '战略维度', required: true },
          { key: 'value', label: '数据值', required: true },
          { key: 'unit', label: '单位/状态', required: true },
          { key: 'comparedToYesterday', label: '同比上日', required: false },
          { key: 'trend', label: '数据趋势', required: false },
        ];
      case 'coreKPI':
        return [
          { key: 'dimension', label: '指标名称', required: true },
          { key: 'value', label: '指标值', required: true },
          { key: 'unit', label: '单位', required: true },
          { key: 'comparedToYesterday', label: '较昨日', required: false },
          { key: 'trend', label: '趋势', required: false },
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

    if (data) {
      // 编辑模式
      switch (dataType) {
        case 'visitor':
          updateVisitorStats(contextData.visitorStats.map(item => item.id === data.id ? { ...formData, id: data.id } as VisitorStat : item));
          break;
        case 'news':
          updateNewsTicker(contextData.newsTicker.map(item => item.id === data.id ? { ...formData, id: data.id } as NewsItem : item));
          break;
        case 'facility':
          updateFacilities(contextData.facilities.map(item => item.id === data.id ? { ...formData, id: data.id } as Facility : item));
          break;
        case 'collection':
          updateCollections(contextData.collections.map(item => item.id === data.id ? { ...formData, id: data.id } as Collection : item));
          break;
        case 'kpi':
          updateKPIs(contextData.kpis.map(item => item.id === data.id ? { ...formData, id: data.id } as KPI : item));
          break;
        case 'coreKPI':
          updateCoreKPIs(contextData.coreKPIs.map(item => item.id === data.id ? { ...formData, id: data.id } as CoreKPI : item));
          break;
      }
    } else {
      // 添加模式
      const newId = Date.now();
      switch (dataType) {
        case 'visitor':
          updateVisitorStats([...contextData.visitorStats, { ...formData, id: newId } as VisitorStat]);
          break;
        case 'news':
          updateNewsTicker([...contextData.newsTicker, { ...formData, id: newId } as NewsItem]);
          break;
        case 'facility':
          updateFacilities([...contextData.facilities, { ...formData, id: newId } as Facility]);
          break;
        case 'collection':
          updateCollections([...contextData.collections, { ...formData, id: newId } as Collection]);
          break;
        case 'kpi':
          updateKPIs([...contextData.kpis, { ...formData, id: newId } as KPI]);
          break;
        case 'coreKPI':
          updateCoreKPIs([...contextData.coreKPIs, { ...formData, id: newId } as CoreKPI]);
          break;
      }
    }

    onOpenChange(false);
    onSuccess();
  };

  const handleDelete = () => {
    if (!data || !confirm('确定要删除这条数据吗？')) return;

    switch (dataType) {
      case 'visitor':
        updateVisitorStats(contextData.visitorStats.filter(item => item.id !== data.id));
        break;
      case 'news':
        updateNewsTicker(contextData.newsTicker.filter(item => item.id !== data.id));
        break;
      case 'facility':
        updateFacilities(contextData.facilities.filter(item => item.id !== data.id));
        break;
      case 'collection':
        updateCollections(contextData.collections.filter(item => item.id !== data.id));
        break;
      case 'kpi':
        updateKPIs(contextData.kpis.filter(item => item.id !== data.id));
        break;
      case 'coreKPI':
        updateCoreKPIs(contextData.coreKPIs.filter(item => item.id !== data.id));
        break;
    }

    onOpenChange(false);
    onSuccess();
  };

  const fields = getFields();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-sky-500/30 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-sky-300">
            {data ? '编辑数据' : '添加数据'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pr-4 max-h-[60vh] overflow-y-auto">
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
        
        <DialogFooter className="flex gap-2 mt-4">
          <Button
            variant="outline"
            className="border-red-500/50 text-red-300 hover:bg-red-500/20 text-sm"
            onClick={handleDelete}
            disabled={!data}
          >
            删除
          </Button>
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

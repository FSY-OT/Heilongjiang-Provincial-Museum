import type { CoreKPI } from '../contexts/DataContext';

/**
 * 从数据库 core_kpi 表加载 KPI 数据
 * 注意：由于这是纯前端项目，实际项目中需要通过 API 调用后端
 * 这里返回示例数据，实际数据需要从数据库同步
 */
export async function loadCoreKPIs(): Promise<CoreKPI[]> {
  try {
    // 在实际项目中，这里应该调用后端 API
    // 例如：const response = await fetch('/api/core-kpis'); return await response.json();
    
    // 当前返回空数组，数据通过 DataManagement 页面管理
    return [];
  } catch (error) {
    console.error('加载 core_kpi 数据失败:', error);
    return [];
  }
}

/**
 * 保存 CoreKPI 数据到数据库
 * 注意：实际项目中需要通过 API 调用后端
 */
export async function saveCoreKPI(kpi: CoreKPI): Promise<void> {
  try {
    // 在实际项目中，这里应该调用后端 API
    // 例如：await fetch('/api/core-kpis', { method: 'POST', body: JSON.stringify(kpi) });
    console.log('保存 KPI 数据:', kpi);
  } catch (error) {
    console.error('保存 core_kpi 数据失败:', error);
    throw error;
  }
}

/**
 * 从数据库删除 CoreKPI 数据
 * 注意：实际项目中需要通过 API 调用后端
 */
export async function deleteCoreKPI(id: number): Promise<void> {
  try {
    // 在实际项目中，这里应该调用后端 API
    // 例如：await fetch(`/api/core-kpis/${id}`, { method: 'DELETE' });
    console.log('删除 KPI 数据:', id);
  } catch (error) {
    console.error('删除 core_kpi 数据失败:', error);
    throw error;
  }
}

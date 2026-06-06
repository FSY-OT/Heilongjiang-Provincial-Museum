// 黑龙江博物馆大屏数据

export const topKPIs = [
  { label: '馆藏总资产', value: '21,473', unit: '件/套', icon: '🏛️', trend: '稳定增长', change: '+12' },
  { label: '今日总预约', value: '6,820', unit: '人次', icon: '📊', trend: '略降', change: '-3.2%' },
  { label: '年累计客流', value: '1,032,674', unit: '人次', icon: '📅', trend: '超全年目标85%', change: '' },
  { label: '安全无故障', value: '2,104', unit: '天', icon: '🛡️', trend: '连续安全生产', change: '' },
  { label: '环境达标率', value: '99.7%', unit: '恒温恒湿', icon: '🌡️', trend: '藏品状态优', change: '达标' },
  { label: '历史最高客流', value: '9,528', unit: '人次/单日', icon: '🎯', trend: '2026年春节', change: '' },
];

export const culturalSales = {
  total: 84230,
  hotItem: '“铜坐龙”冰箱贴',
  hotItemDaily: 526,
  onlineUV: 18457,
  trend: '+12%',
  ranking: [
    { name: '猛犸象毛绒玩偶', value: 35, color: '#3b82f6' },
    { name: '冰城雪景书签', value: 28, color: '#06b6d4' },
    { name: '鱼皮工艺品', value: 15, color: '#8b5cf6' },
    { name: '金代玉石吊坠', value: 10, color: '#f59e0b' },
    { name: '其他', value: 12, color: '#64748b' },
  ],
};

export const visitorProfile = {
  ageGroups: [
    { name: '18-35岁', value: 58, color: '#3b82f6' },
    { name: '36-50岁', value: 22, color: '#06b6d4' },
    { name: '50岁以上', value: 12, color: '#8b5cf6' },
    { name: '18岁以下', value: 8, color: '#f59e0b' },
  ],
  outOfProvince: 48,
  outOfProvinceSources: ['吉林', '辽宁', '广东'],
  individualVsGroup: { individual: 65, group: 35 },
};

export const collectionData = [
  { category: '历史文物', total: 8520, onDisplay: 2140, level1: 156, note: '以“铜坐龙”、“金代官印”为代表' },
  { category: '自然标本', total: 5640, onDisplay: 1850, level1: 52, note: '“松花江猛犸象化石”为镇馆之宝' },
  { category: '少数民族文物', total: 3110, onDisplay: 870, level1: 18, note: '赫哲族鱼皮衣、鄂伦春族桦皮船' },
  { category: '艺术藏品', total: 4203, onDisplay: 1050, level1: 2, note: '近代冰雪画派作品、北大荒版画' },
  { category: '待修复文物', total: 112, onDisplay: 0, level1: 6, note: '正在进行“纸质文物脱酸处理”' },
  { category: '数字藏品', total: 28, onDisplay: 0, level1: 0, note: '超星系列：冰河时代猛犸象3D模型' },
];

export const historyComparison = [
  { item: '入馆人次', today: '6,820', wow: '-2.1%', yoy: '+15.4%', insight: '周末效应，外地游客增加' },
  { item: '文创收入', today: '84,230', wow: '+5.8%', yoy: '+22.1%', insight: '新推出的“铜坐龙”周边带火' },
  { item: '团队预约', today: '37团', wow: '-12%', yoy: '+8%', insight: '研学团队减少，旅游团恢复' },
  { item: '讲解场次', today: '45场', wow: '-3场', yoy: '+10场', insight: '金牌讲解员轮休影响' },
  { item: '馆内停留时长', today: '2.1小时', wow: '持平', yoy: '+0.3小时', insight: '“冰雪展”提升了留客时间' },
];

export const passengerFlow = {
  peakTime: '10:30-11:30',
  peakLoad: 2480,
  loadRate: 72,
  status: '绿色预警',
  hourlyTrend: [
    { hour: '09:00', value: 420 },
    { hour: '10:00', value: 1680 },
    { hour: '11:00', value: 2480 },
    { hour: '12:00', value: 1350 },
    { hour: '13:00', value: 890 },
    { hour: '14:00', value: 1560 },
    { hour: '15:00', value: 1920 },
    { hour: '16:00', value: 1100 },
  ],
};

export const guideService = {
  freeLectures: 45,
  reservedTeams: 67,
  status: '今日金牌讲师排满',
  languages: { chinese: 32, english: 8, other: 5 },
};

export const securityData = {
  cameras: 368,
  patrols: 24,
  status: '正常：无入侵报警，无火情',
  selfCheck: '100%',
};

export const congestionRanking = [
  { name: '自然展厅(猛犸象区)', value: 85, color: '#ef4444' },
  { name: '冰雪文化体验区', value: 72, color: '#f59e0b' },
  { name: '鄂伦春族猎马展区', value: 58, color: '#3b82f6' },
  { name: '历史展厅', value: 45, color: '#06b6d4' },
  { name: '艺术展厅', value: 32, color: '#8b5cf6' },
];

export const environmentData = {
  temperature: 22.5,
  humidity: 51,
  light: '≤50 lux',
  lightStandard: '符合国标',
  status: '恒温恒湿机运行正常',
};

export const facilityData = [
  { name: '直饮水机', usage: '98.5%', monthly: '-', repair: '3台需保维', carbon: '-' },
  { name: '轮椅/童车', usage: '借出 27次', monthly: '354次', repair: '1台车胎损坏', carbon: '-' },
  { name: '语音导览器', usage: '在线使用 412次', monthly: '13,050次', repair: '无', carbon: '-' },
  { name: '公共能耗', usage: '用电量: 1,207 kWh', monthly: '预估电费 ¥860', repair: '与区域电网联动', carbon: '目标: 节约 3%' },
];

export const newsTicker = [
  { time: '10:32', type: '📢 新展预告', content: '《黑水文明·黑龙江省古代文物荃华展》将于 6月1日开幕' },
  { time: '09:45', type: '🚨 安全检查', content: '3楼“历史剧场”消防联动测试，10分钟内会有短时警报声' },
  { time: '08:30', type: '🏆 荣誉通报', content: '荣获“2026年度全国智慧博物馆示范案例”称号' },
  { time: '09:00', type: '🎓 社教活动', content: '《小小考古家·模拟挖掘猛犸象》活动报名仅剩3个名额' },
];

export const weeklyVisitorTrend = [
  { day: '周一', visitors: 4200, sales: 52000 },
  { day: '周二', visitors: 3800, sales: 48000 },
  { day: '周三', visitors: 5100, sales: 61000 },
  { day: '周四', visitors: 4600, sales: 55000 },
  { day: '周五', visitors: 6200, sales: 72000 },
  { day: '周六', visitors: 8200, sales: 95000 },
  { day: '周日', visitors: 6820, sales: 84230 },
];

export const yearlyVisitorTrend = [
  { month: '1月', visitors: 68000, target: 70000 },
  { month: '2月', visitors: 95200, target: 80000 },
  { month: '3月', visitors: 78000, target: 75000 },
  { month: '4月', visitors: 82000, target: 80000 },
  { month: '5月', visitors: 85000, target: 82000 },
];

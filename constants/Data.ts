export const transactions = [
  { id: 1, merchant: 'Korzinka', category: 'Oziq-ovqat', amount: -125000, date: '2026-06-13', icon: '🛒', color: '#00B26F', source: 'sms' },
  { id: 2, merchant: 'Yandex Taxi', category: 'Transport', amount: -28000, date: '2026-06-13', icon: '🚕', color: '#3B82F6', source: 'sms' },
  { id: 3, merchant: 'Maosh — Texnopark', category: 'Daromad', amount: 3500000, date: '2026-06-13', icon: '💼', color: '#F59E0B', source: 'sms' },
  { id: 4, merchant: 'Netflix', category: 'Obuna', amount: -49000, date: '2026-06-12', icon: '🎬', color: '#8B5CF6', source: 'sms' },
  { id: 5, merchant: 'Payme — Gazprom', category: 'Kommunal', amount: -185000, date: '2026-06-12', icon: '💡', color: '#EF4444', source: 'sms' },
  { id: 6, merchant: 'Burger House', category: 'Restoran', amount: -78000, date: '2026-06-11', icon: '🍔', color: '#F97316', source: 'manual' },
  { id: 7, merchant: 'Uzum Market', category: 'Xarid', amount: -342000, date: '2026-06-11', icon: '📦', color: '#EC4899', source: 'sms' },
  { id: 8, merchant: 'Freelance', category: 'Daromad', amount: 1200000, date: '2026-06-10', icon: '💻', color: '#F59E0B', source: 'manual' },
  { id: 9, merchant: 'Beeline', category: 'Aloqa', amount: -65000, date: '2026-06-10', icon: '📱', color: '#6366F1', source: 'sms' },
  { id: 10, merchant: 'Dorixona', category: "Sog'liq", amount: -92000, date: '2026-06-09', icon: '💊', color: '#14B8A6', source: 'manual' },
  { id: 11, merchant: 'Metro', category: 'Transport', amount: -15000, date: '2026-06-09', icon: '🚇', color: '#3B82F6', source: 'manual' },
  { id: 12, merchant: 'Depozit foizi', category: 'Daromad', amount: 185000, date: '2026-06-08', icon: '🏦', color: '#F59E0B', source: 'sms' },
];

export const budgets = [
  { id: 1, name: 'Oziq-ovqat', icon: '🛒', color: '#00B26F', spent: 1250000, limit: 1500000 },
  { id: 2, name: 'Transport', icon: '🚕', color: '#3B82F6', spent: 380000, limit: 400000 },
  { id: 3, name: 'Restoran', icon: '🍔', color: '#F97316', spent: 620000, limit: 500000 },
  { id: 4, name: 'Xarid', icon: '📦', color: '#EC4899', spent: 890000, limit: 800000 },
  { id: 5, name: "Ko'ngilochar", icon: '🎮', color: '#8B5CF6', spent: 120000, limit: 300000 },
  { id: 6, name: "Sog'liq", icon: '💊', color: '#14B8A6', spent: 92000, limit: 400000 },
];

export const goals = [
  { id: 1, name: 'Favqulodda fond', icon: '🛡️', target: 10000000, saved: 6500000, monthly: 500000, color: '#00B26F', deadline: '2026-12-31', badge: '🏆' },
  { id: 2, name: 'Evropa safari', icon: '✈️', target: 25000000, saved: 8200000, monthly: 1000000, color: '#3B82F6', deadline: '2027-06-01', badge: '🌍' },
  { id: 3, name: 'Yangi noutbuk', icon: '💻', target: 6000000, saved: 5400000, monthly: 300000, color: '#8B5CF6', deadline: '2026-07-01', badge: '⭐' },
  { id: 4, name: 'Mashina fond', icon: '🚗', target: 80000000, saved: 12000000, monthly: 2000000, color: '#F59E0B', deadline: '2028-01-01', badge: '🥇' },
];

export const subscriptions = [
  { id: 1, name: 'Netflix', icon: '🎬', amount: 49000, cycle: 'oylik', category: "Ko'ngilochar", color: '#EF4444', status: 'active', detected: true },
  { id: 2, name: 'Beeline internet', icon: '📶', amount: 95000, cycle: 'oylik', category: 'Aloqa', color: '#6366F1', status: 'active', detected: true },
  { id: 3, name: 'Uzum Pro', icon: '📦', amount: 29000, cycle: 'oylik', category: 'Xarid', color: '#F97316', status: 'active', detected: true },
  { id: 4, name: 'Spotify', icon: '🎵', amount: 25000, cycle: 'oylik', category: "Ko'ngilochar", color: '#1DB954', status: 'active', detected: false },
  { id: 5, name: 'iCloud 50GB', icon: '☁️', amount: 18000, cycle: 'oylik', category: 'Saqlash', color: '#3B82F6', status: 'active', detected: true },
  { id: 6, name: 'Canva Pro', icon: '🎨', amount: 45000, cycle: 'oylik', category: 'Ish', color: '#8B5CF6', status: 'active', detected: false },
  { id: 7, name: 'Google One', icon: '🔷', amount: 22000, cycle: 'oylik', category: 'Saqlash', color: '#4285F4', status: 'inactive', detected: true },
];

export const weeklySpend = [285000, 420000, 185000, 650000, 320000, 740000, 180000];
export const weekDays = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];

export const categoryBreakdown = [
  { name: 'Oziq-ovqat', amount: 1250000, budget: 1500000, color: '#00B26F', icon: '🛒' },
  { name: 'Transport', amount: 380000, budget: 400000, color: '#3B82F6', icon: '🚕' },
  { name: 'Restoran', amount: 620000, budget: 500000, color: '#F97316', icon: '🍔' },
  { name: 'Xarid', amount: 890000, budget: 800000, color: '#EC4899', icon: '📦' },
  { name: 'Obuna', amount: 245000, budget: 300000, color: '#8B5CF6', icon: '🎬' },
];

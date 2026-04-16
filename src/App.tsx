import { useEffect, useState } from 'react';
import { LiveClock } from './components/ui/LiveClock';
import { calculateMonthlyValue, formatMonthlyValue } from './lib/calculations';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [subscribers, setSubscribers] = useState<any[]>([]);

  // بيانات تجريبية
  useEffect(() => {
    setSubscribers([
      { id: '1', name: 'أحمد محمد', individuals: 4 },
      { id: '2', name: 'فاطمة علي', individuals: 2 },
    ]);
  }, []);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">🥖 إدارة الخبز المدعم</h1>
          <div className="flex items-center gap-4">
            <LiveClock />
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </header>
        <main className="p-4 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
              <h2 className="font-bold text-lg mb-3">👥 المشتركين</h2>
              {subscribers.map(sub => {
                const monthly = calculateMonthlyValue(sub.individuals, currentYear, currentMonth);
                return (
                  <div key={sub.id} className="border p-3 rounded mb-2 flex justify-between">
                    <span>{sub.name} ({sub.individuals} فرد)</span>
                    <span className="font-mono">{formatMonthlyValue(monthly)}</span>
                  </div>
                );
              })}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
              <h2 className="font-bold text-lg mb-3">📊 إحصائيات سريعة</h2>
              <p>عدد المشتركين: {subscribers.length}</p>
              <p>إجمالي الأفراد: {subscribers.reduce((acc, s) => acc + s.individuals, 0)}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
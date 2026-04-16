// setup.js - سكريبت لإنشاء هيكل المشروع كاملاً
const fs = require('fs');
const path = require('path');

const files = {
  'package.json': `{
  "name": "bread-subscription-manager",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "dexie": "^3.2.4",
    "lucide-react": "^0.263.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.2",
    "recharts": "^2.7.2",
    "zustand": "^4.3.9"
  },
  "devDependencies": {
    "@types/node": "^20.4.2",
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.26",
    "tailwindcss": "^3.3.3",
    "typescript": "^5.1.6",
    "vite": "^4.4.4"
  }
}`,
  'vite.config.ts': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`,
  'tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,
  'tsconfig.node.json': `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}`,
  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: [],
}`,
  'postcss.config.js': `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,
  'index.html': `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#3b82f6" />
    <link rel="manifest" href="/manifest.json" />
    <title>إدارة اشتراكات الخبز</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
  'public/manifest.json': `{
  "name": "إدارة اشتراكات الخبز",
  "short_name": "الخبز",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6"
}`,
  'src/main.tsx': `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
  'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;`,
  'src/App.tsx': `import { useEffect, useState } from 'react';
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

export default App;`,
  'src/lib/calculations.ts': `export const LOAVES_PER_PERSON = 5;
export const PRICE_PER_LOAF = 0.20;

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const calculateMonthlyValue = (individualsCount: number, year: number, month: number): number => {
  const days = getDaysInMonth(year, month);
  return individualsCount * LOAVES_PER_PERSON * days * PRICE_PER_LOAF;
};

export const formatMonthlyValue = (value: number): string => {
  return value.toFixed(2) + ' ج.م';
};`,
  'src/components/ui/LiveClock.tsx': `import { useState, useEffect } from 'react';

const monthNames = ['يناير','فبراير','مارس','إبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

export const LiveClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const day = now.getDate();
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();
  const timeStr = now.toLocaleTimeString('ar-EG', { hour12: false });

  return (
    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
      <span>{day} {month} {year}</span>
      <span className="mx-2">|</span>
      <span>{timeStr}</span>
    </div>
  );
};`,
  'src/lib/db.ts': `// قاعدة بيانات IndexedDB (جاهزة للتوسع)
import Dexie, { Table } from 'dexie';

export interface Subscriber {
  id: string;
  name: string;
  individualsCount: number;
  createdAt: string;
  updatedAt: string;
}

export class AppDatabase extends Dexie {
  subscribers!: Table<Subscriber>;

  constructor() {
    super('BreadDB');
    this.version(1).stores({
      subscribers: 'id, name'
    });
  }
}

export const db = new AppDatabase();`
};

// إنشاء الملفات
function createStructure(basePath) {
  for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(basePath, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf8');
  }
  console.log('✅ تم إنشاء جميع ملفات المشروع بنجاح!');
  console.log('الآن افتح الطرفية (Terminal) في هذا المجلد واكتب:');
  console.log('  npm install');
  console.log('  npm run dev');
}

// تشغيل
const projectPath = process.argv[2] || '.';
createStructure(path.resolve(projectPath));
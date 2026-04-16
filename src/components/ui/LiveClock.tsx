import { useState, useEffect } from 'react';

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
};
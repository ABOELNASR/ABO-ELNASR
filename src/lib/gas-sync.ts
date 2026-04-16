// src/lib/gas-sync.ts
import { db } from './db';

// استبدل الرابط برابط Google Apps Script الخاص بك
const GAS_URL = 'https://script.google.com/macros/s/AKfycbwEYV1rqZsFUccnhSMi4bndMsChvCH-Rz-qMc5RB8jek8pnwijvoo951qBhpcdqE5Rwmg/exec';

export const syncWithCloud = async () => {
  const subscribers = await db.subscribers.toArray();
  const cards = await db.cards.toArray();
  const payments = await db.payments.toArray();
  
  const response = await fetch(`${GAS_URL}?action=sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subscribers, cards, payments, lastSync: new Date().toISOString() })
  });
  return response.json();
};

export const pullFromCloud = async () => {
  const response = await fetch(`${GAS_URL}?action=getAllData`);
  const data = await response.json();
  if (data.subscribers) {
    await db.subscribers.clear();
    await db.subscribers.bulkAdd(data.subscribers);
  }
  if (data.cards) {
    await db.cards.clear();
    await db.cards.bulkAdd(data.cards);
  }
  if (data.payments) {
    await db.payments.clear();
    await db.payments.bulkAdd(data.payments);
  }
  return data;
};

export const login = async (username: string, password: string) => {
  const response = await fetch(`${GAS_URL}?action=login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return response.json();
};

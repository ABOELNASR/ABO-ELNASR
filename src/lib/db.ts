// قاعدة بيانات IndexedDB (جاهزة للتوسع)
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

export const db = new AppDatabase();
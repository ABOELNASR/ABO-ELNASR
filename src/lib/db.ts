import Dexie, { Table } from 'dexie';

export interface Subscriber {
  id: string;
  name: string;
  individualsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Card {
  id: string;
  subscriberId: string;
  cardName: string;
  cardNumber: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  subscriberId: string;
  amount: number;
  date: string;
  isFull: boolean;
  month: number;
  year: number;
}

export class AppDatabase extends Dexie {
  subscribers!: Table<Subscriber>;
  cards!: Table<Card>;
  payments!: Table<Payment>;

  constructor() {
    super('BreadSubscriptionDB');
    this.version(1).stores({
      subscribers: 'id, name',
      cards: 'id, subscriberId',
      payments: 'id, subscriberId, month, year'
    });
  }
}

export const db = new AppDatabase();

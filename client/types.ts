import type { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
  skills: string[];
  preferences: { [key: string]: 0 | 1 | 2 };
  eventRanks: { event: Event; rank: number }[];
}

export interface Event {
  _id: ObjectId;
  title: string;
  date: Date;
  needs: string[];
  userRanks: { user: User; rank: number }[];
}

export interface Org {
  _id: ObjectId;
  orgName: string;
  username: string;
  password?: string;
  causes: string[];
  events: Event[];
}

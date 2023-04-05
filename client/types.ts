export interface User {
  userId: any;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  skills: string[];
  preferences: { [key: string]: 0 | 1 | 2 };
  eventRanks: { event: Event; rank: number }[];
}

export interface Event {
  eventId: any;
  title: string;
  date: Date;
  needs: string[];
  userRanks: { user: User; rank: number }[];
}

export interface Org {
  orgId: any;
  orgName: string;
  username: string;
  password: string;
  causes: string[];
  events: Event[];
}

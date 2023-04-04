import { User, Org } from '../models/types';
import {
  getUserTopChoices,
  getOrgTopChoices,
} from '../models/matchingAlgorithm';

describe('matching algorithm unit tests', () => {
  describe('getUserTopChoices', () => {
    const user: User = {
      firstName: 'Ian',
      lastName: 'Davis',
      username: 'iandavis',
      password: 'password',
      skills: ['JavaScript', 'TypeScript', 'React'],
      preferences: { 'Animal Welfare': 2, Education: 1, Health: 0 },
      eventRanks: [],
    };

    const orgs: Org[] = [
      {
        orgName: 'Org 1',
        username: 'org1',
        password: 'password',
        causes: ['Animal Welfare', 'Education'],
        events: [
          {
            title: 'Event 1',
            date: new Date('2023-04-03'),
            needs: ['JavaScript', 'React'],
            userRanks: [],
          },
          {
            title: 'Event 2',
            date: new Date('2023-04-04'),
            needs: ['TypeScript', 'React'],
            userRanks: [],
          },
        ],
      },
      {
        orgName: 'Org 2',
        username: 'org2',
        password: 'password',
        causes: ['Health'],
        events: [
          {
            title: 'Event 3',
            date: new Date('2023-04-05'),
            needs: ['JavaScript'],
            userRanks: [],
          },
        ],
      },
    ];

    it('should rank events based on user skills and preferences', () => {
      getUserTopChoices(user, orgs);
      expect(user.eventRanks[0].event.title).toBe('Event 1');
      expect(user.eventRanks[1].event.title).toBe('Event 2');
    });
  });

  describe('getOrgTopChoices', () => {
    let org: Org;
    let user1: User;
    let user2: User;
    let users: User[];
    beforeEach(() => {
      org = {
        orgName: 'TestOrg',
        username: 'testorg',
        password: 'testpassword',
        causes: ['animals'],
        events: [
          {
            title: 'TestEvent',
            date: new Date('2023-04-05'),
            needs: ['dog walking'],
            userRanks: [],
          },
        ],
      };
      user1 = {
        firstName: 'Keely',
        lastName: 'Timms',
        username: 'keelytimms',
        password: 'password',
        skills: ['dog walking', 'cat grooming'],
        preferences: { animals: 2, environment: 0 },
        eventRanks: [],
      };
      user2 = {
        firstName: 'Yusuf',
        lastName: 'Bhaiyat',
        username: 'yusufbhaiyat',
        password: 'password',
        skills: ['dog walking'],
        preferences: { animals: 1, environment: 0 },
        eventRanks: [],
      };
      users = [user1, user2];
    });

    it('should rank users for each event in the organization', () => {
      getOrgTopChoices(org, users);
      expect(org.events[0].userRanks.length).toBe(2);
      expect(org.events[0].userRanks[0].user).toBe(user1);
      expect(org.events[0].userRanks[0].rank).toBe(2);
      expect(org.events[0].userRanks[1].user).toBe(user2);
      expect(org.events[0].userRanks[1].rank).toBe(1);
    });

    it("should not rank users who do not match the organization's causes", () => {
      org.causes = ['environment'];
      getOrgTopChoices(org, users);
      console.log(org.events[0]);
      expect(org.events[0].userRanks.length).toBe(0);
    });

    it('should not rank users who do not have any of the needed skills', () => {
      org.causes = ['animals'];
      org.events[0].needs = ['cat grooming'];
      getOrgTopChoices(org, users);
      expect(org.events[0].userRanks.length).toBe(2);
      expect(org.events[0].userRanks[0].user).toBe(user1);
      expect(org.events[0].userRanks[1].rank).toBe(0);
    });
  });
});

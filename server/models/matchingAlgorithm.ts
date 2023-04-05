/* eslint-disable */
import { User, Org } from './types.js';

// -------------------------------------------User Logic-------------------------------------------------

/**
 * @function getUserEventRanks- updates the eventRanks property on the user object
 * @param user - individual user
 * @param orgs - array of all orgs
 */
export const getUserEventRanks = (
  user: User,
  orgs: Org[]
): { event: Event; rank: number }[] => {
  // determine valid orgs
  const validOrgs = getValidOrgs(user, orgs);
  // rank events
  return rankEvents(user, validOrgs);
};

/**
 * @function getValidOrgs - determines which orgs are valid based on users preferences
 * @param user - individual user
 * @param orgs - array of all orgs
 * @returns - array of all valid orgs
 */
const getValidOrgs = (user: User, orgs: Org[]): Org[] => {
  const validOrgs: Org[] = [];
  for (let org of orgs) {
    let isValid = true;
    const orgCauses = org.causes;
    for (let preference in user.preferences) {
      if (!user.preferences[preference] && orgCauses.includes(preference))
        isValid = false;
    }
    if (isValid) validOrgs.push(org);
  }
  return validOrgs;
};

/**
 * @function rankEvents - ranks events by multiplying # of overlapping causes * # of overlapping skills
 * @param user - individual user
 * @param validOrgs - array of valid organizations
 */
const rankEvents = (user: User, validOrgs: Org[]) => {
  const userSkills = new Set(user.skills);
  const eventRanks: { event: any; rank: number }[] = [];
  for (let org of validOrgs) {
    // determine how many causes match with user preferences
    const causes = org.causes;
    let causeCount = 0;
    for (let cause of causes) {
      if (!(cause in user.preferences)) continue;
      causeCount += user.preferences[cause];
    }
    // determine how many skill matches the individual event
    const events = org.events;
    for (let event of events) {
      const needs = event.needs;
      let skillCount = 0;
      for (let need of needs) {
        if (userSkills.has(need)) skillCount++;
      }
      const rank = skillCount * causeCount;
      eventRanks.push({ event, rank });
    }
  }
  // sort ranks
  eventRanks.sort((a, b) => b.rank - a.rank);
  return eventRanks;
};

// ---------------------------------------------Org Logic-------------------------------------------------
/**
 * @function getOrgUserRanks - determines users ranks per event
 * @param org - individual org
 * @param users - array of users
 */
export const getOrgUserRanks = (org: Org, users: User[]): void => {
  // determine valid users
  const validUsers = getUsers(org, users);
  // get ranks
  rankUsers(org, validUsers);
};

/**
 * @function getUsers - gets valid users
 * @param org - individual org
 * @param users - array of users
 * @returns array of valid users
 */
const getUsers = (org: Org, users: User[]): User[] => {
  const validUsers: User[] = [];
  const orgCauses = org.causes;
  for (let user of users) {
    let isValid = true;
    for (let preference in user.preferences) {
      if (!user.preferences[preference] && orgCauses.includes(preference))
        isValid = false;
    }
    if (isValid) validUsers.push(user);
  }
  return validUsers;
};

/**
 * @function rankUsers - ranks users by multiplying # of overlapping causes * # of overlapping skills
 * @param org
 * @param validUsers
 */
const rankUsers = (org: Org, validUsers: User[]): void => {
  for (let event of org.events) {
    const needs = new Set(event.needs);
    for (let user of validUsers) {
      let causeCount = 0;
      for (let cause of org.causes) {
        if (!(cause in user.preferences)) continue;
        causeCount += user.preferences[cause];
      }
      let skillCount = 0;
      const skills = user.skills;
      for (let skill of skills) {
        if (needs.has(skill)) skillCount++;
      }
      const rank = causeCount * skillCount;
      // add to userRanks in event obj
      event.userRanks.push({ user, rank });
    }
    // sort userRanks
    event.userRanks.sort((a, b) => b.rank - a.rank);
  }
};

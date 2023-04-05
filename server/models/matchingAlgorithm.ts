/* eslint-disable */
import { User, Org } from './types.js';

// -------------------------------------------User Logic-------------------------------------------------

/**
 * @function getUserTopChoices - updates the eventRanks property on the user object
 * @param user - individual user
 * @param orgs - array of all orgs
 */
export const getUserTopChoices = (user: User, orgs: Org[]): void => {
  // determine valid orgs
  const validOrgs = getValidOrgs(user, orgs);
  // rank events
  rankEvents(user, validOrgs);
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
const rankEvents = (user: User, validOrgs: Org[]): void => {
  const userSkills = new Set(user.skills);
  for (let org of validOrgs) {
    // determine how many causes match with user preferences
    const causes = org.causes;
    let causeCount = 0;
    for (let cause of causes) {
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
      user.eventRanks.push({ event, rank });
    }
  }
  // sort ranks
  user.eventRanks.sort((a, b) => b.rank - a.rank);
};

// ---------------------------------------------Org Logic-------------------------------------------------
/**
 * @function getOrgTopChoices - determines users ranks per event
 * @param org - individual org
 * @param users - array of users
 */
export const getOrgTopChoices = (org: Org, users: User[]): void => {
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

// preference * # of skills
const rankUsers = (org: Org, validUsers: User[]): void => {
  for (let event of org.events) {
    const needs = new Set(event.needs);
    for (let user of validUsers) {
      let causeCount = 0;
      for (let cause of org.causes) {
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

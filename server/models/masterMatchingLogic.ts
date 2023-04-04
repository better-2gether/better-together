const user = {
  firstName: 'Zack',
  lastName: 'Freeman',
  username: 'username',
  password: 'password',
  skills: ['management', 'dj', 'interior design'],
  // 0 (avoid), 1 (neutral), 2 (prefer)
  preferences: {
    education: 2,
    religious: 0,
    conservation: 1,
    political: 1,
    poverty: 1,
  },
};

const org = {
  orgName: 'codesmith',
  username: 'codesmith2',
  password: 'password',
  causes: ['education', 'conservation', 'political'],
  events: [
    {
      title: 'name of event',
      date: '4-15-2023',
      needs: ['SQL', 'baking', 'management'],
      userRanks: [],
    },
    {
      title: 'name of event',
      date: '6-23-2023',
      needs: ['management', 'dj', 'interior design'],
      userRanks: [],
    },
  ],
};
// -----------------------------------------------User-------------------------------------------------

export const getUserTopChoices = (user, orgs) => {
  // determine the valid events
  const validOrgs = getValidOrgs(user, orgs);
  // get ranks
  const ranks = rankEvents(user, validOrgs);
  // return ranks
  return ranks;
};

const getValidOrgs = (user, orgs) => {
  const validOrgs = [];
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

// preference * # of skills
const rankEvents = (user, validOrgs) => {
  const ranks = [];
  const userSkills = new Set(user.skills);
  for (let org of validOrgs) {
    // determine how many causes match with user preferences
    const causes = org.causes;
    let causeCount = 0;
    for (let cause of causes) {
      causeCount += user.preferences[cause];
    }
    // determine how many skill matches there per event
    const events = org.events;
    for (let event of events) {
      const needs = event.needs;
      let skillCount = 0;
      for (let need of needs) {
        if (userSkills.has(need)) skillCount++;
      }
      const rank = skillCount * causeCount;
      ranks.push({ ...event, rank });
    }
  }
  // sort ranks
  ranks.sort((a, b) => b.rank - a.rank);
  return ranks;
};

// -----------------------------------------------Org-------------------------------------------------
export const getOrgTopChoices = (org, users) => {
  // determine valid users
  const validUsers = getUsers(org, users);
  // get ranks
  rankUsers(org, users);
  // return ranks
  return org;
};

const getUsers = (org, users) => {
  const validUsers = [];
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
const rankUsers = (org, validUsers) => {
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
      event.userRanks.push({ ...user, rank });
    }
    // sort userRanks
    event.userRanks.sort((a, b) => b.rank - a.rank);
  }
};

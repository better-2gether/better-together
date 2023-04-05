import React from 'react'
import Preferences from '../components/preferences.js';
import Skills from '../components/skills.js';


function UserProfile() {
  // user info will be passed in from the homepage when redirected to this page
  const fName = fName;
  const lName = lName;
  const userName = userName;
  const password = password;
  const edit = () => {
    // route to the addUserPreferences page using react router
  }
  return (
    <div>
      <h1>UserProfile</h1>
      <div>First Name: {fName}</div>
      <div>Last Name: {lName}</div>
      <div>UserName: {userName}</div>
      <div>Password: {password}</div>
      <Preferences
        preferences={preferences}
      />
      <Skills
        skills={skills}
      />
      <button onClick={edit}>Edit</button>
    </div>
  )
}

export default UserProfile
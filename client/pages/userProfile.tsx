import React from 'react'
import Preferences from '../components/preferences';
import Skills from '../components/skills';

function UserProfile(props) {
  const name = props.name;
  const userName = props.userName;
  const password = props.password;
  return (
    <div>
      <div>userProfile</div>
      <div>Name: {name}</div>
      <div>UserName: {userName}</div>
      <div>Password: {password}</div>
      <Preferences
        preferences={{
          cause1: "prefer",
          cause2: "avoid",
          cause3: "prefer"
        }}
      />
      <Skills
        skills={["programmer", "baker", "writer"]}
      />
    </div>
  )
}

export default UserProfile
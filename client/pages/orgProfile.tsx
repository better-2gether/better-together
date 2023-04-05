import React from 'react'
import Causes from '../components/causes';

function OrgProfile() {
    // get org details using react router from home component
//   const name = name;
//   const userName = userName;
//   const password = password;
  const edit = () => {
    // route to the addOrgCauses page using react router
  }  
  return (
    <div>
      <h1>OrgProfile</h1>
      {/* <div>Name: {name}</div>
      <div>UserName: {userName}</div>
      <div>Password: {password}</div> */}
      <Causes
        causes={["cause2", "cause4"]}
      />
      <button onClick={edit}>Edit</button>
    </div>
  )
}

export default OrgProfile
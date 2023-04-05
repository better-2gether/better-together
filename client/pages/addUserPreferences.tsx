import React, { useState, useEffect } from 'react'
import AddPreferences from '../components/addPreferences'
import AddSkills from '../components/addSkills'

function addUserPreferences() {
  // this component will recieve the currPreferences, currSkills and userId from other components
  const [preferences, setPreferences] = useState(currPreferences);
  const [skills, setSkills] = useState(currSkills);

  const handlePreferenceChange = (key, value) => {
    setPreferences({ ...preferences, [key]: value });
  };

  const handleSkillsChange = (newSkills) => {
    setSkills(newSkills);
  };

  const save = () => {
    const options = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({skills: skills, preferences: preferences, userId: userId})
    }
    fetch("route", options)
    .then(response => response.json())
    .then(response => console.log(response));
    // user react router to reroute to profile page or homepage with new state
  };

  return (
    <div>
      <h1>Add/Edit Preferences</h1>
      <AddPreferences
        preferences={preferences}
        onPreferenceChange={handlePreferenceChange}
      />
      <AddSkills
        skills={skills}
        onSkillsChange={handleSkillsChange}
      />
      <button onClick={save}>Save</button>
    </div>
  )
}

export default addUserPreferences;
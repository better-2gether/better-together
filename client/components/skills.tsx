import React from 'react'

function Skills(props) {
  const skills = props.skills;  
  return (
    <div> 
        <h2>Skills</h2>
        {skills.map((skill, index) => (
            <div key={index}>
                {skill}
            </div>    
        ))}
    </div>
  )
}

export default Skills
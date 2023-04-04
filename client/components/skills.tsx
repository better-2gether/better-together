import React from 'react'

function Skills(props) {
  const skills = props.skills;  
  return (
    <div> 
        <div>Skills</div>
        {skills.map((skill, index) => {
            <div key={index}>
                {skill}
            </div>    
        })}
    </div>
  )
}

export default Skills
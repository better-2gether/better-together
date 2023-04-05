import React, { useState } from "react";

const AddSkills = ({ skills, onSkillsChange }) => {
  const [selectedSkill, setSelectedSkill] = useState("");

  const predeterminedSkills = ["programmer", "baker", "writer", "designer"];

  const handleSkillChange = (e) => {
    setSelectedSkill(e.target.value);
  };

  const addSkill = () => {
    if (selectedSkill && !skills.includes(selectedSkill)) {
      const newSkills = [...skills, selectedSkill];
      onSkillsChange(newSkills);
    }
  };

  const removeSkill = (skillToRemove) => {
    const newSkills = skills.filter((skill) => skill !== skillToRemove);
    onSkillsChange(newSkills);
  };

  return (
    <div>
      <h2>Skills</h2>
      <div>
        <select value={selectedSkill} onChange={handleSkillChange}>
          <option value="">Select a skill</option>
          {predeterminedSkills.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
        <button onClick={addSkill}>Add</button>
      </div>
      <ul>
        {skills.map((skill) => (
          <li key={skill}>
            {skill} <button onClick={() => removeSkill(skill)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddSkills;

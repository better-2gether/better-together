import React, { useState } from 'react';
import '../css/Preferences.css';

const Preferences = (props) => {
  const preferences = [];

  for (const key in props.preferences) {
    const obj = {};
    obj[key] = props.preferences[key];
    preferences.push(obj);
  }

  return (
    <div className="preferences">
      <h2>Preferences</h2>
      <div className="header">
        <div />
        <span>Prefer</span>
        <span>Avoid</span>
      </div>
      {preferences.map((preference, index) => (
        <div key={index} className="preference-item">
          <div className="options">
            <input
              type="radio"
              id={`prefer-${index}`}
              name={`selection-${index}`}
              value="prefer"
              readOnly={true}
              checked={preferences[index][Object.keys(preference)[0]] === 'prefer'}
            />
            <label htmlFor={`prefer-${index}`} />
            <input
              type="radio"
              id={`avoid-${index}`}
              name={`selection-${index}`}
              value="avoid"
              readOnly={true}
              checked={preferences[index][Object.keys(preference)[0]] === 'avoid'} 
            />
            <label htmlFor={`avoid-${index}`} />
          </div>
          <span>{Object.keys(preference)[0]}</span>
        </div>
      ))}
    </div>
  );
};

export default Preferences;


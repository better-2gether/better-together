import React from 'react';
import '../css/Preferences.css';

const Preferences = ({ preferences }) => {
  const preferenceList = Object.entries(preferences);

  return (
    <div className="preferences">
      <h2>Preferences</h2>
      <div className="header">
        <div />
        <span>Prefer</span>
        <span>Avoid</span>
      </div>
      {preferenceList.map(([key, value], index) => (
        <div key={index} className="preference-item">
          <div className="options">
            <input
              type="radio"
              id={`prefer-${index}`}
              name={`selection-${index}`}
              value="prefer"
              readOnly={true}
              checked={value === 'prefer'}
            />
            <label htmlFor={`prefer-${index}`} />
            <input
              type="radio"
              id={`avoid-${index}`}
              name={`selection-${index}`}
              value="avoid"
              readOnly={true}
              checked={value === 'avoid'}
            />
            <label htmlFor={`avoid-${index}`} />
          </div>
          <span>{key}</span>
        </div>
      ))}
    </div>
  );
};

export default Preferences;



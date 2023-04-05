import React from 'react';

const AddPreferences = ({ preferences, onPreferenceChange }) => {
  const handleSelection = (key, value) => {
    onPreferenceChange(key, value);
  };

  return (
    <div className="preferences">
      <h2>Preferences</h2>
      <div className="header">
        <div />
        <span>Prefer</span>
        <span>Avoid</span>
      </div>
      {Object.entries(preferences).map(([key, value], index) => (
        <div key={index} className="preference-item">
          <div className="options">
            <input
              type="radio"
              id={`prefer-${index}`}
              name={`selection-${index}`}
              value="prefer"
              checked={value === 'prefer'}
              onChange={() => handleSelection(key, 'prefer')}
            />
            <label htmlFor={`prefer-${index}`} />
            <input
              type="radio"
              id={`avoid-${index}`}
              name={`selection-${index}`}
              value="avoid"
              checked={value === 'avoid'}
              onChange={() => handleSelection(key, 'avoid')}
            />
            <label htmlFor={`avoid-${index}`} />
          </div>
          <span>{key}</span>
        </div>
      ))}
    </div>
  );
};

export default AddPreferences;

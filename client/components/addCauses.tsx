import React from 'react';

const AddCauses = ({ causes, onCauseChange }) => {
  const handleSelection = (key, value) => {
    const newValue = causes[key] === value ? 'avoid' : value;
    onCauseChange(key, newValue);
  };

  return (
    <div className="preferences">
      <h2>Causes</h2>
      <div className="header">
        <div />
      </div>
      {Object.entries(causes).map(([key, value], index) => (
        <div key={index} className="preference-item">
          <div className="options">
            <input
              type="radio"
              id={`prefer-${index}`}
              name={`selection-${index}`}
              value="prefer"
              checked={value === 'prefer'}
              onClick={() => handleSelection(key, 'prefer')}
            />
            <label htmlFor={`prefer-${index}`} />
          </div>
          <span>{key}</span>
        </div>
      ))}
    </div>
  );
};

export default AddCauses;


import React from 'react';

const Causes = ({ causes }) => {
  const allCauses = ['cause1', 'cause2', 'cause3', 'cause4', 'cause5'];
  
  const causePreferences = allCauses.reduce((acc, cause) => {
    acc[cause] = causes.includes(cause) ? 'prefer' : 'avoid';
    return acc;
  }, {});

  const causeList = Object.entries(causePreferences);

  return (
    <div className="preferences">
      <h2>Causes</h2>
      <div className="header">
        <div />
      </div>
      {causeList.map(([key, value], index) => (
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
          </div>
          <span>{key}</span>
        </div>
      ))}
    </div>
  );
};

export default Causes;

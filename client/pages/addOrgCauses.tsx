import React, { useState } from 'react'
import AddCauses from '../components/addCauses';

function AddOrgCauses({ currCauses }) {

    // currCauses and userid will be passed in from other components
  const allCauses = ['cause1', 'cause2', 'cause3', 'cause4', 'cause5'];

  const initialCauses = allCauses.reduce((acc, cause) => {
    acc[cause] = currCauses.includes(cause) ? 'prefer' : 'avoid';
    return acc;
  }, {});

  const [causes, setCauses] = useState(initialCauses);

  const handleCauseChange = (key, value) => {
    setCauses({ ...causes, [key]: value });
  };

  const save = () => {
    // ...
  };

  return (
    <div>
      <h1>Add/Edit Causes</h1>
      <AddCauses
        causes={causes}
        onCauseChange={handleCauseChange}
      />
      <button onClick={save}>Save</button>
    </div>
  )
}

export default AddOrgCauses;

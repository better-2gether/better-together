import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import UserProfile from './pages/userProfile.js';
import AddUserPreferences from './pages/addUserPreferences.js';
import OrgProfile from './pages/orgProfile.js';
import AddOrgCauses from './pages/addOrgCauses.js';

function App() {


  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/data')
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        setMessage(data.message);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <AddOrgCauses
        currCauses={["cause2", "cause4"]}
      />
    </div>
  );
}

export default App;

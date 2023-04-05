import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import UserProfile from './pages/userProfile';
import AddUserPreferences from './pages/addUserPreferences';
import OrgProfile from './pages/orgProfile';
import AddOrgCauses from './pages/addOrgCauses';

function App() {


  return (
    <div className="App">
      <AddOrgCauses
        currCauses={["cause2", "cause4"]}
      />
    </div>
  );
}

export default App;

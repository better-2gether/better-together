import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Login from './pages/Login.js';
import OrgHome from './pages/OrgHome.js';
import AddEvent from './pages/AddEvent.js';
import PageNotFound from './pages/PageNotFound.js';
import UserProfile from './pages/userProfile.js';
import AddUserPreferences from './pages/addUserPreferences.js';
import OrgProfile from './pages/orgProfile.js';
import AddOrgCauses from './pages/addOrgCauses.js';
import type { Org, User, Event } from './types';
import './App.css';

function PrivateRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate replace to='/login' />;
}

function PublicRoute({ isLoggedIn, children }) {
  return isLoggedIn ? <Navigate replace to='/' /> : children;
}

function App() {
  const [user, setUser] = useState<Org | User | null>(sampleOrg);
  const [isUser, setIsUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('isLoggedIn'));

  const updateOrgEvents = (events: Event[]) => {
    if (!isUser) setUser({ ...user, events });
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar isUser={isUser} user={user} />
        <Routes>
          <Route
            path='/login'
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <Login setUser={setUser} setIsUser={setIsUser} setIsLoggedIn={setIsLoggedIn} />
              </PublicRoute>
            }
          />
          <Route
            path='/'
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                {!isUser ? <OrgHome events={(user as Org).events} /> : <UserHome />}
              </PrivateRoute>
            }
          />
          <Route
            path='/event'
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                {!isUser && <AddEvent _id={user._id} updateOrgEvents={updateOrgEvents} />}
              </PrivateRoute>
            }
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

const sampleOrg: Org = {
  _id: '1234',
  orgName: 'Example Org',
  username: 'blahOrg',
  password: '12343',
  causes: ['Poverty', 'Education'],
  events: [
    {
      _id: '52343',
      title: 'New Event',
      date: new Date(2023, 3, 7),
      needs: ['SQL', 'web design'],
      userRanks: [],
    },
    {
      _id: '452543',
      title: 'Another Event with a long title blah blah',
      date: new Date(2023, 3, 5),
      needs: ['SQL', 'web design'],
      userRanks: [],
    },
    {
      _id: '351523',
      title: 'Another Event with an even long title blah blah',
      date: new Date(2023, 3, 4),
      needs: ['SQL', 'web design'],
      userRanks: [],
    },
  ],
};

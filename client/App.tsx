import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import OrgHome from './pages/OrgHome';
import AddEvent from './pages/AddEvent';
import PageNotFound from './pages/PageNotFound';
import type { Org, User, Event } from './types';
import './App.css';
import UserProfile from './pages/userProfile.js';
import AddUserPreferences from './pages/addUserPreferences.js';
import OrgProfile from './pages/orgProfile.js';
import AddOrgCauses from './pages/addOrgCauses.js';

function PrivateRoute({ user, children }) {
  return user ? children : <Navigate replace to='/login' />;
}

function PublicRoute({ user, children }) {
  return user ? <Navigate replace to='/' /> : children;
}

function App() {
  const [user, setUser] = useState<Org | User | null>(sampleOrg);
  const [isUser, setIsUser] = useState(false);

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
              <PublicRoute user={user}>
                <Login setUser={setUser} setIsUser={setIsUser} />
              </PublicRoute>
            }
          />
          <Route
            path='/'
            element={
              <PrivateRoute user={user}>
                {!isUser ? <OrgHome events={(user as Org).events} /> : <UserHome />}
              </PrivateRoute>
            }
          />
          <Route
            path='/event'
            element={
              <PrivateRoute user={user}>
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

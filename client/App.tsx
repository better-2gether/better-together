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

function PrivateRoute({ user, children }) {
  return user ? children : <Navigate replace to='/login' />;
}

function PublicRoute({ user, children }) {
  return user ? <Navigate replace to='/' /> : children;
}

function App() {
  const [user, setUser] = useState<Org | User | null>(null);
  const [isUser, setIsUser] = useState<boolean | null>(false);

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
                {user && !isUser ? <OrgHome events={(user as Org).events} /> : null}
              </PrivateRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <PrivateRoute user={user}>
                {user && !isUser ? (
                  <OrgProfile />
                ) : (
                  <UserProfile
                  // fName={(user as User).firstName}
                  // lName={(user as User).lastName}
                  // userName={user.username}
                  // password={user.password}
                  />
                )}
              </PrivateRoute>
            }
          />
          <Route
            path='/event'
            element={
              <PrivateRoute user={user}>
                {user && !isUser && <AddEvent _id={user._id} updateOrgEvents={updateOrgEvents} />}
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

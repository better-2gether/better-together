import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import OrgHome from './pages/OrgHome';
import AddEvent from './pages/AddEvent';
import PageNotFound from './pages/PageNotFound';
import type { Org, User, Event } from './types';
import './App.css';

function App() {
  const [user, setUser] = useState<Org | User>(sampleOrg);
  const [isUser, setIsUser] = useState(false);

  const [message, setMessage] = useState('');

  const updateOrgEvents = (events: Event[]) => {
    if (!isUser) setUser({ ...user, events });
  };

  // useEffect(() => {
  //   fetch('/api/data')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(JSON.stringify(data));
  //       setMessage(data.message);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar isUser={isUser} user={user} />
        <Routes>
          <Route
            path='/'
            element={!isUser ? <OrgHome events={(user as Org).events} /> : <UserHome />}
          />
          <Route
            path='/event'
            element={!isUser && <AddEvent _id={user._id} updateOrgEvents={updateOrgEvents} />}
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

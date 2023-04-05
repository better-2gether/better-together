import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import OrgHome from './pages/OrgHome';
import './App.css';

function App() {

  const sampleOrg = {
    orgId: '123',
    orgName: 'Example Org',
    username: 'blahOrg',
    password: '12343',
    causes: ['Poverty', 'Education'],
    events:[{eventId: '123', title: 'New Event', date: new Date(2023, 3, 7), needs: ['SQL', 'web design'], userRanks: []},
      {eventId: '456', title: 'Another Event with a long title blah blah', date: new Date(2023, 3, 5), needs: ['SQL', 'web design'], userRanks: []},
      {eventId: '476', title: 'Another Event with an even long title blah blah', date: new Date(2023, 3, 4), needs: ['SQL', 'web design'], userRanks: []}
    ]
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar userType='organization' user={sampleOrg} />
        <Routes>
          <Route path='/' element={<OrgHome orgId={sampleOrg.orgId} orgName={sampleOrg.orgName} username={sampleOrg.username} causes={sampleOrg.causes} events={sampleOrg.events} />} />
          {/* <Route path='*' element={<PageNotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

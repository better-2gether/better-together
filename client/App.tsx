import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import OrgHome from './pages/OrgHome';
import './App.css';

function App() {

  const sampleEvents = [{eventId: '123', title: 'New Event', date: new Date(), needs: ['SQL', 'web design'], userRanks: []},
    {eventId: '456', title: 'New Event', date: new Date(), needs: ['SQL', 'web design'], userRanks: []}
  ];
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<OrgHome orgId={'123'} orgName={'Example Org'} username={'blahOrg'} password={'12343'} causes={['Poverty', 'Education']} events={sampleEvents} />} />
          {/* <Route path='*' element={<PageNotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

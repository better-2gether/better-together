import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import OrgHome from './pages/OrgHome';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <OrgHome></OrgHome>
  </React.StrictMode>
);

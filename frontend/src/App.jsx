import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Homepage from './components/HomePage';
import NewTripPage from './components/NewtripPage';
import TripDetails from './components/TripDetails';
import AuthenticateReturningUser from './components/AuthenticateReturningUser';
import Chat from './components/Chat';

function App() {

  return (
    <>
      <Routes>
        {/* <Chat /> */}
        <Route path='/' element={<Homepage />} />
        <Route path='/new' element={<NewTripPage />} />
        <Route path='/:id/details' element={<TripDetails />} />
        <Route path='/:id' element={<AuthenticateReturningUser />} />
      </Routes>
    </>
  );
}

export default App;

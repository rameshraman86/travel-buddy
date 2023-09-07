import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Homepage from './components/HomePage';
import NewTripPage from './components/NewtripPage';
import TripDetails from './components/TripDetails';
import AuthenticateReturningUser from './components/AuthenticateReturningUser';
import Chat from './components/Chat';
import NotFound from './components/NotFound';

function App() {

  const [tripLocation, setTripLocation] = useState('');

  const handleTripLocationChange = (event) => {
    setTripLocation(event.target.value);
  };


  return (
    <>
      <Routes>
        {/* <Chat /> */}
        <Route path='/' element={<Homepage />} />
        <Route path='/new' element={<NewTripPage
          tripLocation={tripLocation}
          handleTripLocationChange={handleTripLocationChange}
        />} />
        <Route path='/:id' element={<AuthenticateReturningUser />} />
        <Route path='/:id/details' element={<TripDetails
          tripLocation={tripLocation}
        />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

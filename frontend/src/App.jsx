import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Homepage from './components/HomePage';
import NewTripPage from './components/NewtripPage';
import TripDetails from './components/TripDetails';
import AuthenticateReturningUser from './components/AuthenticateReturningUser';
import NotFound from './components/NotFound';
import ChooseTrip from './components/ChooseTrip';

function App() {

  const [tripLocation, setTripLocation] = useState('');
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [email, setEmail] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);


  const handleTripLocationChange = (event) => {
    setTripLocation(event.target.value);
  };

  const handleTripNameChange = (event) => {
    setTripName(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSetEmail = (event) => {
    setEmail(event.target.value);
    setIsExistingUser(false); //this clears chooseTrip content if user changes email
  };


  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage
          email={email}
          handleSetEmail={handleSetEmail}
          isExistingUser={isExistingUser}
          setIsExistingUser={setIsExistingUser}
          setEmail={setEmail}
        />} />
        <Route path='/new' element={<NewTripPage
          tripLocation={tripLocation}
          handleTripLocationChange={handleTripLocationChange}
          tripName={tripName}
          handleTripNameChange={handleTripNameChange}
          startDate={startDate}
          handleStartDateChange={handleStartDateChange}
          endDate={endDate}
          handleEndDateChange={handleEndDateChange}
        />} />
        <Route path='/:id' element={<AuthenticateReturningUser
          email={email}
          handleSetEmail={handleSetEmail}
        />} />
        <Route path='/choose_trip' element={<ChooseTrip />} />
        <Route path='/:id/details' element={<TripDetails
          email={email}
          setEmail={setEmail}
          tripLocation={tripLocation}
          startDate={startDate}
          endDate={endDate}
        />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
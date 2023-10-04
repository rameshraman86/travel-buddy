import './styles/App.css';
import { useState } from 'react';
import { Route, Routes, useResolvedPath } from 'react-router-dom';

import Homepage from './components/HomePage';
import NewTripPage from './components/NewtripPage';
import TripDetails from './components/TripDetails';
import AuthenticateReturningUser from './components/AuthenticateReturningUser';
import NotFound from './components/NotFound';
import ChooseTrip from './components/ChooseTrip';
import Login from './components/Login';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';

function App() {

  const [tripLocation, setTripLocation] = useState('');
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');


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

  const handleSetPassword = (event) => {
    setPassword(event.target.value);
  };


  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
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

        <Route path='/login' element={<Login
          isExistingUser={isExistingUser}
          setIsExistingUser={setIsExistingUser}
          email={email}
          handleSetEmail={handleSetEmail}
          setEmail={setEmail}
          password={password}
          handleSetPassword={handleSetPassword}
        />} />

        <Route path='/signup' element={<Signup
          isExistingUser={isExistingUser}
          setIsExistingUser={setIsExistingUser}
          firstName={firstName}
          handleFirstNameChange={handleFirstNameChange}
          lastName={lastName}
          handleLastNameChange={handleLastNameChange}
          email={email}
          handleSetEmail={handleSetEmail}
          password={password}
          setPassword={setPassword}
          handleSetPassword={handleSetPassword}
          password2={password2}
          handlePassword2Change={handlePassword2Change}
        />} />

        <Route path='/resetpassword' element={<ResetPassword
          email={email}
          handleSetEmail={handleSetEmail}
          isExistingUser={isExistingUser}
          setIsExistingUser={setIsExistingUser}
          setEmail={setEmail}
          password={password}
          handleSetPassword={handleSetPassword}
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
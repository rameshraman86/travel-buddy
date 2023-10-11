import './styles/App.css';
import { useState } from 'react';
import { Navigate, Route, Routes, useResolvedPath } from 'react-router-dom';
import apiConfig from '../config';
import axios from 'axios';

import NewTripPage from './components/NewtripPage';
import TripDetails from './components/TripDetails';
import AuthenticateReturningUser from './components/AuthenticateReturningUser';
import NotFound from './components/NotFound';
import ChooseTrip from './components/ChooseTrip';
import Login from './components/Login';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';
import Verifyemail from './components/VerifyEmail';

const api_url = process.env.NODE_ENV === 'production' ? apiConfig.production : apiConfig.development;


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
  const [verificationCodeResent, setVerificationCodeResent] = useState(false);
  const [fromResetPasswordVerification, setFromResetPasswordVerification] = useState(false);

  const [verificationCode, setVerificationCode] = useState('');
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [verificationSuccessful, setVerificationSuccessful] = useState(false);
  const [verificationCodeIncorrect, setVerificationCodeIncorrect] = useState(false);
  const [verificationCodeExpired, setVerificationCodeExpired] = useState('');
  const [tripIDisValid, setTripIDisValid] = useState(true);


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

  const resetEmailPasswordFields = () => {
    setPassword('');
    setEmail('');
    setPassword2('');
    setFirstName('');
    setLastName('');
  };


  const checkEmailExists = (email) => {
    if (email !== '') {
      return true;
    }
    return false;
  };

  //GENERATE VERIFICATION CODE
  const generateVerificationCode = () => {
    const length = 6;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let verificationCode = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      verificationCode += characters.charAt(randomIndex);
    }
    return verificationCode;
  };

  //check if trip is valid or not
  const isValidTripIDCheck = async (id) => {
    try {
      const response = await axios.get(`${api_url}/api/trips/get-trip-details/${id}`);
      if (response.data.length === 0) {
        setTripIDisValid(false);
      } else {
        setTripIDisValid(true);
      }
    } catch (error) {
      console.log(`error fetching trip for the id:`, error);
    }
  };


  return (
    <>
      <Routes>
        <Route path='/' element={<Login
          isExistingUser={isExistingUser}
          setIsExistingUser={setIsExistingUser}
          email={email}
          handleSetEmail={handleSetEmail}
          setEmail={setEmail}
          password={password}
          handleSetPassword={handleSetPassword}
          setPassword={setPassword}
          resetEmailPasswordFields={resetEmailPasswordFields}
        />} />

        <Route path='/login' element={<Login
          isExistingUser={isExistingUser}
          setIsExistingUser={setIsExistingUser}
          email={email}
          handleSetEmail={handleSetEmail}
          setEmail={setEmail}
          password={password}
          handleSetPassword={handleSetPassword}
          setPassword={setPassword}
          resetEmailPasswordFields={resetEmailPasswordFields}
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
          resetEmailPasswordFields={resetEmailPasswordFields}
          generateVerificationCode={generateVerificationCode}
        />} />

        <Route
          path='/verify'
          element={
            checkEmailExists(email) ? (
              <Verifyemail
                generateVerificationCode={generateVerificationCode}
                verificationCodeResent={verificationCodeResent}
                setVerificationCodeResent={setVerificationCodeResent}
                fromResetPasswordVerification={fromResetPasswordVerification}
                setFromResetPasswordVerification={setFromResetPasswordVerification}
                verificationCode={verificationCode} setVerificationCode={setVerificationCode}
                verificationComplete={verificationComplete} setVerificationComplete={setVerificationComplete}
                verificationSuccessful={verificationSuccessful} setVerificationSuccessful={setVerificationSuccessful}
                verificationCodeIncorrect={verificationCodeIncorrect} setVerificationCodeIncorrect={setVerificationCodeIncorrect}
                verificationCodeExpired={verificationCodeExpired} setVerificationCodeExpired={setVerificationCodeExpired}
              />
            ) : (
              <Navigate to='/not-found' />
            )
          }
        />

        <Route path='/resetpassword' element={<ResetPassword
          email={email}
          handleSetEmail={handleSetEmail}
          isExistingUser={isExistingUser}
          setIsExistingUser={setIsExistingUser}
          setEmail={setEmail}
          password={password}
          handleSetPassword={handleSetPassword}
          generateVerificationCode={generateVerificationCode}
          setVerificationCodeResent={setVerificationCodeResent}
          fromResetPasswordVerification={fromResetPasswordVerification}
          setFromResetPasswordVerification={setFromResetPasswordVerification}
          verificationSuccessful={verificationSuccessful}
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

        <Route path='/:trip_id' element={<AuthenticateReturningUser
          email={email}
          handleSetEmail={handleSetEmail}
          tripIDisValid={tripIDisValid}
          isValidTripIDCheck={isValidTripIDCheck}
          isExistingUser={isExistingUser}
          setIsExistingUser={setIsExistingUser}
          setEmail={setEmail}
          password={password}
          handleSetPassword={handleSetPassword}
          setPassword={setPassword}
          resetEmailPasswordFields={resetEmailPasswordFields}
        />} />

        <Route path='/choose_trip' element={<ChooseTrip />} />
        <Route path='/:id/details' element={<TripDetails
          email={email}
          setEmail={setEmail}
          tripLocation={tripLocation}
          startDate={startDate}
          endDate={endDate}
          setIsExistingUser={setIsExistingUser}
          setPassword={setPassword}
        />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
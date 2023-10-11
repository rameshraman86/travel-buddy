import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import NotFound from "./NotFound";
import apiConfig from '../../config';
import ChooseTrip from "./ChooseTrip";

const api_url = process.env.NODE_ENV === 'production' ? apiConfig.production : apiConfig.development;


export default function AuthenticateReturningUser(props) {

  const {
    tripIDisValid, isValidTripIDCheck,
    isExistingUser, setIsExistingUser,
    email, handleSetEmail, setEmail,
    password, handleSetPassword,
    resetEmailPasswordFields,
  } = props;

  const [loginSuccessful, setLoginSuccessful] = useState(true);

  const navigate = useNavigate();
  const { trip_id } = useParams();


  //Check if the trip url is a valid url in db. set the tripIDisValid state to true or false accordingly
  useEffect(() => {
    isValidTripIDCheck(trip_id);
  }, []);


  const isUserAlreadyAssociatedWithTrip = async (tripid, email) => {
    try {
      const userTripsArray = await axios.get(`${api_url}/api/users/get-users-trips/${email}`);
      for (const trips of userTripsArray.data) {
        if (trips.trip_id == tripid) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error(`Error fetching trips of user, `, error);
    }
  };

  //associate the user to the trip if the user is not already associated
  const associateUserToTrips = async (trip_id,) => {
    try {
      if (await isUserAlreadyAssociatedWithTrip(trip_id, email) === false) {
        axios.post(`${api_url}/api/users/associate-users-trips`, {
          trip_id: trip_id,
          email: email,
        });
      }
    } catch (error) {
      console.log(`Error associating ${email} to ${trip_id}: `, error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${api_url}/api/users/login/`, {
        email: email,
        password: password
      }).then(res => {
        if (res.data.status === 'email_not_found') {
          setIsExistingUser(false);
          setLoginSuccessful(false);
        }
        if (res.data.status === 'user_unregistered') {
          setLoginSuccessful(false);
        }
        if (res.data.status === 'login_failed') {
          setIsExistingUser(false);
          setLoginSuccessful(false);
        }
        if (res.data.status === 'login_success') {
          sessionStorage.setItem('email', email);
          associateUserToTrips(trip_id, sessionStorage.getItem('email'));
          setIsExistingUser(true);
          setLoginSuccessful(true);
          navigate(`/${trip_id}/details`);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!tripIDisValid && <NotFound />}
      {tripIDisValid &&
        <>
          {!isExistingUser &&
            <div className="flex mt-64 min-h-full flex-1 flex-col justify-center items-center px-6 pb-12 gap-12">
              <div className="flex justify-center items-end gap-1.5">
                <h1 className="text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-700">Access Your Trip</h1>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 stroke-amber-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                </svg>
              </div>


              {!loginSuccessful &&
                <div>
                  Invalid Username or Password
                </div>
              }

              <div>
                <form className="flex flex-col" onSubmit={handleLogin}>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="E-mail"
                    value={email} onChange={handleSetEmail}
                  />
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                    value={password} onChange={handleSetPassword}
                  />
                  <button type="submit" className="btn-login">
                    Login
                  </button>
                </form>

                <div>
                  <Link className="text-amber-600" to='/resetpassword'> Forgot your password? </Link>
                </div>

                <div onClick={resetEmailPasswordFields}>
                  Not registered yet? Register <Link className="text-amber-600" to='/signup'>here</Link>
                </div>
              </div>
            </div >
          }
        </>
      }

    </>
  );
};

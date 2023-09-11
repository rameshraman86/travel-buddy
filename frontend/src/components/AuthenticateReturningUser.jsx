//this is a returning user who is landing in tripURL page shared with them by friend.
//user must authenticate with email.
//if email is not associated to trip, system will create it and show user the trip details
//if email is already associated to trip, system will take user to trip details.

//if user enters trip url 1, but the email is already associated to trip url 2, then they will be automatically
//navigated to trip url 2 instead of 1. 
//if user is not part of any trips, then system will create a new user record for email, associate it to the trip they were
//trying to access and take them there.
//this is because of restriction that 1 email = 1 trip.

import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import NotFound from "./NotFound";



export default function AuthenticateReturningUser({ email, handleSetEmail }) {
  const [tripIDisValid, setTripIDisValid] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();


  //Check if the trip url is a valid url in db. set the tripIDisValid state to true or false accordingly
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/trips/get-trip-details/${id}`);
        if (response.data.length === 0) {
          setTripIDisValid(false);
        } else {
          setTripIDisValid(true);
        }
      } catch (error) {
        console.log(`error fetching trip for the id:`, error);
      }
    };
    fetchData(id);
  }, []);


  async function handleSubmit(event) {
    event.preventDefault();
    const userObject = await axios.get(`http://localhost:8080/api/users/get-user-details/${email}`);
    if (userObject.data.length > 0) { //if user exists in the db, take them to url details
      navigate(`details`, { email });
    } else { //if user is new, create user record and take them to tripURL details
      try {
        axios.post(`http://localhost:8080/api/users/create-new-user/`, {
          email: email,
          trip_id: id,
        }).then(() => {
          navigate(`details`);
        });
      } catch (error) {
        console.log(`Error adding new user for the trip: `, error);
      }
    }
  };


  return (
    <>
      {!tripIDisValid && <NotFound />}
      {tripIDisValid &&

        <div className="flex mt-64 min-h-full flex-1 flex-col justify-center items-center px-6 pb-12 gap-12">
          <div className="flex justify-center items-end gap-1.5">

            <h1 className="text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">Travel Buddy</h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
            <h1 className="text-center text-4xl font-medium leading-9 tracking-tight text-gray-900"> - Open Your Trip!!!</h1>
          </div>

          <div className="flex justify-center items-center">
            <form className="space-y-2 flex gap-1" onSubmit={handleSubmit}>
              <div className="flex flex-col justify-center items-center">

                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    required={true}
                    placeholder="Please enter email"
                    value={email} onChange={handleSetEmail}
                    className="email block w-72 rounded-full border-0 py-1.5 px-3 text-gray-900 shadow-sm focus:outline-none ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6">
                  </input>
                </div>
              </div>
              <div>
                <button className="flex w-full justify-center rounded-full bg-amber-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  );
}

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



export default function AuthenticateReturningUser() {
  const [email, setEmail] = useState('');
  const [IDisValid, setIDisValid] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();


  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  };


  //Check if the trip url is a valid url in db. set the IDisValid state to true or false accordingly
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/trips/get-trip-details/${id}`);
        if (response.data.length === 0) {
          setIDisValid(false);
        } else {
          setIDisValid(true);
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
      navigate(`details`, {email});
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
      {!IDisValid && <NotFound />}
      {IDisValid &&
      <form onSubmit={handleSubmit}>
        <h1>Travel Buddy - open your trip!!!</h1>
        <input
          type="email"
          name="email"
          className="email"
          required={true}
          placeholder="Please enter email"
          value={email} onChange={handleSetEmail}
        ></input>
        <button type="submit">Login</button>
      </form>
      }
    </>
  );
}

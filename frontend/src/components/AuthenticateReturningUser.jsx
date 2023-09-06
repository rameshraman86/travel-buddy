//this is a returning user who is landing in tripURL page shared with them by friend.
//user must authenticate with email.
//if email is not associated to trip, system will create it and show user the trip details
//if email is already associated to trip, system will take user to trip details.


//if user enters trip url 1, but the email is already associated to trip url 2, then they will be automatically
//navigated to trip url 2 instead of 1. 
//if user is not part of any trips, then system will create a new user record for email, associate it to the trip they were
//trying to access and take them there.
//this is because of restriction that 1 email = 1 trip.

import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function AuthenticateReturningUser() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();


  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(`http://localhost:8080/api/users/${email}`);
    const userObject = await response.json();
    if (userObject.user) { //if user exists in the db, get their tripURL from db
      const response = await fetch(`http://localhost:8080/api/trips/${userObject.user.email}`); //will return full tripurl with email
      const tripURLObject = await response.json();
      navigate(`details`);
    } else { //if user is new, create user record and take them to tripURL details
      try {
        axios.post(`http://localhost:8080/api/users/new-user`, {
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
      <h1>Travel Buddy - open your trip!!!</h1>
      <form onSubmit={handleSubmit}>
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
    </>
  );
}

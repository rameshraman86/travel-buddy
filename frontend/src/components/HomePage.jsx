//this is homepage component
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Homepage(props) {
  const { email, handleSetEmail } = props;
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    // const response = await fetch(`http://localhost:8080/api/users/get-user-details/${email}`);
    // const userObject = await response.json();
    const userObject = await axios.get(`http://localhost:8080/api/users/get-user-details/${email}`);
    if(userObject.data.length > 0) { //if user exists in the db, take them to url details
      const response = await fetch(`http://localhost:8080/api/trips/get-trip-url/${userObject.data[0].email}`); //will return full tripurl
      const tripURLObject = await response.json();
      const tripDetailsRoute = tripURLObject.trip_url.split('/').pop() + "/details"; //strip the trip id from url and append /details route
      navigate(tripDetailsRoute); 
    } else { //if user is new, take them to create new trip page
      navigate("/new", { state: email });
    }
  };

  
  return (
    <>
      <h1>Travel Buddy!!!</h1>
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
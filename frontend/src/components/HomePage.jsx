//this is homepage component
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Homepage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(`http://localhost:8080/api/users/${email}`);
    const userObject = await response.json();
    if (userObject.user) { //if user exists in the db, take them to their tripURL details
      const response = await fetch(`http://localhost:8080/api/trips/${userObject.user.email}`); //will return full tripurl
      const tripURLObject = await response.json();
      const tripDetailsRoute = tripURLObject.trip_url.split('/').pop() + "/details"; //strip the trip id from url and append /details route
      navigate(tripDetailsRoute); 
    } else { //if user is new, take them to create new trip page
      navigate("/new", { state: email });
    }
  };


  const handleSetEmail = (event) => {
    setEmail(event.target.value);
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
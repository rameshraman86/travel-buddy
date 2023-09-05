//this is homepage component
import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";



export default function Homepage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); //to store and pass a state variable through navigate

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(`http://localhost:8080/api/users/${email}`);
    const userObject = await response.json();
    if (userObject.user) {
      const response = await fetch(`http://localhost:8080/api/trips/${userObject.user.email}`); //will return tripurl
      const tripURLObject = await response.json();
      navigate(tripURLObject.trip_url.split('/').pop()); 
    } else {
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
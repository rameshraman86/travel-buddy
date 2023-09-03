//this is homepage component
import React from "react";
import { useState } from "react";

export default function Homepage() {
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(`http://localhost:8080/api/users/${email}`);
    const user = await response.json();

    if (user.user) {
      alert(`Welcome back ${user.user.email}.. you'll be taken to your trip_url`);
    } else {
      alert(`Welcome new user ${email}. Create your new trip.`);
    }
  };

  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <h1>Travel Buddy!!!</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" className="email" placeholder="Please enter email" value={email} onChange={handleSetEmail}></input>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
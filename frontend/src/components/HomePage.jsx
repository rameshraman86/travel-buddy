//this is homepage component
import React from "react";
import { useState } from "react";

export default function Homepage() {
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    console.log('logging in...');
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
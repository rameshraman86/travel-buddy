import React from "react";
import { Link } from 'react-router-dom';


export default function NotFound() {

  return (
    <>
      <h1>Travel Buddy!!!</h1>
      <h3>Uh! Oh! this link does not exist. Click <Link to='/'>here</Link> to go back to home page</h3>
    </>
  );
}
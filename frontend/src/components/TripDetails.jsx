import React from "react";
import { useParams } from "react-router-dom";
import Itineraries from "./Itineraries";
import Chat from './Chat';


export default function TripDetails() {
  const { id } = useParams();
  return (

    <>
      <h1>Trip {id} details</h1>

      <Itineraries tripId={id} />
      
      <Chat/>
      <h2>Map</h2>
    </>
  );
}
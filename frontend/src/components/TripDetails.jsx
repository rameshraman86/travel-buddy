import React from "react";
import { useParams } from "react-router-dom";
import Itineraries from "./Itineraries";


export default function TripDetails() {
  const { id } = useParams();
  return (

    <>
      <h1>Trip {id} details</h1>

      <Itineraries tripId={id} />
      
      <h2>Messages </h2>
      <h2>Map</h2>
    </>
  );
}
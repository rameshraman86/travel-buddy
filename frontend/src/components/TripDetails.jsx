import React  from "react";
import { useParams, useNavigate } from "react-router-dom";
import Itineraries from "./Itineraries";
import Messages from "./Messages";
import Chat from './Chat';


export default function TripDetails() {
  const { id } = useParams();
  return (
    <>
      <h1>Trip {id} details</h1>
      <Itineraries tripID={id} />
      <Messages tripID={id} />
      <Chat/>
      <h2>Map</h2>
    </>
  );
}
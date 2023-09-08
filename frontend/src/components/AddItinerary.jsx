import ItineraryItem from './ItineraryItem'; // Import the ItineraryItem component
import React from 'react';
import { useState } from 'react';
import axios from 'axios';


export default function AddItinerary(props) {
  const {
    itineraryType,
    handleSetItineraryType,
    handleCreateNewItineraryClicked,
    tripID,
    handleSetItineraries,
    itineraries,
    handlesetShowErrorMessage
  } = props;



  const handleNewItinerarySubmit = async (event) => {
    event.preventDefault();
    try {

      if (itineraries.some(itinerary => itinerary.type === itineraryType)) {
        handlesetShowErrorMessage(true);
        return;
      } else {
        handlesetShowErrorMessage(false);
        const response = await axios.post(`http://localhost:8080/api/itinerary/create-new-itinerary`, {
          type: itineraryType,
          trip_id: tripID
        });
        handleSetItineraries(response.data);
        handleCreateNewItineraryClicked(event);
      }
    } catch (error) {
      console.log(`Error creating new itinerary: `, error);
    }
  };


  return (
    <>
      <div className='newItinerary'>
        <form onSubmit={handleNewItinerarySubmit}>
          <input
            type="text"
            name="type"
            className="type"
            required={true}
            value={itineraryType} onChange={handleSetItineraryType}
          ></input>
          <button type="submit">Create Trip</button>
          <button type="button" onClick={handleCreateNewItineraryClicked}>Cancel</button>
        </form>
      </div>
    </>
  );
}
import ItineraryItem from './ItineraryItem'; // Import the ItineraryItem component
import React from 'react';
import { useState } from 'react';
import axios from 'axios';


export default function AddItinerary(props) {
  const {
    itineraryType,
    handleSetItineraryType,
    handleCreateButtonClicked,
    tripID, 
    handleSetItineraries
  } = props;


  const handleNewItinerarySubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/itinerary/create-new-itinerary`, {
        type: itineraryType,
        trip_id: tripID
      });
      handleSetItineraries(response.data);
      handleCreateButtonClicked(event);
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
          <button type="button" onClick={handleCreateButtonClicked}>Cancel</button>
        </form>
      </div>
    </>
  );
}
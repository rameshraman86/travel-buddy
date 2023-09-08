import ItineraryItem from './ItineraryItem'; // Import the ItineraryItem component
import React from 'react';
import { useState } from 'react';



export default function AddItinerary(props) {
  const {
    itineraryType,
    handleSetItineraryType,
    itineraryDate,
    handleSetItineraryDate,
    handleNewItinerarySubmit,
    handleCreateButtonClicked,
  } = props;

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
          <input
            type="date"
            name="itineraryDate"
            className="itineraryDate"
            required={true}
            value={itineraryDate} onChange={handleSetItineraryDate}
          ></input>
        </form>
        <button type="submit">Create Trip</button>
        <button type="button" onClick={handleCreateButtonClicked}>Cancel</button>
      </div>
    </>
  );
}
import ItineraryItem from './ItineraryItem'; // Import the ItineraryItem component
import React from 'react';
import { useState } from 'react';
import AddItinerary from './AddItinerary';
//Linked from tripdetails component
export default function Itineraries({ itineraries, itineraryItems, tripID }) {

  const [createButtonClicked, setCreateButtonClicked] = useState(false); //state to maintain the itineraries of trip
  const [itineraryType, setItineraryType] = useState('');
  const [itineraryDate, setItineraryDate] = useState('');

  const handleSetItineraryType = (event) => {
    setItineraryType(event.target.value);
  };

  const handleSetItineraryDate = (event) => {
    setItineraryDate(event.target.value);
  };

  const handleCreateButtonClicked = (event) => {
    event.preventDefault();
    setCreateButtonClicked(!createButtonClicked);
  };


  return (
    <div className="itineraries">
      <h2>Itinerary</h2>
      <form onSubmit={handleCreateButtonClicked}>
        <button>New Itinerary</button>
      </form>
      {createButtonClicked && <AddItinerary
        itineraryType={itineraryType}
        handleSetItineraryType={handleSetItineraryType}
        itineraryDate={itineraryDate}
        handleSetItineraryDate={handleSetItineraryDate}
        handleCreateButtonClicked={handleCreateButtonClicked}
        tripID={tripID}
      />}
      {itineraries.map((itinerary) => (
        <div key={itinerary.id} className="itinerary">
          <div className="itinerary_title"><strong>{itinerary.type}</strong></div>
          {itineraryItems.map((item) => {
            if (itinerary.id === item.itinerary_id) {
              return (
                <ItineraryItem
                  key={item.url}
                  {...item} />
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
}

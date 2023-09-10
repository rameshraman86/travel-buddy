import "../styles/Itineraries.css";
import axios from "axios";
import ItineraryItem from './ItineraryItem'; // Import the ItineraryItem component
// import React from 'react';
import { useState } from 'react';
import AddItinerary from './AddItinerary';


//Linked from tripdetails component
export default function Itineraries({ itineraries, itineraryItems, setItineraryItems, handleMarkerClick, tripID, handleSetItineraries, handleUpdateItineraries }) {

  const [createButtonClicked, setCreateButtonClicked] = useState(false);
  const [itineraryType, setItineraryType] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleDeleteItineraryItems = async (url) => {
    try {
      await axios.delete(`http://localhost:8080/api/trips/delete-itinerary-item/${tripID}`, { data: { url } });

      const newItems = itineraryItems.filter(item => item.url !== url);
      setItineraryItems(newItems);
    } catch (error) {
      console.log(`Error deleting itinerary item: `, error);
    }
  };

  const handleSetItineraryType = (event) => {
    handlesetShowErrorMessage(false);
    setItineraryType(event.target.value);
  };

  const handlesetShowErrorMessage = (bool) => {
    setShowErrorMessage(bool);
  };

  const handleCreateNewItineraryClicked = (event) => {
    event.preventDefault();
    setItineraryType('');
    handlesetShowErrorMessage(false);
    setCreateButtonClicked(!createButtonClicked);
  };


  const handleDeleteItinerary = async (itinerary_deleted) => {
    const confirmDelete = confirm(`Delete ${itinerary_deleted.type}?`);
    if (confirmDelete) {
      //delete the itinerary from db
      try {
        const response = await axios.delete(`http://localhost:8080/api/itinerary/delete-itinerary/${itinerary_deleted.id}`);
        console.log(`response from delete itinerary:`, response);
      } catch (error) {
        console.log(`error deleting itinerary:`, error);
      }
      //delete the itinerary from state
      const updatedItineraries = itineraries.filter((itinerary) => itinerary.id !== itinerary_deleted.id);
      handleUpdateItineraries(updatedItineraries);
    }
  };


  return (
    <div className="Itineraries">
      <h2>Itinerary</h2>

      <form onSubmit={handleCreateNewItineraryClicked}>
        {showErrorMessage && <p>Itinerary type {itineraryType} already exists.</p>}
        <button type="submit" className='createNewItinerary'>New Itinerary</button>
      </form>
      {createButtonClicked && <AddItinerary
        itineraryType={itineraryType}
        handleSetItineraryType={handleSetItineraryType}
        handleCreateNewItineraryClicked={handleCreateNewItineraryClicked}
        tripID={tripID}
        handleSetItineraries={handleSetItineraries}
        itineraries={itineraries}
        showErrorMessage={showErrorMessage}
        handlesetShowErrorMessage={handlesetShowErrorMessage}
      />}

      {itineraries.map((itinerary) => (
        <div key={itinerary.id} className="itinerary">
          <div className="itinerary_title"><strong>{itinerary.type}</strong></div>
          <button type='button' className='deleteItinerary' onClick={() => handleDeleteItinerary(itinerary)}>Delete</button>
          {itineraryItems.map((item) => {
            if (itinerary.id === item.itinerary_id) {
              return (
                <ItineraryItem
                  key={item.url}
                  handleDelete={handleDeleteItineraryItems}
                  handleMarkerClick={handleMarkerClick}
                  item={item}
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

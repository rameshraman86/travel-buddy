import React, { useState, useEffect } from "react";
import axios from 'axios';
import ItineraryItem from './ItineraryItem'; // Import the ItineraryItem component

//Linked from tripdetails component
export default function Itineraries(props) {
  const [tripID, setTripID] = useState(props.tripID);
  const [itineraries, setItineraries] = useState([]);
  const [itineraryItems, setItineraryItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itinResponse = await axios.get(`http://localhost:8080/api/trips/itinerary-names/${tripID}`);
        setItineraries(itinResponse.data);

        const itinItemsResponse = await axios.get(`http://localhost:8080/api/trips/itinerary-items/${tripID}`);
        setItineraryItems(itinItemsResponse.data);
      } catch (error) {
        console.log(`error fetching itineraries:`, error);
      }
    };
    fetchData();
  }, []);

  
  return (
    <div className="itineraries"> 
    <h2>Itinerary</h2>
      {itineraries.map((itinerary) => (
        <div key={itinerary.id} className="itinerary">
          <div className="itinerary_title"><strong>{itinerary.type}</strong></div>
          {itineraryItems.map((item) => {
            if (itinerary.id === item.itinerary_id) {
              return (
                <ItineraryItem
                  key={item.id}
                  name={item.name}
                  address={item.address}
                  description={item.description}
                  category={item.category}
                />
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
}

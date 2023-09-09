import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

import Itineraries from "./Itineraries";
import Messages from "./Messages";
import Chat from './Chat';
import Map from "./Map";

const parseArr = (string) => {
  const arr = string.replace('{', '').replace('}', '').split(',');
  return arr.map(str => str.slice(1, -1));
};

import AIAssistant from "./AIAssistant";


export default function TripDetails({ email }) {
  const { id } = useParams();

  const [itineraries, setItineraries] = useState([]); //state to maintain the itineraries of trip
  const [itineraryItems, setItineraryItems] = useState([]);
  const [location, setLocation] = useState();

  //to handle adding new itinearies to current trip react component
  const handleSetItineraries = (new_itinerary) => {
    setItineraries(prev => [...prev, new_itinerary]);
  };

  //replace itinereries with new data
  const handleUpdateItineraries = (updatedItineraries) => {
    setItineraries(updatedItineraries);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripDetails = await axios.get(`http://localhost:8080/api/trips/get-trip-details/${id}`);
        setLocation(tripDetails.data[0].trip_location);

        const itinResponse = await axios.get(`http://localhost:8080/api/trips/itinerary-names/${id}`);
        setItineraries(itinResponse.data);

        const itinItemsResponse = await axios.get(`http://localhost:8080/api/trips/itinerary-items/${id}`);

        const formattedItineraryItems = itinItemsResponse.data.map(item => {
          return {
            ...item,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lng),
            opening_hours: Array.isArray(item.opening_hours) ? parseArr(item.opening_hours) : item.opening_hours,
            photos: Array.isArray(item.photos) ? parseArr(item.photos) : item.photos,
            rating: parseFloat(item.rating)
          };
        });
        setItineraryItems(formattedItineraryItems);

      } catch (error) {
        console.log(`error fetching itineraries:`, error);
      }
    };
    fetchData();
  }, []);

  const addToWishlist = async (selectedPlace, selectedItinerary) => {

    const newPlaceBody = {
      ...selectedPlace,
      itinerary_id: selectedItinerary[0].id, // TODO: assign to wishlist 
      trip_id: parseInt(id),
    };
    // console.log(`new place body is : ${JSON.stringify(newPlaceBody, null, 4)}`);

    setItineraryItems([...itineraryItems, newPlaceBody]);

    try {
      axios.post(`http://localhost:8080/api/trips/itinerary-items/${id}`, newPlaceBody);
    } catch (error) {
      console.log(`Error adding to Wishlist: `, error);
    }
  };


  return (
    <>
      <div>
        <h1>Trip {id} details</h1>
        <Itineraries
          tripID={id}
          itineraries={itineraries}
          itineraryItems={itineraryItems}
          handleSetItineraries={handleSetItineraries}
          handleUpdateItineraries={handleUpdateItineraries}
        />
      </div>
      <div>
        <Messages tripID={id} />
        <Chat avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/512px-Windows_10_Default_Profile_Picture.svg.png?20221210150350"
          email={email}
        />
        <AIAssistant tripID={id} />
      </div>
      <div>
        <h2>Map</h2>
        <Map
          itineraryItems={itineraryItems}
          location={location}
          addToWishlist={addToWishlist}
          tripID={id}
          itineraries={itineraries}
        />
      </div>
    </>
  );
}
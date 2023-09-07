import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

import Itineraries from "./Itineraries";
import Messages from "./Messages";
import Chat from './Chat';
import Map from "./Map";

const parseArr = (string) => {
  const arr = string.replace('{', '').replace('}', '').split(',');
  return arr.map(str => str.slice(1, -1));
};


export default function TripDetails() {
  const { id } = useParams();

  const [itineraries, setItineraries] = useState([]);
  const [itineraryItems, setItineraryItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itinResponse = await axios.get(`http://localhost:8080/api/trips/itinerary-names/${id}`);
        setItineraries(itinResponse.data);

        const itinItemsResponse = await axios.get(`http://localhost:8080/api/trips/itinerary-items/${id}`);

        const formattedItineraryItems = itinItemsResponse.data.map(item => {


          return {
            ...item,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lng),
            opening_hours: parseArr(item.opening_hours),
            photos: parseArr(item.photos),
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

  const addToWishlist = async (selectedPlace) => {
    const newPlaceBody = {
      ...selectedPlace,
      itinerary_id: 1, // TODO: assign to wishlist 
      trip_id: parseInt(id)
    };
    console.log(newPlaceBody);

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
          itineraries={itineraries}
          itineraryItems={itineraryItems} />
      </div>
      <div>
        <Messages tripID={id} />
        <Chat />
      </div>
      <div>
        <h2>Map</h2>
        <Map
          itineraryItems={itineraryItems}
          addToWishlist={addToWishlist} />
      </div>
    </>
  );
}
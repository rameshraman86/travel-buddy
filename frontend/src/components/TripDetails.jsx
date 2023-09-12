import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Itineraries from "./Itineraries";
import Messages from "./Messages";
// import Chat from './Chat';
// import Chat2 from './Chat2';
import Map from "./Map";
import AIAssistant from "./AIAssistant";
import Chat from "./Chat";


export default function TripDetails({ email, tripLocation, startDate, endDate }) {

  const { id } = useParams();

  const [itineraries, setItineraries] = useState([]); //state to maintain the itineraries of trip
  const [itineraryItems, setItineraryItems] = useState([]);
  const [location, setLocation] = useState("");
  const [tripName, setTripName] = useState("");
  const [tripDates, setTripDates] = useState({});
  const [messages, setMessages] = useState([]);

  //to handle adding new itinearies to current trip react component
  const handleSetItineraries = (new_itinerary) => {
    setItineraries(prev => [...prev, new_itinerary]);
  };

  //replace itinereries with new data
  const handleUpdateItineraries = (updatedItineraries) => {
    setItineraries(updatedItineraries);
  };

  //add a new incoming message to the state
  const handleSetMessages = (new_message) => {
    setMessages(prev => [...prev, new_message]);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripDetails = await axios.get(`http://localhost:8080/api/trips/get-trip-details/${id}`);

        setLocation(tripDetails.data[0].trip_location);
        setTripName(tripDetails.data[0].trip_name);
        setTripDates({ start: parseDate(tripDetails.data[0].start_date), end: parseDate(tripDetails.data[0].end_date) });

        const itinResponse = await axios.get(`http://localhost:8080/api/trips/itinerary-names/${id}`);
        setItineraries(itinResponse.data);

        const itinItemsResponse = await axios.get(`http://localhost:8080/api/trips/itinerary-items/${id}`);

        const formattedItineraryItems = itinItemsResponse.data.map(item => {
          return {
            ...item,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lng),
            opening_hours: item.opening_hours && parseArr(item.opening_hours),
            photos: item.photos && parseArr(item.photos),
            rating: parseFloat(item.rating)
          };
        });
        // console.log(formattedItineraryItems);
        setItineraryItems(formattedItineraryItems);


        //to render/update messages component
        const messagesResponse = await axios.get(`http://localhost:8080/api/messages/get-trip-messages/${id}`);
        setMessages(messagesResponse.data);

      } catch (error) {
        console.log(`error fetching itineraries:`, error);
      }
    };
    fetchData();
  }, []);

  const [suggestedPlaces, setSuggestedPlaces] = useState(undefined);
  // set suggestedPlaces to filter out the new place
  const addToWishlist = async (selectedPlace, selectedItinerary) => {
    const newPlaceBody = {
      ...selectedPlace,
      // itinerary_id: parseInt(id), 
      itinerary_id: selectedItinerary.id,
      trip_id: parseInt(id),
    };
    // console.log(`newPlaceBody : ${JSON.stringify(newPlaceBody, null, 4)}`);
    setItineraryItems([...itineraryItems, newPlaceBody]);
    setSuggestedPlaces(suggestedPlaces.filter(place => place.url !== newPlaceBody.url));
    try {
      await axios.post(`http://localhost:8080/api/trips/itinerary-items/${id}`, newPlaceBody);
    } catch (error) {
      console.log(`Error adding to Wishlist: `, error);
    }
  };

  const [mapRef, setMapRef] = useState(undefined);
  const [selectedPlace, setSelectedPlace] = useState(undefined);

  const handleMarkerClick = (place) => {
    mapRef?.setZoom(14);
    mapRef?.panTo({ lat: place.lat, lng: place.lng });
    place === selectedPlace
      ? setSelectedPlace(undefined)
      : setSelectedPlace(place);
  };

  const [isHovered, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <div className="flex m-0 p-0 w-screen h-screen">
      <div className="py-4 px-4 w-full overflow-y-auto">
        <div>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {isHovered ? "Logout" : email}
          </button>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{tripName}</h1>
          <div className="flex items-center">
            <span className="text-lg text-gray-600 font-extrabold mx-0.5">{location}</span>
            <span className="w-1.5 h-1.5 mx-1.5 bg-gray-600 rounded-full dark:bg-gray-400"></span>
            <span className="text-lg text-gray-600 font-bold ml-0.5">{tripDates?.start} - {tripDates?.end}</span>
          </div>
          <Itineraries
            tripID={id}
            itineraries={itineraries}
            itineraryItems={itineraryItems}
            setItineraryItems={setItineraryItems}
            handleMarkerClick={handleMarkerClick}
            handleSetItineraries={handleSetItineraries}
            handleUpdateItineraries={handleUpdateItineraries}
          />
        </div>

        <div className="mt-10">
          <AIAssistant
            tripID={id}
            tripLocation={tripLocation}
            startDate={startDate}
            endDate={endDate}
          />
        </div>


        <div className="bg-white/[0.5] rounded-xl w-full p-4 mt-2 my-5">
          <Messages
            tripID={id}
            messages={messages}
            name={email}
          />
          {/* <Chat2 avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/512px-Windows_10_Default_Profile_Picture.svg.png?20221210150350"
            email={email}
            tripID={id}
            messages={messages}
            handleSetMessages={handleSetMessages}
          /> */}
          <Chat
            avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/512px-Windows_10_Default_Profile_Picture.svg.png?20221210150350"
            email={email}
            tripID={id}
            messages={messages}
            handleSetMessages={handleSetMessages}
          />
        </div>


      </div>
      <Map
        itineraryItems={itineraryItems}
        location={location}
        addToWishlist={addToWishlist}
        tripID={id}
        itineraries={itineraries}
        setMapRef={setMapRef}
        selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace}
        handleMarkerClick={handleMarkerClick}
        suggestedPlaces={suggestedPlaces}
        setSuggestedPlaces={setSuggestedPlaces}
      />



    </div>

  );
}

const parseArr = (string) => {
  const arr = string.replace('{', '').replace('}', '').split(',');
  return arr.map(str => str.slice(1, -1));
};

const parseDate = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so adding 1
  const day = date.getDate();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = daysOfWeek[date.getDay()];

  // Creating a readable string
  return `${dayOfWeek}, ${day}/${month}/${year}`;


};

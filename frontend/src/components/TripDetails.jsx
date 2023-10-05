import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Itineraries from "./Itineraries";
import Messages from "./Messages";
import Map from "./Map";
import AIAssistant from "./AIAssistant";
import Chat from "./Chat";
import apiConfig from '../../config';

const api_url = process.env.NODE_ENV === 'production' ? apiConfig.production : apiConfig.development;


export default function TripDetails({ email, setEmail, tripLocation, startDate, endDate }) {

  const { id } = useParams();

  const [itineraries, setItineraries] = useState([]);
  const [itineraryItems, setItineraryItems] = useState([]);
  const [location, setLocation] = useState("");
  const [tripName, setTripName] = useState("");
  const [tripDates, setTripDates] = useState({});
  const [messages, setMessages] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [suggestedPlaces, setSuggestedPlaces] = useState(undefined);
  const [mapRef, setMapRef] = useState(undefined);
  const [selectedPlace, setSelectedPlace] = useState(undefined);

  const navigate = useNavigate();


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



  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  const handleLogoutButton = (event) => {
    event.preventDefault();
    navigate(`/login`);
    sessionStorage.removeItem('email');
    setEmail('');
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripDetails = await axios.get(`${api_url}/api/trips/get-trip-details/${id}`);

        setLocation(tripDetails.data[0].trip_location);
        setTripName(tripDetails.data[0].trip_name);
        setTripDates({ start: parseDate(tripDetails.data[0].start_date), end: parseDate(tripDetails.data[0].end_date) });

        const itinResponse = await axios.get(`${api_url}/api/trips/itinerary-names/${id}`);
        setItineraries(itinResponse.data);

        const itinItemsResponse = await axios.get(`${api_url}/api/trips/itinerary-items/${id}`);

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
        setItineraryItems(formattedItineraryItems);


        //to render/update messages component
        const messagesResponse = await axios.get(`${api_url}/api/messages/get-trip-messages/${id}`);
        setMessages(messagesResponse.data);

      } catch (error) {
        console.log(`error fetching itineraries:`, error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    setEmail(sessionStorage.getItem('email'));
  }, []);


  // set suggestedPlaces to filter out the new place
  const addToWishlist = (selectedPlace, selectedItinerary) => {
    const newPlaceBody = {
      ...selectedPlace,
      itinerary_id: selectedItinerary.id,
      trip_id: parseInt(id),
    };
    setItineraryItems([...itineraryItems, newPlaceBody]);
    setSuggestedPlaces(suggestedPlaces.filter(place => place.url !== newPlaceBody.url));
    addToWishlistDB(newPlaceBody);
  };

  const addToWishlistDB = async (newPlaceBody) => {
    try {
      await axios.post(`${api_url}/api/trips/itinerary-items/${id}`, newPlaceBody);
    } catch (error) {
      console.log(`Error adding to Wishlist: `, error);
    }
  };



  const handleMarkerClick = (place) => {
    mapRef?.setZoom(14);
    mapRef?.panTo({ lat: place.lat, lng: place.lng });
    place === selectedPlace
      ? setSelectedPlace(undefined)
      : setSelectedPlace(place);
  };



  return (
    <div className="flex m-0 p-0 w-screen h-screen">
      <div className="py-4 px-4 w-full overflow-y-auto">

        <div className="flex justify-between items-end gap-1.5">
          <div className="flex flex-row">
            <h1 className="text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-800">Travel Buddy</h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 stroke-amber-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
          </div>
          <form onSubmit={handleLogoutButton} className="flex justify-right">
            <button className=" hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              {isHovered ? "Logout" : email}
            </button>
          </form>
        </div >

        <div className="my-6">
          <h1 className="text-2xl font-bold text-gray-800">{tripName}</h1>
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

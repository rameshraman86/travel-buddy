import '../styles/Map.css';
import InfoWindow from './InfoWindow';
import PlacesAutocomplete from './PlacesAutocomplete';
import FuzzySearchForm from './FuzzySearchForm';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { passiveSupport } from 'passive-events-support/src/utils';


function Map({ itineraryItems, addToWishlist, location, tripID, itineraries, setMapRef, selectedPlace, setSelectedPlace, handleMarkerClick }) {

  const [position, setPosition] = useState(null);
  //store the itinerary that is selected in the add to list map popup. this is passed to the addToWishlist function to insert the place into the correct itinerary
  const [selectedItinerary, setSelectedItinerary] = useState('');

  //get the itineraryid using the itinerary name(when user chooses it in map popup) and trip id(is a props)
  //input - tripID, itinerary Type(e.g wishlist). 
  //output - itinerary record that matches itinerary type in the tripID
  const getItineraryIDFromType = async (itineraryType, tripID) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/itinerary/get-itinerary-by-type-tripid/${itineraryType}/${tripID}`);
      const itineraryData = response.data;
      return itineraryData;
    } catch (error) {
      console.log(`error fetching itineraryID:`, error);
    }
  };


  const getLatLonForLocation = async (tripLocation) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(tripLocation)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

    const geocodeResponse = await axios.get(geocodeUrl);
    if (geocodeResponse.data.results[0]) {
      const firstResult = geocodeResponse.data.results[0];
      const { geometry: { location: { lat, lng } } } = firstResult;
      return { lat, lng };
    } else {
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (location) {
        const coordinates = await getLatLonForLocation(location);
        setPosition(coordinates);
      }
    };
    fetchData();
  }, [location]);



  passiveSupport({
    debug: false,
    listeners: [
      {
        element: 'div',
        event: 'touchstart'
      },
      {
        element: 'div',
        event: 'touchmove'
      },
      {
        element: 'div',
        event: 'touchend'
      },
      {
        element: 'div',
        event: 'wheel'
      },
      {
        element: 'div',
        event: 'mousewheel'
      }
    ]
  });

  const [libraries] = useState(['places']);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const [searchedPlace, setSearchedPlace] = useState(null);
  const [suggestedPlaces, setSuggestedPlaces] = useState(undefined);

  const options = {
    disableDefaultUI: true,
    zoomControl: true
  };

  const onMapLoad = (map) => {
    setMapRef(map);
  };




  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <FuzzySearchForm
        setSuggestedPlaces={setSuggestedPlaces}
        position={position}
        setPosition={setPosition}
        selectMarker={handleMarkerClick} />


      <div className="places-container">
        <PlacesAutocomplete
          setSearchedPlace={setSearchedPlace}
          setPosition={setPosition}
          selectMarker={handleMarkerClick}
          position={position}
        />
      </div>

      <GoogleMap
        mapContainerClassName="map-container"
        center={position}
        zoom={12}
        onLoad={onMapLoad}
        onClick={() => setSelectedPlace(undefined)}
        options={options}
      >
        {itineraryItems && (itineraryItems.map(place => (
          <MarkerF
            key={`${place.lat}-${place.lng}`}
            position={{ lat: place.lat, lng: place.lng }}
            // icon={customMarker}
            onClick={() => handleMarkerClick(place)}
          />
        )))}

        {searchedPlace && <MarkerF
          key={`${searchedPlace.lat}-${searchedPlace.lng}`}
          position={{ lat: searchedPlace.lat, lng: searchedPlace.lng }}
          icon={"http://maps.google.com/mapfiles/ms/icons/purple-dot.png"}
          onClick={() => handleMarkerClick(searchedPlace)}
        />}

        {suggestedPlaces && (suggestedPlaces.map(place => (
          <MarkerF
            key={`${place.lat}-${place.lng}`}
            position={{ lat: place.lat, lng: place.lng }}
            icon={"http://maps.google.com/mapfiles/ms/icons/pink-dot.png"}
            onClick={() => handleMarkerClick(place)}
          />
        )))}


        <InfoWindow
          selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace} itineraryItems={itineraryItems} addToWishlist={addToWishlist}
          selectedItinerary={selectedItinerary}
          setSelectedItinerary={setSelectedItinerary}
          getItineraryIDFromType={getItineraryIDFromType}
          tripID={tripID}
          itineraries={itineraries}
        />
      </GoogleMap>
    </div>
  );
}

// <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><rect fill="none" height="24" width="24"/><path d="M12,2L12,2C8.13,2,5,5.13,5,9c0,1.74,0.5,3.37,1.41,4.84c0.95,1.54,2.2,2.86,3.16,4.4c0.47,0.75,0.81,1.45,1.17,2.26 C11,21.05,11.21,22,12,22h0c0.79,0,1-0.95,1.25-1.5c0.37-0.81,0.7-1.51,1.17-2.26c0.96-1.53,2.21-2.85,3.16-4.4 C18.5,12.37,19,10.74,19,9C19,5.13,15.87,2,12,2z M12,11.75c-1.38,0-2.5-1.12-2.5-2.5s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5 S13.38,11.75,12,11.75z"/></svg>
// const customMarker = {
//   path: "M12,2L12,2C8.13,2,5,5.13,5,9c0,1.74,0.5,3.37,1.41,4.84c0.95,1.54,2.2,2.86,3.16,4.4c0.47,0.75,0.81,1.45,1.17,2.26 C11,21.05,11.21,22,12,22h0c0.79,0,1-0.95,1.25-1.5c0.37-0.81,0.7-1.51,1.17-2.26c0.96-1.53,2.21-2.85,3.16-4.4 C18.5,12.37,19,10.74,19,9C19,5.13,15.87,2,12,2z M12,11.75c-1.38,0-2.5-1.12-2.5-2.5s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5 S13.38,11.75,12,11.75z",
//   fillColor: "#000000",
//   fillOpacity: 2,
//   strokeWeight: 1,
//   rotation: 0,
//   scale: 1.9,
// };


export default Map;

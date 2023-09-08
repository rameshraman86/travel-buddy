import './Map.css';
import InfoWindow from './InfoWindow';
import PlacesAutocomplete from './PlacesAutocomplete';
import FuzzySearchForm from './FuzzySearchForm';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { passiveSupport } from 'passive-events-support/src/utils';


function Map({ itineraryItems, addToWishlist, location,  tripID, itineraries }) {

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

  const customMarker = {
    path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
    fillColor: "red",
    fillOpacity: 2,
    strokeWeight: 1,
    rotation: 0,
    scale: 1,
  };

  // const [places, setPlaces] = useState(itineraryItems);
  const [mapRef, setMapRef] = useState(undefined);
  const [selectedPlace, setSelectedPlace] = useState(undefined);
  const [searchedPlace, setSearchedPlace] = useState(null);
  const [suggestedPlaces, setSuggestedPlaces] = useState(undefined);

  const options = {
    disableDefaultUI: true,
    zoomControl: true
  };

  const onMapLoad = (map) => {
    setMapRef(map);
  };

  const handleMarkerClick = (place) => {
    mapRef?.setZoom(15);
    mapRef?.panTo({ lat: place.lat, lng: place.lng });
    place === selectedPlace
      ? setSelectedPlace(undefined)
      : setSelectedPlace(place);
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


export default Map;

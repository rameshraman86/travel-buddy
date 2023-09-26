import '../styles/Map.css';
import InfoWindow from './InfoWindow';
import PlacesAutocomplete from './PlacesAutocomplete';
import FuzzySearchForm from './FuzzySearchForm';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { passiveSupport } from 'passive-events-support/src/utils';

// TODO: Overlapping markers - Remove pink marker when added to list

function Map({ itineraryItems, suggestedPlaces, setSuggestedPlaces, addToWishlist, location, tripID, itineraries, mapRef, setMapRef, selectedPlace, setSelectedPlace, handleMarkerClick }) {

  const [position, setPosition] = useState(null);
  // stores the itinerary that is selected in the add to list map popup. this is passed to the addToWishlist function
  const [selectedItinerary, setSelectedItinerary] = useState(itineraries[0]);

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
    debug: false, listeners: [{ element: 'div', event: 'touchstart' }, { element: 'div', event: 'touchmove' }, { element: 'div', event: 'touchend' }, { element: 'div', event: 'wheel' }, { element: 'div', event: 'mousewheel' }]
  });

  const [libraries] = useState(['places']);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const [searchedPlace, setSearchedPlace] = useState(null);

  const options = {
    disableDefaultUI: true,
    mapId: '700efce11ab7b45f',
    zoomControl: true,
  };

  const onMapLoad = useCallback((map) => setMapRef(map), []);


  useEffect(() => {
    if (mapRef && suggestedPlaces) {
      const bounds = new window.google.maps.LatLngBounds();
      suggestedPlaces?.map(marker => {
        bounds.extend({
          lat: marker.lat,
          lng: marker.lng,
        });
      });
      mapRef.fitBounds(bounds);
    }
  }, [mapRef, suggestedPlaces]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className='w-full max-h-screen relative overflow-hidden'>
      <FuzzySearchForm
        setSuggestedPlaces={setSuggestedPlaces}
        position={position}
      />

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
            icon={{
              url: place.icon, // url
              scaledSize: new google.maps.Size(28, 28), // scaled size
              origin: new google.maps.Point(0, 0), // origin
              anchor: new google.maps.Point(15, 25) // anchor
            }}
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
          tripID={tripID}
          itineraries={itineraries}
        />
      </GoogleMap>
    </div>
  );
}


export default Map;

import './Map.css';
import PlacesAutocomplete from './PlacesAutocomplete';
import FuzzySearchForm from './FuzzySearchForm';
import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF
} from "@react-google-maps/api";
import { passiveSupport } from 'passive-events-support/src/utils';
import { Rating, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Carousel from 'react-material-ui-carousel';


// TODO: set center position from user input



function Map({ itineraryItems, addToWishlist }) {
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

  // starting position: change to user inputted location
  const coordinates = { lat: 35.6762, lng: 139.6503 };

  const [position, setPosition] = useState(coordinates);
  // const [places, setPlaces] = useState(itineraryItems);
  const [mapRef, setMapRef] = useState(undefined);
  const [selectedPlace, setSelectedPlace] = useState(undefined);
  const [searchedPlace, setSearchedPlace] = useState(null);

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

  const AccordionStyle = {
    padding: 0
  };




  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      {/* <FuzzySearchForm
          setSearchedPlace={setSearchedPlace}
          setPosition={setPosition}
          selectMarker={handleMarkerClick} /> */}


      <div className="places-container">
        <PlacesAutocomplete
          setSearchedPlace={setSearchedPlace}
          setPosition={setPosition}
          selectMarker={handleMarkerClick}
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


        {selectedPlace && (
          <InfoWindowF
            position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
            zIndex={1}
            options={{
              pixelOffset: {
                width: 0,
                height: -40
              }
            }}
            onCloseClick={() => {
              setSelectedPlace(undefined);
            }}
          >
            <div>
              <div className='info-window-title'>
                <h3 className='info-window-row'>
                  <img src={selectedPlace.icon} className='icon' />
                  {selectedPlace.name}
                </h3>
                {itineraryItems.some(place => place.url === selectedPlace.url) ?
                  <p>In "Wishlist"</p> :
                  <button onClick={() => addToWishlist(selectedPlace)}>
                    <AddCircleIcon fontSize="small" color="primary" />
                    Add to "Wishlist"
                  </button>}
              </div>
              {selectedPlace.photos &&
                <Carousel navButtonsAlwaysVisible={true} autoPlay={false}
                  navButtonsProps={{
                    style: {
                      // backgroundColor: 'cornflowerblue',
                      height: '20px',
                      width: '20px',
                    }
                  }} >
                  {selectedPlace.photos.map((img, id) => (
                    <div className="Showcase_div" key={id}><img key={id} src={img} /></div>

                  ))
                  }
                </Carousel>}

              <p>{selectedPlace.address}</p>
              <a href={selectedPlace.website}>{selectedPlace.website}</a>
              <p>{selectedPlace.phone}</p>

              {selectedPlace.rating &&
                (<div className='info-window-row'>
                  <span>{selectedPlace.rating}</span>
                  <Rating value={selectedPlace.rating}
                    precision={0.5}
                    size="small"
                    readOnly />
                  {selectedPlace.user_ratings_total && <span>({selectedPlace.user_ratings_total.toLocaleString()})</span>}
                </div>)
              }

              {selectedPlace.opening_hours &&
                <div>
                  <Accordion elevation={0}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={AccordionStyle}>
                      <div>Opening Hours:</div>
                    </AccordionSummary>
                    <AccordionDetails sx={AccordionStyle}>
                      {selectedPlace.opening_hours.map((day, index) =>
                        <div key={index}>{day}</div>)}
                    </AccordionDetails>
                  </Accordion>
                </div>}

              <br />
              <a href={selectedPlace.url}>View in Google Maps</a>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
}


export default Map;

import { useState, useEffect } from 'react';

import { InfoWindowF } from "@react-google-maps/api";
import { Rating, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Carousel from 'react-material-ui-carousel';

function InfoWindow({ selectedPlace, setSelectedPlace, itineraryItems, addToWishlist }) {

  const AccordionStyle = {
    padding: 0
  };

  return (
    <>

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
            {selectedPlace.phone && <p>{selectedPlace.phone}</p>}

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
    </>
  );

}

export default InfoWindow;
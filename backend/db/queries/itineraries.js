const db = require('../connection');

//**************READ */
//get all itineraries by trip id
const getItinerariesByTripID = (trip_id) => {
  const queryString = 'SELECT * FROM itinerary WHERE trip_id=$1;';
  const queryParams = [trip_id];
  return db
    .query(queryString, queryParams)
    .then(data => data.rows)
    .catch(error => console.error(`Error fetching itinerary for trip id ${trip_id}`, error));
};


const getItineraryItemsByTripID = (trip_id) => {
  const queryString = 'SELECT * FROM itinerary_items WHERE trip_id=$1;';
  const queryParams = [trip_id];
  return db
    .query(queryString, queryParams)
    .then(data => data.rows)
    .catch(error => console.error(`Error fetching itinerary items for trip id ${trip_id}`, error));
};
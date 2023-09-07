const db = require('../connection');

//**************READ */
//get all itineraries
const getItineraries = () => {
  const queryString = 'SELECT * FROM itinerary;';
  return db
    .query(queryString)
    .then(data => data.rows)
    .catch(error => console.error(`Error fetching itinerary`, error));
};



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

//**********************CREATE************************
// add default wishlist to every new trip
const createWishListItinerary = (tripIDObj) => {
  const queryString = `INSERT INTO itinerary(trip_id, type) VALUES ($1,$2) RETURNING *;`;
  const queryParams = [tripIDObj.trip_id, "Wishlist"];
  return db
    .query(queryString, queryParams)
    .then(data => data.rows[0])
    .catch(error => console.log(`error adding wishlist to ${tripIDObj.trip_id}`, error));

};

module.exports = {
  getItineraries,
  getItinerariesByTripID,
  getItineraryItemsByTripID,
  createWishListItinerary
};
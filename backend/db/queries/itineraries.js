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

//get all itinerary items by trip id
const getItineraryItemsByTripID = (trip_id) => {
  const queryString = 'SELECT * FROM itinerary_items WHERE trip_id=$1 ORDER BY type;';
  const queryParams = [trip_id];
  return db
    .query(queryString, queryParams)
    .then(data => data.rows)
    .catch(error => console.error(`Error fetching itinerary items for trip id ${trip_id}`, error));
};


//get itinerary by name and trip id
const getItineraryByTypeTripID = (type, trip_id) => {
  const queryString = 'SELECT * FROM itinerary WHERE type=$1 AND trip_id=$2;';
  const queryParams = [type, trip_id];
  return db
    .query(queryString, queryParams)
    .then(data => data.rows)
    .catch(error => console.error(`Error fetching itinerary type ${type} for trip id ${trip_id}`, error));
};


//**********************CREATE************************
const addItineraryItem = ({ itinerary_id, trip_id, lat, lng, address, phone, name, rating, user_ratings_total, url, opening_hours, website, type, photos, icon, completed }) => {
  const queryString = `INSERT INTO itinerary_items (itinerary_id, trip_id, lat, lng, address, phone, name, rating, user_ratings_total, url, opening_hours, website, type, photos, icon, completed) VALUES ($1, $2, $3, $4, $5, $6, $7,$8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *;`;
  const queryParams = [itinerary_id, trip_id, lat, lng, address, phone, name, rating, user_ratings_total, url, opening_hours, website, type, photos, icon, completed];
  return db
    .query(queryString, queryParams)
    .then(data => data.rows[0])
    .catch(error => console.error(`Error adding to itinerary items for trip id ${trip_id}`, error));
};

const deleteItineraryItem = (trip_id, url) => {
  const queryString = `DELETE FROM itinerary_items WHERE trip_id = $1 AND url = $2  RETURNING *;`;
  const queryParams = [trip_id, url];

  return db
    .query(queryString, queryParams)
    .then(data => data.rows[0])
    .catch(error => console.error(`Error deleting itinerary item for trip id ${trip_id}`, error));
};

// add default wishlist to every new trip
const createWishListItinerary = (tripIDObj) => {
  const queryString = `INSERT INTO itinerary(trip_id, type) VALUES ($1,$2) RETURNING *;`;
  const queryParams = [tripIDObj.trip_id, "wishlist"];
  return db
    .query(queryString, queryParams)
    .then(data => data.rows[0])
    .catch(error => console.log(`error adding wishlist to ${tripIDObj.trip_id}`, error));
};

//add a new itinerary to trip ID
const addItinerary = ({ trip_id, type }) => {
  const queryString = `INSERT INTO itinerary (trip_id, type) VALUES ($1, $2) RETURNING *;`;
  const queryParams = [trip_id, type];
  return db
    .query(queryString, queryParams)
    .then(data => data.rows[0])
    .catch(error => console.error(`Error adding to itinerary for trip id ${trip_id}`, error));
};


//**********************DELETE************************
const deleteItinerary = (itinerary_id) => {
  const queryString = `DELETE FROM itinerary WHERE id=$1 RETURNING *;`;
  const queryParams = [itinerary_id];
  return db
    .query(queryString, queryParams)
    .then(data => data.rows[0])
    .catch(error => console.error(`Error deleting itinerary item ${itinerary_id}`, error));
};




module.exports = {
  getItineraries,
  getItinerariesByTripID,
  getItineraryItemsByTripID,
  addItineraryItem,
  createWishListItinerary,
  getItineraryByTypeTripID,
  deleteItineraryItem,
  addItinerary,
  deleteItinerary
};
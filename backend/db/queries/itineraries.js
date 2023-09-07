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

const addItineraryItem = ({ itinerary_id, trip_id, lat, lng, address, phone, name, rating, user_ratings_total, url, opening_hours, website, type, photos, icon, completed }) => {
  const queryString = `INSERT INTO itinerary_items (itinerary_id, trip_id, lat, lng, address, phone, name, rating, user_ratings_total, url, opening_hours, website, type, photos, icon, completed) VALUES ($1, $2, $3, $4, $5, $6, $7,$8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *;`;
  const queryParams = [itinerary_id, trip_id, lat, lng, address, phone, name, rating, user_ratings_total, url, opening_hours, website, type, photos, icon, completed];
  return db
    .query(queryString, queryParams)
    .then(data => data.rows[0])
    .catch(error => console.error(`Error adding to itinerary items for trip id ${trip_id}`, error));
};

module.exports = {
  getItinerariesByTripID,
  getItineraryItemsByTripID,
  addItineraryItem
};
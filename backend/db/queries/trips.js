const db = require('../connection');

//get all trips
const getTrips = () => {
  const queryString = "SELECT * FROM trips;";
  return db
    .query(queryString)
    .then((data) => data.rows)
    .catch((error) => console.error(`Errors returning all trips: `, error));
};

//get one trip by its id
const getTripDetailsbyTripID = (trip_id) => {
  const queryString = "SELECT * FROM trips WHERE id=$1;";
  const queryParams = [trip_id];
  return db
    .query(queryString, queryParams)
    .then(data => data.rows)
    .catch(error => console.error(`Errors returning trip ${trip_id}: `, error));
};


//get the most recent trip
const getRecentTrip = () => {
  const queryString = "SELECT * FROM trips ORDER BY id DESC LIMIT 1;";
  return db
    .query(queryString)
    .then(data => data.rows)
    .catch((error) => console.errors(`Error returning recent record: `, error));
};


// ***********CREATE***********
const createNewTrip = (trip) => {
  const queryString = `INSERT INTO trips(trip_url, trip_name, start_date, end_date, is_editable) VALUES ($1, $2, $3, $4, $5) RETURNING * ;`;
  const queryParams = [trip.trip_url, trip.trip_name, trip.start_date, trip.end_date, "TRUE"];
  return db
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => console.log(`error adding a new trip: `, error));

};

module.exports = {
  getTrips,
  getTripDetailsbyTripID,
  getRecentTrip,
  createNewTrip,
};
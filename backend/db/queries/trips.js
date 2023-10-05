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


//get all Trips of a user by email
const getAllTripsByEmail = (email) => {
  const queryString = "SELECT trip_url, trip_name, start_date, end_date, trip_location FROM trips AS t JOIN UserTripsAssociation AS ua ON t.id = ua.trip_id WHERE ua.user_email=$1;";
  const queryParams = [email];
  return db
    .query(queryString, queryParams)
    .then(data => data.rows)
    .catch(error => console.error(`Error fetching all trips of user `, error));
};


// ***********CREATE***********
const createNewTrip = (trip) => {
  const queryString = `INSERT INTO trips(trip_url, trip_name, start_date, end_date, trip_location, is_editable) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ;`;
  const queryParams = [trip.trip_url, trip.trip_name, trip.start_date, trip.end_date, trip.trip_location, "TRUE"];
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
  getAllTripsByEmail,
  createNewTrip,
};
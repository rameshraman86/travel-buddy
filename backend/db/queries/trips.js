const db = require('../connection');


const getTrips = () => {
  const queryString = "SELECT * FROM trips;";
  return db
    .query(queryString)
    .then((data) => data.rows)
    .catch((error) => console.error(`Errors running all trips: `, error));
};


const getRecentTrip = () => {
  const queryString = "SELECT * FROM trips ORDER BY id DESC LIMIT 1;";
  return db
    .query(queryString)
    .then(data => data.rows)
    .catch((error) => console.errors(`Error returning recent record: `, error));
};


module.exports = {
  getTrips,
  getRecentTrip
};
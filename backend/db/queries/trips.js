const db = require('../connection');


const getTrips = () => {
  const queryString = "SELECT * FROM trips;";
  return db
    .query(queryString)
    .then((data) => data.rows)
    .catch((error) => console.error(`Errors running q: `, error));
};


module.exports = {
  getTrips
};
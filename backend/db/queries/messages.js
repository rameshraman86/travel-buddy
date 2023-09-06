const db = require('../connection');


//GET all messages by trip_id
const getMessagesByTripID = (tripID) => {
  const queryString = `SELECT u.email, m.message, m.id, m.trip_id FROM users AS u JOIN messages AS m ON u.id=m.user_id WHERE m.trip_id=$1;`;
  const queryParams = [tripID];

  return db.query(queryString, queryParams)
    .then(data => data.rows)
    .catch(error => console.error(`error returning messages by trip: `, error));
};

module.exports = {
  getMessagesByTripID
};
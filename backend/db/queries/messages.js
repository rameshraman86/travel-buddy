const db = require('../connection');


//GET all messages by trip_id
const getMessagesByTripID = (tripID) => {
  const queryString = `SELECT u.email, m.message, m.id, m.trip_id FROM users AS u JOIN messages AS m ON u.id=m.user_id WHERE m.trip_id=$1;`;
  const queryParams = [tripID];
  return db.query(queryString, queryParams)
    .then(data => data.rows)
    .catch(error => console.error(`error returning messages by trip: `, error));
};


// ***********INSERT***********
//POST a new message
const postMessage = (messageObj) => {
  const queryString = `INSERT INTO messages (trip_id, user_id, message, created_at)
  SELECT
      $1 AS trip_id,
      u.id AS user_id,
      $2 AS message,
      NOW() AS created_at
  FROM (
      SELECT id
      FROM users
      WHERE email = $3
  ) AS u
   RETURNING *;`;
  const queryParams = [messageObj.tripID, messageObj.message, messageObj.email];
  return db.query(queryString, queryParams)
    .then(data => data.rows)
    .catch(error => console.error(`error posting message: `, error));
};


module.exports = {
  getMessagesByTripID,
  postMessage
};
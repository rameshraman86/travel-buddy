//queries where multiple tables need to be joined

const db = require('../connection');

const getTripURLByEmail = (email) => {
  const queryString = 'SELECT t.trip_url FROM trips as t JOIN users AS u ON t.id=u.trip_id WHERE email =$1;';
  const queryParams = [email];
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0];
    })
    .catch(error => console.log(`error getting url: `, error));
};



module.exports = {
  getTripURLByEmail
};

const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

//******check if user exists by email */
const getUserByEmail = (email) => {
  return db.query(`SELECT * FROM users WHERE email=$1;`, [email])
    .then(data => {
      return data.rows;
    });
};


//***************CREATE ***************/
const createNewUser = (user) => {
  const queryString = `INSERT INTO users(first_name, last_name, email, password) VALUES ($1,$2, $3, $4) RETURNING * ;`;
  const queryParams = [user.firstName, user.lastName, user.email, user.password];
  return db
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => console.log(`error adding a new user: `, error));

};


const associateUserTrips = (user) => {
  const queryString = `INSERT INTO UserTripsAssociation(trip_id, user_email) VALUES ($1, $2) RETURNING * ;`;
  const queryParams = [user.trip_id, user.email];
  return db
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows[0];
    })
    .catch(error => console.log(`error adding trip and users association. `, error));
};


module.exports = {
  getUsers,
  getUserByEmail,
  createNewUser,
  associateUserTrips
};

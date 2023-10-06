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
  const queryString = `INSERT INTO users(first_name, last_name, email, password, verification_code, expire_at) VALUES ($1,$2, $3, $4, $5,  NOW()+ INTERVAL '10 minutes') RETURNING * ;`;
  const queryParams = [user.firstName, user.lastName, user.email, user.password, user.verification_code];
  return db
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => console.error(`error adding a new user: `, error));

};


const associateUserTrips = (user) => {
  const queryString = `INSERT INTO UserTripsAssociation(trip_id, user_email) VALUES ($1, $2) RETURNING * ;`;
  const queryParams = [user.trip_id, user.email];
  return db
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows[0];
    })
    .catch(error => console.error(`error adding trip and users association. `, error));
};


//*******************UPDATE*******************
const setRegisteredTrue = (email) => {
  const queryString = 'UPDATE users SET registered=true WHERE email=$1 RETURNING *;';
  const queryParams = [email];
  return db
    .query(queryString, queryParams)
    .then(data => data.rows[0])
    .catch(error => console.error(`Error updating registered flag for ${email}`, error));
};

const updateVerificationCode = (userData) => {
  const queryString = 'UPDATE users SET verification_code=$1, created_at=NOW(), expire_at=NOW()+ INTERVAL \'10 minutes\' where email=$2 RETURNING *;';
  const queryParams = [userData.verification_code, userData.email];
  return db
    .query(queryString, queryParams)
    .then(data => data.rows[0])
    .catch(error => console.error(`Error updating verification code for ${email}`, error));
};


module.exports = {
  getUsers,
  getUserByEmail,
  createNewUser,
  associateUserTrips,
  setRegisteredTrue,
  updateVerificationCode
};

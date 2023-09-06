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
  const queryString = `INSERT INTO users(email, trip_id) VALUES ($1,$2) RETURNING * ;`;
  const queryParams = [user.email, user.trip_id];
  return db
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => console.log(`error adding a new user: `, error));

};



module.exports = {
  getUsers,
  getUserByEmail,
  createNewUser
};

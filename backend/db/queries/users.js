const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};



//******check if user exists by email */
const getUserByEmail = (email) => {
  return db.query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then(data => {
      return data.rows[0];
    });
};

module.exports = {
  getUsers,
  getUserByEmail
};

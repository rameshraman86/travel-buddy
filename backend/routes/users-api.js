/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


router.get('/:email', (req, res) => {
  const email = req.params.email;
  userQueries.getUserByEmail(email)
    .then(user => {
      console.log(user);
      res.json({ user });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


//***************CREATE ***************/
router.post('/new-user', (req, res) => {
  const user = req.body;
  console.log(`user is : `, user);
  userQueries.createNewUser(user)
    .then((user) => {
      res.send(user);
    })
    .catch(error => {
      res.status(500).json({ error_create_user: error.message });
    });

});


module.exports = router;

/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;



//*******************READ*******************
router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});


//get user details by user email
router.get('/get-user-details/:email', (req, res) => {
  const email = req.params.email;
  userQueries.getUserByEmail(email)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


//login user with email and password
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  userQueries.getUserByEmail(email)
    .then(user => {
      if (user.length > 0) {
        //email found in the database. Checking if password is correct
        bcrypt.compare(password, user[0].password).then(function(result) {
          if (result) {
            res.json({
              status: true,
              message: 'login success',
            });
          } else {
            res.json({
              status: false,
              message: 'login failed',
            });
          }
        });
      } else {
        //email not found in the database
        res.json(
          {
            status: false,
            message: 'email not found',
          }
        );
      }
    })
    .catch(error => {
      res.status(500).json({ error_logging_in: error });
    });
});



//***************CREATE ***************/
// router.post('/create-new-user', (req, res) => {
//   const user = req.body;
//   userQueries.createNewUser(user)
//     .then((user) => {
//       res.send(user);
//     })
//     .catch(error => {
//       res.status(500).json({ error_create_user: error.message });
//     });

// });


//*******************CREATE*******************
router.post('/register-new-user', (req, res) => {
  const user = req.body;
  bcrypt.hash(user.password, saltRounds).then(function(hashedPassword) {
    user.password = hashedPassword;

    userQueries.createNewUser(user)
      .then((user) => {
        res.send(user);
      })
      .catch(error => {
        res.status(500).json({ error_create_user: error.message });
      });
  });
});


module.exports = router;

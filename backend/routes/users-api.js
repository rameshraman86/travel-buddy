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
      if (user.length === 0) {
        res.json({ status: 'email_not_found' });//email not found in the database
        return;
      }
      if (!user[0].registered) {
        res.json({ status: 'user_unregistered' }); //user not registered yet
        return;
      }
      if (user.length > 0) {
        bcrypt.compare(password, user[0].password).then(function(result) {
          if (result) { //passwords match
            res.json({ status: 'login_success' });
            return;
          } else { //passwords dont' match
            res.json({ status: 'login_failed' });
            return;
          }
        });
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

router.post(`/associate-users-trips`, (req, res) => {
  const user = req.body;
  userQueries.associateUserTrips(user)
    .then(associatedUserTrip => {
      res.send(associatedUserTrip);
    })
    .catch(error => {
      res.status(500).json({ error_associating_user_trip: error.message });
    });
});


//*******************UPDATE*******************
router.put(`/update-registered-flag/:email`, (req, res) => {
  const email = req.params.email;
  userQueries.setRegisteredTrue(email)
    .then(updatedUser => {
      res.send(updatedUser);
    })
    .catch((error) => {
      res.status(500).json({ error_updating_registered_flag: error.message });
    });
});



router.post(`/update-verificationcode`, (req, res) => {
  const userData = req.body;
  userQueries.updateVerificationCode(userData)
    .then(result => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).json({ error_updating_verification_code: error.message });
    });
});



module.exports = router;

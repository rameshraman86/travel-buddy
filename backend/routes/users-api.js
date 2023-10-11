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
const nodemailer = require('nodemailer');

//*******************EMAIL SERVER*******************
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.email_username,
    pass: process.env.email_pass,
  }
});

async function sendEmail(receiver, plainTextBody, htmlBody) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Travel Buddy Support" <travelbuddysupport@gmail.com>', // sender address
    to: receiver,
    subject: "Your Verification Code",
    text: plainTextBody,
    html: htmlBody,
  });
}



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


//get all trips of the user
router.get('/get-users-trips/:email', (req, res) => {
  const email = req.params.email;
  userQueries.getUserTripsByEmail(email)
    .then(trips => {
      res.send(trips);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


//*******************CREATE*******************
router.post('/register-new-user', (req, res) => {
  const user = req.body;
  bcrypt.hash(user.password, saltRounds).then(function(hashedPassword) {
    user.password = hashedPassword;

    userQueries.createNewUser(user)
      .then((user) => {
        const plainTextBody = `Your verification code is ${user.verification_code}. This code will expire in 10 minutes.`;
        const htmlBody = `<p>Your verification code is <strong>${user.verification_code}</strong>. This code will expire in 10 minutes. </p>`;
        sendEmail(user.email, plainTextBody, htmlBody);
        res.send(user);
      })
      .catch(error => {
        res.status(500).json({ error_create_user: error.message });
      });
  });
});


//update password
router.post('/update-password', (req, res) => {
  const user = req.body; //password, email
  bcrypt.hash(user.password, saltRounds).then(function(hashedNewPassword) {
    user.password = hashedNewPassword;

    userQueries.updatePassword(user)
      .then((user) => {
        res.send(user);
      })
      .catch(error => {
        res.status(500).json({ error_updating_password: error.message });
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
      const receiver = result.email;
      const plainTextBody = `Your verification code is ${result.verification_code}. This code will expire in 10 minutes.`;
      const htmlBody = `<p>Your verification code is <strong>${result.verification_code}</strong>. This code will expire in 10 minutes. </p>`;
      sendEmail(receiver, plainTextBody, htmlBody);
      res.send(result);
    })
    .catch((error) => {
      res.status(500).json({ error_updating_verification_code: error.message });
    });
});



module.exports = router;

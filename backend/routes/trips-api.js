const express = require("express");
const router = express.Router();
const trips = require("../db/queries/trips");


// ***********READ***********
//get all trips
router.get("/", (req, res) => {
  trips
    .getTrips()
    .then((trips) => {
      res.send(trips);
    })
    .catch((error) => {
      res.status(500).json({ error_all_trip: error.message });
    });
});


//get the most recent trip from db
router.get("/recent", (req, res) => {
  trips.getRecentTrip()
    .then((trips) => {
      res.send(trips);
    })
    .catch((error) => {
      res.status(500).json({ error_recent_trip: error.message });
    });
});

// ***********CREATE***********
//create a new trip record in the trips db. 

//Then, create a new record in the users db with this trip_url



module.exports = router;
const express = require("express");
const router = express.Router();
const trips = require("../db/queries/trips");
const tripData = require("../db/queries/tripsData");
const itineraries = require("../db/queries/itineraries");
const messages = require("../db/queries/messages");

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

//get trip url of a user by email
router.get("/:email", (req, res) => {
  const email = req.params.email;
  tripData.getTripURLByEmail(email)
    .then(tripURL => {
      res.send(tripURL);
    })
    .catch(error => {
      res.status(500).json({ error_recent_trip: error.message });
    });
});


//get all trip itineraries by trip id
router.get("/itinerary-names/:tripid", (req, res) => {
  const trip_id = req.params.tripid;
  itineraries.getItinerariesByTripID(trip_id)
    .then(itineraries => {
      res.send(itineraries);
    })
    .catch(error => {
      res.status(500).json({ error_itineraries: error.message });
    });
});
//get all trip itinerary items by trip id
router.get("/itinerary-items/:tripid", (req, res) => {
  const trip_id = req.params.tripid;
  itineraries.getItineraryItemsByTripID(trip_id)
    .then(itineryItems => {
      res.send(itineryItems);
    })
    .catch(error => {
      res.status(500).json({ error_itineryItems: error.message });
    });
});


//get all messages of a trip
router.get("/messages/:tripid", (req, res) => {
  const trip_id = req.params.tripid;
  messages.getMessagesByTripID(trip_id)
    .then(messages => {
      res.send(messages);
    })
    .catch(error => {
      res.status(500).json({ error_trip_messages: error.message });
    });
});


// ***********CREATE***********
router.post('/new-trip', (req, res) => {
  const trip = req.body;
  trips.createNewTrip(trip)
    .then((trip) => {
      res.send(trip);
    })
    .catch(error => {
      res.status(500).json({ error_create_trip: error.message });
    });

});




module.exports = router;
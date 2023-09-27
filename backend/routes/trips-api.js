const express = require("express");
const router = express.Router();
const trips = require("../db/queries/trips");
const tripsData = require("../db/queries/tripsData");
const itineraries = require("../db/queries/itineraries");
const crypto = require('crypto');

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


//get a trip by trip id
router.get("/get-trip-details/:trip_id", (req, res) => {
  const trip_id = req.params.trip_id;
  trips.getTripDetailsbyTripID(trip_id)
    .then(trip => res.send(trip))
    .catch(error => res.status(500).json({ error_all_trip: error.message }));
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
router.get("/get-trip-url/:email", (req, res) => {
  const email = req.params.email;
  tripsData.getTripURLByEmail(email)
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

router.post("/itinerary-items/:tripid", (req, res) => {
  const itineraryItem = req.body;
  itineraries.addItineraryItem(itineraryItem)

    .then(itineryItem => {
      res.send(itineryItem);
    })
    .catch(error => {
      res.status(500).json({ error_itineryItem: error.message });
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

//generate a new sha1 for string to use as tripUrlID
router.get('/generate-sha1/:string', (req, res) => {
  const string = req.params.string;
  const hash = crypto.createHash('sha1').update(string).digest('hex');
  res.send(hash);
});


// ***********DELETE***********
router.delete(`/delete-itinerary-item/:trip_id`, (req, res) => {
  const trip_id = req.params.trip_id;
  const url = req.body.url;

  itineraries.deleteItineraryItem(trip_id, url)
    .then((itinerary) => {
      res.send(itinerary);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error_deleting_itinerary_item: error.message });
    });
});

// ***********UPDATE***********
router.put(`/move-itinerary-item/:trip_id`, (req, res) => {
  const trip_id = req.params.trip_id;
  const url = req.body.data.url;
  const itinerary_id = req.body.data.itinerary_id;

  itineraries.updateItineraryItem(itinerary_id, trip_id, url)
    .then((itinerary) => {
      res.send(itinerary);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error_updating_itinerary_item: error.message });
    });
});


module.exports = router;
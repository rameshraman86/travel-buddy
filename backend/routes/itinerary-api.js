const express = require("express");
const router = express.Router();
const trips = require("../db/queries/trips");
const itineraries = require("../db/queries/itineraries");

//get all itineraries
router.get("/", (req, res) => {
  itineraries
    .getItineraries()
    .then((itinerary) => {
      res.send(itinerary);
    })
    .catch((error) => {
      res.status(500).json({ error_all_itineraries: error.message });
    });
});

//get itinerary by type and trip id
router.get("/get-itinerary-by-type-tripid/:type/:trip_id", (req, res) => {
  const type = req.params.type;
  const trip_id = req.params.trip_id;
  itineraries.getItineraryByTypeTripID(type, trip_id)
    .then(itinerary => res.send(itinerary))
    .catch(error => res.status(500).json({ error_all_itineraries: error.message }));
});


// ***********CREATE***********
router.post('/create-wishlist-itinerary', (req, res) => {
  const tripIDObj = req.body;
  itineraries.createWishListItinerary(tripIDObj)
    .then((itinerary) => {
      res.send(itinerary);
    })
    .catch(error => {
      res.status(500).json({ error_creating_wishlist: error.message });
    });
});


module.exports = router;
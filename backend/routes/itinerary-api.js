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


// ***********CREATE***********
router.post('/create-wishlist-itinerary/:tripid', (req, res) => {
  const trip_id = req.body.params;
  itineraries.createWishListItinerary(trip_id)
    .then((itinerary) => {
      res.send(itinerary);
    })
    .catch(error => {
      res.status(500).json({ error_creating_wishlist: error.message });
    });
});


module.exports = router;
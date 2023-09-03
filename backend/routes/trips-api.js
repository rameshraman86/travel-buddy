const express = require("express");
const router = express.Router();
const trips = require("../db/queries/trips");


router.get("/", (req, res) => {
  trips
    .getTrips()
    .then((trips) => {
      res.send(trips);
    })
    .catch((err) => {
      res.status(500).json({ errorsss: err.message });
    });
});


module.exports = router;

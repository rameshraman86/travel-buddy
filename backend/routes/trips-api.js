const express = require("express");
const router = express.Router();
const tripsDB = require("../db/queries/tripsDB");


router.get("/", (req, res) => {
  console.log('api-reached');
  tripsDB
    .getTrips()
    .then((trips) => {
      res.send(trips);
    })
    .catch((err) => {
      res.status(500).json({ errorsss: err.message });
    });
});


module.exports = router;

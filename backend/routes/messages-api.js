const express = require("express");
const router = express.Router();
const messages = require("../db/queries/messages");


//***********READ***********/
//get all messages of a trip
router.get("/get-trip-messages/:tripid", (req, res) => {
  const trip_id = req.params.tripid;
  messages.getMessagesByTripID(trip_id)
    .then(messages => {
      res.send(messages);
    })
    .catch(error => {
      res.status(500).json({ error_trip_messages: error.message });
    });
});


//*****************CREATE *************/
//create a new message
router.post('/create-new-message', (req, res) => {
  const messageObj = req.body;
  messages.postMessage(messageObj)
    .then((message) => {
      res.send(message);
    })
    .catch(error => {
      res.status(500).json({ error_creating_new_message: error.message });
    });
}
);


module.exports = router;
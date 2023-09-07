const express = require("express");
const router = express.Router();
const axios = require('axios');
const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

async function getPlaceInfo(query) {
  const encodedQuery = encodeURIComponent(query); // Encode the query parameter
  let textSearch = `https://maps.googleapis.com/maps/api/place/textsearch/json`;
  textSearch += `?location=42.3675294%2C-71.186966&query=${encodedQuery}`;
  textSearch += `&radius=10000`;
  textSearch += `&key=AIzaSyDlKwuiOlQJfWG0n7i-yAv3KuBjsqmCXuI`;
  // console.log(process.env.VITE_GOOGLE_MAPS_API_KEY);

  try {
    const response = await axios.get(textSearch);
    const data = await response.json();
    return data;

  } catch (error) {
    throw error;
  }
}

router.get('/places', async (req, res) => {
  try {
    console.log('api hit');
    const placeInfo = await getPlaceInfo(req.body);
    res.send(placeInfo);

  } catch (error) {
    res.json({ error_fetch_from_google_api: error.message });
  }
});


router.get("/", async (req, res) => {
  client
    .elevation({
      params: {
        address: "123 main street",
        location: [{ lat: 42.3675294, lng: -71.186966 }],
        key: "AIzaSyDlKwuiOlQJfWG0n7i-yAv3KuBjsqmCXuI",
      },
      timeout: 1000, // milliseconds
    })
    .then((r) => {
      console.log(r.data.results[0].elevation);
    })
    .catch((e) => {
      console.log(e.response.data.error_message);
    });
});

module.exports = router;
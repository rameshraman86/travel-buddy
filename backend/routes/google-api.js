const express = require("express");
const router = express.Router();
const axios = require('axios');
const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

router.get("/", async (req, res) => {
  client
    .elevation({
      params: {
        locations: [{ lat: 45, lng: -110 }],
        key: process.env.VITE_GOOGLE_MAPS_API_KEY,
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

async function getPlaceInfo() {
  // const encodedQuery = encodeURIComponent(query); // Encode the query parameter

  const textSearch = `https://maps.googleapis.com/maps/api/place/textsearch/json
  ?location=42.3675294%2C-71.186966
  &query=123%20main%20street
  &radius=10000
  &key=${process.env.VITE_GOOGLE_MAPS_API_KEY}`;
  // console.log(process.env.VITE_GOOGLE_MAPS_API_KEY);

  try {
    const response = await axios.get(textSearch);

    if (response.status !== 200) {
      throw new Error(`Google Places API request failed with status: ${response.status}`);
    }
    console.log(response);

    const data = await response.json();
    return data;

  } catch (error) {
    throw error;
  }


}

router.get('/places', async (req, res) => {
  try {
    console.log('api hit');
    const placeInfo = await getPlaceInfo();
    res.send(placeInfo);

  } catch (error) {
    res.status(500).json({ error_fetch_from_google_api: error.message });
  }
});

module.exports = router;
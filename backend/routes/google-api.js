const express = require("express");
const router = express.Router();
const axios = require('axios');
const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

router.get('/places', async (req, res) => {
  try {
    const placeInfo = await getPlaceInfo(req.query);
    res.send(placeInfo);

  } catch (error) {
    res.json({ error_fetch_from_google_api: error.message });
  }
});

router.get('/place-details', async (req, res) => {
  try {
    const details = await getDetails(req.query);
    res.send(details);

  } catch (error) {
    res.json({ error_fetch_from_place_details_api: error.message });
  }
});


async function getPlaceInfo(query) {
  const encodedInput = encodeURIComponent(query.input);
  const { lat, lng } = query.position;

  let textSearch = `https://maps.googleapis.com/maps/api/place/textsearch/json`;
  textSearch += `?location=${lat}%2C${lng}&query=${encodedInput}`;
  textSearch += `&radius=10000`;
  textSearch += `&key=${process.env.VITE_GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(textSearch);
    return response.data;

  } catch (error) {
    throw error;
  }
}

async function getDetails(query) {
  let str = `https://maps.googleapis.com/maps/api/place/details/json`;
  str += `?place_id=${query.placeId}`;
  str += `&key=${process.env.VITE_GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(str);
    return response.data;

  } catch (error) {
    throw error;
  }
}

module.exports = router;
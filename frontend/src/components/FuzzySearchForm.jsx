import { useState } from 'react';
import { Autocomplete } from "@react-google-maps/api";
import axios from 'axios';
import "../styles/FuzzySearchForm.css";


// BUG: autocomplete doesn't update state of input

function FuzzySearchForm({ position, setSuggestedPlaces, setPosition }) {
  const [input, setInput] = useState("");

  const getPhotoUrl = (reference) => {
    let str = `https://maps.googleapis.com/maps/api/place/photo`;
    str += `?maxwidth=400`;
    str += `&photo_reference=${reference}`;
    str += `&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

    return str;
  };


  const handleSubmit = e => {
    e.preventDefault();
    getSearchResult(input);
    setInput("");
  };


  const getSearchResult = async (input) => {
    try {
      const result = await axios.get(`http://localhost:8080/api/google/places`, { params: { input, position } });
      const resultsArr = result.data.results;
      // console.log("TEXT SEARCH RESULT:", resultsArr);

      const placeDetailsArr = await Promise.all(resultsArr.map(async (result) => {
        try {
          const details = await axios.get(`http://localhost:8080/api/google/place-details`, { params: { placeId: result.place_id } });

          return details.data.result;
        } catch (error) {
          console.log(`error fetching photo:`, error);
        }
      }));

      // console.log(placeDetailsArr);

      const formattedResultsArr = placeDetailsArr.map(details => {
        return {
          lat: details.geometry.location.lat,
          lng: details.geometry.location.lng,
          address: details?.formatted_address,
          phone: details?.international_phone_number,
          name: details?.name,
          rating: details?.rating,
          user_ratings_total: details?.user_ratings_total,
          url: details?.url,
          opening_hours: details?.opening_hours?.weekday_text || null,
          website: details?.website,
          type: details?.types?.[0],
          photos: details?.photos?.map(photo => getPhotoUrl(photo.photo_reference)) || null,
          // photos: getPhotoUrl(details?.photos?.[0].photo_reference),
          icon: details?.icon
        };
      });

      // console.log(formattedResultsArr[0].photos);
      setSuggestedPlaces(formattedResultsArr);

    } catch (error) {
      console.log(`error fetching text search results:`, error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Autocomplete>
        <input
          className="input"
          placeholder="Coffee shops, museums..."
          onChange={e => setInput(e.target.value)}
          value={input}
          name="input"
          type="text" />
      </Autocomplete>
      <input type='submit' />
    </form>
  );

}

export default FuzzySearchForm;
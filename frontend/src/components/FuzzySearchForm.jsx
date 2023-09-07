import { useState } from 'react';
import { Autocomplete } from "@react-google-maps/api";


// BUG: autocomplete doesn't update state of input

function FuzzySearchForm({ setSearchedPlace, setPosition, selectMarker }) {
  const [input, setInput] = useState("");

  async function getLatLonForCity(city) {
    // Places API: a backend api request

    // const textSearch = `https://maps.googleapis.com/maps/api/place/textsearch/json
    // ?location=42.3675294%2C-71.186966
    // &query=123%20main%20street
    // &radius=10000
    // &key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

    const geocodeResponse = await fetch(geocodeUrl);
    console.log(geocodeResponse);
    const geocodeData = await geocodeResponse.json();
    const { geometry: { location: { lat, lng } } } = geocodeData.results[0];

    return { lat, lng };
  }

  const handleSubmit = e => {
    e.preventDefault();
    getSearchResult(input);

  };

  const getSearchResult = async (formData) => {
    const { lat, lng } = await getLatLonForCity(formData);
    setPosition({ lat, lng });
    setSearchedPlace({ lat, lng });
    selectMarker({ lat, lng });

  };

  return (
    <form onSubmit={handleSubmit}>
      <Autocomplete>
        <input
          className="input"
          placeholder="Berlin, Toronto, etc..."
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
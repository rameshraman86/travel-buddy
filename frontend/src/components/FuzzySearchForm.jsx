import { useState } from 'react';
// import { Autocomplete } from "@react-google-maps/api";
import axios from 'axios';
import "../styles/FuzzySearchForm.css";
import apiConfig from '../../config';

const api_url = process.env.NODE_ENV === 'production' ? apiConfig.production : apiConfig.development;

// BUG: autocomplete doesn't update state of input

function FuzzySearchForm({ position, setSuggestedPlaces }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    getSearchResult(input);
    setInput("");
  };

  const getSearchResult = async (input) => {
    setIsLoading(true);
    try {
      const result = await axios.get(`${api_url}/api/google/places`, { params: { input, position } });
      const resultsArr = result.data.results;
      const placeDetailsArr = await Promise.all(resultsArr.map(async (result) => {
        try {
          const details = await axios.get(`${api_url}/api/google/place-details`, { params: { placeId: result.place_id } });
          return details.data.result;
        } catch (error) {
          console.log(`error fetching photo:`, error);
        }
      }));

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
          icon: details?.icon
        };
      });
      setSuggestedPlaces(formattedResultsArr);

    } catch (error) {
      console.log(`error fetching text search results:`, error);
    }
    setIsLoading(false);

  };



  return (
    <form onSubmit={handleSubmit} className='relative top-16 left-5 -mt-12'>
      <div className='inline-flex flex-col justify-center relative z-10'>
        <input
          className="opacity-75 p-2 pl-8 rounded-full border border-gray-500 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          placeholder="Coffee shops, museums..."
          autoComplete='off'
          onChange={e => setInput(e.target.value)}
          value={input}
          name="input"
          type="text" />
        <svg className="w-4 h-4 absolute left-3 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        <button type="submit" hidden>Search</button>
      </div>

      {isLoading &&
        <div className='inline-flex flex-col ml-2 justify-center relative z-10'>
          <div
            className="inline-block h-4 w-4  animate-spin rounded-full border-4 border-solid border-gray-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
          </div>
        </div>
      }
    </form>
  );

}

const getPhotoUrl = (reference) => {
  let str = `https://maps.googleapis.com/maps/api/place/photo`;
  str += `?maxwidth=400`;
  str += `&photo_reference=${reference}`;
  str += `&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
  return str;
};


export default FuzzySearchForm;
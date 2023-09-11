// import React from 'react';
import axios from 'axios';



export default function AddItinerary(props) {
  const {
    itineraryType,
    handleSetItineraryType,
    handleCreateNewItineraryClicked,
    tripID,
    handleSetItineraries,
    itineraries,
    handlesetShowErrorMessage
  } = props;

  const handleNewItinerarySubmit = async (event) => {
    event.preventDefault();
    try {

      if (itineraries.some(itinerary => itinerary.type === itineraryType)) {
        handlesetShowErrorMessage(true);
        return;
      } else {
        handlesetShowErrorMessage(false);
        const response = await axios.post(`http://localhost:8080/api/itinerary/create-new-itinerary`, {
          type: itineraryType,
          trip_id: tripID
        });
        handleSetItineraries(response.data);
        handleCreateNewItineraryClicked(event);
      }
    } catch (error) {
      console.log(`Error creating new itinerary: `, error);
    }
  };


  return (
    <div className='bg-amber-200/50 rounded-xl w-96 p-4 absolute z-10 translate-x-40 -translate-y-20'>
      <form onSubmit={handleNewItinerarySubmit} className='flex gap-2'>
        <input
          type="text"
          name="type"
          className="rounded-full border-0 py-1.5 px-4 text-gray-900 bg-gray-200 shadow-sm focus:outline-none focus:bg-gray-100 ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
          required={true} placeholder='Monday'
          value={itineraryType} onChange={handleSetItineraryType}
        ></input>
        <button type="submit" className='rounded-xl bg-amber-600 px-4 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700'>Create</button>
        <button type="button" onClick={handleCreateNewItineraryClicked} className='rounded-xl bg-gray-600 px-4 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700'>Cancel</button>
      </form>
    </div>

  );
}
// import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/NewtripPage.css'

export default function NewTripPage(props) {
  const {
    tripLocation, handleTripLocationChange,
    tripName, handleTripNameChange,
    startDate, handleStartDateChange,
    endDate, handleEndDateChange,
  } = props;

  const navigate = useNavigate();
  const { state } = useLocation();

  async function handleSubmit(event) {
    event.preventDefault();
    //LOGIC TO GENERATE A NEW TRIP URL
    const response_recent_trip = await fetch(`http://localhost:8080/api/trips/recent`);
    const recentTrip = await response_recent_trip.json();
    const new_url_id = recentTrip[0].id + 1;
    const new_trip_url = `http://localhost:5173/${new_url_id}`;

    //post request to create new record in trips db and a new user for the trip
    const newTripBody = {
      trip_url: new_trip_url,
      trip_name: tripName,
      start_date: startDate,
      end_date: endDate,
      trip_location: tripLocation
    };
    try {
      //create a new trip, new user record and a default 'wishlist' itinerary for the trip
      axios.post(`http://localhost:8080/api/trips/new-trip`, newTripBody)
        .then(res => {
          console.log(res.data);
          axios.post(`http://localhost:8080/api/users/create-new-user`, {
            email: state,
            trip_id: res.data.id,
          });
          axios.post(`http://localhost:8080/api/itinerary/create-wishlist-itinerary`, {
            trip_id: res.data.id,
          });
        })
        .then(() => {
          navigate(`/${new_url_id}/details`);
        });
    } catch (error) {
      console.log(`Error creating new trip and user: `, error);
    }
  }

  const handleCancel = (event) => {
    event.preventDefault();
    const cancel = confirm('Cancel Trip?');
    cancel ? navigate("/") : null;
  };



  return (
    <>
<div className="newtrip flex mt-64 min-h-full flex-1 flex-col justify-center items-center px-6 pb-12 gap-12">

      {/* <h1 className="text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">Welcome {state}</h1> */}


      <form onSubmit={handleSubmit}>

        <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-4'>


          <div className='md:col-start-1 md:col-end-1 sm:col-span-1'>

          <div className="flex justify-center">

            <h1 className='text-center text-2xl leading-9 font-bold tracking-tight text-gray-900 mb-5'>Destination</h1>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7 mt-1 ml-2">
  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-1.5 0a6.5 6.5 0 11-11-4.69v.447a3.5 3.5 0 001.025 2.475L8.293 10 8 10.293a1 1 0 000 1.414l1.06 1.06a1.5 1.5 0 01.44 1.061v.363a1 1 0 00.553.894l.276.139a1 1 0 001.342-.448l1.454-2.908a1.5 1.5 0 00-.281-1.731l-.772-.772a1 1 0 00-1.023-.242l-.384.128a.5.5 0 01-.606-.25l-.296-.592a.481.481 0 01.646-.646l.262.131a1 1 0 00.447.106h.188a1 1 0 00.949-1.316l-.068-.204a.5.5 0 01.149-.538l1.44-1.234A6.492 6.492 0 0116.5 10z" clip-rule="evenodd" />
</svg>
</div>
            

            <label htmlFor="tripName" className='font-bold'>What should we call this trip?</label>
            <br />
            <input
              type="text"
              id="tripName"
              required={true}
              value={tripName}
              onChange={handleTripNameChange} 
              className="mt-1 block w-72 rounded-full border-0 py-1.5 px-3 text-gray-900 shadow-sm focus:outline-none ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"/>

            <br />

            <label htmlFor="tripLocation" className='font-bold'>Where are you heading?</label>
            <br />
            <input
              type="text"
              id="tripLocation"
              required={true}
              value={tripLocation}
              onChange={handleTripLocationChange} 
              className="block w-72 rounded-full border-0 py-1.5 px-3 text-gray-900 shadow-sm focus:outline-none ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"/>
          </div>



          <div className='md:col-start-2 md:col-end-2 sm:col-span-1'>

          <div className="flex justify-center">

          <h1 className='text-center text-2xl leading-9 font-bold tracking-tight text-gray-900 mb-5'>Trip Dates</h1>
          <svg className="w-7 h-7 mt-1 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M192 93.7C192 59.5 221 0 256 0c36 0 64 59.5 64 93.7l0 66.3L497.8 278.5c8.9 5.9 14.2 15.9 14.2 26.6v56.7c0 10.9-10.7 18.6-21.1 15.2L320 320v80l57.6 43.2c4 3 6.4 7.8 6.4 12.8v42c0 7.8-6.3 14-14 14c-1.3 0-2.6-.2-3.9-.5L256 480 145.9 511.5c-1.3 .4-2.6 .5-3.9 .5c-7.8 0-14-6.3-14-14V456c0-5 2.4-9.8 6.4-12.8L192 400V320L21.1 377C10.7 380.4 0 372.7 0 361.8V305.1c0-10.7 5.3-20.7 14.2-26.6L192 160V93.7z"/></svg>
          </div>

          
            <label htmlFor="startDate" className='font-bold'>Start</label>
            <br />
            <input
              type="date"
              id="startDate"
              required={true}
              value={startDate}
              onChange={handleStartDateChange} 
              className="block w-72 rounded-full border-0 py-1.5 px-3 text-gray-900 shadow-sm focus:outline-none ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"/>

            <br />

            <label htmlFor="endDate" className='font-bold'>End</label>
            <br />
            <input
              type="date"
              id="endDate"
              required={true}
              value={endDate}
              onChange={handleEndDateChange}
              className="block w-72 rounded-full border-0 py-1.5 px-3 text-gray-900 shadow-sm focus:outline-none ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"/>
          </div>



          <div className='flex md:col-start-1 md:col-end-2 mt-16 gap-4'>

            <button className="flex w-full justify-center rounded-full bg-amber-600 px-4 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700" type="submit">Create Trip</button>
            
            <br />

            <button className="flex w-full justify-center rounded-full bg-amber-600 px-4 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700" type="button" onClick={handleCancel}>Cancel</button>
          </div>


        </div>
      </form>
      </div>
    </>
  );
}

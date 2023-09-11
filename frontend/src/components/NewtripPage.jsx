// import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/NewtripPage.css';

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
      <div className="h-screen">
        {/* <h1 className="text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">Welcome {state}</h1> */}
        <form onSubmit={handleSubmit} className='flex h-full w-full'>

          <div className='h-full w-1/2 bg-gray-100 flex flex-col justify-center items-center'>
            <div className="flex items-center gap-2 mb-12 -mt-[102px] ">
              <h1 className='text-center text-4xl tracking-normal	font-extrabold tracking-tight text-gray-800'>Destination</h1>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64" />
              </svg>
            </div>

            <div className='flex flex-col mb-3'>
              <label htmlFor="tripName" className="block text-md leading-5 font-bold text-gray-700 ml-2.5 mb-1">What should we call this trip?</label>
              <input
                type="text"
                id="tripName"
                placeholder='Summer Vacation'
                required={true}
                value={tripName}
                onChange={handleTripNameChange}
                className="mt-1 block w-72 rounded-full border-0 py-1.5 px-4 text-gray-900 shadow-sm focus:outline-none ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" />
            </div>

            <div className='flex flex-col'>
              <label htmlFor="tripLocation" className="block text-md leading-5 font-bold text-gray-700 ml-2.5 mb-1">Where are you heading?</label>
              <input
                type="text"
                id="tripLocation"
                placeholder='Tokyo'
                required={true}
                value={tripLocation}
                onChange={handleTripLocationChange}
                className="block w-72 rounded-full border-0 py-1.5 px-4 text-gray-900 shadow-sm focus:outline-none ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" />
            </div>
          </div>



          <div className='flex flex-col h-full justify-center items-center w-1/2'>

            <div className="flex items-center gap-2 mb-12">

              <h1 className='text-center text-4xl tracking-normal	font-extrabold tracking-tight text-gray-800'>Trip Dates</h1>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
              </svg>

            </div>

            <div className='flex flex-col mb-3'>
              <label htmlFor="startDate" className="block text-md leading-5 font-bold text-gray-700 ml-2.5 mb-1">Start</label>
              <input
                type="date"
                id="startDate"
                required={true}
                value={startDate}
                onChange={handleStartDateChange}
                className="mt-1 block w-72 rounded-full border-0 py-1.5 px-4 text-gray-900 shadow-sm focus:outline-none ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" />
            </div>



            <div className='flex flex-col'>
              <label htmlFor="endDate" className="block text-md leading-5 font-bold text-gray-700 ml-2.5 mb-1">End</label>
              <input
                type="date"
                id="endDate"
                required={true}
                value={endDate}
                onChange={handleEndDateChange}
                className="block w-72 rounded-full border-0 py-1.5 px-4 text-gray-900 shadow-sm focus:outline-none ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" />
            </div>

            <div className='flex w-72 mt-16 gap-4'>
              <button className="flex w-full justify-center rounded-full bg-amber-600 px-4 py-2 text-md font-semibold leading-6 text-white shadow-sm hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700" type="submit">Create Trip</button>

              <button className="flex w-full justify-center rounded-full bg-gray-600 px-4 py-2 text-md font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700" type="button" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

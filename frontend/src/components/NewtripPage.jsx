import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


export default function NewTripPage(props) {
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const navigate = useNavigate();
  const { state } = useLocation();

  const handleTripNameChange = (event) => {
    setTripName(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };



  async function handleSubmit(event) {
    event.preventDefault();

    //LOGIC TO GENERATE A NEW TRIP URL
    const response = await fetch(`http://localhost:8080/api/trips/recent`);
    const recentTrip = await response.json();
    const new_url_id = recentTrip[0].id + 1;
    const new_trip_url = `http://localhost:5173/${new_url_id}`;
    console.log(new_trip_url);
  };



  const handleCancel = (event) => {
    event.preventDefault();
    const cancel = confirm('Cancel Trip?');
    cancel ? navigate("/") : null;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Welcome {state}! Create a new trip</h1>
        <label htmlFor="tripName">Trip Name:</label>
        <input
          type="text"
          id="tripName"
          value={tripName}
          onChange={handleTripNameChange}
        />
        <br />
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <br />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={handleEndDateChange}
        />
        <br />
        <button type="submit">Create Trip</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
}

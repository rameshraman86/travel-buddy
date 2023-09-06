import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


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
    };
    try {
      axios.post(`http://localhost:8080/api/trips/new-trip`, newTripBody)
        .then(res => {
          axios.post(`http://localhost:8080/api/users/new-user`, {
            email: state,
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
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Welcome {state}! Create a new trip</h1>
        <label htmlFor="tripName">Trip Name:</label>
        <input
          type="text"
          id="tripName"
          required={true}
          value={tripName}
          onChange={handleTripNameChange}
        />
        <br />
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          required={true}
          value={startDate}
          onChange={handleStartDateChange}
        />
        <br />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          required={true}
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

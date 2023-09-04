import React, { useState } from 'react';

export default function NewTripPage() {
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleTripNameChange = (event) => {
    setTripName(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    // Add code to handle form submission here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Create a new trip</h1>
        <label htmlFor="tripName">Trip Name:</label>
        <input
          type="text"
          id="tripName"
          value={tripName}
          onChange={handleTripNameChange}
        />
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={handleEndDateChange}
        />
        <button type="submit">Create Trip</button>
        <button type="button">Cancel</button>
      </div>
    </form>
  );
}

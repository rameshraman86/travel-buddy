import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function ChooseTrip({ email, setEmail, setIsExistingUser }) {

  const [trips, setTrips] = useState([]);
  useEffect(() => {
    setEmail(sessionStorage.getItem('email'));

    async function fetchData() {
      const allTrips = await axios.get(`http://localhost:8080/api/trips/get-all-trips-of-user/${email}`);
      setTrips(allTrips.data);
    }
    fetchData();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }


  const handleBackButton = (event) => {
    event.preventDefault();
    setIsExistingUser(false);
    setEmail('');
  };

  return (
    <>
      <h1>Welcome Back {email}. Choose from your trips below to continue planning or create a new trip.</h1>
      <table>
        <thead>
          <tr>
            <th>Trip</th>
            <th>Location</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {trips.map(trip => (
            <tr key={trip.trip_url}>
              <td><a href={trip.trip_url + '/details'}>{trip.trip_name}</a></td>
              <td>{trip.trip_location}</td>
              <td>{formatDate(trip.start_date)}</td>
              <td>{formatDate(trip.end_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleBackButton}>
        <h1> <Link className='rounded-xl border border-transparent bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 focus:outline-none' to='/new'>Create a new Trip!</Link></h1>
        <button type="submit" className="inline-flex justify-center px-4 py-2 text-sm font-semibold  text-white bg-gray-600 border border-transparent rounded-xl hover:bg-gray-700 duration-300" >
          Back
        </button>
      </form>
    </>
  );
}
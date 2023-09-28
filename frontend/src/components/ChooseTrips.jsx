import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import ChooseTripsItems from "./ChooseTripsItems";

export default function ChooseTrips({ email, setEmail }) {

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
      <h1> <Link className="text-amber-600" to='/new'>Create a new Trip!</Link></h1>

    </>
  );
}
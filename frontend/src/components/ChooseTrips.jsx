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
      console.log(allTrips.data);

    }
    fetchData();
  }, []);

  return (
    <>
      <h1>Welcome Back {email}. Choose from your trips below to continue planning or create a new trip.</h1>
      <ChooseTripsItems
        email={email}
        setEmail={setEmail}
        trips={trips}
        setTrips={setTrips}
      />

      <h1>Click <Link className="text-amber-600" to='/new'>here</Link> to create a new Trip.</h1>

    </>
  );
}
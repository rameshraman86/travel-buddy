import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import apiConfig from '../../config';

const api_url = process.env.NODE_ENV === 'production' ? apiConfig.production : apiConfig.development;

export default function ChooseTrip(props) {
  const {
    email, setEmail
  } = props;


  const [trips, setTrips] = useState([]);

  useEffect(() => {
    setEmail(sessionStorage.getItem('email'));
    async function fetchData() {
      const allTrips = await axios.get(`${api_url}/api/trips/get-all-trips-of-user/${email}`);
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
      <div className="w-1/2 flex flex-col justify-center border-solid">
        <div className="title flex justify-between">
          <div className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-800">
            Your Trips
          </div>
          <div className="action buttons">
            <Link className="rounded-xl border border-transparent bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 focus:outline-none" to="/new"> + New Trip</Link>
          </div>
        </div>
        <div className="border-t-4 border-gray-300 my-4"></div>
        <table>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip.trip_url} className="border-b-2 border-gray-200 hover:bg-gray-100">
                <td className="px-4 py-2">
                  <div className="flex justify-between">
                    <div>
                      <div>
                        <span className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
                          {trip.trip_name} - {trip.trip_location}
                        </span>
                      </div>
                      <div>
                        <span className="font-light">
                          {formatDate(trip.start_date)} to {formatDate(trip.end_date)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <a href={trip.trip_url + '/details'}>
                        <button className="rounded-xl border border-transparent bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 focus:outline-none">
                          Edit Trip
                        </button>
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div >
    </>
  );
}
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";


export default function Homepage({ email, handleSetEmail }) {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const userObject = await axios.get(`http://localhost:8080/api/users/get-user-details/${email}`);
    if (userObject.data.length > 0) { //if user exists in the db, take them to url details
      const response = await fetch(`http://localhost:8080/api/trips/get-trip-url/${userObject.data[0].email}`); //will return full tripurl
      const tripURLObject = await response.json();
      const tripDetailsRoute = tripURLObject[0].trip_url.split('/').pop() + "/details"; //strip the trip id from url and append /details route
      sessionStorage.setItem('email', email);
      navigate(tripDetailsRoute);
    } else { //if user is new, take them to create new trip page
      sessionStorage.setItem('email', email);
      navigate("/new", { state: email });
    }
  }

  return (
    <>
      <div className="flex mt-64 min-h-full flex-1 flex-col justify-center items-center px-6 pb-12 gap-12">
        <div className="flex justify-center items-end gap-1.5">
          <h1 className="text-center text-4xl font-bold leading-9 tracking-tight text-gray-800">
            Welcome to
          </h1 >
          <h1 className="text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-800">Travel Buddy</h1>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 stroke-amber-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
          </svg>
        </div >

        <div className="flex justify-center items-center">
          <form className="space-y-2 flex gap-1" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center">

              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  value={email} onChange={handleSetEmail}
                  className="block w-72 rounded-full border-0 py-1.5 px-3 text-gray-900 shadow-sm focus:outline-none ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-full bg-amber-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700">
                Get Started
              </button>
            </div>
          </form>

        </div>
      </div >
    </>
  );
}
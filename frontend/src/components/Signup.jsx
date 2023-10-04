import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiConfig from '../../config';
import '../styles/signup.css';

const api_url = process.env.NODE_ENV === 'production' ? apiConfig.production : apiConfig.development;


export default function Signup() {
  return (
    <>

      <div className="flex flex-col min-h-screen">

        <div className="flex mt-64 min-h-full flex-col justify-center items-center px-6 pb-12 gap-12">
          <div className="flex justify-center items-end gap-1.5">
            <h1 className="text-center text-4xl font-bold leading-9 tracking-tight text-gray-800">
              Sign up for
            </h1 >
            <h1 className="text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-800">Travel Buddy</h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 stroke-amber-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
          </div >
        </div>


        <div>
          <form className="flex flex-col">
            <input type="text" name="firstName" className="" required placeholder="First Name" />
            <input type="text" name="laName" required placeholder="Last Name" />
            <div className="flex flex-col">
              <input type="email" name="email" required placeholder="E-mail" />
              <input type="password" name="password" required placeholder="Password" />
              <input type="password" name="password" required placeholder="Re-enter password" />
            </div>
            <button type="submit" className="btn-login">
              Sign up
            </button>

            <div>
              Already Registered? <Link className="text-amber-600" to='/login'>Login</Link>
            </div>

          </form>
        </div>


      </div>
    </>
  );
};
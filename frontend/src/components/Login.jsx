import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiConfig from '../../config';

const api_url = process.env.NODE_ENV === 'production' ? apiConfig.production : apiConfig.development;


export default function Login(props) {

  const {
    isExistingUser, setIsExistingUser,
    email, handleSetEmail, setEmail,
    password, handleSetPassword
  } = props;

  const navigate = useNavigate();

  return (
    <>
      <div className="flex mt-64 min-h-full flex-1 flex-col justify-center items-center px-6 pb-12 gap-12">
        <div className="flex justify-center items-end gap-1.5">
          <h1 className="text-center text-4xl font-bold leading-9 tracking-tight text-gray-800">
            Log in to
          </h1 >
          <h1 className="text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-800">Travel Buddy</h1>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 stroke-amber-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
          </svg>
        </div >

        <div>
          {isExistingUser &&
            <div>
              {email} is already registered. Please log in to continue.
            </div>}

          <form className="flex flex-col">
            <input
              type="email"
              name="email"
              required
              placeholder="E-mail"
              value={email} onChange={handleSetEmail}
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={password} onChange={handleSetPassword}
            />
            <button type="submit" className="btn-login">
              Login
            </button>
          </form>

          <div>
            <Link className="text-amber-600" to='/resetPassword'> Forgot your password? </Link>
          </div>
          {!isExistingUser &&
            <div>
              Not registered yet? Register <Link className="text-amber-600" to='/signup'>here</Link>
            </div>}
        </div>
      </div >
    </>
  );
}
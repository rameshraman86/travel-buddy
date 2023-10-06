import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiConfig from '../../config';
import '../styles/signup.css';
import { first } from "lodash";

const api_url = process.env.NODE_ENV === 'production' ? apiConfig.production : apiConfig.development;


export default function Signup(props) {
  const {
    isExistingUser, setIsExistingUser,
    firstName, handleFirstNameChange,
    lastName, handleLastNameChange,
    email, handleSetEmail,
    password, handleSetPassword, setPassword,
    password2, handlePassword2Change,
    resetEmailPasswordFields,
    generateVerificationCode
  } = props;

  const navigate = useNavigate();


  const handleRedirectToLoginForExistingUser = () => {
    setIsExistingUser(false);
    resetEmailPasswordFields();
  };


  // //GENERATE VERIFICATION CODE
  // const generateVerificationCode = (length) => {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let verificationCode = '';
  //   for (let i = 0; i < length; i++) {
  //     const randomIndex = Math.floor(Math.random() * characters.length);
  //     verificationCode += characters.charAt(randomIndex);
  //   }
  //   return verificationCode;
  // };


  const handleRegisterNewUser = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;
    const verification_code = generateVerificationCode();

    if (password !== password2) {
      alert("passwords do not match");
      return;
    }

    //check if user already exists in db
    const userObject = await axios.get(`${api_url}/api/users/get-user-details/${email}`);
    //User exists in the db
    if (userObject.data.length >= 1) {
      sessionStorage.setItem('email', email);
      setIsExistingUser(true);
    }
    if (userObject.data.length === 0) { //if user is new, then continue registering user
      setIsExistingUser(false);
      await axios.post(`${api_url}/api/users/register-new-user`, {
        firstName,
        lastName,
        email,
        password,
        verification_code
      })
        .then((res) => {
          sessionStorage.setItem('email', email);
          navigate("/verify");
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
  };

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

          {isExistingUser &&
            <div onClick={handleRedirectToLoginForExistingUser}>
              {email} is already registered.
              <Link className="text-amber-600" to='/login'> Login</Link> to see your trips.
            </div>
          }
        </div>

        <div>
          <form className="flex flex-col" onSubmit={handleRegisterNewUser}>
            <input
              type="text"
              name="firstName"
              className=""
              required
              placeholder="First Name"
              value={firstName} onChange={handleFirstNameChange} />

            <input
              type="text"
              name="lastName"
              className=""
              required placeholder="Last Name"
              value={lastName} onChange={handleLastNameChange} />

            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                required placeholder="E-mail"
                value={email} onChange={handleSetEmail} />
              <input
                type="password"
                name="password"
                required placeholder="Password"
                value={password} onChange={handleSetPassword} />
              <input
                type="password"
                name="password2"
                required placeholder="Re-enter password"
                value={password2} onChange={handlePassword2Change} />
            </div>
            <button type="submit" className="btn-login">
              Sign up
            </button>

            <div onClick={resetEmailPasswordFields}>
              Already Registered? <Link className="text-amber-600" to='/login'>Login</Link>
            </div>

          </form>
        </div>


      </div>
    </>
  );
};
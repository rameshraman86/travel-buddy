import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiConfig from '../../config';
import { useState } from "react";

const api_url = process.env.NODE_ENV === 'production' ? apiConfig.production : apiConfig.development;


export default function ResetPassword(props) {

  const {
    email, handleSetEmail, setEmail,
    password, handleSetPassword,
    isExistingUser,
    generateVerificationCode,
    verificationCodeResent, setVerificationCodeResent,
    fromResetPasswordVerification, setFromResetPasswordVerification,
    verificationSuccessful
  } = props;

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordReenter, setNewPasswordReenter] = useState('');
  const [passwordResetComplete, setPasswordResetComplete] = useState(false);

  const navigate = useNavigate();


  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };
  const handleNewPassword2 = (event) => {
    setNewPasswordReenter(event.target.value);
  };

  //check if user email is valid
  const isValidUser = async (email) => {
    //check if user exists in db
    const userObject = await axios.get(`${api_url}/api/users/get-user-details/${email}`);
    if (userObject.data.length >= 1) {
      return true;
    }
    return false;
  };

  //resend verification code
  const resendVerificationCode = async (event) => {
    if (event) event.preventDefault();
    const newVerificationCode = generateVerificationCode();
    await axios.post(`${api_url}/api/users/update-verificationcode`, {
      verification_code: newVerificationCode,
      email: sessionStorage.getItem('email'),
    })
      .then((result) => {
      })
      .catch(error => {
        console.error(error);
      });
  };

  //main function to handle resetpassword button
  const handleResetPasswordButtonPress = (event) => {
    event.preventDefault();
    sessionStorage.setItem('email', email);
    setFromResetPasswordVerification(true);
    navigate('/verify', { email: sessionStorage.getItem('email') });
    if (isValidUser) {
      resendVerificationCode();
    }
  };


  const handleSetNewPassword = async (event) => {
    event.preventDefault();
    if (newPassword !== newPasswordReenter) {
      alert('Passwords do not match');
    } else {
      //create a new password for the email in the db and navigate to '/login'
      await axios.post(`${api_url}/api/users/update-password`, {
        email: sessionStorage.getItem('email'),
        password: newPassword
      })
        .then(result => {
          setPasswordResetComplete(true);
        })
        .catch(error => {
          console.error('error updating password: ', error);
        });
    }
  };


  return (
    <>
      <div className="flex mt-64 min-h-full flex-1 flex-col justify-center items-center px-6 pb-12 gap-12">
        <div className="flex justify-center items-end gap-1.5">

          <h1 className="text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-800">Travel Buddy</h1>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 stroke-amber-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
          </svg>
        </div >

        {!verificationSuccessful && !passwordResetComplete && 
          <div>
            <form className="flex flex-col" onSubmit={handleResetPasswordButtonPress}>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your registered email"
                value={email} onChange={handleSetEmail}
              />
              <button type="submit" className="btn-login">
                Reset Password
              </button>
              <div>
                <Link className="text-amber-600" to='/login'>Login</Link>
              </div>
            </form>
          </div>
        }


        {verificationSuccessful && !passwordResetComplete &&
          <div>
            <form onSubmit={handleSetNewPassword}>
              <input
                type="password"
                name="password"
                required
                placeholder="New Password"
                value={newPassword} onChange={handleNewPassword}
              />
              <input
                type="password"
                name="password2"
                required
                placeholder="Re-enter New Password"
                value={newPasswordReenter} onChange={handleNewPassword2}
              />
              <button type="submit" className="btn-login">
                Submit
              </button>
            </form>
          </div>
        }

        {passwordResetComplete &&
          <div>
            Password Reset successful. <Link className="text-amber-600" to='/login'>Login</Link>
          </div>
        }

      </div >
    </>
  );
}
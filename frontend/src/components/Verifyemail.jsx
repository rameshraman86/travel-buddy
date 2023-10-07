import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiConfig from '../../config';
import { isNull } from "lodash";

const api_url = process.env.NODE_ENV === 'production' ? apiConfig.production : apiConfig.development;

export default function Verifyemail(props) {
  const {
    generateVerificationCode,
    verificationCodeResent, setVerificationCodeResent,
    fromResetPasswordVerification, setFromResetPasswordVerification,
    verificationCode, setVerificationCode,
    verificationComplete, setVerificationComplete,
    verificationSuccessful, setVerificationSuccessful,
    verificationCodeIncorrect, setVerificationCodeIncorrect,
    verificationCodeExpired, setVerificationCodeExpired,
  } = props;


  // const [verificationCode, setVerificationCode] = useState('');
  // const [verificationComplete, setVerificationComplete] = useState(false);
  // const [verificationSuccessful, setVerificationSuccessful] = useState(false);
  // const [verificationCodeIncorrect, setVerificationCodeIncorrect] = useState(false);
  // const [verificationCodeExpired, setVerificationCodeExpired] = useState('');

  const navigate = useNavigate();

  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const isExpired = (expirationDate) => {
    const testDate = '2023-11-05T18:09:22.363Z';
    const expireAtDate = new Date(testDate);
    const currentDate = new Date();
    if (expireAtDate <= currentDate) {
      return true;
    }
    return false;
  };


  //set registered flag of user to true
  const setRegisteredFlagTrue = async (email) => {
    await axios.put(`${api_url}/api/users/update-registered-flag/${email}`)
      .catch(error => {
        console.error(`error updating registered flag: `, error);
      });
  };


  const validateVerificationCode = async (event) => {
    event.preventDefault();
    const userObject = await axios.get(`${api_url}/api/users/get-user-details/${sessionStorage.getItem('email')}`);
    const correctVerificationCode = userObject.data[0].verification_code;
    const expirationDate = userObject.data[0].expire_at;

    if (verificationCode === correctVerificationCode && !isExpired(expirationDate)) {
      setVerificationCodeExpired(false);
      setVerificationCodeIncorrect(false);
      setVerificationSuccessful(true);
      setVerificationComplete(true);
      setRegisteredFlagTrue(sessionStorage.getItem('email'));
      if (fromResetPasswordVerification) {
        setFromResetPasswordVerification(false);
        navigate('/resetpassword');
      }
    }
    if (verificationCode !== correctVerificationCode) {
      setVerificationCodeIncorrect(true);
      return;
    }
    if (isExpired(expirationDate)) {
      setVerificationCodeExpired(true);
      setVerificationCodeIncorrect(false);
      return;
    }
  };

  //resend verification code
  const resendVerificationCode = async (event) => {
    event.preventDefault();
    const newVerificationCode = generateVerificationCode();
    await axios.post(`${api_url}/api/users/update-verificationcode`, {
      verification_code: newVerificationCode,
      email: sessionStorage.getItem('email'),
    })
      .then((result) => {
        setVerificationCodeResent(true);
      })
      .catch(error => {
        console.error(error);
      });
  };




  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex mt-64  flex-col justify-center items-center  pb-6 gap-12">
          <div className="flex justify-center items-end gap-1.5">
            <h1 className="text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-800">Travel Buddy</h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 stroke-amber-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
          </div >


          {verificationCodeIncorrect && <div> Verification code is incorrect. Please try again.</div>}
          {verificationCodeResent && !verificationComplete && <div>Verification Code Resent.</div>}
          {!verificationComplete &&
            <div>
              {verificationCodeExpired && !verificationCodeIncorrect && <div> Your verification code has expired. Resend verification code and try again.</div>}
              {!verificationCodeExpired &&
                <>
                  <p>Enter the code sent to {sessionStorage.getItem('email')}. The code will expire in 10 minutes.</p>
                  <form className="flex" onSubmit={validateVerificationCode}>
                    <input
                      type="text"
                      name="verificationcode"
                      className=""
                      required
                      placeholder="Verification Code"
                      value={verificationCode} onChange={handleVerificationCodeChange} />

                    <button type="submit" className="btn-verify">
                      Verify
                    </button>
                  </form>
                </>
              }


              <form className="flex justify-center items-center" onClick={resendVerificationCode}>
                <button type="submit" className="btn-verify">
                  Resend Verification Code
                </button>
              </form>
            </div>
          }

          {verificationSuccessful && verificationComplete && <div> Verification successful. <Link to='/login'>Login</Link></div>}

        </div>
      </div>

    </>
  );
};
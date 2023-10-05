import React from "react";
import { useState } from "react";


export default function Verifyemail(props) {
  const {
    isExistingUser, setIsExistingUser,
    firstName, handleFirstNameChange,
    lastName, handleLastNameChange,
    email, handleSetEmail,
    password, handleSetPassword, setPassword,
    password2, handlePassword2Change,
    resetEmailPasswordFields,
  } = props;


  const [verificationCode, setVerificationCode] = useState('');
  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };


  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex mt-64 min-h-full flex-col justify-center items-center px-6 pb-12 gap-12">
          <div className="flex justify-center items-end gap-1.5">
            <h1 className="text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-800">Travel Buddy</h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 stroke-amber-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
          </div >

          To complete registration, please enter the code sent to {sessionStorage.getItem('email')}. The code will expire in 10 minutes.

          <form className="flex flex-col" >
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
            <button type="submit" className="btn-verify">
              Resend Verification Code
            </button>
          </form>

        </div>
      </div>

    </>
  );
};
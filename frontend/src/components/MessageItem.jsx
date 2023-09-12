import React from "react";


export default function MessageItem({ email, message }) {

  return (
    <>
      <div>
        <p>
        <strong>{email}: </strong>
        <i>{message}</i>
      </p>
      </div>
    </>
  );
}
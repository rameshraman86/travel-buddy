import React from "react";


export default function MessageItem({ email, message }) {

  return (
    <>
      <div>
        <strong>{email}: </strong>
        <i>{message}</i>
      </div>
    </>
  );
}
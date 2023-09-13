import React from "react";


export default function MessageItem({ email, message }) {

  return (
    <>
      <div className="msg-container">
        <span>{email}</span>
        <div>
          <p className="msg">{message}</p>
        </div>
      </div>
    </>
  );
}
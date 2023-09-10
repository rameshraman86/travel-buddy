import React, { useState, useEffect } from "react";
import axios from 'axios';
import MessageItem from "./MessageItem";


//Linked from tripdetails component
export default function Messages({ messages }) {

  return (
    <div className="messages"><h2>Chat</h2>
      {messages.map((message) => (
        <div className="message" key={message.id}>
          <MessageItem
            email={message.email}
            message={message.message}
          />
        </div>
      ))}
    </div>
  );
}




import React, { useState, useEffect } from "react";
import axios from 'axios';
import MessageItem from "./MessageItem";
import "../styles/chatbox.scss";


export default function Messages({ messages, name }) {

  return (
    <div className="">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline mr-1 stroke-amber-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>

        <span>Chat</span></h2>
      {messages.map((message, index) => (
        <div className={message.email === name ? 'chatbox_sender' : 'chatbox_reciver'} key={index}>
          <MessageItem
            className=""
            email={message.email}
            message={message.message}
          />
        </div>
      ))}
    </div>
  );
}




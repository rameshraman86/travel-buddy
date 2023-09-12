import React from 'react';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Avatar, Image } from 'antd';
import '../styles/chatbox.scss';
import axios from 'axios';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8080';
const socket = io(URL);

export default function Chat({ avatar, email, tripID, messages, handleSetMessages }) {
  useEffect(() => {
    socket.emit("initial_connection", { email, tripID });
    const receiveMsg = (payload) => {
      const newMessage = {
        message: payload.msg,
        email: payload.email,
        trip_id: tripID
      };
      //update frontend with message of other user sending message
      handleSetMessages(newMessage);
    };

    socket.on('send_msg', receiveMsg);
    
    return () => {
      socket.off('send_msg', receiveMsg);
      socket.removeAllListeners("initial_connection");
    };
  }, []);



  const onSubmit = async (evt) => {
    evt.preventDefault();
    const msg = evt.target.msg.value;
    evt.target.msg.value = '';

    socket.emit("send_msg", { email, msg, tripID });

    const messageData = {
      tripID: tripID,
      message: msg,
      email: email,
    };
    //update frontend with message of current user
    handleSetMessages(messageData);

    try {
      //adds the new message in the db
      const response = await axios.post("http://localhost:8080/api/messages/create-new-message", messageData);
    } catch (error) {
      console.error(`error creating message : `, error);
    }
  };

  return (
    <div className='pt-5'>
      <form onSubmit={onSubmit} className='flex gap-1 items-start w-full'>
        <input name="msg" rows={6} placeholder='Enter your message' className='rounded-xl block px-4 py-2.5 w-full text-sm text-gray-900 bg-gray-50 border-none outline-none focus:bg-white ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 ' >
        </input>
        <button className="self-end inline-flex justify-center rounded-xl border border-transparent bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 focus:outline-none gap-2 items-center" >
          Send
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" className="group-hover:stroke-amber-800 group-hover:stroke-2" />
          </svg>
        </button>
      </form>

    </div>
  );
}
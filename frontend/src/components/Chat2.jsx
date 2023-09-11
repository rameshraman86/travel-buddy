import React from 'react';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Avatar, Image } from 'antd';
import '../styles/chatbox.scss';
import axios from 'axios';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8080';
const socket = io(URL);

export default function Chat2({ avatar, user, message, email, tripID, messages, handleSetMessages }) {
  const [name, setName] = useState('');





useEffect(() => {
  
  
  socket.on("receive-message", messageFromServer => {
    console.log(messageFromServer);
    // handleSetMessages(messageFromServer);
  });

  return () => {
    socket.off('receive-message', messageFromServer);
  }

}, [])



  

  const onSubmit = async (evt) => {
    evt.preventDefault();
    const msg = evt.target.msg.value;
    socket.emit("send-message", msg, tripID);
    evt.target.msg.value = '';

    const messageData = {
      tripID: tripID,
      message: msg,
      email: email,
    };
    
    try {
      //adds the new message in the db
      const response = await axios.post("http://localhost:8080/api/messages/create-new-message", messageData);
    } catch (error) {
      console.error(`error creating message : `, error);
    }
  };

  return (
    <>
      <h1>__________________________________</h1>
      <form onSubmit={onSubmit}>
        <div className='chatbox_content'>
          <textarea name="msg" rows={6} placeholder='Write Message...' >
          </textarea>
          <button>
            Send
          </button>
        </div>
      </form>

    </>
  );
};

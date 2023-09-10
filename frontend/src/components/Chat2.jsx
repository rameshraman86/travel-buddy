import React from 'react';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Avatar, Image } from 'antd';
import '../styles/chatbox.scss';
import axios from 'axios';

// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8080';
// const socket = io(URL);

export default function Chat2({ avatar, user, message, email, tripID, messages, handleSetMessages }) {
  const [name, setName] = useState('');
  // const [users, setUsers] = useState([]);
  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   setName(email);
  // const intialConn = payload => {
  //   socket.emit('identify', { email })

  // };

  // const afterConn = payload => {
  //   setName(email);
  //   setUsers(payload.users);
  // }

  // const newUser = payload => {
  //   setUsers(prev => [...prev, payload.name]);
  // };

  // const sendMsg = payload => {
  //   setMessages(prev => [...prev, {...payload, trip_id: tripID}]);
  // };

  // socket.on('intial_conn', intialConn);
  // socket.on('after_conn', afterConn);
  // socket.on('new_users', newUser);
  // socket.on('send_msg', sendMsg);

  // return () => {
  //   socket.off('intial_conn', intialConn);
  //   socket.off('after_conn', afterConn);
  //   socket.off('new_users', newUser);
  //   socket.off('send_msg', sendMsg);
  // };
  // }, []);



  const onSubmit = async (evt) => {
    evt.preventDefault();
    const msg = evt.target.msg.value;
    evt.target.msg.value = '';

    const messageData = {
      tripID: tripID,
      message: msg,
      email: email,
    };
    try {
      const response = await axios.post("http://localhost:8080/api/messages/create-new-message", messageData);
    } catch (error) {
      console.error(`error creating message : `, error);
    }

    //updating the frontend component with new message
    handleSetMessages(messageData);

    // socket.emit("send_msg", { name, msg });

    // try {
    //   axios.post(`/messages/${tripID}`, messages);
    // } catch (error) {
    //   console.log(`Error adding to Wishlist: `, error);
    // }
  };

  return (
    <>

      <h1>__________________________________</h1>

      {/* {messages.map(message => <div key={email} className={message.name === email ? 'chatbox_sender' : 'chatbox_reciver'}>
        <Avatar
          size={50}
          src={<Image
            src={avatar}
            className='avatar'
            preview={false}
          />}
        />
        <p>
          <strong>
          {message.name}
          </strong> <br></br>
          {message.msg}
        </p>
      </div>)} */}

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

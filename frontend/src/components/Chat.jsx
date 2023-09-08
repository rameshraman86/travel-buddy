import React from 'react';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Avatar, Image } from 'antd'
import '../styles/chatbox.scss'

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8080';
const socket = io(URL);

export default function Chat({ avatar, user, message }) {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const intialConn = payload => {
      setName(payload.name);
      setUsers(payload.users);
    };
    const newUser = payload => {
      setUsers(prev => [...prev, payload.name]);
    };

    const sendMsg = payload => {
      setMessages(prev => [...prev, payload]);
    };

    socket.on('intial_conn', intialConn);
    socket.on('new_users', newUser);
    socket.on('send_msg', sendMsg);

    return () => {
      socket.off('intial_conn', intialConn);
      socket.off('new_users', newUser);
      socket.off('send_msg', sendMsg);
    };

    

  }, []);

  const onSubmit = evt => {
    evt.preventDefault();
    const msg = evt.target.msg.value;
    evt.target.msg.value = '';

    socket.emit("send_msg", { name, msg });

  };

  return (
    <>
      <div>
        <h1>chat app</h1>
        {name ? <h1>{name}</h1> : <h1>Connecting...</h1>}
        <div>
          <ul>
            
          </ul>
        </div>

        <h3>participants:</h3>
        <ul>
          {users.map(user => <li key={user}>{user}</li>)}
        </ul>
      </div>
      <h1>__________________________________</h1>

      {messages.map(message => <div className='chatbox_reciver'>
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
      </div>)}

      
      <div className='chatbox_sender'>
        <p>
        <strong>
            {name}
          </strong> <br></br>
          {message}
        </p>
        <Avatar
          size={50}
          src={<Image
            src={avatar}
            className='avatar'
            preview={false}
          />}
        />
      </div>

      <form onSubmit={onSubmit}>
        <div className='chatbox_content'>
          <textarea name="msg" rows={6} placeholder='Write Message...' >
          </textarea>
          <button onClick={() => addAMessage()}>
            Send
          </button>
        </div>
      </form>

    </>
  )
};

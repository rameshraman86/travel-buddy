import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8080';
const socket = io(URL);

export default function Chat() {
const [name, setName] = useState('');
const [users, setUsers] = useState([]);
const [messages, setMessages] = useState([]);

  useEffect(() => {
    const intialConn = payload => {
      setName(payload.name);
      setUsers(payload.users);
      }
      const newUser = payload => {
        setUsers(prev => [...prev, payload.name]);
      }

      const sendMsg = payload => {
        setMessages(prev => [...prev, payload]);
      }

    socket.on('intial_conn', intialConn)
    socket.on('new_users', newUser)
    socket.on('send_msg', sendMsg);

    return () => {
      socket.off('intial_conn', intialConn);
      socket.off('new_users', newUser);
      socket.off('send_msg', sendMsg);
    }

  }, []);

  const onSubmit = evt => {
    evt.preventDefault();
    const msg = evt.target.msg.value;
    evt.target.msg.value = '';

    socket.emit("send_msg", {name, msg})

  }

  return (
    <>
    <div>
      <h1>chat app</h1>
      {name ? <h1>{name}</h1> : <h1>Connecting...</h1>}
      <div>
        <ul>
          {messages.map(message => <li><b>{message.name}: </b> {message.msg}
          </li>)}
        </ul>
      </div>
   <form onSubmit={onSubmit}>
      <input type="text" name="msg" />
      <button>Send</button>
    </form>

      <h3>active participants currently online:</h3>
      <ul>
      {users.map(user => <li key={user}>{user}</li>)}
      </ul>
    </div>
    </>
  )
}

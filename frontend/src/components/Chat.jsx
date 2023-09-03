import { useState } from 'react'
import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8080';
const socket = io(URL);

export default function Chat() {


  return (
    <>
      <h1>hello chat</h1>
    </>
  )
}

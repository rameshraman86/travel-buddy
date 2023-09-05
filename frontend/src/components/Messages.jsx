import React, { useState, useEffect } from "react";
import axios from 'axios';
import MessageItem from "./MessageItem";


//Linked from tripdetails component
export default function Messages(props) {
  const [tripID, setTripID] = useState(props.tripID);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const messagesResponse = await axios.get(`http://localhost:8080/api/trips/messages/${tripID}`);
        setMessages(messagesResponse.data);
        console.log(messagesResponse.data);
      } catch (error) {
        console.log(`error fetching messages:`, error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="messages"><h2>Message Board</h2>
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




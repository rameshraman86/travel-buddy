import React from "react";
import axios from 'axios';
import { useState } from "react";

export default function AIAssistant({ id }) {


  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();


    axios.post("http://localhost:8080/api/ai/chat", { prompt })
      .then(res => {
        console.log(res.data.message.content);
        setResponse(res.data.message.content);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSetPrompt = (event) => {
    setPrompt(event.target.value);
  };


  return (
    <>
      <h2>Hi! I am your AI Assistant</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="prompt"
          required={true}
          placeholder="Ask Assistant"
          value={prompt} onChange={handleSetPrompt}
        ></input>
        <button type="submit">Ask</button>

        <div className="response">
          <p>{response}</p>
        </div>

      </form>
    </>
  );
}
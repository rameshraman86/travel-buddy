import "./aiAssistant.css";

import React from "react";
import axios from 'axios';
import { useState } from "react";
import AIAssistantResponse from "./aiAssistantResponse";



export default function AIAssistant({ id, tripLocation, startDate, endDate }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState('');
  const [promptSubmitted, setPromptSubmitted] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    setPromptSubmitted(true);
    handleSetResponse('');

    const prompt = `give me a suggestion for a ${formData.tripType} type trip to ${formData.tripLocation} for 
      ${formData.tripDuration} days for ${formData.totalTravellers} people with a budget of ${formData.tripBudget ? formData.tripBudget : "unlimited"} USD
      with ${formData.accommodationType} accommodation with kids ${formData.withKids} with pets ${formData.withPets}. Make your response concise. 
      Highlight points of interest in your response. Group your suggestion by number of days.
      give me your full response only in <html> format. 
      include only the contents inside <body></body> but do not include the tag <body></body>. 
      keep all headings at <h4>. Do not have any heading higher than <h4>. wrap the entire response inside <div>.`;
    console.log(prompt);
    axios.post("http://localhost:8080/api/ai/chat", { prompt })
      .then(res => {
        handleSetResponse(res.data.message.content);
      })
      .catch(error => {
        console.error(error);
      });
  };


  const handleSetResponse = (aiResponse) => {
    setResponse(aiResponse);
  };

  const handleClearButtonClicked = () => {
    setPromptSubmitted(false);
  };



  const [formData, setFormData] = useState({
    tripLocation: '',
    tripDuration: '',
    totalTravellers: '',
    tripBudget: '',
    withKids: false,
    withPets: false,
    tripType: '',
    accommodationType: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  return (
    <>
      <h2>Not sure where to start your trip plan? Ask Assistant!</h2>
      <div className="aiAssistant">
        <form onSubmit={handleSubmit}>
          <div className="promptQuestions">
            <input
              type="text"
              name="tripLocation"
              className="tripLocation"
              placeholder="Where are you going?"
              required={true}
              value={formData.tripLocation}
              onChange={handleChange}
            />
            <input
              type="number"
              name="tripDuration"
              className="tripDuration"
              placeholder="How many days is your trip for?"
              value={formData.tripDuration}
              onChange={handleChange}
            />
            <input
              type="number"
              name="totalTravellers"
              className="totalTravellers"
              placeholder="How many people?"
              value={formData.totalTravellers}
              onChange={handleChange}
            />
            <label>
              <input
                type="number"
                name="tripBudget"
                className="tripBudget"
                placeholder="What is your budget?"
                value={formData.tripBudget}
                onChange={handleChange}
              />
              USD
            </label>
            <label>
              Travelling with kids?
              <input
                type="checkbox"
                name="withKids"
                className="withKids"
                checked={formData.withKids}
                onChange={handleChange}
              />
            </label>
            <label>
              Travelling with pets?
              <input
                type="checkbox"
                name="withPets"
                className="withPets"
                checked={formData.withPets}
                onChange={handleChange}
              />
            </label>
            <select
              name="tripType"
              className="tripType"
              value={formData.tripType}
              onChange={handleChange}
            >
              <option value="familyVacation">Family Vacation</option>
              <option value="soloTrip">Solo Trip</option>
              <option value="romanticGetaway">Romantic Getaway</option>
              <option value="anniversary">Anniversary</option>
              <option value="bachelorParty">Bachelor Party</option>
              <option value="bacheloretteParty">Bachelorette Party</option>
              <option value="businessTrip">Business Trip</option>
              <option value="adventure">Adventure</option>
            </select>
            <select
              name="accommodationType"
              className="accommodationType"
              value={formData.accommodationType}
              onChange={handleChange}
            >
              <option value="hotel">Hotel</option>
              <option value="hostel">Hostel</option>
              <option value="airbnb">Airbnb</option>
              <option value="camping">Camping</option>
              <option value="glamping">Glamping</option>
              <option value="cabin">Cabin</option>
              <option value="resort">Resort</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <button type="submit" className="submitPrompt">Ask for Suggestions</button>
            <button type="button" className="clearSuggestions" onClick={handleClearButtonClicked}>Clear Suggestions</button>
          </div>
        </form>
        <div className="aiResponse">
          {promptSubmitted && !response && "Getting Suggestions..."}
          {promptSubmitted && response && <AIAssistantResponse
            response={response}
            handleSetResponse={handleSetResponse}
          />}
        </div>
      </div>
    </>
  );
}

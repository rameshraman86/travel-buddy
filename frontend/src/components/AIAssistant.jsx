import "../styles/aiAssistant.css";

// import React from "react";
import axios from 'axios';
import { useState, Fragment } from "react";
import AIAssistantResponse from "./aiAssistantResponse";
import { Listbox, Transition, Dialog } from "@headlessui/react";

// What are the props for?
// Clear out fields after modal closes

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

  const tripTypes = [
    "Family Vacation", "Solo Trip", "Romantic Getaway", "Anniversary", "Bachelor Party", "Bachelorette Party", "Business Trip", "Adventure"
  ];

  const accommodationTypes = [
    "Hotel", "Hostel", "Airbnb", "Camping", "Glamping", "Cabin", "Resort", "Other"
  ];

  const [selectedTripType, setSelectedTripType] = useState(tripTypes[0]);
  const [selectedAccommodationType, setSelectedAccommodationType] = useState(accommodationTypes[0]);

  let [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }



  return (
    <div className="">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 stroke-amber-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg>
        <span>Not sure where to start?</span> </h2>
      <div className="flex items-center gap-2 mb-4">
        <button onClick={openModal} className='rounded-xl border border-transparent bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 focus:outline-none'>Ask our Assistant!</button>

        <button onClick={handleClearButtonClicked} className="inline-flex justify-center px-4 py-2 text-sm font-semibold  text-white bg-gray-600 border border-transparent rounded-xl hover:bg-gray-700 duration-300" >Clear Suggestions</button>
      </div>


      <div className="bg-white/[0.5] rounded-xl w-full p-4 mt-2 my-5">
        {promptSubmitted && !response && "Getting Suggestions..."}
        {promptSubmitted && response && <AIAssistantResponse
          response={response}
          handleSetResponse={handleSetResponse}
        />}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-black/40 " />
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline stroke-amber-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                  Tell us about your trip
                </Dialog.Title>

                <div className="">
                  <form onSubmit={handleSubmit} className="mt-5 ml-2">
                    <div className="flex flex-col gap-2.5">
                      <div>
                        <label className="block text-sm leading-5 font-medium text-gray-700 ml-2.5 mb-1"> What is your destination?</label>
                        <input
                          type="text"
                          name="tripLocation"
                          placeholder="Toronto"
                          required={true}
                          value={formData.tripLocation}
                          onChange={handleChange}
                          className="w-60 opacity-75 bg-gray-50 rounded-full border-0 py-1.5 px-4 text-gray-900 shadow-sm focus:outline-none ring-2 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-amber-600 focus:bg-white sm:text-sm sm:leading-6"
                        />
                      </div>

                      <div className="mt-1">
                        <label className="block text-sm leading-5 font-medium text-gray-700 ml-2.5 mb-1"> How many days are you spending there?</label>
                        <input
                          type="number"
                          name="tripDuration"
                          placeholder="10"
                          value={formData.tripDuration}
                          onChange={handleChange}
                          className="w-60 opacity-75 bg-gray-50 rounded-full border-0 py-1.5 px-4 text-gray-900 shadow-sm focus:outline-none ring-2 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-amber-600 focus:bg-white sm:text-sm sm:leading-6"
                        />
                      </div>

                      <div className="mt-1">
                        <label className="block text-sm leading-5 font-medium text-gray-700 ml-2.5 mb-1"> How many travelers will there be?</label>
                        <input
                          type="number"
                          name="totalTravellers"
                          placeholder="5"
                          value={formData.totalTravellers}
                          onChange={handleChange}
                          className="w-60 opacity-75 bg-gray-50 rounded-full border-0 py-1.5 px-4 text-gray-900 shadow-sm focus:outline-none ring-2 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-amber-600 focus:bg-white sm:text-sm sm:leading-6"
                        />
                      </div>

                      <div className="mt-1">
                        <label className="block text-sm leading-5 font-medium text-gray-700 ml-2.5 mb-1"> What is your travel budget in USD?</label>
                        <input
                          type="number"
                          name="tripBudget"
                          placeholder="5000"
                          value={formData.tripBudget}
                          onChange={handleChange}
                          className="w-60 opacity-75 bg-gray-50 rounded-full border-0 py-1.5 px-4 text-gray-900 shadow-sm focus:outline-none ring-2 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-amber-600 focus:bg-white sm:text-sm sm:leading-6"
                        />
                      </div>

                      <div className="mt-1">
                        <div className="w-full max-w-xs mx-auto">
                          <Listbox
                            style={{ position: "relative", zIndex: 1 }}
                            as="div"
                            className="space-y-1"
                            value={selectedTripType}
                            onChange={setSelectedTripType}
                          >
                            {({ open }) => (
                              <>
                                <Listbox.Label className="block text-sm leading-5 font-medium text-gray-700 ml-3">
                                  What type of trip is it?
                                </Listbox.Label>
                                <div className="relative">
                                  <span className="inline-block w-full rounded-md shadow-sm">
                                    <Listbox.Button className="opacity-75 bg-gray-50 rounded-full border-0 px-4 text-gray-900 shadow-sm focus:outline-none ring-2 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-amber-600 focus:bg-white sm:text-sm sm:leading-6cursor-default relative w-full border-gray-300 pl-3 pr-10 py-2 text-left  focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:leading-5">
                                      <span className="block truncate">{selectedTripType}</span>
                                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <svg
                                          className="h-5 w-5 text-gray-400"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                          stroke="currentColor"
                                        >
                                          <path
                                            d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </span>
                                    </Listbox.Button>
                                  </span>

                                  <Transition
                                    show={open}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
                                  >
                                    <Listbox.Options
                                      static
                                      className="opacity-75 bg-gray-50 max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                                    >
                                      {tripTypes.map((tripType) => (
                                        <Listbox.Option key={tripType} value={tripType}>
                                          {({ selected, active }) => (
                                            <div
                                              className={`${active
                                                ? "text-gray-900 bg-gray-200"
                                                : "text-gray-900"
                                                } cursor-default select-none relative py-2 pl-8 pr-4`}
                                            >
                                              <span
                                                className={`${selected ? "font-semibold" : "font-normal"
                                                  } block truncate`}
                                              >
                                                {tripType}
                                              </span>
                                              {selected && (
                                                <span
                                                  className={`${active ? "text-white" : "text-blue-600"
                                                    } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                                >
                                                  <svg
                                                    className="h-5 w-5 fill-amber-600"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                  >
                                                    <path
                                                      fillRule="evenodd"
                                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                      clipRule="evenodd"
                                                    />
                                                  </svg>
                                                </span>
                                              )}
                                            </div>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </>
                            )}
                          </Listbox>
                        </div>
                      </div>

                      <div className="mt-1">
                        <div className="w-full max-w-xs mx-auto">
                          <Listbox
                            as="div"
                            className="space-y-1"
                            value={selectedAccommodationType}
                            onChange={setSelectedAccommodationType}
                          >
                            {({ open }) => (
                              <>
                                <Listbox.Label className="block text-sm leading-5 font-medium text-gray-700 ml-3">
                                  What type of lodging would you prefer?
                                </Listbox.Label>
                                <div className="relative">
                                  <span className="inline-block w-full rounded-md shadow-sm">
                                    <Listbox.Button className="opacity-75 bg-gray-50 rounded-full border-0 px-4 text-gray-900 shadow-sm focus:outline-none ring-2 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-amber-600 focus:bg-white sm:text-sm sm:leading-6cursor-default relative w-full border-gray-300 pl-3 pr-10 py-2 text-left  focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:leading-5">
                                      <span className="block truncate">{selectedAccommodationType}</span>
                                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <svg
                                          className="h-5 w-5 text-gray-400"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                          stroke="currentColor"
                                        >
                                          <path
                                            d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </span>
                                    </Listbox.Button>
                                  </span>

                                  <Transition
                                    show={open}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
                                  >
                                    <Listbox.Options
                                      static
                                      className="opacity-75 bg-gray-50 max-h-36 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                                    >
                                      {accommodationTypes.map((accommodationType) => (
                                        <Listbox.Option key={accommodationType} value={accommodationType}>
                                          {({ selected, active }) => (
                                            <div
                                              className={`${active
                                                ? "text-gray-900 bg-gray-200"
                                                : "text-gray-900"
                                                } cursor-default select-none relative py-2 pl-8 pr-4`}
                                            >
                                              <span
                                                className={`${selected ? "font-semibold" : "font-normal"
                                                  } block truncate`}
                                              >
                                                {accommodationType}
                                              </span>
                                              {selected && (
                                                <span
                                                  className={`${active ? "text-white" : "text-blue-600"
                                                    } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                                >
                                                  <svg
                                                    className="h-5 w-5 fill-amber-600"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                  >
                                                    <path
                                                      fillRule="evenodd"
                                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                      clipRule="evenodd"
                                                    />
                                                  </svg>
                                                </span>
                                              )}
                                            </div>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </>
                            )}
                          </Listbox>
                        </div>
                      </div>

                      <div className="flex items-center mt-1">
                        <label className="block text-sm leading-5 font-medium text-gray-700 ml-3.5 my-1">
                          Travelling with kids?
                        </label>
                        <input
                          type="checkbox"
                          name="withKids"
                          checked={formData.withKids}
                          onChange={handleChange}
                          className="ml-2 h-4 w-4 accent-amber-500/25 rounded cursor-pointer" />
                      </div>

                      <div className="flex items-center mb-4">
                        <label className="block text-sm leading-5 font-medium text-gray-700 ml-3.5">
                          Travelling with pets?
                        </label>
                        <input
                          type="checkbox"
                          name="withPets"
                          checked={formData.withPets}
                          onChange={handleChange}
                          className="ml-2 h-4 w-4 accent-amber-500/25 rounded cursor-pointer" />
                      </div>

                      <div className="mt-2">
                        <button type="submit" className="inline-flex justify-center mr-3 px-4 py-2 text-sm font-semibold text-white bg-amber-600 border border-transparent rounded-xl hover:bg-amber-700 duration-300" onClick={closeModal}>Ask for Suggestions</button>
                        <button type="button" className="inline-flex justify-center px-4 py-2 text-sm font-semibold  text-white bg-gray-600 border border-transparent rounded-xl hover:bg-gray-700 duration-300" onClick={closeModal}>Cancel</button>
                      </div>
                    </div>



                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>


    </div>
  );
}

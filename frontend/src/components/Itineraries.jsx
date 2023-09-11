import "../styles/Itineraries.css";
import axios from "axios";
import ItineraryItem from './ItineraryItem'; // Import the ItineraryItem component
// import React from 'react';
import { useState, Fragment } from 'react';
import AddItinerary from './AddItinerary';
import { Dialog, Transition } from "@headlessui/react";


//Linked from tripdetails component
export default function Itineraries({ itineraries, itineraryItems, setItineraryItems, handleMarkerClick, tripID, handleSetItineraries, handleUpdateItineraries }) {

  const [createButtonClicked, setCreateButtonClicked] = useState(false);
  const [itineraryType, setItineraryType] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleDeleteItineraryItems = async (url) => {
    try {
      await axios.delete(`http://localhost:8080/api/trips/delete-itinerary-item/${tripID}`, { data: { url } });

      const newItems = itineraryItems.filter(item => item.url !== url);
      setItineraryItems(newItems);
    } catch (error) {
      console.log(`Error deleting itinerary item: `, error);
    }
  };

  const handleSetItineraryType = (event) => {
    handlesetShowErrorMessage(false);
    setItineraryType(event.target.value);
  };

  const handlesetShowErrorMessage = (bool) => {
    setShowErrorMessage(bool);
  };

  const handleCreateNewItineraryClicked = (event) => {
    event.preventDefault();
    setItineraryType('');
    handlesetShowErrorMessage(false);
    setCreateButtonClicked(!createButtonClicked);
  };


  const handleDeleteItinerary = async (itinerary_deleted) => {
    closeModal();
    // const confirmDelete = confirm(`Delete ${itinerary_deleted.type}?`);
    // if (confirmDelete) {
    //delete the itinerary from db
    try {
      const response = await axios.delete(`http://localhost:8080/api/itinerary/delete-itinerary/${itinerary_deleted.id}`);
      console.log(`response from delete itinerary:`, response);
    } catch (error) {
      console.log(`error deleting itinerary:`, error);
    }
    //delete the itinerary from state
    const updatedItineraries = itineraries.filter((itinerary) => itinerary.id !== itinerary_deleted.id);
    handleUpdateItineraries(updatedItineraries);
    // }
  };

  const [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }


  return (
    <div className="Itineraries">
      {/* <h2>Itinerary</h2> */}

      <form onSubmit={handleCreateNewItineraryClicked}>
        {showErrorMessage && <p>Itinerary type {itineraryType} already exists.</p>}
        <button type="submit" className='rounded-xl border border-transparent bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 focus:outline-none gap-1 my-4 mt-8'>Create New List</button>
      </form>
      {createButtonClicked && <AddItinerary
        itineraryType={itineraryType}
        handleSetItineraryType={handleSetItineraryType}
        handleCreateNewItineraryClicked={handleCreateNewItineraryClicked}
        tripID={tripID}
        handleSetItineraries={handleSetItineraries}
        itineraries={itineraries}
        showErrorMessage={showErrorMessage}
        handlesetShowErrorMessage={handlesetShowErrorMessage}
      />}


      {itineraries.map((itinerary) => (
        <div key={itinerary.id} className="bg-white/[0.5] rounded-xl w-5/6 p-4 mt-2 my-5">
          <div className="flex items-center gap-1 mb-2">
            <div className="font-semibold text-md text-gray-900">{toTitleCase(itinerary.type)}</div>
            <button type='button' className='group' onClick={openModal}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 stroke-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" className="group-hover:stroke-red-600 group-hover:stroke-2" />
              </svg>
            </button>
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
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Are you sure you want to delete {toTitleCase(itinerary.type)}?
                    </Dialog.Title>


                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center mr-3 px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 hover:font-semibold"
                        onClick={() => handleDeleteItinerary(itinerary)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700 duration-300 hover:font-semibold"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>


          {itineraryItems.map((item) => {
            if (itinerary.id === item.itinerary_id) {
              return (
                <ItineraryItem
                  key={item.url}
                  handleDelete={handleDeleteItineraryItems}
                  handleMarkerClick={handleMarkerClick}
                  item={item}
                  itineraries={itineraries}
                  {...item} />
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
}

const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
};
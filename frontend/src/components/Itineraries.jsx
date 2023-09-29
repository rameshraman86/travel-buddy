import "../styles/Itineraries.css";
import axios from "axios";
import ItineraryItem from './ItineraryItem'; // Import the ItineraryItem component
import { useState, Fragment } from 'react';
import AddItinerary from './AddItinerary';
import { Dialog, Transition } from "@headlessui/react";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import _ from 'lodash';
import apiConfig from '../../config';

const api_url = process.env.NODE_ENV === 'production' ? apiConfig.production : apiConfig.development;

export default function Itineraries({ itineraries, itineraryItems, setItineraryItems, handleMarkerClick, tripID, handleSetItineraries, handleUpdateItineraries }) {

  const [createButtonClicked, setCreateButtonClicked] = useState(false);
  const [itineraryType, setItineraryType] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleDeleteItineraryItem = async (url) => {
    try {
      await axios.delete(`${api_url}/api/trips/delete-itinerary-item/${tripID}`, { data: { url } });
      const deletedItem = itineraryItems.find(item => item.url === url);
      const newItems = itineraryItems && itineraryItems.filter(item => item.url !== deletedItem.url);
      setItineraryItems(newItems);
    } catch (error) {
      console.log(`Error deleting itinerary item: `, error);
    }
  };

  const handleDeleteItineraryItems = async (remainingItems, deletedItems) => {
    try {
      deletedItems.map(async item => {
        const url = item.url;
        await axios.delete(`${api_url}/api/trips/delete-itinerary-item/${tripID}`, { data: { url } });
      });
      setItineraryItems(remainingItems);
    } catch (error) {
      console.log(`Error deleting itinerary item: `, error);
    }
  };

  const handleMoveItineraryItem = async (itinerary_id, url) => {
    try {
      await axios.put(`${api_url}/api/trips/move-itinerary-item/${tripID}`, { data: { url, itinerary_id } });

      const item = itineraryItems.find(item => item.url === url);
      item.itinerary_id = itinerary_id;

      const newItems = itineraryItems.filter(item => item.url !== url);
      setItineraryItems([...newItems, item]);

    } catch (error) {
      console.log(`Error updating itinerary item: `, error);
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
    //delete the itinerary from db
    try {
      const response = await axios.delete(`${api_url}/api/itinerary/delete-itinerary/${itinerary_deleted.id}`);
      console.log(`response from delete itinerary:`, response);

    } catch (error) {
      console.log(`error deleting itinerary:`, error);
    }
    //delete the itinerary from state
    const updatedItineraries = itineraries.filter((itinerary) => itinerary.id !== itinerary_deleted.id);
    handleUpdateItineraries(updatedItineraries);
    // }

    // delete itinerary items in that itinerary
    const remainingItems = itineraryItems.filter(item => itinerary_deleted.id !== item.itinerary_id);
    const deletedItems = itineraryItems.filter(item => itinerary_deleted.id === item.itinerary_id);
    handleDeleteItineraryItems(remainingItems, deletedItems);

  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItin, setSelectedItin] = useState(null);
  function openModal(itinerary) {
    setSelectedItin(itinerary);
    setIsOpen(true);
  }
  function closeModal() {
    setSelectedItin(null);
    setIsOpen(false);
  }

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) { return; }
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) { return; }
    const newItineraryItems = _.cloneDeep(itineraryItems);

    // drag and drop within the same itinerary
    if (source.droppableId === destination.droppableId) {
      const item = newItineraryItems.splice(source.index, 1);
      newItineraryItems.splice(destination.index, 0, item[0]);
      setItineraryItems(newItineraryItems);

    } else {
      // note: could not use destination.index to decipher the drop position, and thus could not reorder itinerary items
      const index = newItineraryItems.map(item => item.url).indexOf(draggableId);
      newItineraryItems[index].itinerary_id = parseInt(destination.droppableId);
      setItineraryItems(newItineraryItems);
      dndMoveItineraryItem(parseInt(destination.droppableId), newItineraryItems[index].url);

    }

  };

  const dndMoveItineraryItem = async (itinerary_id, url) => {
    try {
      await axios.put(`${api_url}/api/trips/move-itinerary-item/${tripID}`, { data: { url, itinerary_id } });
    } catch (error) {
      console.log(`Error deleting itinerary item: `, error);
    }
  };


  return (
    <div className="Itineraries">
      <form onSubmit={handleCreateNewItineraryClicked}>
        {showErrorMessage && <p>Itinerary type {itineraryType} already exists.</p>}
        <button type="submit" className='rounded-xl border border-transparent bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 focus:outline-none gap-1 my-5'>Create New List</button>
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

      <DragDropContext onDragEnd={onDragEnd}>

        {itineraries.map((itinerary) => (
          <Droppable droppableId={itinerary.id.toString()} key={itinerary.id}>
            {provided => (

              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                key={itinerary.id}
                className="bg-white/[0.5] rounded-xl w-5/6 p-4 mt-0 my-5">
                <div className="flex items-center gap-1 mb-2">
                  <div className="font-semibold text-md text-gray-900">{toTitleCase(itinerary.type)}</div>
                  <button type='button' className='group' onClick={() => openModal(itinerary)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 stroke-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" className="group-hover:stroke-red-600 group-hover:stroke-2" />
                    </svg>
                  </button>
                </div>


                {itineraryItems.map((item, index) => {
                  if (itinerary.id === item.itinerary_id) {
                    return (
                      <ItineraryItem
                        key={item.url}
                        index={index}
                        handleDelete={handleDeleteItineraryItem}
                        handleMove={handleMoveItineraryItem}
                        handleMarkerClick={handleMarkerClick}
                        item={item}
                        itineraries={itineraries}
                        itinerary={itinerary}
                        {...item} />
                    );
                  }
                  return null;
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

        ))}
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
                    Are you sure you want to delete {selectedItin && toTitleCase(selectedItin.type)}?
                  </Dialog.Title>


                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center mr-3 px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 hover:font-semibold"
                      onClick={() => handleDeleteItinerary(selectedItin)}
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
      </DragDropContext>
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
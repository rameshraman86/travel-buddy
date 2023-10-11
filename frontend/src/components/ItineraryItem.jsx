import "../styles/ItineraryItem.css";
import { Fragment } from "react";
import { Menu, Transition } from '@headlessui/react';
import Itineraries from "./Itineraries";
import { Draggable } from "react-beautiful-dnd";


function ItineraryItem({ index, itineraries, itinerary, handleMove, handleDelete, handleMarkerClick, item }) {
  const { name, url, icon, id } = item;
  const otherItineraries = itineraries.filter(itin => itin.type !== itinerary.type);

  const handleMoveItem = (itin) => {
    handleMove(itin.id, url);
  };

  const handleDeleteItem = () => {
    handleDelete(url);
  };
  const handleShowMap = () => {
    handleMarkerClick(item);
  };

  return (
    <>
      <Draggable draggableId={url} key={url} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="flex items-center mt-1.5 bg-white rounded-full px-2 py-1">
            <div className="flex justify-center items-center bg-white w-8 h-8 p-2 rounded-full">
              <img src={icon} alt="" className="" />
            </div>
            <ul className="pl-2">
              <li className="flex justify-center items-center text-gray-800 text-[15px] font-medium">
                <span>{name}</span>

                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="flex items-center rounded-full  text-gray-400 hover:text-gray-600 hover:bg-amber-100 focus:outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                      </svg>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${active ? 'bg-gray-200 font-medium text-gray-900' : 'text-gray-700'
                                } group flex w-full items-center px-2 py-2 text-sm`}
                              onClick={handleShowMap}
                            >
                              <p className="my-auto">Show on map</p>
                            </button>
                          )}
                        </Menu.Item>

                        {otherItineraries.map(itin => (
                          <Menu.Item key={itin.id}>
                            {({ active }) => (
                              <button
                                className={`${active ? 'bg-gray-200 font-medium text-gray-900' : 'text-gray-700'
                                  } group flex w-full items-center px-2 py-2 text-sm`}
                                onClick={() => handleMoveItem(itin)}
                              >
                                <p className="my-auto">Move to {itin.type}</p>
                              </button>
                            )}
                          </Menu.Item>
                        ))}

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${active ? 'bg-red-500 font-medium text-white' : 'text-red-500'
                                } group flex w-full items-center px-2 py-2 text-sm`}
                              onClick={handleDeleteItem}
                            >
                              Delete
                            </button>
                          )}
                        </Menu.Item>

                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

              </li>
            </ul>
          </div>
        )}
      </Draggable>
    </>
  );
}

export default ItineraryItem;
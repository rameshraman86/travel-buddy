import { useState, Fragment, useEffect } from 'react';
import { InfoWindowF } from "@react-google-maps/api";
// import Carousel from 'react-material-ui-carousel';
import { Disclosure, Listbox, Transition } from '@headlessui/react';
// import { Carousel } from "@material-tailwind/react";
import { Carousel } from 'flowbite-react';



function InfoWindow({ selectedPlace, setSelectedPlace, itineraryItems, selectedItinerary, setSelectedItinerary, addToWishlist, itineraries }) {

  const [selectedItineraryType, setSelectedItineraryType] = useState('select a list');

  useEffect(() => {
    setSelectedItineraryType(itineraries?.[0]?.type);
  }, []);

  useEffect(() => {
    setSelectedItinerary(itineraries.find(itinerary => itinerary.type === selectedItineraryType));

  }, [itineraries, selectedItineraryType, setSelectedItinerary]);

  // const selectOnChange = async (e) => {
  //   try {
  //     const itineraryData = await getItineraryIDFromType(e.target.value, tripID);
  //     setSelectedItinerary(itineraryData);
  //   } catch (error) {
  //     console.error(`Error getting itineraries:`, error);
  //   }
  // };
  return (
    <>

      {selectedPlace && (
        <InfoWindowF
          position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
          zIndex={1}
          options={{
            pixelOffset: {
              width: 0,
              height: -40
            },
            maxWidth: 300,
            minWidth: 300,
          }}
          onCloseClick={() => {
            setSelectedPlace(undefined);
          }}
        >
          <div className="m-1 flex flex-col">
            <h3 className='text-lg font-medium group'>
              {selectedPlace.name} <a className='' href={selectedPlace.website}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" className="group-hover:stroke-blue-800 group-hover:stroke-2" />
                </svg>
              </a>
              {/* <img src={selectedPlace.icon} className='inline w-5 h-5 ml-1' /> */}
            </h3>
            <div className='my-1'>
              {itineraryItems.some(place => place.url === selectedPlace.url) ?
                <p className="text-sm font-medium italic flex items-center gap-1">
                  In List</p> :
                (<div>
                  <div>
                    <Listbox value={selectedItineraryType}
                      onChange={setSelectedItineraryType}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-1/2 cursor-default rounded-lg bg-gray-100 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm">
                          <span className="block truncate">{selectedItineraryType}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-1/2 overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {itineraries.map((itinerary) => (
                              <Listbox.Option key={itinerary.id} value={itinerary.type} className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                                }`
                              }>
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate text-sm ${selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                      {itinerary.type}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>

                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>

                  <button className="flex items-center rounded-full border border-transparent bg-amber-600 pr-4 pl-2 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none gap-1 my-2"
                    onClick={() => addToWishlist(selectedPlace, selectedItinerary)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add to List
                  </button>
                </div>)
              }

            </div>

            <div className="bg-gray-100 p-3 rounded-md flex flex-col gap-2">
              <p className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
                {selectedPlace.address}</p>

              {selectedPlace.phone && <p className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
                {selectedPlace.phone}</p>}

              {selectedPlace.rating &&
                (<div className='flex items-center gap-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>

                  <div className="flex items-center">
                    <p>{selectedPlace.rating}</p>
                    <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                    <p>{selectedPlace.user_ratings_total.toLocaleString()} reviews</p>
                  </div>
                </div>)
              }


              {selectedPlace.photos && <div className='h-56 w-60 group'>
                {selectedPlace.photos &&
                  <Carousel
                    leftControl={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 stroke-gray-300 -ml-2 group-hover:bg-gray-500/30 rounded-full" >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" className='' />
                    </svg>}
                    rightControl={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 stroke-gray-300  -mr-2 group-hover:bg-gray-500/30 rounded-full">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    }
                    pauseOnHover indicators={false}>
                    {selectedPlace.photos.map((img, id) => (
                      <div className="grid place-items-center h-56" key={id}>
                        <img key={id} src={img} className=' object-contain h-56 w-60' />
                      </div>))
                    }
                  </Carousel>
                }

              </div>}

              {selectedPlace.opening_hours &&
                <div>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg px-2 py-2 text-left hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                          <span>Opening Hours</span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${open ? '' : 'rotate-180 transform'
                            } h-4 w-4 text-gray-600`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                          </svg>


                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-1 pb-1 text-gray-500">
                          {selectedPlace.opening_hours.map((day, index) =>
                            <div key={index} className="my-0.5">{day}</div>)}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>}
            </div>



            <br />
            <div className='flex items-center gap-1 group'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" className="group-hover:stroke-blue-800" />
              </svg>

              <a href={selectedPlace.url} className="group-hover:text-blue-800 visited:text-purple-600">View in Google Maps</a>
            </div>
          </div>
        </InfoWindowF>
      )}
    </>
  );

}

export default InfoWindow;
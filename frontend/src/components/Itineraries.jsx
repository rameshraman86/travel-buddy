// import React, { useState, useEffect } from "react";
// import axios from 'axios';

// //coming from TripDetails.jsx

// export default function Itineraries(props) {
//   const [tripID, setTripID] = useState(props.tripID);
//   const [itineraries, setItineraries] = useState([]);
//   const [itineraryItems, setItineraryItems] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const itinResponse = await axios.get(`http://localhost:8080/api/trips/itinerary-names/${tripID}`);
//         setItineraries(itinResponse.data);

//         const itinItemsResponse = await axios.get(`http://localhost:8080/api/trips/itinerary-items/${tripID}`);
//         setItineraryItems(itinItemsResponse.data);
//       } catch (error) {
//         console.log(`error fetching itineraries:`, error);
//       }
//     };
//     fetchData();
//   }, []);


//   const composeItinerary = (itineraries, itineraryItems) => {
//     let itineraryHTML = '<div class="itinerary">';

//     for (const itinerary of itineraries) {
//       itineraryHTML += `<div class="itin_name">${itinerary.type}`;
//       for (const item of itineraryItems) {
//         if (itinerary.id === item.itinerary_id) {
//           itineraryHTML += `
//             <div class="itinItems">
//               <ul>  
//                 <li>Name: ${item.name}</li>
//                 <li>Address: ${item.address}</li>
//                 <li>Description: ${item.description}</li>
//                 <li>Category: ${item.category}</li>
//               </ul>
//             </div>
//           `;
//         }
//       }
//       itineraryHTML += `</div>`;
//     }
//     itineraryHTML += `</div>`;
//     return itineraryHTML;
//   };

//   // console.log(composeItinerary(itineraries, itineraryItems));
//   return (
//     <>
//       <div>
//         {composeItinerary(itineraries, itineraryItems)}
//       </div>

//     </>
//   );
// }


// /*
// <div className="itinerary">
// <itin_type>monday: </itin_type>
//   <div className="itinItems"> 
//     name, address, desc, category
//     name, address, desc, category
//   </div>
// <itin_type>Tue: </itin_type>
//   <div className="itinItems"> 
//     name, address, desc, category
//   </div>
// </div>

// */

import React, { useState, useEffect } from "react";
import axios from 'axios';
import ItineraryItem from './ItineraryItem'; // Import the ItineraryItem component

export default function Itineraries(props) {
  const [tripID, setTripID] = useState(props.tripID);
  const [itineraries, setItineraries] = useState([]);
  const [itineraryItems, setItineraryItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itinResponse = await axios.get(`http://localhost:8080/api/trips/itinerary-names/${tripID}`);
        setItineraries(itinResponse.data);

        const itinItemsResponse = await axios.get(`http://localhost:8080/api/trips/itinerary-items/${tripID}`);
        setItineraryItems(itinItemsResponse.data);
      } catch (error) {
        console.log(`error fetching itineraries:`, error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {itineraries.map((itinerary) => (
        <div key={itinerary.id} className="itinerary">
          <div className="itin_name"><strong>{itinerary.type}</strong></div>
          {itineraryItems.map((item) => {
            if (itinerary.id === item.itinerary_id) {
              return (
                <ItineraryItem
                  key={item.id}
                  name={item.name}
                  address={item.address}
                  description={item.description}
                  category={item.category}
                />
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
}

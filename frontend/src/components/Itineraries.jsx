import "../styles/Itineraries.css";
import axios from "axios";
import ItineraryItem from './ItineraryItem'; // Import the ItineraryItem component

//Linked from tripdetails component
export default function Itineraries({ itineraries, itineraryItems, setItineraryItems, tripID, handleMarkerClick }) {

  const handleDelete = async (url) => {
    try {
      await axios.delete(`http://localhost:8080/api/trips/delete-itinerary-item/${tripID}`, { data: { url } });

      const newItems = itineraryItems.filter(item => item.url !== url);
      setItineraryItems(newItems);
    } catch (error) {
      console.log(`Error deleting itinerary item: `, error);
    }
  };


  return (
    <div className="Itineraries">
      <h2>Itinerary</h2>
      {itineraries.map((itinerary) => (
        <div key={itinerary.id} className="itinerary">
          <div className="itinerary_title"><strong>{itinerary.type}</strong></div>
          {itineraryItems.map((item) => {
            if (itinerary.id === item.itinerary_id) {
              return (
                <ItineraryItem
                  key={item.url}
                  handleDelete={handleDelete}
                  handleMarkerClick={handleMarkerClick}
                  item={item}
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

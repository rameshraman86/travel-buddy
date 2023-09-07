import ItineraryItem from './ItineraryItem'; // Import the ItineraryItem component

//Linked from tripdetails component
export default function Itineraries({ itineraries, itineraryItems }) {

  return (
    <div className="itineraries">
      <h2>Itinerary</h2>
      {itineraries.map((itinerary) => (
        <div key={itinerary.id} className="itinerary">
          <div className="itinerary_title"><strong>{itinerary.type}</strong></div>
          {itineraryItems.map((item) => {
            if (itinerary.id === item.itinerary_id) {
              return (
                <ItineraryItem
                  key={item.url}
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

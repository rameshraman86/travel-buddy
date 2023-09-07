import React from "react";

function ItineraryItem({ address, phone, name, rating, user_ratings_total, url, opening_hours, website, type, photos, icon, completed }) {

  return (
    <div className="itinItems">
      {/* {props["0"].phone} */}
      <ul>
        <li>Name: {name}</li>
        <li>Address: {address}</li>
        <li>photos: {opening_hours}</li>
        <li>Category: {type}</li>
      </ul>
    </div>
  );
}

export default ItineraryItem;

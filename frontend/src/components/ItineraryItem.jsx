import React from "react";

function ItineraryItem({ name, address, description, category }) {
  return (
    <div className="itinItems">
      <ul>
        <li>Name: {name}</li>
        <li>Address: {address}</li>
        <li>Description: {description}</li>
        <li>Category: {category}</li>
      </ul>
    </div>
  );
}

export default ItineraryItem;

import React from "react";
import axios from 'axios';


export default function Itineraries(props) {
  const { tripID } = props;

  return (
    <>
    

      <h2>Itineraries</h2>

      <p>itinary_title_1:</p>
      <ul>
        <li>itinary_item1</li>
        <li>itinary_item2</li>
        <li>itinary_item3</li>
      </ul>
      <p>itinary_title_2:</p>
      <ul>
        <li>itinary_item1</li>
        <li>itinary_item2</li>
        <li>itinary_item3</li>
      </ul>
    </>
  );

}
import React from "react";
import { Link } from 'react-router-dom';


export default function NotFound() {

  return (
    <>
     <div className="flex mt-64 min-h-full flex-1 flex-col justify-center items-center px-6 pb-12 gap-12">
        <div className="flex justify-center items-end gap-1.5">
      <h3 className="text-center text-4xl font-medium leading-9 tracking-tight text-gray-900">  <h1 className="text-center text-4xl font-medium leading-9 tracking-tight text-gray-900">Travel Buddy!!!</h1> Uh! Oh! this link does not exist. Click <Link className="text-amber-600" to='/'>here</Link> to go back to home page</h3>

      </div>
    </div>
    </>
  );
}
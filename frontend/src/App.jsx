import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Homepage from './components/HomePage';
import NewTripPage from './components/NewtripPage';
import Chat from './components/Chat';



function App() {

  return (
    <>
      <Routes>
        {/* <Chat /> */}
        <Route path='/' element={<Homepage />} />
        <Route path='/new' element={<NewTripPage />} />
      </Routes>
    </>
  );
}

export default App;

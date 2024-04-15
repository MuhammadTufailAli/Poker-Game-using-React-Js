import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//importing screen

import Mainmenuscreen from './screens/Mainmenuscreen';
import Gameplayscreen from './Gameplayscreen';

function App() {
  localStorage.setItem('gamesound', true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Mainmenuscreen />} />
        <Route path='/gameplay' element={<Gameplayscreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//importing screen

import Mainmenuscreen from './screens/Mainmenuscreen';
import Gameplayscreen from './Gameplayscreen';

function App() {
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

import { useState } from 'react'
import './App.css'
import Nav from './Components/Nav';
import Index from './Pages/Index';
import Home from './Pages/Home';
import New from './Pages/New';

import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/bookmarks" element={<Index />} />
          <Route path="/bookmarks/new" element={<New />} />
        </Routes>
      </main>
    </>
  )
}

export default App;

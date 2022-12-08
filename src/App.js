import React from 'react';
import Header from './Header'
import Footer from './Footer'
import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';

function App() {
  return (
  <BrowserRouter>
    <Header/>
    <Footer/>
  </BrowserRouter>
  );
}

export default App;
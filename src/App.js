import React from 'react';
import Header from './Header'
import Footer from './Footer'
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import './App.css';

function App() {
  return (
  <BrowserRouter>
    <Header/>
    <Footer/>
  </BrowserRouter>
  );
}

export default App;
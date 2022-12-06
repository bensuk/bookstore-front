import {Home} from './Home';
import {Publisher} from './Publisher';
import {Author} from './Author';
import {Book} from './Book';
import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';
import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

function Header() {
    return (
    <BrowserRouter>
    <nav className='navbar navbar-expand-sm bg-light navbar-light'>
        <ul className='navbar-nav'>
            <li className='nav-item mr-1'>
                <NavLink className="btn btn-light btn-outline-primary" to="/">
                    Home
                </NavLink>
            </li>
            <li className='nav-item mr-1'>
                <NavLink className="btn btn-light btn-outline-primary" to="/Publishers">
                    Publisher
                </NavLink>
            </li>
            <li className='nav-item mr-1'>
                <NavLink className="btn btn-light btn-outline-primary" to="/Authors">
                    Author
                </NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className="btn btn-light btn-outline-primary" to="/Books">
                    Book
                </NavLink>
            </li>
        </ul>
        <ul className='navbar-nav ml-auto'>
            <li className='nav-item mr-1'>
                <NavLink className="btn btn-light btn-outline-primary" to="/Login">
                    Login
                </NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className="btn btn-light btn-outline-primary" to="/SignUp">
                    Sign Up
                </NavLink>
            </li>
        </ul>
    </nav>
    
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/Publishers' element={<Publisher/>}/>
        <Route exact path='/Authors' element={<Author/>}/>
        <Route exact path='/Books' element={<Book/>}/>
        <Route exact path='/Login' element={<Login/>}/>
        <Route exact path='/SignUp' element={<SignUp/>}/>
    </Routes>
        
    </BrowserRouter>
  );
}

export default Header;
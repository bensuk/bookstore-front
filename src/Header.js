import {Home} from './Home';
import {Publisher} from './Publisher';
import {Author} from './Author';
import {Book} from './Book';
import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

function Header() {
    const [isLogged, setLogged] = useState(false)

    // useEffect(()=>{
    //     const user = localStorage.getItem("user");

    //     if (user){
    //         setLogged(true)
    //     }
    // })

    function logOut(){
        localStorage.removeItem("user");
        setLogged(false);
    }

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
        {isLogged ? (
        <ul className='navbar-nav ml-auto'>
            <li className='nav-item mr-1'>
                <button className="btn btn-light btn-outline-primary" onClick={logOut}>
                    Log out
                </button>
            </li>
        </ul>) : (
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
        </ul>)}
    </nav>
    
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/Publishers' element={<Publisher/>}/>
        <Route exact path='/Authors' element={<Author/>}/>
        <Route exact path='/Books' element={<Book/>}/>
        <Route exact path='/Login' element={<Login loggedState = {setLogged}/>}/>
        <Route exact path='/SignUp' element={<SignUp/>}/>
    </Routes>
        
    </BrowserRouter>
  );
}

export default Header;
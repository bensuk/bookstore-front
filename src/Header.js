import {Home} from './Home';
import Publisher from './Publisher';
import Author from './Author';
import Book from './Book';
import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import {NotFound} from './NotFound';

function Header() {
    const [isLogged, setLogged] = useState(false)

    useEffect(()=>{
        const user = localStorage.getItem("user");

        if (user){
            setLogged(true)
        }
    }, [])

    function logOut(){
        localStorage.removeItem("user");
        setLogged(false);
    }

    return (
    <div className="App container" style={{minHeight: 80 + 'vh'}}>
    <nav className='navbar navbar-expand-sm bg-light navbar-light'>
        <ul className='navbar-nav'>
            <li className='nav-item m-1'>
                <NavLink className="btn btn-light btn-outline-primary" to="/">
                    Home
                </NavLink>
            </li>
            <li className='nav-item m-1'>
                <NavLink className="btn btn-light btn-outline-primary" to="/publishers">
                    Publishers
                </NavLink>
            </li>
        </ul>
        {isLogged ? (
        <ul className='navbar-nav ml-auto'>
            <li className='nav-item m-1'>
                <button className="btn btn-light btn-outline-primary" onClick={logOut}>
                    Log out
                </button>
            </li>
        </ul>) : (
        <ul className='navbar-nav ml-auto'>
            <li className='nav-item m-1'>
                <NavLink className="btn btn-light btn-outline-primary" to="/Login">
                    Login
                </NavLink>
            </li>
            <li className='nav-item m-1'>
                <NavLink className="btn btn-light btn-outline-primary" to="/SignUp">
                    Sign Up
                </NavLink>
            </li>
        </ul>)}
    </nav>
    
    <Routes>
        <Route index element={<Home/>}/>
        <Route path='Publishers' element={<Publisher isUserLogged = {isLogged} />}/>
        <Route path='Publishers/:publisherId/Authors' element={< Author isUserLogged = {isLogged} />}/>
        <Route path='Publishers/:publisherId/Authors/:authorId/Books' element={< Book isUserLogged = {isLogged} />}/>
        <Route path='Login' element={<Login loggedState = {setLogged}/>}/>
        <Route path='SignUp' element={<SignUp/>}/>
        <Route path='NotFound' element={<NotFound/>}/>
        <Route path='*' element={<NotFound/>}/>
    </Routes>
    </div>
  );
}

export default Header;
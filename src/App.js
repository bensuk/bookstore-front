import './App.css';
import {Home} from './Home';
import {Publisher} from './Publisher';
import {Author} from './Author';
import {Book} from './Book';
import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className='d-flex justify-content-center m-3'>
      React JS Frontend</h3>

      <nav className='navbar navbar-expand-sm bg-light navbar-light mb-3'>
        <ul className='navbar-nav'>
          <li className='nav-item mx-1'>
            <NavLink className="btn btn-light btn-outline-primary" to="/">
              Home
            </NavLink>
          </li>
          <li className='nav-item mx-1'>
            <NavLink className="btn btn-light btn-outline-primary" to="/Publishers">
              Publisher
            </NavLink>
          </li>
          <li className='nav-item mx-1'>
            <NavLink className="btn btn-light btn-outline-primary" to="/Authors">
              Author
            </NavLink>
          </li>
          <li className='nav-item mx-1'>
            <NavLink className="btn btn-light btn-outline-primary" to="/Books">
              Book
            </NavLink>
          </li>
        </ul>
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item mx-1'>
            <NavLink className="btn btn-light btn-outline-primary" to="/">
              Login
            </NavLink>
          </li>
          <li className='nav-item mx-1'>
            <NavLink className="btn btn-light btn-outline-primary" to="/">
              Sign up
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/Publishers' element={<Publisher/>}/>
        <Route exact path='/Authors' element={<Author/>}/>
        <Route exact path='/Books' element={Book}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
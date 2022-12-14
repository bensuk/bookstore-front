import {Link} from 'react-router-dom';
import React from 'react';

function Footer() {
    return (
    <div className="container">
        <footer className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><Link className="nav-link px-2 text-muted" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link px-2 text-muted" to="/publishers">Publishers</Link></li>
            </ul>
          <p className="text-center text-muted my-1">Benas Sukackas IFK-0</p>
          <p className="text-center text-muted my-1">P170B115 Skaitiniai metodai ir algoritmai</p>
        </footer>
    </div>
  );
}

export default Footer;
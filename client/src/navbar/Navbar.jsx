import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/bookAdmin" className='navbar-brand'>Book Manager</Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setShowLinks(!showLinks)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${showLinks ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className='nav-list'><Link className="nav-link" to="/bookAdmin">All Books</Link></li>
            <li className="nav-item">
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

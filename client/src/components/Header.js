import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { SiLighthouse } from 'react-icons/si';

const Header = ({ logoutSubmit, currentUser }) => {
  return (
    <header className='header'>
      <div className='header-content'>
        <Link to='/'>
          <h2>
            <SiLighthouse />
            JamHouse
          </h2>
        </Link>
        <div className='links-container'>
          <ul className='links'>
            <li>
              <NavLink activeClassName='active' exact to='/'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active' exact to='/jams'>
                All Jams
              </NavLink>
            </li>
            {currentUser ? (
              <Link to='/'>
                <li>
                  <button onClick={() => logoutSubmit()}>Logout</button>
                </li>
              </Link>
            ) : (
              <NavLink to='/login'>
                <li>
                  <button>Login</button>
                </li>
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

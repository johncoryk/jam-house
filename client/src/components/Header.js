import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ logoutSubmit }) => {
  return (
    <header className='header'>
      <div className='header-content'>
        <h3>logo</h3>
        <div className='links-container'>
          <ul className='links'>
            <li>
              <NavLink activeClassName='active' exact to='/'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active' exact to='/game-search'>
                Search Games
              </NavLink>
            </li>
            <li>
              <button onClick={() => logoutSubmit()}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

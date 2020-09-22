import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
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
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

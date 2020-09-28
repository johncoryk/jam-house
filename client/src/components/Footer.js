import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className='footer-container'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/jams'>Browse Jams</Link>
          </li>
        </ul>
        <p>
          Created by <a href='https://github.com/johncoryk'>Cory Kelley</a> with
          lots of ☕️
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { GrGamepad, GrBrush, GrConfigure, GrPower } from 'react-icons/gr';

export default class MainPage extends Component {
  render() {
    return (
      <main>
        <h4>
          User: {this.props.currentUser && this.props.currentUser.username}
        </h4>
        <div className='four-square'>
          <IconContext.Provider value={{ style: { fontSize: '150px' } }}>
            <Link to='/jam/new'>
              <div className='nav-cards' id='create-jam'>
                <GrBrush className='icon' />
                <h3>Create a jam</h3>
              </div>
            </Link>
            <Link to='/jams'>
              <div className='nav-cards' id='join-jam'>
                <GrGamepad className='icon' />
                <h3>Join a jam</h3>
              </div>
            </Link>
            <Link to='/dashboard'>
              <div className='nav-cards' id='dashboard'>
                <GrConfigure className='icon' />
                <h3>Dashboard</h3>
              </div>
            </Link>
            <Link to={!this.props.currentUser && '/login'}>
              <div
                onClick={
                  this.props.currentUser
                    ? () => this.props.logoutSubmit()
                    : null
                }
                className='nav-cards'
                id='logout'
              >
                <GrPower className='icon' />
                <h3>Log in/out</h3>
              </div>
            </Link>
          </IconContext.Provider>
        </div>
      </main>
    );
  }
}

import React from 'react';
import { Redirect } from 'react-router-dom';

import Jams from './Jams';
import Login from './Login';
import Dashboard from './Dashboard';

export default class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allJams: null,
      dataLoaded: false,
      currentPage: props.currentPage,
      isLoggedIn: false,
      currentUser: null,
    };

    this.decideWhichToRender = this.decideWhichToRender.bind(this);
    this.authSubmit = this.authSubmit.bind(this);
  }

  componentDidMount() {
    if (this.state.currentPage === 'index') {
      fetch('/api/jams')
        .then(res => res.json())
        .then(data => {
          this.setState({
            allJams: data.jams,
            dataLoaded: true,
          });
        });
    } else if (this.state.currentPage === 'login') {
      this.setState({
        dataLoaded: true,
      });
    } else if (this.state.currentPage === 'dashboard') {
      this.setState({
        dataLoaded: true,
      });
    }
    this.decideWhichToRender = this.decideWhichToRender.bind(this);
  }

  authSubmit(e, route, method, data) {
    e.preventDefault();
    fetch(`api/${route}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => {
      res.json().then(data =>
        this.setState({
          isLoggedIn: true,
          currentUser: data.user,
          currentPage: 'dashboard',
        })
      );
    });
  }

  decideWhichToRender() {
    switch (this.state.currentPage) {
      case 'index':
        return (
          <Jams
            currentUser={this.state.currentUser}
            allJams={this.state.allJams}
          />
        );
      case 'dashboard':
        return <Dashboard currentUser={this.state.currentUser} />;
      case 'login':
        return <Login authSubmit={this.authSubmit} />;
      default:
        return <Redirect push to='/' />;
    }
  }

  render() {
    return (
      <div className='container'>
        {this.state.dataLoaded ? this.decideWhichToRender() : <p>Loading...</p>}
      </div>
    );
  }
}

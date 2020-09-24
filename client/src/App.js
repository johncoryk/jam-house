import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  useHistory,
} from 'react-router-dom';

import Header from './components/Header';
import Controller from './components/Controller';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };

    this.authSubmit = this.authSubmit.bind(this);
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
          currentUser: data.user,
        })
      );
    });
  }

  componentDidMount() {
    fetch('/api/auth/verify')
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.setState({
            isLoggedIn: true,
            currentUser: data.user,
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Router>
        <Header />
        <div className='main-content'>
          <Route
            exact
            path='/'
            render={() => <MainPage currentUser={this.state.currentUser} />}
          />
          <Route
            exact
            path='/jams'
            render={() => <Controller props={this.state} currentPage='index' />}
          />
          <Route
            exact
            path='/dashboard'
            render={() => (
              <Controller
                currentPage='dashboard'
                currentUser={this.state.currentUser}
              />
            )}
          />
          <Route
            exact
            path='/login'
            render={() => (
              <Controller currentPage='login' authSubmit={this.authSubmit} />
            )}
          />
        </div>
        <Footer />
      </Router>
    );
  }
}

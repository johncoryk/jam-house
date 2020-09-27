import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import Header from './components/Header';
import Controller from './components/Controller';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import Register from './components/Register';
import Login from './components/Login';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };

    this.loginSubmit = this.loginSubmit.bind(this);
    this.registerSubmit = this.registerSubmit.bind(this);
    this.logoutSubmit = this.logoutSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/api/auth/verify', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.setState({
            currentUser: data.user,
          });
        }
      })
      .catch(err => console.log(err));
  }

  loginSubmit(e, data) {
    e.preventDefault();
    fetch(`/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then(res => {
        res.json().then(data =>
          this.setState({
            currentUser: data.user,
          })
        );
      })
      .catch(err => console.log(err));
  }

  registerSubmit(e, data) {
    e.preventDefault();
    fetch(`/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          currentUser: data.user,
        });
      })
      .catch(err => console.log(err));
  }

  logoutSubmit() {
    fetch(`/api/auth/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(() => {
        this.setState({
          currentUser: null,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Router>
        <Header
          currentUser={this.state.currentUser}
          logoutSubmit={this.logoutSubmit}
        />
        <div className='main-content'>
          <Route
            exact
            path='/'
            render={() => (
              <MainPage
                loginSubmit={this.loginSubmit}
                logoutSubmit={this.logoutSubmit}
                currentUser={this.state.currentUser}
              />
            )}
          />
          <Route
            exact
            path='/jams'
            render={() => (
              <Controller
                currentUser={this.state.currentUser}
                currentPage='index'
              />
            )}
          />
          <Route
            exact
            path='/jam/:id'
            render={props => (
              <Controller currentPage='show' jamId={props.match.params.id} />
            )}
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
            path='/jam/new'
            render={() => (
              <Controller
                currentPage='create jam'
                currentUser={this.state.currentUser}
              />
            )}
          />
          <Route
            exact
            path='/login'
            render={() =>
              this.state.currentUser ? (
                <Redirect to='/' />
              ) : (
                <Login loginSubmit={this.loginSubmit} />
              )
            }
          />
          <Route
            exact
            path='/register'
            render={() =>
              this.state.currentUser ? (
                <Redirect to='/' />
              ) : (
                <Register registerSubmit={this.registerSubmit} />
              )
            }
          />
        </div>
        <Footer />
      </Router>
    );
  }
}

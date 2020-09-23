import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Header from './components/Header';
import Controller from './components/Controller';
import Footer from './components/Footer';
import MainPage from './components/MainPage';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div className='main-content'>
          <Route exact path='/' component={MainPage} />
          <Route
            exact
            path='/jams'
            render={() => <Controller props={this.state} currentPage='index' />}
          />
          <Route
            exact
            path='/dashboard'
            render={() => <Controller currentPage='dashboard' />}
          />
          <Route
            exact
            path='/login'
            render={() => <Controller currentPage='login' />}
          />
        </div>
        <Footer />
      </Router>
    );
  }
}

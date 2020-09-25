import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Dashboard extends Component {
  render() {
    return (
      <main>
        {!this.props.currentUser && <Redirect to='/login' />}
        <h1>{this.props.currentUser && this.props.currentUser.username}</h1>
      </main>
    );
  }
}

import React, { Component } from 'react';

export default class Dashboard extends Component {
  render() {
    return (
      <main>
        <h1>Name: {this.props.currentUser.username}</h1>
      </main>
    );
  }
}

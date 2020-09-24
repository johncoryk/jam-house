import React, { Component } from 'react';

export default class Dashboard extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <main>
        <h1>{this.props.currentUser && this.props.currentUser.username}</h1>
      </main>
    );
  }
}

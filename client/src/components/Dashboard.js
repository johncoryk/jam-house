import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { RiGameFill } from 'react-icons/ri';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      createdJams: null,
      joinedJams: [],
    };

    this.getCreatedJams = this.getCreatedJams.bind(this);
    this.getJoinedJams = this.getJoinedJams.bind(this);
  }

  componentDidMount() {
    this.getCreatedJams();
    this.getJoinedJams();
  }

  getCreatedJams() {
    fetch(`/api/user`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          createdJams: data.data.jams,
        });
      })
      .catch(error => console.log(error));
  }

  getJoinedJams() {
    fetch('/api/user/games')
      .then(res => res.json())
      .then(data =>
        data.data.games.map(game => {
          fetch(`/api/jams/${game.jam_id}`)
            .then(res => res.json())
            .then(data => {
              this.setState({
                joinedJams: [...this.state.joinedJams, data.jam],
              });
            })
            .catch(error => console.log(error));
        })
      );
  }

  render() {
    return (
      <main>
        {!this.props.currentUser && <Redirect to='/login' />}
        <h1>
          Hi {this.props.currentUser && this.props.currentUser.username},
          welcome back!
        </h1>
        <div className='dashboard-section'>
          <h2>Jams you've created:</h2>
          <hr />
          <ul>
            {this.state.createdJams
              ? this.state.createdJams.map(jam => (
                  <li key={jam.id}>
                    <RiGameFill />
                    {jam.title}
                  </li>
                ))
              : "You haven't created any jams yet!"}
          </ul>
        </div>
        <div className='dashboard-section'>
          <h2>Jams you've joined:</h2>
          <hr />
          <ul>
            {this.state.joinedJams
              ? this.state.joinedJams.map(jam => (
                  <li key={jam.id}>
                    <RiGameFill />
                    {jam.title}
                  </li>
                ))
              : "You haven't created any jams yet!"}
          </ul>
        </div>
      </main>
    );
  }
}

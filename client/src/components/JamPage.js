import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import moment from 'moment';

export default class JamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jam: this.props.currentJam,
      games: null,
      joined: false,
      isOpen: null,
      user: this.props.currentUser,
    };

    this.joinJam = this.joinJam.bind(this);
    this.getGames = this.getGames.bind(this);
    this.formatEndDate = this.formatEndDate.bind(this);
  }

  componentDidMount() {
    console.log(this.state.user);
    this.getGames();
    const endDate = this.formatEndDate(this.state.startDate);
    if (endDate < moment(new Date()).format('MM/DD/YYYY')) {
      this.setState({
        isOpen: false,
      });
    } else {
      this.setState({
        isOpen: true,
      });
    }
  }

  formatEndDate = startDate => {
    return moment(startDate).add(this.state.duration, 'd').format('MM/DD/YYYY');
  };

  joinJam() {
    fetch(`/api/games/new/${this.state.jam.id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ data: this.state.jam }),
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          games: [...this.state.games, data.game],
          joined: true,
        });
      });
  }

  getGames() {
    fetch(`/api/games/jam/${this.state.jam.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          games: data.games,
        });
        console.log(this.state.games);
      });
  }

  render() {
    return (
      <section className='jam-page'>
        {this.state.joined && <Redirect to='/' />}
        <h1>{this.state.jam && this.state.jam.title}</h1>
        <h3>{this.state.jam && this.state.jam.description}</h3>
        <p>
          {this.state.isOpen === true
            ? `Ends: ${this.formatEndDate(this.state.startDate)}`
            : `Ended: ${this.formatEndDate(this.state.startDate)}`}
        </p>
        {this.state.games &&
        this.state.games.find(
          game => game.creator_id === this.state.user.id
        ) ? (
          `You've already joined this jam!`
        ) : (
          <button className='join-btn' onClick={() => this.joinJam()}>
            Join
          </button>
        )}
      </section>
    );
  }
}

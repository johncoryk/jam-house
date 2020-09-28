import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class JamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jam: this.props.currentJam,
      games: null,
      joined: false,
    };

    this.joinJam = this.joinJam.bind(this);
    this.getGames = this.getGames.bind(this);
  }

  componentDidMount() {
    console.log(this.state.jam);
    this.getGames();
  }

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
      });
  }

  render() {
    return (
      <section>
        {this.state.joined && <Redirect to='/' />}
        <h1>{this.state.jam && this.state.jam.title}</h1>
        <h3>{this.state.jam && this.state.jam.description}</h3>
        <button onClick={() => this.joinJam()}>Join</button>
      </section>
    );
  }
}

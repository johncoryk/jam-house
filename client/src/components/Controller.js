import React from 'react';
import { Redirect } from 'react-router-dom';

import Jams from './Jams';
import JamPage from './JamPage';
import Dashboard from './Dashboard';
import CreateJam from './CreateJam';

export default class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allJams: null,
      dataLoaded: false,
      currentPage: this.props.currentPage,
      currentUser: this.props.currentUser,
      jamId: this.props.jamId || null,
      currentJam: null,
    };

    this.decideWhichToRender = this.decideWhichToRender.bind(this);
    this.createJam = this.createJam.bind(this);
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
    } else if (this.state.currentPage === 'dashboard') {
      this.setState({
        dataLoaded: true,
      });
    } else if (this.state.currentPage === 'create jam') {
      this.setState({
        dataLoaded: true,
      });
    } else if (this.state.currentPage === 'show') {
      fetch(`/api/jams/${this.state.jamId}`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            currentJam: data.jam,
            dataLoaded: true,
          });
        });
    }
  }

  createJam(e, data) {
    e.preventDefault();
    fetch(`/api/jams/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
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
        return <Dashboard currentUser={this.props.currentUser} />;
      case 'create jam':
        return (
          <CreateJam
            createJam={this.createJam}
            currentUser={this.state.currentUser}
          />
        );
      case 'show':
        return (
          <JamPage
            currentUser={this.state.currentUser}
            currentJam={this.state.currentJam}
          />
        );
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

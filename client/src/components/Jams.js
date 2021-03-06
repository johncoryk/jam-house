import React, { Component } from 'react';

import Jam from './Jam';

export default class Jams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allJams: this.props.allJams,
    };
  }

  render() {
    return (
      <main className='jam-cards-flex'>
        {this.state.allJams
          ? this.state.allJams.map(jam => {
              return (
                <Jam
                  currentUser={this.props.currentUser}
                  key={jam.id}
                  jam={jam}
                />
              );
            })
          : 'loading'}
      </main>
    );
  }
}

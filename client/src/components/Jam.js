import React, { Component, useState, useEffect } from 'react';
import moment from 'moment';

export default class Controller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.jam.id,
      title: props.jam.title,
      description: props.jam.description,
      duration: props.jam.duration,
      isOpen: props.jam.is_open,
      startDate: props.jam.start_date,
    };

    this.getTimeRemaining = this.getTimeRemaining.bind(this);
  }

  getTimeRemaining = startDate => {
    const endDate = moment(startDate)
      .add(this.state.duration, 'd')
      .format('LL');
    if (endDate < moment(new Date()).format('LL')) {
      this.setState({
        isOpen: false,
      });
      return `Ended: ${endDate}`;
    } else {
      return `Ends: ${endDate}`;
    }
  };

  render() {
    return (
      <>
        {this.props ? (
          <article className='jam-card'>
            <div className='jam-card-info'>
              <h1 className='jam-card-title'>{this.state.title}</h1>
              <p>{this.state.description}</p>
            </div>
            <div className='jam-card-join'>
              <button>{this.state.isOpen === true ? 'Open' : 'Closed'}</button>
              <button>Join</button>
              <p>{this.getTimeRemaining(this.state.startDate)}</p>
            </div>
          </article>
        ) : (
          'Loading Cards...'
        )}
      </>
    );
  }
}

import React, { Component } from 'react';
import moment from 'moment';

export default class Controller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.jam.id,
      title: props.jam.title,
      description: props.jam.description,
      duration: props.jam.duration,
      isOpen: null,
      startDate: props.jam.start_date,
    };

    this.formatEndDate = this.formatEndDate.bind(this);
  }

  formatEndDate = startDate => {
    return moment(startDate).add(this.state.duration, 'd').format('LL');
  };

  componentDidMount() {
    const endDate = this.formatEndDate(this.state.startDate);
    if (endDate < moment(new Date()).format('LL')) {
      this.setState({
        isOpen: false,
      });
    } else {
      this.setState({
        isOpen: true,
      });
    }
  }

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
              <p>
                {this.state.isOpen === true
                  ? `Ends: ${this.formatEndDate(this.state.startDate)}`
                  : `Ended: ${this.formatEndDate(this.state.startDate)}`}
              </p>
            </div>
          </article>
        ) : (
          'Loading Cards...'
        )}
      </>
    );
  }
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class Jam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.jam.id,
      title: this.props.jam.title,
      description: this.props.jam.description,
      duration: this.props.jam.duration,
      isOpen: null,
      startDate: this.props.jam.start_date,
    };

    this.formatEndDate = this.formatEndDate.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  formatEndDate = startDate => {
    return moment(startDate).add(this.state.duration, 'd').format('MM/DD/YYYY');
  };

  formatDate = startDate => {
    return moment(startDate).format('MM/DD/YYYY');
  };

  componentDidMount() {
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
              {this.state.isOpen === true ? (
                <div className='open'>Open</div>
              ) : (
                <div className='closed'>Closed</div>
              )}
              {this.props.currentUser && this.state.isOpen && (
                <Link to={`/jam/${this.state.id}`}>
                  <button>Info</button>
                </Link>
              )}
              <div className='dates'>
                <p>
                  {this.state.startDate &&
                    `Start Date: ${this.formatDate(this.state.startDate)}`}
                </p>
                <p>
                  {this.state.isOpen === true
                    ? `Ends: ${this.formatEndDate(this.state.startDate)}`
                    : `Ended: ${this.formatEndDate(this.state.startDate)}`}
                </p>
              </div>
            </div>
          </article>
        ) : (
          'Loading Cards...'
        )}
      </>
    );
  }
}

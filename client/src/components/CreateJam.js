import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class CreateJam extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      duration: '',
      startDate: new Date(),
      eventCreated: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.submitEvent = this.submitEvent.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleDateChange(date) {
    this.setState({
      startDate: date,
    });
  }

  submitEvent(e, state) {
    this.props.createJam(e, state);
    this.setState({
      eventCreated: true,
    });
  }

  render() {
    return (
      <>
        {this.state.eventCreated && <Redirect to='/jams' />}
        <form onSubmit={e => this.submitEvent(e, this.state)}>
          <input
            type='text'
            name='title'
            placeholder='Jam Title'
            value={this.state.title}
            onChange={this.handleInputChange}
          />
          <textarea
            name='description'
            placeholder='A bit about your jam!'
            value={this.state.description}
            onChange={this.handleInputChange}
          ></textarea>
          <input
            type='number'
            name='duration'
            placeholder='Jam Duration (in days)'
            value={this.state.duration}
            onChange={this.handleInputChange}
          />
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleDateChange}
            name='startDate'
            dateFormat='MM-dd-yyyy'
          />
          <input type='submit' value='Create Jam!' />
        </form>
      </>
    );
  }
}

export default CreateJam;

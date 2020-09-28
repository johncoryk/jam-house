import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ReactModal from 'react-modal';
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
      showModal: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.submitEvent = this.submitEvent.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
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
    this.handleOpenModal();
  }

  render() {
    return (
      <>
        <form
          className='form-flex user-form'
          onSubmit={e => this.submitEvent(e, this.state)}
        >
          <input
            className='text-input'
            required
            type='text'
            name='title'
            placeholder='Jam Title'
            value={this.state.title}
            onChange={this.handleInputChange}
          />
          <textarea
            className='text-input'
            required
            name='description'
            placeholder='A bit about your jam!'
            value={this.state.description}
            onChange={this.handleInputChange}
          ></textarea>
          <input
            className='text-input'
            required
            type='number'
            name='duration'
            placeholder='Jam Duration (in days)'
            value={this.state.duration}
            onChange={this.handleInputChange}
          />
          <DatePicker
            className='text-input'
            selected={this.state.startDate}
            onChange={this.handleDateChange}
            name='startDate'
            dateFormat='MM-dd-yyyy'
          />
          <input className='submit-input' type='submit' value='Create Jam!' />
        </form>
        <ReactModal
          isOpen={this.state.showModal}
          style={{
            content: {
              height: '300px',
            },
          }}
        >
          <h2>You created a jam! Yass!</h2>
          <button onClick={this.handleCloseModal}>
            <Link to='/jams'>Back to all jams</Link>
          </button>
        </ReactModal>
      </>
    );
  }
}

export default CreateJam;

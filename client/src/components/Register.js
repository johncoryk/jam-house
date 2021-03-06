import React, { Component } from 'react';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form
        className='form-flex user-form'
        onSubmit={e => this.props.registerSubmit(e, this.state)}
      >
        <input
          required
          className='text-input'
          type='text'
          name='email'
          placeholder='Email Address'
          value={this.state.email}
          onChange={this.handleInputChange}
        />
        <input
          required
          className='text-input'
          type='text'
          name='username'
          placeholder='Username'
          value={this.state.username}
          onChange={this.handleInputChange}
        />
        <input
          required
          className='text-input'
          type='text'
          name='password'
          placeholder='Password'
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <input className='submit-input' type='submit' value='Create Account' />
      </form>
    );
  }
}

export default Register;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
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
      <section className='user-form'>
        <form
          className='form-flex'
          onSubmit={e => this.props.loginSubmit(e, this.state)}
        >
          <input
            className='text-input'
            type='text'
            name='username'
            placeholder='Username'
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <input
            className='text-input'
            type='password'
            name='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <input className='submit-input' type='submit' value='Login' />
        </form>
        <p>
          Don't have an account? <Link to='/register'>Sign up here!</Link>
        </p>
      </section>
    );
  }
}

export default Login;

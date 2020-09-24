import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
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
      <form
        onSubmit={e =>
          this.props.authSubmit(e, 'auth/login', 'POST', this.state)
        }
      >
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={this.state.username}
          onChange={this.handleInputChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <input type='submit' value='Login' />
      </form>
    );
  }
}

export default Login;

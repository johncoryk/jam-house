import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';

export default class MainPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <p>some stuff</p>
        <Footer />
      </div>
    );
  }
}

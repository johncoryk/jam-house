import React from 'react';
import { Redirect } from 'react-router-dom';

import Jams from './Jams';

export default class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allJams: null,
      dataLoaded: false,
      currentPage: props.currentPage,
    };

    this.decideWhichToRender = this.decideWhichToRender.bind(this);
  }

  componentDidMount() {
    if (this.state.currentPage === 'index') {
      fetch('/api/jams')
        .then(res => res.json())
        .then(data => {
          this.setState({
            allJams: data.jams,
            dataLoaded: true,
          });
        });
    }
    this.decideWhichToRender = this.decideWhichToRender.bind(this);
  }

  decideWhichToRender() {
    switch (this.state.currentPage) {
      case 'index':
        return <Jams allJams={this.state.allJams} />;
      default:
        return <Redirect push to='/' />;
    }
  }

  render() {
    return (
      <div className='container'>
        {this.state.dataLoaded ? this.decideWhichToRender() : <p>Loading...</p>}
      </div>
    );
  }
}

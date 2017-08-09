import React, { Component } from 'react';
import { render } from 'react-dom';
import AddAssertionsForAction from './AddAssertionsForAction.js';
import AddAssertionsForTest from './AddAssertionsForTest.js';
import AddAssertionBlock from './AddAssertionBlock.js';

class Assertions extends Component {


  render () {

    return (
      <div 
      style={{"float": "right"}}
      >
            <AddAssertionsForAction {...this.props}/> 
            <AddAssertionsForTest {...this.props}/>
            <AddAssertionBlock {...this.props}/>         
      </div>
    );
  }
};

export default Assertions;
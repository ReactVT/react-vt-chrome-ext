import React, { Component } from 'react';
import { render } from 'react-dom';
import TestLocation from './TestLocation.js';
import TestData from './TestData.js';
import TestExpect from './TestExpect.js';


class AddAssertionsForTest extends Component {

  render () {
    let testMode;
    if (this.props.stateIsNowProp.testMode === 'test1') testMode = ( <TestLocation />);
    else if (this.props.stateIsNowProp.testMode === 'test2') testMode = ( <TestData { ...this.props } />);
    else if (this.props.stateIsNowProp.testMode === 'test3') testMode = ( <TestExpect { ...this.props } />);
    return (
      <div>
        {testMode}
      </div>
    );
  }
};

export default AddAssertionsForTest;

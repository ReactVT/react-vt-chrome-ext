import React, { Component } from 'react';
import { render } from 'react-dom';
import TestLocation from './TestLocation.js';
import TestData from './TestData.js';
import TestExpect from './TestExpect.js';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

const mapStateToProps = store => ({
  testMode: store.testMode, 
});


const mapDispatchToProps = (dispatch) => ({
  renderEditMode: () => {
    dispatch(actionCreators.renderEditMode());
  },
}); 

class AddAssertionsForTest extends Component {

  render () {
    let testMode;
    if (this.props.testMode === 'test1') testMode = ( <TestLocation />);
    else if (this.props.testMode === 'test2') testMode = ( <TestData />);
    else if (this.props.testMode === 'test3') testMode = ( <TestExpect />);
    return (
      <div>
        {testMode}
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAssertionsForTest);

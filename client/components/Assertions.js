import React, { Component } from 'react';
import { render } from 'react-dom';
import AssertionsList from './AssertionsList.js';
import AddAssertionsForAction from './AddAssertionsForAction.js';
import AddAssertionsForTest from './AddAssertionsForTest.js';
import EditAssertionBlock from './EditAssertionBlock.js';
import NameAssertionBlock from './NameAssertionBlock.js';

class Assertions extends Component {


  render () {
    let view;
    // Conditional rendering
    if (this.props.stateIsNowProp.viewMode === 'viewBlocks') view = (<AssertionsList />);
    else if (this.props.stateIsNowProp.viewMode === 'nameAssertionBlock') view =(<NameAssertionBlock />); 
    else if (this.props.stateIsNowProp.viewMode === 'editBlock') view = (<EditAssertionBlock />);
    else if (this.props.stateIsNowProp.viewMode === 'actionMenu') view = (<AddAssertionsForAction />);
    else if (this.props.stateIsNowProp.viewMode === 'testMenu') view = (<AddAssertionsForTest />);
    // this.props.renderActionMode();
    return (
      <div id="assertions-panel">
        { view }
      </div>
    );
  }
};

export default Assertions;
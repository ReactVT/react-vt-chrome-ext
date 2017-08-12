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
    console.log('this props viewmode', this.props)
    if (this.props.stateIsNowProp.viewMode === 'viewBlocks') view = (<AssertionsList {...this.props}/>);
    else if (this.props.stateIsNowProp.viewMode === 'nameAssertionBlock') view =(<NameAssertionBlock {...this.props}/>); 
    else if (this.props.stateIsNowProp.viewMode === 'editBlock') view = (<EditAssertionBlock {...this.props}/>);
    else if (this.props.stateIsNowProp.viewMode === 'actionMenu') view = (<AddAssertionsForAction {...this.props}/>);
    else if (this.props.stateIsNowProp.viewMode === 'testMenu') view = (<AddAssertionsForTest {...this.props}/>);
    // this.props.renderActionMode();
    return (
      <div id="assertions-panel">
        <h3 className="page-header">Assertions</h3>
        { view }
            {/* <AddAssertionsForAction {...this.props}/> 
            <AddAssertionsForTest {...this.props}/>
            <AddAssertionBlock {...this.props}/>          */}
      </div>
    );
  }
};

export default Assertions;
import React, { Component } from 'react';
import { render } from 'react-dom';
import Blocks from './Blocks';

import KeyInformation from './KeyInformation';

import ValueInformation from './ValueInformation';


class AssertionsList extends Component {

  handleSubmitEventForSendingBlock(event) {
      event.preventDefault();

  };

  handleNewAssertionBlock(event) {
    this.props.renderNameAssertionMode();
  }


  render() {
    let assertionlist;
    let listArray = this.props.stateIsNowProp.assertionList;
    if(listArray.length > 0) {
      assertionlist = listArray.map((el, i) => {
        return (<li key={i}> { el.name } </li>);
      });
    }  
      return (
        <div>
        { assertionlist }
        <button className="btn btn-primary" onClick={()=>this.handleNewAssertionBlock()}> New Assertion Block</button>
        </div>

      )
    }
    
};

export default AssertionsList;





import React, { Component } from 'react';
import { render } from 'react-dom';
import Blocks from './Blocks';

import KeyInformation from './KeyInformation';

import ValueInformation from './ValueInformation';


class AssertionsList extends Component {
  
  handleNewAssertionBlock() {
    this.props.renderNameAssertionMode();
  }

  handleDelete(name) {
    this.props.deleteAssertionBlock(name);
  }

  handleEdit() {
    console.log('edit');
  }

  render() {
    let assertionlist;
    let listArray = this.props.stateIsNowProp.assertionList;
    if (listArray.length > 0) {
      assertionlist = listArray.map((el, i) => {
        return (<li key={i} onClick={() => this.handleEdit()}> { el.name } <button onClick={() => this.handleDelete(el.name)}> X </button></li>);
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

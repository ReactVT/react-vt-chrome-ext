import React, { Component } from 'react';
import { render } from 'react-dom';
import Blocks from './Blocks';

import KeyInformation from './KeyInformation';

import ValueInformation from './ValueInformation';
import { Button } from 'semantic-ui-react';

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
        <Button primary size='small' className="btn btn-primary" onClick={()=>this.handleNewAssertionBlock()}> New Assertion Block</Button>
        { assertionlist }
        </div>

      )
    }
    
};

export default AssertionsList;

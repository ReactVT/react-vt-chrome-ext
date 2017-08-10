import React, { Component } from 'react';
import { render } from 'react-dom';
import Blocks from './Blocks';

import KeyInformation from './KeyInformation';

import ValueInformation from './ValueInformation';


class AssertionsList extends Component {

  handleSubmitEventForSendingBlock(event) {
      event.preventDefault();
      this.props.sendAssertionBlock(allBlocks)

  };




  render() {

      
    let allBlocks = this.props.stateIsNowProp.assertionBlock
console.log('  this.props in ASSERTIONS',   this.props)
console.log('allBlocks', allBlocks)


     if (Object.keys(this.props.stateIsNowProp.treeData).length === 0) allBlocks=''
     else allBlocks = this.props.stateIsNowProp.assertionList

      return (
        <div>

        {allBlocks}
        <button className="btn btn-primary" onClick={()=>this.props.renderEditMode()}> New Assertion Block</button>
        {/* 
        <h3 className="page-header">Send Assertion Block</h3>
        <button type="submit" className="btn btn-primary" onSubmit={(event)=>this.handleSubmitEventForSendingBlock(event)}>Send</button> */}
        </div>

      )
    }
    
};

export default AssertionsList;





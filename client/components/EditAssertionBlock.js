import React, { Component } from 'react';
import { render } from 'react-dom';


class EditAssertionBlock extends Component {
  handleSaveAssertionBlock() {
    this.props.addAssertionToList(this.props.stateIsNowProp.assertionBlock);
    this.props.renderViewMode();
    
  }

  render() {
    let assertions;
    let assertsArray = this.props.stateIsNowProp.assertionBlock.asserts;
    if(assertsArray.length > 0) {
      assertions = assertsArray.map((el, i) => {
        return (<li key={i}> { el.type } </li>);
      });
    }
    return (
      <div>
        { assertions }
        <button className="btn btn-primary" onClick={()=>this.props.renderActionMode()}>New Action</button>
        <button className="btn btn-primary" onClick={()=>this.props.renderTestMode()}>New Test</button>
        <br />
        <button className="btn btn-primary" onClick={()=>this.handleSaveAssertionBlock()}>Save Assertion Block</button> 
      </div>
    )
  }
}

export default EditAssertionBlock;

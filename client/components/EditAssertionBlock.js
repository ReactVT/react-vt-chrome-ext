import React, { Component } from 'react';
import { render } from 'react-dom';


class EditAssertionBlock extends Component {
  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={()=>this.props.renderActionMode()}>New Action</button>
        <button className="btn btn-primary" onClick={()=>this.props.renderTestMode()}>New Test</button>
        <br />
        <button className="btn btn-primary" onClick={()=>this.props.renderViewMode()}>Save Assertion Block</button> 
      </div>
    )
  }
}

export default EditAssertionBlock;

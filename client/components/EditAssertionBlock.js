import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button } from 'semantic-ui-react';

class EditAssertionBlock extends Component {
  handleSaveAssertionBlock() {
    this.props.addAssertionToList(this.props.stateIsNowProp.assertionBlock);
    this.props.renderViewMode();
    this.props.toggleAssertionBlock();
  }

  handleEdit() {
    
  }

  handleDelete(id) {
    this.props.deleteAssertion(id);
  }

  handleCancel() {
    this.props.renderViewMode();
  }
  render() {
    let assertions;
    let assertsArray = this.props.stateIsNowProp.assertionBlock.asserts;
    if(assertsArray.length > 0) {
      assertions = assertsArray.map((el, i) => {
        return (<li key={i} onClick={() => this.handleEdit()}> { el.type } <button onClick={()=>this.handleDelete(el.assertID)}> X </button> </li>);
      });
    }
    return (
      <div>
        { assertions }
        <Button primary size="mini" className="btn btn-primary" onClick={()=>this.props.renderActionMode()}>New Action</Button>
        <Button primary size="mini"  onClick={()=>this.props.renderTestMode()}>New Test</Button>
        <br />
        <Button primary positive size="small" className="btn btn-primary" onClick={()=>this.handleSaveAssertionBlock()}>Save Assertion Block</Button> 
        <Button primary negative size="tiny" className="btn btn-primary" onClick={()=>this.handleCancel()}>Cancel</Button>         
      </div>
    )
  }
}

export default EditAssertionBlock;

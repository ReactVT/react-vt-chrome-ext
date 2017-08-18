import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Accordion, Icon } from 'semantic-ui-react';

class EditAssertionBlock extends Component {
  handleSaveAssertionBlock() {
    console.log('IN EDIT BLOCK COMP ADD ASSERTIONBLOCK TO LIST', this.props.stateIsNowProp.assertionBlock)
    this.props.addAssertionToList(this.props.stateIsNowProp.assertionBlock);
    this.props.renderViewMode();
    this.props.toggleAssertionBlock();
  }

  handleEdit() {
    
  }

  handleDelete(id) {
    this.props.deleteAssertion(id);
    localStorage.setItem("asserts", JSON.stringify(this.props.stateIsNowProp.assertionList));
  }

  clickAssert(assert) {
    console.log('clicked assert', assert);
  }

  handleCancel() {
    this.props.renderViewMode();
  }
  render() {
    console.log('after test save', this.props.stateIsNowProp.test)
    let assertions = [];
    let assertsArray = this.props.stateIsNowProp.assertionBlock.asserts;
    if(assertsArray.length > 0) {
      assertsArray.forEach((el, i) => {
        if (el.type === 'action') {
        assertions.push(
          <div className='editAssert' onClick={()=> this.clickAssert(el)}>{el.assertID} { el.event }</div>);
        } else {
          assertions.push(
            <div className='editAssert' onClick={()=> this.clickAssert(el)}>{el.assertID} { el.type } { el.value }</div>);
        }
      });
    }
    return (
      <div>
        <div className='button-container'>
          <Button primary positive size="tiny" className="btn btn-primary" onClick={()=>this.handleSaveAssertionBlock()}>Save Assertion Block</Button> 
          <Button primary negative size="tiny" type="button" className="btn btn-primary" onClick={()=>this.handleCancel()}>Cancel</Button> 
          <Button primary  size="small" type="button" className="ui primary basic button" onClick={()=>this.props.renderActionMode()}>New Action</Button>
          <Button primary size="small" type="button" className="ui primary basic button" id="newTestButton"onClick={()=>this.props.renderTestMode()}>New Test</Button>
        </div>
        <Accordion>  
          { assertions }
        </Accordion>
      </div>
    )
  }
}

export default EditAssertionBlock;

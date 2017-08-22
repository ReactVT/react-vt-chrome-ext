import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Accordion, Icon } from 'semantic-ui-react';

class EditAssertionBlock extends Component {
  constructor(props) {
    super(props);
    this.pageName = document.title;  
  }

  handleSaveAssertionBlock() {
    console.log('IN EDIT BLOCK COMP ADD ASSERTIONBLOCK TO LIST', this.props.stateIsNowProp.assertionBlock)
    this.props.resetAssertId();
    this.props.addAssertionToList(this.props.stateIsNowProp.assertionBlock);
    this.props.renderViewMode();
    this.props.toggleAssertionBlock();
  }

  handleEdit() {
    
  }

  handleDelete(id) {
    this.props.deleteAssertion(id);
    localStorage.setItem(this.pageName, JSON.stringify(this.props.stateIsNowProp.assertionList));
  }

  clickAction(assert) {
    this.props.selectedAction(assert);
  }

  clickTest(assert) {
    this.props.selectedTest(assert);
  }

  handleCancel() {
    this.props.resetAssertId();   
    // Empty out assertion block
    this.props.deleteAssertionBlock(this.props.stateIsNowProp.assertionBlock.name);
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
          <div className='editAssert' onClick={()=> this.clickAction(el)}>{el.assertID} Action: { el.event } on {el.compName}<Icon name='delete' style={{'float': 'right'}} onClick={()=>this.handleDelete(el.assertID)} /></div>);
        } else {
          let evaluator; 
          if (el.type === 'equal') evaluator = 'Equal'; 
          if (el.type === 'greaterthan') evaluator = 'be Greater than'; 
          if (el.type === 'lessthan') evaluator = 'be Less than'; 
          if (el.type === 'notequal') evaluator = 'not Equal'; 
          assertions.push(
            <div className='editAssert' onClick={()=> this.clickTest(el)}>{el.assertID} Expect {el.selectorName} to {evaluator} {el.value}<Icon name='delete' style={{'float': 'right'}} onClick={()=>this.handleDelete(el.assertID)} /></div>);
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
        <div id='topNameEditBlock'>Assertion Block: {this.props.stateIsNowProp.assertionBlock.name} </div>
          { assertions }
      </div>
    )
  }
}

export default EditAssertionBlock;

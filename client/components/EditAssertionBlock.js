import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Accordion, Icon, Message } from 'semantic-ui-react';

class EditAssertionBlock extends Component {
  constructor(props) {
    super(props);
    this.pageName = document.title; 
    this.error = ''; 
  }

  handleSaveAssertionBlock() {
    console.log('IN EDIT BLOCK COMP ADD ASSERTIONBLOCK TO LIST', this.props.stateIsNowProp.assertionBlock)

    if (this.props.stateIsNowProp.assertionBlock.asserts.length === 0) {
      this.error=(<Message negative>
        <Message.Header>Assertions Required</Message.Header>
        <p>Please create an action or test to continue.</p>
</Message>);
      this.forceUpdate();
    } else {
      this.props.resetAssertId();
      this.props.addAssertionToList(this.props.stateIsNowProp.assertionBlock);
      this.props.renderViewMode();
      this.props.toggleAssertionBlock();
    }
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
          <div className='editAssert' onClick={()=> this.clickAction(el)}>ID{el.assertID} Action: { el.event } on {el.compName}<Icon name='delete' style={{'float': 'right'}} onClick={()=>this.handleDelete(el.assertID)} /></div>);
        } else {
          let evaluator; 
          if (el.type === 'equal') evaluator = 'Equal'; 
          if (el.type === 'greaterthan') evaluator = 'be Greater than'; 
          if (el.type === 'lessthan') evaluator = 'be Less than'; 
          if (el.type === 'notequal') evaluator = 'not Equal'; 
          assertions.push(
            <div className='editAssert' onClick={()=> this.clickTest(el)}>ID{el.assertID} Expect {el.selectorName} to {evaluator} {el.value}<Icon name='delete' style={{'float': 'right'}} onClick={()=>this.handleDelete(el.assertID)} /></div>);
        }
      });
    }
    return (
      <div>
        <div className='button-container-edit'>
          <Button animated color="green" size="tiny" type="submit" className="btn btn-primary " onClick={()=>this.handleSaveAssertionBlock()}>
                <Button.Content visible>Save Assertion Block</Button.Content>
                <Button.Content hidden>
                  <Icon name='save' />
                </Button.Content>
          </Button>
          <Button animated primary inverted color="red" size="tiny" type="button" onClick={()=>this.handleCancel()} className="btn btn-primary">
              <Button.Content visible>Cancel</Button.Content>
              <Button.Content hidden>
                <Icon name='delete' />
              </Button.Content>
          </Button>
          <Button primary inverted color="blue" size="small" type="button" className="assert-button" onClick={()=>this.props.renderActionMode()}>New Action</Button>
          <Button primary inverted color="blue" size="small" type="button" id="newTestButton" className="assert-button" onClick={()=>this.props.renderTestMode()}>New Test</Button>
        </div>
        <div id='topNameEditBlock'>Assertion Block: {this.props.stateIsNowProp.assertionBlock.name} </div>
          { assertions }
          { this.error }
      </div>
    )
  }
}

export default EditAssertionBlock;

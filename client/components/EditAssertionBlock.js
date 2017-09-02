import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Accordion, Icon, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

const mapStateToProps = store => ({
  assertionBlock: store.assertionBlock, 
  assertionList: store.assertionList,
});


const mapDispatchToProps = (dispatch) => ({
  resetAssertId: () => {
    dispatch(actionCreators.resetAssertId());
  },
  addAssertionToList: (block) => {
    dispatch(actionCreators.addAssertionToList(block));
  },
  renderViewMode: () => {
    dispatch(actionCreators.renderViewMode());
  },
  renderActionMode: () => {
    dispatch(actionCreators.renderActionMode());
  },
  renderTestMode: () => {
    dispatch(actionCreators.renderTestMode());
  },
  toggleAssertionBlock: () => {
    dispatch(actionCreators.toggleAssertionBlock());
  },
  deleteAssertion: (id) => {
    dispatch(actionCreators.deleteAssertion(id));
  },
  deleteAssertionBlock: (block) => {
    dispatch(actionCreators.deleteAssertionBlock(block));
  },
  selectedAction: (assert) => {
    dispatch(actionCreators.selectedAction(assert));
  },
  selectedTest: (assert) => {
    dispatch(actionCreators.selectedTest(assert));
  },
});

class EditAssertionBlock extends Component {
  constructor(props) {
    super(props);
    this.pageName = document.title; 
    this.error = ''; 
  }

  // Logic for saving a new assertion block
  handleSaveAssertionBlock() {
    // Make sure our current assertion block has stuff added to it
    if (this.props.assertionBlock.asserts.length === 0) {
      this.error=(<Message negative>
        <Message.Header>Assertions Required</Message.Header>
        <p>Please create an action or test to continue.</p>
        </Message>);
      this.forceUpdate();
    } else {
      // Resets assertionID so it starts at 1 on next block
      this.props.resetAssertId();
      // Adds assertionblock to assertion list
      this.props.addAssertionToList(this.props.assertionBlock);
      // Resets our render mode to the default panel
      this.props.renderViewMode();
      // 
      this.props.toggleAssertionBlock();
    }
  }

  handleDelete(id) {
    this.props.deleteAssertion(id);
    localStorage.setItem(this.pageName, JSON.stringify(this.props.assertionList));
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
    this.props.deleteAssertionBlock(this.props.assertionBlock.name);
    this.props.renderViewMode();
  }
  render() {
    let assertions = [];
    let assertsArray = this.props.assertionBlock.asserts;
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
        <div id='topNameEditBlock'>Assertion Block: {this.props.assertionBlock.name} </div>
          { assertions }
          { this.error }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAssertionBlock);

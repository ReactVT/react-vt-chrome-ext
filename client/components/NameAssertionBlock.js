import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Input, Message } from 'semantic-ui-react';


class NameAssertionBlock extends Component {
  constructor(props) {
    super(props);
    this.error = '';
  }
  saveHandler(event) {
    let input = document.getElementById('assertionBlockName').value;
    console.log('save clicked', input)
    
    // VALIDATE ASSERTION NAME FOR DUPES
    const assertionList = this.props.stateIsNowProp.assertionList;
    for (let i = 0; i < assertionList.length; i += 1) {
      if (input === assertionList[i].name || input.length === 0){ 
        this.error=(<Message negative>
          <Message.Header>We're sorry we can't apply that discount</Message.Header>
          <p>Name already exists. Please try another name.</p>
        </Message>);
        return;
      }
    }

    this.props.newAssertionBlock(input);
    this.props.renderEditMode();
  }
  render() {
    return (
      <form onSubmit={(event)=>{
        this.saveHandler(event);
        }}>
        <h4>Assertion Block Name </h4>
        <Input label={{ icon: 'asterisk' }} labelPosition='right corner' type="text" className="form-control" id="assertionBlockName" placeholder="Enter name" required ref="assertionBlockName" />
        <Button primary size="tiny" onClick={(e)=>this.saveHandler(e)}>Save Block</Button>
      </form>
    )
  }
}

export default NameAssertionBlock;

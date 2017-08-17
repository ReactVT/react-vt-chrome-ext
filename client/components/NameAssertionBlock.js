import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Input, Message } from 'semantic-ui-react';


class NameAssertionBlock extends Component {
  constructor(props) {
    super(props);
    this.error = '';
  }
  saveHandler(event) {
    event.preventDefault();
    let input = document.getElementById('assertionBlockName').value;
    console.log('save clicked', input)
    let invalid = false;
    // VALIDATE ASSERTION NAME FOR DUPES
    const assertionList = this.props.stateIsNowProp.assertionList;
    for (let i = 0; i < assertionList.length; i += 1) {
      if (input === assertionList[i].name || input.length === 0){ 
        this.error=(<Message negative>
          <Message.Header>Invalid Name</Message.Header>
          <p>Name already exists. Please try another name.</p>
</Message>);
        invalid = true;
      }
    }
    
    if (!invalid) {
      this.props.newAssertionBlock(input);
      this.props.renderEditMode();
    } else this.forceUpdate();
  }
  render() {
    return (
      <form onSubmit={(event)=>{
        this.saveHandler(event);
        }}>
        <h4>Assertion Block Name </h4>
        <Input label={{ icon: 'asterisk' }} labelPosition='right corner' type="text" className="form-control" id="assertionBlockName" placeholder="Enter name" required ref="assertionBlockName" />
        <Button primary size="tiny">Save Block</Button>
        {this.error}
      </form>
    )
  }
}

export default NameAssertionBlock;

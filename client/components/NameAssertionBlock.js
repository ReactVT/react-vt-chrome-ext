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
        this.error=(<Message id="invalidName" negative>
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
      <div id="newAssertionBlockDiv">
        <form onSubmit={(event)=>{
          this.saveHandler(event);
          }}>
          <h4>Assertion Block Name </h4>
          <Input type="text" className="form-control" id="assertionBlockName" placeholder="Enter name" required ref="assertionBlockName" />
          <Button id="nameBlockButton" primary size="tiny">Save Block</Button>
          <br />
          {this.error}
        </form>
      </div>
    )
  }
}

export default NameAssertionBlock;

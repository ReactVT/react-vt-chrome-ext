import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Input } from 'semantic-ui-react';


class NameAssertionBlock extends Component {
  saveHandler(event) {
    let input = document.getElementById('assertionBlockName').value;
    console.log('save clicked', input)
    
    // VALIDATE ASSERTION NAME FOR DUPES
    const assertionList = this.props.stateIsNowProp.assertionList;
    for (let i = 0; i < assertionList.length; i += 1) {
      if (input === assertionList[i].name || input.length === 0){ 
        alert('Name already exists. Please try again.')
        return;
      }
    }

    this.props.newAssertionBlock(input);
    this.props.renderEditMode();
  }
  render() {
    return (
      <div>
        <h4>Assertion Block Name </h4>
        <Input label={{ icon: 'asterisk' }} labelPosition='right corner' type="text" className="form-control" id="assertionBlockName" placeholder="Enter name" required ref="assertionBlockName" />
        <Button primary size="tiny" onClick={(e)=>this.saveHandler(e)}>Save Block</Button>
      </div>
    )
  }
}

export default NameAssertionBlock;

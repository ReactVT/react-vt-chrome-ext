import React, { Component } from 'react';
import { render } from 'react-dom';


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
        <input type="text" className="form-control" id="assertionBlockName" placeholder="Enter assertion block name" required ref="assertionBlockName" />
        <button onClick={(e)=>this.saveHandler(e)}>Save Block</button>
      </div>
    )
  }
}

export default NameAssertionBlock;

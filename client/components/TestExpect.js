import React, { Component } from 'react';
import { render } from 'react-dom';

class TestExpect extends Component {
  constructor(props) {
    super(props);
    // default to node
    this.expectSelect = 'equal';
    this.typeSelect = 'string';
  }
  handleSubmitEventForAction(event) {
      event.preventDefault();
      let val = document.getElementById('value-input').value;
      // this.props.saveTestProperty('assertID', this.props.stateIsNowProp.assertID);
      this.props.saveTestProperty('type', this.expectSelect);
      this.props.saveTestProperty('dataType', this.typeSelect);
      let tempTest = this.props.stateIsNowProp.test; 
      tempTest.value = val;      
      tempTest.assertID = this.props.stateIsNowProp.assertID;
      this.props.incrementAssertId();
      this.props.saveAssertion(tempTest);
      this.props.clearTest();
      this.props.renderTest1();
      this.props.renderEditMode();
      // this.props.setActionLocation(this.props.compAddress);
      // this.props.saveAssertion(this.props.stateIsNowProp.action);
    };

    handleExpectDropdown(event) {
      this.expectSelect = event.target.value;
    }

    handleTypeDropdown(event) {
      this.typeSelect = event.target.value;
    }

  render () {
    return (

      <form onSubmit={(event)=>{
        this.handleSubmitEventForAction(event);
        }}>

        <h3 className="subheader">Set Expectation</h3>

        <div className="form-group">
          <label>Source <span style={ {color: "#ffaaaa"} }>*</span></label>
          <select id="expectDropdown" onChange={(e)=>this.handleExpectDropdown(e)}>
            <option value="equal">equals</option>
            <option value="greaterthan">greaterthan</option>
            <option value="lessthan">lessthan</option>
          </select>
          <select id="typeDropdown" onChange={(e)=>this.handleTypeDropdown(e)}>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>            
            <option value="undefined">Undefined</option>
            <option value="null">Null</option>
          </select>
          <input type="text" id="value-input" />
        </div>

        <button type="submit" className="btn btn-primary">Save Test</button>
      </form>

    );
  }
};

export default TestExpect;
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Select } from 'semantic-ui-react'
import { Button, Dropdown, Input } from 'semantic-ui-react';

class TestExpect extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
      event.preventDefault();      
      let tempTest = this.props.stateIsNowProp.test; 
      tempTest.assertID = this.props.stateIsNowProp.assertID;
      this.props.incrementAssertId();
      this.props.saveAssertion(this.props.stateIsNowProp.test);
      this.props.clearTest();
      this.props.renderTest1();
      this.props.renderEditMode();
  }
  
  handleTypeDropdown(event, value) {
    this.props.saveTestProperty('dataType', value);
  }

  handleComparatorDropdown(event, value) {
    this.props.saveTestProperty('type', value);
  }


  handleValue(event, value) {
    this.props.saveTestProperty('value', value);
  }

  handleBack() {
    // clear out test state if going back
    this.props.saveTestProperty('type', '');
    this.props.saveTestProperty('dataType', '');
    this.props.saveTestProperty('value', '');
    this.props.renderTest2();
  }

  render () {
    let comparatorRender;
    let typeRender;
    let valueRender;
    const currentDataType = this.props.stateIsNowProp.test.dataType;
    const types = [
      { key: 1, text: 'String', value: 'string' },
      { key: 2, text: 'Number', value: 'number' },
      { key: 3, text: 'Boolean', value: 'boolean' },
      { key: 4, text: 'Undefined', value: 'undefined' },
      { key: 5, text: 'Null', value: 'null' },      
    ];
    const comparators = [
      { key: 1, text: ' = ', value: 'equal' },
      { key: 2, text: ' > ', value: 'greaterthan' },
      { key: 3, text: ' < ', value: 'lessthan' },
    ];
    const boolean = [
      { key: 1, text: 'True', value: 'true' },
      { key: 2, text: 'False', value: 'false' },
    ];
    
    // Type logic
    if (currentDataType === 'string') {
      valueRender = (<Input type="text" id="value-input" placeholder='Enter String' onChange={(e, {value}) => this.handleValue(e, value)} />);
    } else if (currentDataType === "number") {
      valueRender = (<Input type="number" id="value-input" placeholder='Enter Number' onChange={(e, {value}) => this.handleValue(e, value)} />);
    } else if (currentDataType === "boolean") {
      valueRender = (<Dropdown placeholder="Select Boolean" selection options={boolean} id="booleanDropdown" onChange={(e, {value}) => this.handleValue(e, value)} />);
    }

    return (

      <form onSubmit={(event)=>{
        this.handleSubmit(event);
        }}>

        <h3 className="subheader">Set Expectation</h3>

        <div className="form-group">
          <Dropdown selection options={types} placeholder="Select Value Type" id="typeDropdown" onChange={(e, {value}) => this.handleTypeDropdown(e, value)} />
          <Dropdown selection options={comparators} placeholder="Select comparator" id="comparatorDropdown" onChange={(e, {value}) => this.handleComparatorDropdown(e, value)} />
          { valueRender }
        </div>
        <Button primary onClick={()=>this.handleBack()} className="btn btn-primary">Back</Button>        
        <Button primary type="submit" className="btn btn-primary">Save Test</Button>
      </form>

    );
  }
};

export default TestExpect;
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Select } from 'semantic-ui-react'
import { Button, Dropdown, Input, Message, Icon, Breadcrumb, Progress } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

const mapStateToProps = store => ({
  test: store.test, 
  assertID: store.assertID, 
});


const mapDispatchToProps = (dispatch) => ({

  saveTestProperty: (property, value) => {
    dispatch(actionCreators.saveTestProperty(property, value));
  },
  incrementAssertId: () => {
    dispatch(actionCreators.incrementAssertId());
  },
  saveAssertion: (test) => {
    dispatch(actionCreators.saveAssertion(test));
  },
  clearTest: () => {
    dispatch(actionCreators.clearTest());
  },
  renderEditMode: () => {
    dispatch(actionCreators.renderEditMode());
  },
  renderTest1: () => {
    dispatch(actionCreators.renderTest1());
  },
  renderTest2: () => {
    dispatch(actionCreators.renderTest2());
  },

}); 

class TestExpect extends Component {
  constructor(props) {
    super(props);
    this.error = '';
  }
  componentWillMount() {
    // set defaults to string and equal
    this.props.saveTestProperty('dataType', 'string');
    this.props.saveTestProperty('type', 'equal');
  }

  handleSubmit(event) {
      event.preventDefault();
      let currentTest = this.props.test;
      if (currentTest.value === '' && currentTest.dataType !== 'null' && currentTest.dataType !== 'undefined') {
        this.error=(<Message negative>
          <Message.Header>Value Required</Message.Header>
          <p>Please input an expected value.</p>
</Message>);
        this.forceUpdate();
      } else {
        let tempTest = this.props.test; 
        tempTest.assertID = this.props.assertID;
        this.props.incrementAssertId();
        this.props.saveAssertion(this.props.test);
        this.props.clearTest();
        this.props.renderTest1();
        this.props.renderEditMode();
      }
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
    if (this.props.test.selectorModifier === '.length') this.props.renderTest1();
    else this.props.renderTest2();
  }

  render () {
    let comparatorRender;
    let typeRender;
    let valueRender;
    const currentDataType = this.props.test.dataType;
    const types = [
      { key: 1, text: 'String', value: 'string' },
      { key: 2, text: 'Number', value: 'number' },
      { key: 3, text: 'Boolean', value: 'boolean' },
      { key: 4, text: 'Undefined', value: 'undefined' },
      { key: 5, text: 'Null', value: 'null' },      
    ];
    let comparators;
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
      valueRender = (<Dropdown className="dropDown" search searchInput={{ type: 'text' }} placeholder="Select Boolean" selection options={boolean} id="booleanDropdown" onChange={(e, {value}) => this.handleValue(e, value)} />);
    }

    // Comparator logic
    if (currentDataType === 'boolean' || currentDataType === 'undefined' || currentDataType === 'null') comparators = [
      { key: 1, text: ' = ', value: 'equal' },
      { key: 2, text: ' != ', value: 'notequal' },
    ];
    else comparators = [
      { key: 1, text: ' = ', value: 'equal' },
      { key: 2, text: ' != ', value: 'notequal' },
      { key: 3, text: ' > ', value: 'greaterthan' },
      { key: 4, text: ' < ', value: 'lessthan' },
    ];

    return (
      <div id="expectContain">
        <form onSubmit={(event)=>{
          this.handleSubmit(event);
          }}>
          <Breadcrumb size='tiny'>
            <Breadcrumb.Section link>Test</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section link>Target</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section link>Source</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section active>Expectation</Breadcrumb.Section>
          </Breadcrumb>
          <Progress size='tiny' color='yellow' percent={75} />
          <h3 className="subheader">Set Expectation</h3>
  
          <div className="form-group">
            <Dropdown className="dropDown" search searchInput={{ type: 'text' }} selection options={types} defaultValue={types[0].value} placeholder="Select Value Type" id="typeDropdown" onChange={(e, {value}) => this.handleTypeDropdown(e, value)} />
            <Dropdown className="dropDown" search searchInput={{ type: 'text' }} selection options={comparators} defaultValue={comparators[0].value} placeholder="Select comparator" id="comparatorDropdown" onChange={(e, {value}) => this.handleComparatorDropdown(e, value)} />
            { valueRender }
          </div>
          <div id="expectButtons">
            <Button primary inverted color="blue" size="tiny" type="button" onClick={()=>this.handleBack()} className="btn btn-primary back">Back</Button>
            <Button animated primary type="submit" id="test-save" className="btn btn-primary">
                <Button.Content visible>Save</Button.Content>
                <Button.Content hidden>
                  <Icon name='save' />
                </Button.Content>
            </Button>
          </div>
          {this.error}
        </form>
      </div> 

    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestExpect);
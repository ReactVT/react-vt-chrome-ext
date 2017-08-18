import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Dropdown, Input, Message } from 'semantic-ui-react';

class TestData extends Component {
  constructor(props) {
    super(props);
    // keep source render here since logic is in componentWillMount
    this.sourceRender = '';
    this.modifierRender = '';
    this.error = '';
  }

  componentWillMount() {
    // this needs to be in component will mount since we are calling setState during the render otherwise
    // options for node or component
    const sourceNode = [
      { key: 1, text: 'Props', value: 'props' },
      { key: 2, text: 'State', value: 'state' }
    ];
    const selector = this.props.stateIsNowProp.test.selector;
    let currentProps;
    let currentState;

    // determine props/state for node/component
    if (selector === 'node') {
      currentProps = this.props.props;
      currentState = this.props.state;
    } else if (selector === 'component') {
      // get component props and state in the form of arrays
      // still needs to be specified with index modifier
      let compName = this.props.stateIsNowProp.test.selectorName;
      let index = parseInt(this.props.stateIsNowProp.test.selectorModifier.slice(1, -1));
      let address = this.props.stateIsNowProp.nodeStore.node[compName].address[index];
      this.handleCompAddress(address);

      currentProps = this.props.stateIsNowProp.nodeStore.node[compName].props[index];
      currentState = this.props.stateIsNowProp.nodeStore.node[compName].state[index];
      console.log('IN COMPONENT CONDITIONAL', compName, index, 'currentProps and state', currentProps, currentState, address)
    }
    // for node/component
    if (selector === 'node' || selector === 'component') {
      // if there are no props and state exists
      if (Object.keys(currentProps).length === 0 && currentState) {
        this.handleSourceDropdown(null, 'state');
        this.sourceRender = (<Input placeholder='State' value= '' disabled />);
        // no state and props exist
      } else if (!currentState && currentProps) {
        this.handleSourceDropdown(null, 'props');
        this.sourceRender = (<Input placeholder='Props' value='' disabled />);
        // choose between state and props
      } else if (currentProps && currentState) {
        console.log('in both props and state', this.props);
        this.sourceRender = (<Dropdown selection options={sourceNode} placeholder="Select Source" id="sourceDropdown" onChange={(e, {value})=>this.handleSourceDropdown(e, value)} />);
      } else {
        this.sourceRender = (<Input placeholder='No Props or State Here' disabled />);
      }
    // for everything else - tag, class, id
    } else {
      this.handleSourceDropdown(null, 'text');
      this.sourceRender = <Input placeholder='Text' value='' disabled />
    }
  }

  handleCompAddress(loc) {
    // set location
    this.props.saveTestProperty('loc', loc);
  }

  handleSourceDropdown(event, value) {
    this.props.saveTestProperty('source', value);
    this.error = '';
    console.log('inhandle source dropdown', this.props.stateIsNowProp.test)
  }

  handlePropertyDropdown(event, value) {
    this.props.saveTestProperty('property', value);
    this.error = '';
    console.log('in property dropdown ', value, this.props.stateIsNowProp.test)
  }

  handleModifierDropdown(event, value) {
    // semanticUI doesn't like empty string for value
    if (value === 'none') value = '';
    this.props.saveTestProperty('modifier', value);
    this.error = '';
    console.log('in modifier dropdown ', value, this.props.stateIsNowProp.test)
    
  }
  handleBack() {
    this.props.renderTest1();
  }

  handleSubmit(event) {
      event.preventDefault();
      // MENU VALIDATION --->
      let currentTest = this.props.stateIsNowProp.test;
      let arrayIndexEl = document.getElementById('indexInput');
      if (currentTest.source === '') {
        this.error=(<Message negative>
          <Message.Header>State or Props Required</Message.Header>
          <p>Please select from the dropdown.</p>
</Message>);
        this.forceUpdate();
      } else if (currentTest.property === '' && currentTest.source !== 'text') {
        this.error=(<Message negative>
          <Message.Header>Property Required</Message.Header>
          <p>Please select from the dropdown.</p>
</Message>);
        this.forceUpdate();
      } else if (this.modifierRender !== '' && currentTest.modifier === '') {
        this.error=(<Message negative>
          <Message.Header>Modifier Required</Message.Header>
          <p>Please select from the dropdown.</p>
</Message>);
        this.forceUpdate();
      } else if (currentTest.modifier === 'index' && !arrayIndexEl.value) {
          this.error=(<Message negative>
        <Message.Header>Index Required</Message.Header>
        <p>Please enter a number in the input field.</p>
</Message>);
        this.forceUpdate();
      } else {
        if (this.props.stateIsNowProp.test.modifier === 'index') {
          console.log('INSIDE OF IF SATEMENT', arrayIndexEl.value)
          let indexSave = '[' + arrayIndexEl.value + ']';
          this.props.saveTestProperty('modifier', indexSave);
        }
        console.log('in submit test current test', this.props.stateIsNowProp.test);
        this.props.renderTest3();
      }
  }

  render () {
    console.log('in render', this.props.stateIsNowProp.test)
    let propertyRender;
    let indexRender;
    const source = this.props.stateIsNowProp.test.source; 
    const currentProperty = this.props.stateIsNowProp.test.property;
    const propertyOptions = [];
    const modifierOptions = [
      { key: 1, text: 'None', value: 'none' },
      { key: 2, text: 'Length', value: '.length' },
      { key: 3, text: 'Index', value: 'index' }
    ];
    // // Property dropdown (given that state or props is selected)
    if (source === 'state' || source === 'props') {
      if (source === 'state') {
        Object.keys(this.props.state).forEach((property, i)=> {
          propertyOptions.push({ key: i, text: property, value: property });
        });
      } else {
        Object.keys(this.props.props).forEach((property, i)=> {
          propertyOptions.push({ key: i, text: property, value: property });
        });
      }
    propertyRender = (<Dropdown selection options={propertyOptions} placeholder="Select Property" id="propertyDropdown" onChange={(e, {value})=>this.handlePropertyDropdown(e, value)} />);
    }

    // Modifier
    if (currentProperty !== '') {
      let value;
      if (source === 'state') {
        value = this.props.state[currentProperty];
      } else {
        console.log('props parse ', this.props.props, currentProperty);
        console.log('string to parse', this.props.props[currentProperty])
        value = this.props.props[currentProperty];
      }
      console.log('in modifier', value);
      if (value.constructor === Array) {
        this.modifierRender = (<Dropdown placeholder="Select Modifier" selection options={modifierOptions} id="modifierDropdown" onChange={(e, {value}) => this.handleModifierDropdown(e, value)} />);
      }
    }
    // if modifier is index
    if (this.props.stateIsNowProp.test.modifier === 'index') {
      indexRender = (<Input placeholder="Enter a Number" className="indexInput" id="indexInput" type="number" />);
    }

    return (

      <form onSubmit={(event)=>{
        this.handleSubmit(event);
        }}>

        <h3 className="subheader">Set Source</h3>

        <div className="form-group">
          { this.sourceRender } { propertyRender } 
          <br />
          { this.modifierRender } { indexRender }
        </div>
        <Button primary type="button" onClick={()=>this.handleBack()} className="btn btn-primary">Back</Button>
        <Button primary type="submit" className="btn btn-primary">Save</Button>
        {this.error}
      </form>

    );
  }
};

export default TestData;
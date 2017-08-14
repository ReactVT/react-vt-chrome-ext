import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Dropdown, Input } from 'semantic-ui-react';

class TestData extends Component {
  constructor(props) {
    super(props);
    // keep source render here since logic is in componentWillMount
    this.sourceRender = '';
  }

  componentWillMount() {
    // this needs to be in component will mount since we are calling setState during the render otherwise
    // options for node or component
    const sourceNode = [
      { key: 1, text: 'Props', value: 'props' },
      { key: 2, text: 'State', value: 'state' }
    ];
    const selector = this.props.stateIsNowProp.test.selector;
    const currentProps = this.props.props;
    const currentState = this.props.state;
    
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


  handleSourceDropdown(event, value) {
    this.props.saveTestProperty('source', value);
    console.log('inhandle source dropdown', this.props.stateIsNowProp.test)
  }

  handlePropertyDropdown(event, value) {
    this.props.saveTestProperty('property', value);
    console.log('in property dropdown ', value, this.props.stateIsNowProp.test)
  }

  handleModifierDropdown(event, value) {
    this.props.saveTestProperty('modifier', value);
    console.log('in modifier dropdown ', value, this.props.stateIsNowProp.test)
    
  }
  handleBack() {
    this.props.renderTest1();
  }

  handleSubmit(event) {
      event.preventDefault();
      // this.props.saveTestProperty('property', document.getElementById('property-input').value);
      if (this.props.stateIsNowProp.test.modifier === 'index') {
        let arrayIndex = document.getElementById('indexInput').value;
        arrayIndex = '[' + arrayIndex + ']';
        this.props.saveTestProperty('modifier', arrayIndex);
      }
      console.log('in submit test current test', this.props.stateIsNowProp.test);
      this.props.renderTest3();
      // this.props.setActionLocation(this.props.compAddress);
      // this.props.saveAssertion(this.props.stateIsNowProp.action);
  }

  render () {
    console.log('in render', this.props.stateIsNowProp.test)
    let propertyRender;
    let modifierRender;
    let indexRender;
    const source = this.props.stateIsNowProp.test.source; 
    const currentProperty = this.props.stateIsNowProp.test.property;
    const propertyOptions = [];
    const modifierOptions = [
      { key: 1, text: 'None', value: '' },
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
        modifierRender = (<Dropdown placeholder="Select Modifier" selection options={modifierOptions} id="modifierDropdown" onChange={(e, {value}) => this.handleModifierDropdown(e, value)} />);
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
          { modifierRender } { indexRender }
        </div>
        <Button primary onClick={()=>this.handleBack()} className="btn btn-primary">Back</Button>
        <Button primary type="submit" className="btn btn-primary">Save</Button>
      </form>

    );
  }
};

export default TestData;
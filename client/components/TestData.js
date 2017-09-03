import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Icon, Dropdown, Input, Message, Breadcrumb, Progress } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

const mapStateToProps = store => ({
  test: store.test, 
  nodeStore: store.nodeStore,
  nodeData: store.nodeData
});


const mapDispatchToProps = (dispatch) => ({

  saveTestProperty: (property, value) => {
    dispatch(actionCreators.saveTestProperty(property, value));
  },
  renderTest1: () => {
    dispatch(actionCreators.renderTest1());
  },
  renderTest3: () => {
    dispatch(actionCreators.renderTest3());
  },
});


class TestData extends Component {
  constructor(props) {
    super(props);
    // keep source render here since logic is in componentWillMount
    this.sourceRender = '';
    this.modifierRender = '';
    this.error = '';
    this.currentProps;
    this.currentState;
    this.noModifier;
  }

  componentWillMount() {
    // this needs to be in component will mount since we are calling setState during the render otherwise
    // options for node or component
    const sourceNode = [
      { key: 1, text: 'Props', value: 'props' },
      { key: 2, text: 'State', value: 'state' }
    ];
    const selector = this.props.test.selector;

    // determine props/state for node/component
    if (selector === 'node') {
      this.currentProps = this.props.nodeData.props;
      this.currentState = this.props.nodeData.state;
      this.handleCompName(this.props.nodeData.name);

    } else if (selector === 'component') {
      // get component props and state in the form of arrays
      // still needs to be specified with index modifier
      let compName = this.props.test.selectorName;
      let index = parseInt(this.props.test.selectorModifier.slice(1, -1));
      let address = this.props.nodeStore.node[compName].address[index];
      this.handleCompAddress(address);

      this.currentProps = this.props.nodeStore.node[compName].props[index];
      this.currentState = this.props.nodeStore.node[compName].state[index];
    }
    // for node/component
    if (selector === 'node' || selector === 'component') {
      // if there are no props and state exists
      if (Object.keys(this.currentProps).length === 0 && this.currentState) {
        this.handleSourceDropdown(null, 'state');
        this.sourceRender = (<Input transparent className="form-control" placeholder='State' value= '' disabled />);
        // no state and props exist
      } else if (!this.currentState && this.currentProps) {
        this.handleSourceDropdown(null, 'props');
        this.sourceRender = (<Input transparent className="form-control" placeholder='Props' value='' disabled />);
        // choose between state and props
      } else if (this.currentProps && this.currentState) {
        this.sourceRender = (<Dropdown search searchInput={{ type: 'text' }} selection options={sourceNode} placeholder="Select Source" id="sourceDropdown" onChange={(e, {value})=>this.handleSourceDropdown(e, value)} />);
      } else {
        this.sourceRender = (<Input transparent className="form-control" placeholder='No Props or State Here' disabled />);
      }
    // for everything else - tag, class, id
    } else {
      this.handleSourceDropdown(null, 'text');
      this.sourceRender = <Input transparent className="form-control" placeholder='Text' value='' disabled />
    }
  }

  handleCompName(name) {
    // set component name for node
    this.props.saveTestProperty('selectorName', name);
  }
  handleCompAddress(loc) {
    // set location
    this.props.saveTestProperty('loc', loc);
  }

  handleSourceDropdown(event, value) {
    this.props.saveTestProperty('source', value);
    this.error = '';
  }

  handlePropertyDropdown(event, value) {
    this.props.saveTestProperty('property', value);
    this.error = '';
  }

  handleModifierDropdown(event, value) {
    // semanticUI doesn't like empty string for value
    if (value === 'none') {
      value = '';
      this.noModifier = true;
    }
    this.props.saveTestProperty('modifier', value);
    this.error = '';
  }
  handleBack() {
    // clear out test state before going back
    this.props.saveTestProperty('loc', []);
    this.props.saveTestProperty('source', '');
    this.props.saveTestProperty('property', '');
    this.props.saveTestProperty('modifier', '');
    this.props.renderTest1();
  }

  handleSubmit(event) {
      event.preventDefault();
      // MENU VALIDATION --->
      let currentTest = this.props.test;
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
      } else if (this.modifierRender !== '' && currentTest.modifier === '' && !this.noModifier) {
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
        if (this.props.test.modifier === 'index') {
          let indexSave = '[' + arrayIndexEl.value + ']';
          this.props.saveTestProperty('modifier', indexSave);
        }
        this.props.renderTest3();
      }
  }

  render () {
    let propertyRender;
    let indexRender;
    const source = this.props.test.source; 
    const currentProperty = this.props.test.property;
    const propertyOptions = [];
    const modifierOptions = [
      { key: 1, text: 'None', value: 'none' },
      { key: 2, text: 'Length', value: '.length' },
      { key: 3, text: 'Index', value: 'index' }
    ];
    
    // // Property dropdown (given that state or props is selected)
    if (source === 'state' || source === 'props') {
      if (source === 'state') {
        Object.keys(this.currentState).forEach((property, i)=> {
          propertyOptions.push({ key: i, text: property, value: property });
        });
      } else {
        Object.keys(this.currentProps).forEach((property, i)=> {
          propertyOptions.push({ key: i, text: property, value: property });
        });
      }
    propertyRender = (<Dropdown search searchInput={{ type: 'text' }} selection options={propertyOptions} placeholder="Select Property" id="propertyDropdown" onChange={(e, {value})=>this.handlePropertyDropdown(e, value)} />);
    }

    // Modifier
    if (currentProperty !== '') {
      let value;
      if (source === 'state') value = this.currentState[currentProperty];
      else value = this.currentProps[currentProperty];

      if (value.constructor === Array) {
        this.modifierRender = (<Dropdown search searchInput={{ type: 'text' }} placeholder="Select Modifier" selection options={modifierOptions} id="modifierDropdown" onChange={(e, {value}) => this.handleModifierDropdown(e, value)} />);
      } else this.modifierRender = '';
    }
    // if modifier is index
    if (this.props.test.modifier === 'index') {
      indexRender = (<Input placeholder="Enter a Number" className="indexInput" id="indexInput" type="number" />);
    }

    return (
      <div id="sourceContainer">
      <form onSubmit={(event)=>{
        this.handleSubmit(event);
        }}>
        <Breadcrumb size='tiny'>
            <Breadcrumb.Section link>Test</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section link>Target</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section active>Source</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section link>Expectation</Breadcrumb.Section>
          </Breadcrumb>
          <Progress size='tiny' color='yellow' percent={50} />
        <h3 className="subheader">Set Source</h3>

        <div className="form-group">
          <div id="chooseSource">{ this.sourceRender } { propertyRender }</div> 
          <br />
          <div id="chooseSourceMod">{ this.modifierRender }</div>  <div id="chooseSourceIndex">{ indexRender }</div>
        </div>
        <Button primary inverted color="blue" size="tiny" type="button" onClick={()=>this.handleBack()} className="btn btn-primary back">Back</Button>
        <Button primary type="submit" className="btn btn-primary">Next</Button>
        {this.error}
      </form>
      </div>

    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestData);
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Dropdown, Input, Message } from 'semantic-ui-react';

class TestLocation extends Component {
  constructor(props) {
    super(props);
    // default to nothing
    this.currentSelector = '';
    this.currentSelectorName = '';
    this.currentModifier = '';
    // gets location based on dropdown input
    this.locObj = {};
    this.error = '';
  }

  handleSubmitEventForAction(event) {
      event.preventDefault();
      let currentTest = this.props.stateIsNowProp.test;
      // MENU VALIDATION --->
      let arrayIndexEl = document.getElementById('selectorIndexInput');
      // if selector is blank
      if (currentTest.selector === '') {
        this.error=(<Message negative>
          <Message.Header>Selector Required</Message.Header>
          <p>Please select from the dropdown.</p>
</Message>);
        this.forceUpdate();
      } else if (currentTest.selector === 'node' && !this.props.compAddress) {
        // if selector is node but no node has been clicked
        this.error=(<Message negative>
          <Message.Header>Component Required</Message.Header>
          <p>Please click on a node.</p>
</Message>);
        this.forceUpdate();
      } else if (currentTest.selector === 'component' && currentTest.selectorName === '') {
        this.error=(<Message negative>
          <Message.Header>Component Required</Message.Header>
          <p>Please select a component from the dropdown.</p>
</Message>);
        this.forceUpdate();
      } else if (currentTest.selector === 'id' && currentTest.selectorName === '') {
        this.error=(<Message negative>
          <Message.Header>ID Required</Message.Header>
          <p>Please select an ID from the dropdown.</p>
</Message>);
        this.forceUpdate();
      } else if (currentTest.selector === 'class' && currentTest.selectorName === '') {
        this.error=(<Message negative>
          <Message.Header>Class Required</Message.Header>
          <p>Please select a class from the dropdown.</p>
</Message>);
        this.forceUpdate();
      } else if (currentTest.selector === 'tag' && currentTest.selectorName === '') {
        this.error=(<Message negative>
          <Message.Header>Tag Required</Message.Header>
          <p>Please select a tag from the dropdown.</p>
</Message>);
        this.forceUpdate();
      } else if ((currentTest.selector === 'component' || currentTest.selector === 'class' || currentTest.selector === 'tag') && currentTest.selectorModifier === '') {
        this.error=(<Message negative>
          <Message.Header>Modifier Required</Message.Header>
          <p>Please select a modifier from the dropdown.</p>
</Message>);
        this.forceUpdate();
      } else if (this.currentModifier === 'index' && !arrayIndexEl.value) {
          this.error=(<Message negative>
        <Message.Header>Index Required</Message.Header>
        <p>Please enter a number in the input field.</p>
</Message>);
        this.forceUpdate();
      } else {
        if (this.currentModifier === 'index') {
          let indexSave = '[' + arrayIndexEl.value + ']'
          this.props.saveTestProperty('selectorModifier', indexSave);
        }
        if (this.currentSelector === 'node') this.props.setTestLocation(this.props.compAddress);
        // if selector modifier is set to length, skip to renderTest3
        if (this.props.stateIsNowProp.test.selectorModifier === 'index') this.props.renderTest3();
        else this.props.renderTest2();
      }
    };

    handleSelectorDropdown(event, value) {
      this.currentSelector = value;
      if (value === 'node') {
        this.props.saveTestProperty('compName', this.props.compName);
      }
      this.props.saveTestProperty('selector', value);
      this.error = '';
    }

    handleSelectorNameDropdown(event, value) {
      this.currentSelectorName = value;
      this.props.saveTestProperty('selectorName', value);
      if (this.props.stateIsNowProp.test.selector !== 'component') this.props.saveTestProperty('loc', this.locObj[value]);
      this.error = '';
    }

    handleSelectorModifierDropdown(event, value) {
      // semanticUI doesn't like empty string for value
      this.currentModifier = value;
      this.props.saveTestProperty('selectorModifier', value);
      this.error = '';
    }

    handleBack() {
      this.props.renderEditMode();
    }
  
  render () {
    this.locObj = {};
    let selectorNameRender;
    let selectorModifierRender;
    let indexRender;
    let selectorNamePlaceholder = 'Select a Name';
    const selectorName = [];
    const selector = [
      { key: 1, text: 'Node', value: 'node' },
      { key: 2, text: 'Component', value: 'component' },
      { key: 3, text: 'ID', value: 'id' },
      { key: 4, text: 'Class', value: 'class' },
      { key: 5, text: 'Tag', value: 'tag' }
    ];
    const selectorModifier = [
      { key: 1, text: 'Length', value: '.length' },
      { key: 2, text: 'Index', value: 'index' }
    ]
    // Selector and Selector name logic
    if (this.currentSelector === 'node') {
      selectorName.push({ key: 1, text: this.props.compAddress, value: this.props.compAddress });
      selectorNameRender = (<Input transparent placeholder='Click on a node' className = 'form-control' value={this.props.compAddress} disabled />);
      if (this.props.compAddress) this.error = '';
    } else if (this.currentSelector !== '') {
      if (this.currentSelector === 'component'){
        let components = this.props.stateIsNowProp.nodeStore.node;
        Object.keys(components).forEach((compName, i)=> {
          selectorName.push({ key: i, text: compName, value: compName });
        });
        selectorNamePlaceholder = (selectorName.length === 0) ? 'No Components Found':'Select a Component';
      } else if (this.currentSelector === 'id') {
        let id = this.props.stateIsNowProp.nodeStore.id;
        Object.keys(id).forEach((idName, i)=> {        
          selectorName.push({ key: i, text: idName, value: idName });
        });
        selectorNamePlaceholder = (Object.keys(id).length === 0) ? 'No IDs found':'Select an ID';
      } else if (this.currentSelector === 'class') {
        let classes = this.props.stateIsNowProp.nodeStore.class;
        Object.keys(classes).forEach((className, i)=> {          
          selectorName.push({ key: i, text: className, value: className });
        });
        selectorNamePlaceholder = (selectorName.length === 0) ? 'No Classes Found':'Select a Class';
      } else if (this.currentSelector === 'tag') {
        let tags = this.props.stateIsNowProp.nodeStore.tag;
        Object.keys(tags).forEach((tagName, i)=> {
          selectorName.push({ key: i, text: tagName, value: tagName });
        });
        selectorNamePlaceholder = (selectorName.length === 0) ? 'No Tags Found':'Select a tag';
      } 
      // SelectorModifier logic
      if (this.currentSelector !== 'id' && selectorName.length > 0) {
        selectorModifierRender = (<Dropdown placeholder="Select Modifier" selection options={selectorModifier} id="selectorModifierDropdown" onChange={(e, {value})=>this.handleSelectorModifierDropdown(e, value)} />);
      }
      selectorNameRender=(<Dropdown placeholder={selectorNamePlaceholder} selection options={selectorName} id="selectorNameDropdown" onChange={(e, {value})=>this.handleSelectorNameDropdown(e, value)} />);
    }
    // If selector modifier is index
    if (this.props.stateIsNowProp.test.selectorModifier === 'index') {
          indexRender = (<Input placeholder="Enter a Number" className="indexInput" id="selectorIndexInput" type="number" />);
    }
  
    return (

      <form onSubmit={(event)=>{
        this.handleSubmitEventForAction(event);
        }}>

        <h3 className="subheader">Select Target</h3>

        <div className="form-group">
          <label>Selector <span style={ {color: "#ffaaaa"} }>*</span></label>
          <Dropdown selection options={selector} placeholder="Selector" id="selectorDropdown" onChange={(e, {value})=>this.handleSelectorDropdown(e, value)} />
          <br />
          { selectorNameRender }
          <br />
          { selectorModifierRender } { indexRender }
        </div>
        <Button primary type="button" onClick={()=>this.handleBack()} className="btn btn-primary">Back</Button>
        <Button primary type="submit" className="btn btn-primary">Save</Button>
        {this.error}
      </form>

    );
  }
};

export default TestLocation;
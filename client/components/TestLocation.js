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


const mapDispatchToProps = (dispatch, ownProps) => ({

  saveTestProperty: (property, value) => {
    dispatch(actionCreators.saveTestProperty(property, value));
  },
  setTestLocation: (address) => {
    dispatch(actionCreators.setTestLocation(address));
  },
  renderTest2: () => {
    dispatch(actionCreators.renderTest2());
  },
  renderTest3: () => {
    dispatch(actionCreators.renderTest3());
  },
  renderEditMode: () => {
    dispatch(actionCreators.renderEditMode());
  },
}); 


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
      let currentTest = this.props.test;
      // MENU VALIDATION --->
      let arrayIndexEl = document.getElementById('selectorIndexInput');
      // if selector is blank
      if (currentTest.selector === '') {
        this.error=(<Message negative>
          <Message.Header>Selector Required</Message.Header>
          <p>Please select from the dropdown.</p>
</Message>);
        this.forceUpdate();
      } else if (currentTest.selector === 'node' && !this.props.nodeData.address) {
        // if selector is node but no node has been clicked
        this.error=(<Message negative>
          <Message.Header>Component Required</Message.Header>
          <p>Please click on a node.</p>
</Message>);
        this.forceUpdate();
      } else if (currentTest.selector === 'component' && currentTest.selectorName === '') {
        this.error=(<Message negative>
          <Message.Header>Component Required</Message.Header>
          <p>Please type or select a component from the dropdown.</p>
</Message>);
        this.forceUpdate();
      } else if (currentTest.selector === 'id' && currentTest.selectorName === '') {
        this.error=(<Message negative>
          <Message.Header>ID Required</Message.Header>
          <p>Please type or select an ID from the dropdown.</p>
</Message>);
        this.forceUpdate();
      } else if (currentTest.selector === 'class' && currentTest.selectorName === '') {
        this.error=(<Message negative>
          <Message.Header>Class Required</Message.Header>
          <p>Please type or select a class from the dropdown.</p>
</Message>);
        this.forceUpdate();
      } else if (currentTest.selector === 'tag' && currentTest.selectorName === '') {
        this.error=(<Message negative>
          <Message.Header>Tag Required</Message.Header>
          <p>Please type or select a tag from the dropdown.</p>
</Message>);
        this.forceUpdate();
      } else if ((currentTest.selector === 'component' || currentTest.selector === 'class' || currentTest.selector === 'tag') && currentTest.selectorModifier === '') {
        this.error=(<Message negative>
          <Message.Header>Modifier Required</Message.Header>
          <p>Please type or select a modifier from the dropdown.</p>
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
        if (this.currentSelector === 'node') this.props.setTestLocation(this.props.nodeData.address);
        if (this.currentModifier === '.length') this.props.renderTest3();
        else this.props.renderTest2();
      }
    };

    handleSelectorDropdown(event, value) {
      this.currentSelector = value;
      if (value === 'node') {
        this.props.saveTestProperty('compName', this.props.nodeData.name);
      }
      this.props.saveTestProperty('selector', value);
      this.error = '';
    }

    handleSelectorNameDropdown(event, value) {
      this.currentSelectorName = value;
      this.props.saveTestProperty('selectorName', value);
      if (this.props.test.selector !== 'component') this.props.saveTestProperty('loc', this.locObj[value]);
      this.error = '';
    }

    handleSelectorModifierDropdown(event, value) {
      // semanticUI doesn't like empty string for value
      this.currentModifier = value;
      this.props.saveTestProperty('selectorModifier', value);
      this.error = '';
    }

    handleBack() {    
      // clear out test state before going back
      this.props.saveTestProperty('selector', '');
      this.props.saveTestProperty('selectorName', '');
      this.props.saveTestProperty('selectorModifier', '');
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
    ];
    // Selector and Selector name logic
    if (this.currentSelector === 'node') {
      console.log('address', this.props.nodeData.address);
      selectorName.push({ key: 1, text: this.props.nodeData.address, value: this.props.nodeData.address });
      selectorNameRender = (<Input transparent placeholder='Click on a node' className = 'form-control' value={this.props.nodeData.name} disabled />);
      if (this.props.nodeData.address) this.error = '';
    } else if (this.currentSelector !== '') {
      if (this.currentSelector === 'component'){
        let components = this.props.nodeStore.node;
        Object.keys(components).forEach((compName, i)=> {
          selectorName.push({ key: i, text: compName, value: compName });
        });
        selectorNamePlaceholder = (selectorName.length === 0) ? 'No Components Found':'Select a Component';
      } else if (this.currentSelector === 'id') {
        let id = this.props.nodeStore.id;
        Object.keys(id).forEach((idName, i)=> {        
          selectorName.push({ key: i, text: idName, value: idName });
        });
        selectorNamePlaceholder = (Object.keys(id).length === 0) ? 'No IDs found':'Select an ID';
      } else if (this.currentSelector === 'class') {
        let classes = this.props.nodeStore.class;
        Object.keys(classes).forEach((className, i)=> {          
          selectorName.push({ key: i, text: className, value: className });
        });
        selectorNamePlaceholder = (selectorName.length === 0) ? 'No Classes Found':'Select a Class';
      } else if (this.currentSelector === 'tag') {
        let tags = this.props.nodeStore.tag;
        Object.keys(tags).forEach((tagName, i)=> {
          selectorName.push({ key: i, text: tagName, value: tagName });
        });
        selectorNamePlaceholder = (selectorName.length === 0) ? 'No Tags Found':'Select a tag';
      } 
      // SelectorModifier logic
      if (this.currentSelector !== 'id' && selectorName.length > 0) {
        selectorModifierRender = (<Dropdown className="dropdownSel" search searchInput={{ type: 'text' }} placeholder="Select Modifier" selection options={selectorModifier} id="selectorModifierDropdown" onChange={(e, {value})=>this.handleSelectorModifierDropdown(e, value)} />);
      }
      selectorNameRender=(<Dropdown className="dropdownSel" search searchInput={{ type: 'text' }} placeholder={selectorNamePlaceholder} selection options={selectorName} id="selectorNameDropdown" onChange={(e, {value})=>this.handleSelectorNameDropdown(e, value)} />);
      
      // If selector modifier is index
      if (this.props.test.selectorModifier === 'index') {
            indexRender = (<Input className="dropdownSel" placeholder="Enter a Number" className="indexInput" id="selectorIndexInput" type="number" />);
      }
    }
  
    return (
      <div id="testLocationContainer">
        <form onSubmit={(event)=>{
          this.handleSubmitEventForAction(event);
          }}>
          <Breadcrumb size='tiny'>
            <Breadcrumb.Section link>Test</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section active>Target</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section link>Source</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section link>Expectation</Breadcrumb.Section>
          </Breadcrumb>
          <Progress size='tiny' color='yellow' percent={25} />
          <h3 className="subheader">Select Target</h3>
  
          <div className="form-group">
            <label id="selLabel">Selector <span style={ {color: "#ffaaaa"} }>*</span></label>
            <Dropdown className="dropdownSel" search searchInput={{ type: 'text' }} selection options={selector} placeholder="Select from Dropdown" id="selectorDropdown" onChange={(e, {value})=>this.handleSelectorDropdown(e, value)} />
            <br />
            <div id="selectorContainer">
            { selectorNameRender }
            <br />
            { selectorModifierRender } { indexRender }
            </div>
          </div>
          <Button primary inverted color="blue" size="tiny" type="button" onClick={()=>this.handleBack()} className="btn btn-primary back">Back</Button>
          <Button primary type="submit" className="btn btn-primary">Next</Button>
          {this.error}
        </form>
      </div>

    );
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(TestLocation);
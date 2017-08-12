import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Dropdown, Input } from 'semantic-ui-react';

class TestLocation extends Component {
  constructor(props) {
    super(props);
    // default to nothing
    this.currentSelector = '';
    this.currentSelectorName = '';
    this.currentModifier = '';
  }
  handleSubmitEventForAction(event) {
      event.preventDefault();
      let arrayIndex = document.getElementById('selectorIndexInput').value;
      if(this.currentModifier === 'index') {
        arrayIndex = '[' + JSON.stringify(arrayIndex) + ']'
        this.props.saveTestProperty('modifier', arrayIndex);
      }
      if (this.currentSelector === 'node') this.props.setTestLocation(this.props.compAddress);
      console.log('after test submit - STATE', this.props.stateIsNowProp);
      this.props.renderTest2();
    };

    handleSelectorDropdown(event, value) {
      this.currentSelector = value;
      this.props.saveTestProperty('selector', value);
      console.log('handled selector dropdown', value)
    }

    handleSelectorNameDropdown(event, value) {
      this.currentSelectorName = value;
      this.props.saveTestProperty('selectorName', value);
      console.log('handled selectorName dropdown', value)
      
    }

    handleModifierDropdown(event, value) {
      this.currentModifier = value;
      if(this.currentModifier === '.length') {
        this.props.saveTestProperty('modifier', value)
      }
      console.log('handled modifier dropdown', value)
      
    }

    handleBack() {
      this.props.renderEditMode();
    }
  
  render () {
    let selectorNameRender;
    let modifierRender;
    let indexRender;
    const selectorName = [];
    const selector = [
      { key: 1, text: 'Node', value: 'node' },
      { key: 2, text: 'Component', value: 'component' },
      { key: 3, text: 'ID', value: 'id' },
      { key: 4, text: 'Class', value: 'class' },
      { key: 5, text: 'Tag', value: 'tag' }
    ];
    const modifier = [
      { key: 1, text: 'Length', value: '.length' },
      { key: 2, text: 'Index', value: 'index' }
    ]

    // Selector and Selector name logic
    if (this.currentSelector === 'node') {
      selectorName.push({ key: 1, text: this.props.compAddress, value: this.props.compAddress });
      selectorNameRender = (<Input placeholder='Click on a node' value = {this.props.compAddress} disabled />);
    } else if (this.currentSelector !== '') {
      if (this.currentSelector === 'component'){
        let components = this.props.stateIsNowProp.nodeStore.node;
        Object.keys(components).forEach((compName, i)=> {
          selectorName.push({ key: i, text: compName, value: compName });
        });
      } else if (this.currentSelector === 'id') {
        let id = this.props.stateIsNowProp.nodeStore.id;
        selectorName.push({ key: 1, text: id, value: id });
      } else if (this.currentSelector === 'class') {
        let classes = this.props.stateIsNowProp.nodeStore.class;
        Object.keys(classes).forEach((className, i)=> {
          selectorName.push({ key: i, text: className, value: className });
        });
      } else if (this.currentSelector === 'tag') {
        let tags = this.props.stateIsNowProp.nodeStore.tag;
        Object.keys(tags).forEach((tagName, i)=> {
          selectorName.push({ key: i, text: tagName, value: tagName });
        });
      }
      selectorNameRender=(<Dropdown selection options={selectorName} id="selectorNameDropdown" defaultValue = '1' onChange={(e, {value})=>this.handleSelectorNameDropdown(e, value)} />);
    }

    // Modifier logic
    if (this.currentSelector !== 'node' && this.currentSelector !== 'id') {
      modifierRender = (<Dropdown selection options={modifier} id="modifierDropdown" defaultValue = '1' onChange={(e, {value})=>this.handleModifierDropdown(e, value)} />);
    }

    if (this.currentModifier === 'index') {
      indexRender = (<Input className="indexInput" id="selectorIndexInput" type = "number"/>);
    }
      
    return (

      <form onSubmit={(event)=>{
        this.handleSubmitEventForAction(event);
        }}>

        <h3 className="subheader">Set Location</h3>

        <div className="form-group">
          <label>Location <span style={ {color: "#ffaaaa"} }>*</span></label>
          <Dropdown selection options={selector} placeholder="Selector" id="selectorDropdown" onChange={(e, {value})=>this.handleSelectorDropdown(e, value)} />
          <br />
          { selectorNameRender }
          <br />
          { modifierRender } { indexRender }
        </div>
        <Button primary onClick={()=>this.handleBack()} className="btn btn-primary">Back</Button>
        <Button primary type="submit" className="btn btn-primary">Save</Button>
      </form>

    );
  }
};

export default TestLocation;
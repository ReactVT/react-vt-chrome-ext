import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Input, Dropdown, Message } from 'semantic-ui-react';

class AddAssertionsForAction extends Component {
  constructor(props) {
    super(props);
    this.error = '';
  }

  handleSubmit(event) {
      event.preventDefault();
      let inputValueEl = document.getElementById('inputValue');
      // this.props.saveActionProperty('assertID', this.props.stateIsNowProp.assertID);
      // this.props.setActionLocation(this.props.compAddress);
      // this.props.saveActionProperty('compName', this.props.compName);
      console.log('IN HANDLE SUBMIT', this.props.stateIsNowProp.action, inputValueEl)
      if (!this.props.compName) {
        this.error=(<Message negative>
          <Message.Header>Component Required</Message.Header>
          <p>Please click on a node.</p>
</Message>);
        this.forceUpdate();
      } else if (this.props.stateIsNowProp.action.event === 'keypress' && !inputValueEl.value) {
        console.log('IN INPUTVALUE EL CONDITONAL')
        this.error=(<Message negative>
          <Message.Header>Input Value Required</Message.Header>
          <p>Please enter a value to check on Enter</p>
</Message>);
        this.forceUpdate();
      } else if (this.props.compName) {
        let newAction = this.props.stateIsNowProp.action;
        newAction.loc = this.props.compAddress;
        newAction.compName = this.props.compName;
        newAction.assertID = this.props.stateIsNowProp.assertID;
        if (this.props.stateIsNowProp.action.event === 'keypress' && inputValueEl.value) {
          newAction.inputValue = inputValueEl.value;
        }
        this.props.incrementAssertId();
        this.props.saveAssertion(newAction);
        this.props.clearAction();
        this.props.renderEditMode();
      }
  }

    handleEventDropdown(event, value) {
      this.props.saveActionProperty('event', value);
      console.log('handled event dropdown', value)
      this.error = ''
    }

    handleBack() {
      // Clear out action before going back
      this.props.clearAction();
      this.props.renderEditMode();
    }

  render () {
    let inputValueRender;
    const eventOptions = [
      { key: 1, text: 'Click', value: 'click' },
      { key: 2, text: 'Double Click', value: 'dblclick' },
      { key: 3, text: 'Right Click', value: 'contextmenu' },
      { key: 4, text: 'Enter', value: 'keypress' }      
    ];
    if (this.props.compName && this.props.stateIsNowProp.action.event !== 'keypress') this.error = '';

    if (this.props.stateIsNowProp.action.event === 'keypress') {
      inputValueRender = (<Input placeholder="Value to check before Enter" className="inputValue" id="inputValue" type="text" />);
    }

    return (
      <div id="newActionContainer">
        <form onSubmit={(event)=>{
          this.handleSubmit(event);
          }}>
  
          <h3 className="subheader">Action</h3>
  
          <div id ="actionComponent" className="form-group">
            <label className="inputLabel">Component <span style={ {color: "#ffaaaa"} }>*</span></label>
            <Input transparent placeholder="Click on Node" className="form-control" required ref="componentName" value={this.props.compName} disabled/>
          </div>
  
          <div id="eventComponent" className="form-group">
            <label className="inputLabel">Event <span style={ {color: "#ffaaaa"} }>*</span></label>
            <Dropdown id="eventDropDown" search searchInput={{ type: 'text' }} 
            selection options={eventOptions} defaultValue={eventOptions[0].value} onChange={(e, { value })=>this.handleEventDropdown(e, value)} />
            <br />
            { inputValueRender }

          </div>
          
          <Button inverted color="blue" size="tiny" type="button" onClick={()=>this.handleBack()} className="btn btn-primary">Back</Button>
          <Button primary size="small" type="submit" className="btn btn-primary">Save</Button>
          {this.error}
        </form>
      </div>
    );
  }
};

export default AddAssertionsForAction;
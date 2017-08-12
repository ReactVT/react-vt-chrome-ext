import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button } from 'semantic-ui-react';

class AddAssertionsForAction extends Component {

  handleSubmitEventForAction(event) {
      event.preventDefault();
      // this.props.saveActionProperty('assertID', this.props.stateIsNowProp.assertID);
      this.props.setActionLocation(this.props.compAddress);
      let newAction = this.props.stateIsNowProp.action;
      newAction.loc = this.props.compAddress;
      newAction.assertID = this.props.stateIsNowProp.assertID;
      this.props.incrementAssertId();
      this.props.saveAssertion(newAction);
      this.props.clearAction();
      this.props.renderEditMode();
    };

    handleEventDropdown(event) {
      this.props.saveActionProperty('event', event.target.value);
      console.log('handled event dropdown', event.target.value)
    }

    handleBack() {
      this.props.renderEditMode();
    }

  render () {

    return (

      <form onSubmit={(event)=>{
        this.handleSubmitEventForAction(event);
        }}>

        <h3 className="subheader">Action</h3>

        <div className="form-group">
          <label>Component <span style={ {color: "#ffaaaa"} }>*</span></label>
          <input type="text" className="form-control" required ref="componentName" value={this.props.compName} disabled/>
        </div>

        <div className="form-group">
          <label>Type of Event <span style={ {color: "#ffaaaa"} }>*</span></label>
          <select onChange={(e)=>this.handleEventDropdown(e)}>
            <option value="click">Click</option>
            <option value="dblclick">Double Click</option>
            <option value="contextmenu">Right Click</option>
            <option value="onEnter">Enter</option>
          </select>
        </div>
        
        <Button inverted color="blue" size="tiny" onClick={()=>this.handleBack()} className="btn btn-primary">Back</Button>
        <Button primary size="small" type="submit" className="btn btn-primary">Save</Button>
      </form>
    );
  }
};

export default AddAssertionsForAction;
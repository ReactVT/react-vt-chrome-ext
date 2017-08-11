import React, { Component } from 'react';
import { render } from 'react-dom';

class TestLocation extends Component {
  constructor(props) {
    super(props);
    // default to node
    this.locationSelect = 'node';
  }
  handleSubmitEventForAction(event) {
      event.preventDefault();
      this.props.saveTestProperty('selector', this.locationSelect);
      this.props.setTestLocation(this.props.compAddress);
      this.props.renderTest2();
      // this.props.setActionLocation(this.props.compAddress);
      // this.props.saveAssertion(this.props.stateIsNowProp.action);
    };

    // handleEventDropdown(event) {
    //   this.props.saveActionProperty('event', event.target.value);
    //   console.log('handled event dropdown', event.target.value)
    // }

  render () {
    let locationDetails;
    // console.log('loc detiall', document.getElementById('locationDropdown'))
    if (this.locationSelect === 'node') locationDetails = (<input value = {this.props.compAddress} disabled />);
    else locationDetails = (<input type="text"/>);
    return (

      <form onSubmit={(event)=>{
        this.handleSubmitEventForAction(event);
        }}>

        <h3 className="subheader">Set Location</h3>

        <div className="form-group">
          <label>Location <span style={ {color: "#ffaaaa"} }>*</span></label>
          <select id="locationDropdown" onChange={(e)=>this.handleEventDropdown(e)}>
            <option value="node">Node</option>
          </select>
          { locationDetails }
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
      </form>

    );
  }
};

export default TestLocation;
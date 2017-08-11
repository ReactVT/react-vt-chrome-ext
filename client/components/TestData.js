import React, { Component } from 'react';
import { render } from 'react-dom';

class TestData extends Component {
  constructor(props) {
    super(props);
    // default to node
    this.sourceSelect = 'props';
  }
  handleSubmitEventForAction(event) {
      event.preventDefault();
      this.props.saveTestProperty('source', this.sourceSelect);
      this.props.saveTestProperty('property', document.getElementById('property-input'));
      this.props.renderTest3();
      // this.props.setActionLocation(this.props.compAddress);
      // this.props.saveAssertion(this.props.stateIsNowProp.action);
    };

    handleEventDropdown(event) {
      this.sourceSelect = event.target.value;
    }

  render () {
    return (

      <form onSubmit={(event)=>{
        this.handleSubmitEventForAction(event);
        }}>

        <h3 className="subheader">Set Source</h3>

        <div className="form-group">
          <label>Source <span style={ {color: "#ffaaaa"} }>*</span></label>
          <select id="sourceDropdown" onChange={(e)=>this.handleEventDropdown(e)}>
            <option value="props">Props</option>
            <option value="state">State</option>
          </select>
          <input type="text" id="property-input" />
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
      </form>

    );
  }
};

export default TestData;
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
      this.props.saveTestProperty('property', document.getElementById('property-input').value);
      this.props.renderTest3();
      // this.props.setActionLocation(this.props.compAddress);
      // this.props.saveAssertion(this.props.stateIsNowProp.action);
    };

    handleEventDropdown(event) {
      this.sourceSelect = event.target.value;
    }

    handleBack() {
      this.props.renderTest1();
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
        <button onClick={()=>this.handleBack()} className="btn btn-primary">Back</button>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>

    );
  }
};

export default TestData;
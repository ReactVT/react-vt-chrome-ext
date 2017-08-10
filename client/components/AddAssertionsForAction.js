import React, { Component } from 'react';
import { render } from 'react-dom';

class AddAssertionsForAction extends Component {

  handleSubmitEventForAction(event) {
      event.preventDefault();
      const action = {}
      action.type = 'action'
      action.event = 'click'
      action.loc = this.props.compAddress

      console.log('action ASSERTION', action)

      this.props.saveActionAssertion(action)

    };

  render () {

    return (

      <form onSubmit={(event)=>{
        this.props.renderEditMode();
        this.handleSubmitEventForAction(event);
        }}>

        <h3 className="subheader">Action</h3>

        <div className="form-group">
          <label>Component <span style={ {color: "#ffaaaa"} }>*</span></label>
          <input type="text" className="form-control" required ref="componentName" value={this.props.compName} disabled/>
        </div>

        <div className="form-group">
          <label>Type of Event <span style={ {color: "#ffaaaa"} }>*</span></label>
          <input type="text" className="form-control" required ref="actionEvent" value='click' disabled/>
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    );
  }
};

export default AddAssertionsForAction;
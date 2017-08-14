import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Dropdown, Input } from 'semantic-ui-react';

class TestData extends Component {
  constructor(props) {
    super(props);
    // default to node
    this.sourceSelect = '';
  }
  handleSubmitEventForAction(event) {
      event.preventDefault();
      this.props.saveTestProperty('source', this.sourceSelect);
      this.props.saveTestProperty('property', document.getElementById('property-input').value);
      console.log('current test', this.props.stateIsNowProp.test);
      this.props.renderTest3();
      // this.props.setActionLocation(this.props.compAddress);
      // this.props.saveAssertion(this.props.stateIsNowProp.action);
    };

    handleSourceDropdown(event, value) {
      this.sourceSelect = value;
      this.props.saveTestProperty('source', value);
    }

    handleBack() {
      this.props.renderTest1();
    }

  render () {
    let sourceRender;
    // options for node or component
    let sourceNode = [
      { key: 1, text: 'Props', value: 'props' },
      { key: 2, text: 'State', value: 'state' }
    ];
    let selector = this.props.stateIsNowProp.test.selector;
    let currentProps = this.props.props;
    let currentState = this.props.state;
    
    // for node/component
    if (selector === 'node' || selector === 'component') {
      // if there are no props and state exists
      if (!currentProps && currentState) {
        console.log('no props, state')
        this.sourceSelect = 'state';
        sourceRender = (<Input placeholder='State' value= '' disabled />);
        // no state and props exist
      } else if (!currentState && currentProps) {
        console.log('no state, props')        
        this.sourceSelect = 'props';
        sourceRender = (<Input placeholder='Props' value='' disabled />);
      } else if (currentProps && currentState) {
        console.log('both')
        sourceRender = (<Dropdown selection options={sourceNode} placeholder="Select Source" id="sourceDropdown" onChange={(e, {value})=>this.handleSourceDropdown(e, value)} />);
      } else {
        sourceRender = (<Input placeholder='No Props or State Here' disabled />);
      }

    }

    
    return (

      <form onSubmit={(event)=>{
        this.handleSubmitEventForAction(event);
        }}>

        <h3 className="subheader">Set Source</h3>

        <div className="form-group">
          { sourceRender }
          <input type="text" id="property-input" />
        </div>
        <Button primary onClick={()=>this.handleBack()} className="btn btn-primary">Back</Button>
        <Button primary type="submit" className="btn btn-primary">Save</Button>
      </form>

    );
  }
};

export default TestData;
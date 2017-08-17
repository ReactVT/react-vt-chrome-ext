import React, { Component } from 'react';
import { render } from 'react-dom';
import KeyInformation from '../components/KeyInformation';
import ValueInformation from '../components/ValueInformation';


class Details extends Component {

  render() {
    let display;
    let currentItem = this.props.stateIsNowProp.selectedItem;
    if (currentItem.type === 'none') {
      display = (<div id="details-panel" style={{"padding": "5px"}}>
        <h4>Select a node or assertion</h4>
        </div>
        ); 
    }

    if (currentItem.type === 'node') {
      let props = [];
      let state = [];
      if (this.props.stateIsNowProp.nodeData.props) {
        console.log('in props!!!!!');
        props = Object.keys(this.props.stateIsNowProp.nodeData.props).map((val, index) => {
          return (<li key={index}>{val}: {this.props.stateIsNowProp.nodeData.props[val]} </li>);
        })
      }
      if (this.props.stateIsNowProp.nodeData.state) {
        state = Object.keys(this.props.stateIsNowProp.nodeData.state).map((val, index) => {
          return (<li key={index}>{val}: {JSON.stringify(this.props.stateIsNowProp.nodeData.state[val])} </li>);
        })
      }
      display = (
        <div id="details-panel" style={{"padding": "5px"}}>
        <h4 className="page-header">Details</h4>
        <h5 id="detailsName">{this.props.stateIsNowProp.nodeData.name}</h5>
        <h5>Props</h5>
        {props}
        <h5>State</h5>
        {state}
        </div>
      );
    }

    
    if (currentItem.type === 'test') {
      display = (
        <div id="details-panel" style={{"padding": "5px"}}>
          <p>AssertID: {currentItem.assert.assertID}</p>
          <p>Status: {currentItem.assert.passed}</p>
          <p>Name: {currentItem.assert.compName}</p>
          <p>Selector: {currentItem.assert.selector}</p>
          <p>Selector Name: {currentItem.assert.selectorName}</p>
          <p>Selector Modifier: {currentItem.assert.selectorModifier}</p>
          <p>Source: {currentItem.assert.source}</p>
          <p>Property: {currentItem.assert.property}</p>
          <p>Modifier: {currentItem.assert.modifier}</p>
          <p>Data Type: {currentItem.assert.dataType}</p>
          <p>Evaluation: {currentItem.assert.type}</p>
          <p>Expected: {currentItem.assert.value}</p>
        </div>
        ); 
    }

    if (currentItem.type === 'action') {
      display = (
        <div id="details-panel" style={{"padding": "5px"}}>
          <p>AssertID: {currentItem.assert.assertID}</p>
          <p>Status: {currentItem.assert.passed}</p>
          <p>Name: {currentItem.assert.compName}</p>
          <p>Event: {currentItem.assert.event}</p>
        </div>
        ); 
    }





    return display;
  }
  
}


export default Details;
import React, { Component } from 'react';
import { render } from 'react-dom';
import KeyInformation from '../components/KeyInformation';
import ValueInformation from '../components/ValueInformation';


class Details extends Component {

  render() {
    let display;

    let self = this
    let currentItem = this.props.stateIsNowProp.selectedItem;

    let props;
    let state;

    if (currentItem.type === 'none') {
      display = (<div id="details-panel" style={{"padding": "5px"}}>
        <h4>Select a node or assertion</h4>
        </div>
        ); 
    }
     
    if (currentItem.type === 'node') {
        console.log('fixing a node', this.props.stateIsNowProp.nodeData);
        display = (
        <div id="details-panel" style={{"padding": "5px"}}>
        <h5 id="detailsHeader">Details for Test Assertion</h5>
          <div className="detailsFull">
            <ul className="detailsList">
              <h5 className="detailName">TEXT</h5>
              <li><span className="boldDetail">Status:</span> bro</li>
              <li><span className="boldDetail">Name:</span> bro</li>
              <li><span className="boldDetail">Selector Modifier:</span> bro</li>
              <li><span className="boldDetail">Property:</span> bro</li>
              <li><span className="boldDetail">Data Type:</span> bro</li>
              <li><span className="boldDetail">Expected:</span> bro</li>
            </ul>
          </div>
          <div className="detailsFull">
            <ul className="detailsList">
              <li><span className="boldDetail">Assert ID:</span> bro</li>
              <li><span className="boldDetail">Selector:</span> bro</li>
              <li><span className="boldDetail">Source:</span> bro</li>
              <li><span className="boldDetail">Modifier:</span> bro</li>
              <li><span className="boldDetail">Evaluation:</span> bro</li>
              <li><span className="boldDetail">Actual:</span> bro</li>
            </ul>
          </div>  
        </div>
        ); 



      // if (this.props.stateIsNowProp.nodeData.props) {
      //   console.log('in props!!!!!');
      //   props = Object.keys(this.props.stateIsNowProp.nodeData.props).map((val, index) => {
      //     return (<li key={index}>{val}: {this.props.stateIsNowProp.nodeData.props[val]} </li>);
      //   })
      // }
      // if (this.props.stateIsNowProp.nodeData.state) {
      //   state = Object.keys(this.props.stateIsNowProp.nodeData.state).map((val, index) => {
      //     return (<li key={index}>{val}: {JSON.stringify(this.props.stateIsNowProp.nodeData.state[val])} </li>);
      //   })
      // }
      // display = (
      //   <div id="details-panel" style={{"padding": "5px"}}>
      //   <h4 className="page-header">Details</h4>
      //   <h5 id="detailsName">{this.props.stateIsNowProp.nodeData.name}</h5>
      //   <h5>Props</h5>
      //   {props}
      //   <h5>State</h5>
      //   {state}
      //   </div>
      // );
    }

    // Logic for building a test details panel
    if (currentItem.type === 'test') {
      let curr = currentItem.assert; 
      let result = curr.passed ? curr.passed : 'In Progress';
      let name = curr.selectorName ? curr.selectorName : curr.compName; 
      let selectorModifier = curr.selectorModifier ? curr.selectorModifier : 'n/a'; 
      let actual = curr.actual ? curr.actual : 'n/a';
      let property = curr.property ? curr.property : 'n/a';
      let mod = curr.modifier ? curr.modifier : 'n/a';
      display = (
        <div id="details-panel" style={{"padding": "5px"}}>
        <h5 id="detailsHeader">Details for Test Assertion</h5>
          <div id="details-left">
            <ul className="detailsList">
              <li><span className="boldDetail">Status:</span> {result}</li>
              <li><span className="boldDetail">Name:</span> {name}</li>
              <li><span className="boldDetail">Selector Modifier:</span> {selectorModifier}</li>
              <li><span className="boldDetail">Property:</span> {property}</li>
              <li><span className="boldDetail">Data Type:</span> {currentItem.assert.dataType}</li>
              <li><span className="boldDetail">Expected:</span> {currentItem.assert.value}</li>
            </ul>
          </div>
          <div id="details-right">
            <ul className="detailsList">
              <li><span className="boldDetail">Assert ID:</span> {curr.assertID}</li>
              <li><span className="boldDetail">Selector:</span> {curr.selector}</li>
              <li><span className="boldDetail">Source:</span> {curr.source}</li>
              <li><span className="boldDetail">Modifier:</span> {mod}</li>
              <li><span className="boldDetail">Evaluation:</span> {currentItem.assert.type}</li>
              <li><span className="boldDetail">Actual:</span> {actual}</li>
            </ul>
          </div>  
        </div>
        ); 
    }
    
    // Logic for building an action details panel
    if (currentItem.type === 'action') {
      let actionStatus = currentItem.assert.passed ? 'Done' : 'In Progress';
      display = (
        <div id="details-panel" style={{"padding": "5px"}}>
        <h5 id="detailsHeader">Details for Action Assertion</h5>
          <div id="details-action">
            <ul className="detailsList">
              <li><span className="boldDetail">Status:</span> {actionStatus}</li>
              <li><span className="boldDetail">Assert ID:</span> {currentItem.assert.assertID}</li>
              <li><span className="boldDetail">Event:</span> {currentItem.assert.event}</li>
              <li><span className="boldDetail">Name:</span> {currentItem.assert.compName}</li>
            </ul>
          </div>
        </div>
        ); 
    }

    return display;
  }
  
}


export default Details;
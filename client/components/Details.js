import React, { Component } from 'react';
import { render } from 'react-dom';
import KeyInformation from '../components/KeyInformation';
import ValueInformation from '../components/ValueInformation';


class Details extends Component {

  render() {
    let display;

    let self = this
    let currentItem = this.props.stateIsNowProp.selectedItem;

    let props = '';
    let state = '';

    if (currentItem.type === 'none') {
      display = (<div id="details-panel" style={{"padding": "5px"}}>
        <h4>Select a node or assertion</h4>
        </div>
        ); 
    }


     
    if (currentItem.type === 'node') {
      let node = this.props.stateIsNowProp.nodeData;
          console.log('in details', node);
      let id = node.id ? node.id : 'n/a'; 
      let nodeClass = node.class ? node.class : 'n/a'; 


      if (node.state && Object.keys(node.state).length > 0)  {
        let nodeState = Object.keys(node.state).map(item => {
          let currState = node.state[item];
          if (typeof currState === 'object') currState = JSON.stringify(currState);
          return (<li><span className="boldDetail">{item}:</span> {currState}</li>)
        }); 
        state = (
          <div className="detailsFull">
          <span className="detailName">State</span>
          <ul className="detailsList">
            {nodeState}
          </ul>
        </div>
        );
      } 

      if (node.props && Object.keys(node.props).length > 0) {
        let nodeProps = Object.keys(node.props).map(item => {
          let currProp = node.props[item];
          if (typeof currProp === 'object') currProp = JSON.stringify(currProp);
          return (<li><span className="boldDetail">{item}:</span> {currProp}</li>)
        }); 
        props = (
          <div className="detailsFull">
          <span className="detailName">Props</span>
            <ul className="detailsList">
              {nodeProps}
            </ul>
          </div>
        );
      }








        display = (
          <div id="details-panel" style={{"padding": "5px"}}>
          <h5 id="detailsHeader">Details for Selected Node</h5>
          <div className="detailsFull">
            <ul className="detailsList">
              <li><span className="boldDetail">Name:</span> {node.name}</li>
              <li><span className="boldDetail">Id:</span> {id}</li>
              <li><span className="boldDetail">Class:</span> {nodeClass}</li>
            </ul>
            </div>
            {state}
            {props}
            </div>);






    }


    // Logic for building a test details panel
    if (currentItem.type === 'test') {
      console.log('in assert', currentItem);
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
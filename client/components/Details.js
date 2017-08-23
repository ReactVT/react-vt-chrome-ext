import React, { Component } from 'react';
import { render } from 'react-dom';
import ValueInformation from '../components/ValueInformation';
import { Accordion, Grid } from 'semantic-ui-react';

class Details extends Component {

  render() {
    let display;

    let self = this
    // Grab a reference to our selected item from the redux store
    let currentItem = this.props.stateIsNowProp.selectedItem;

    let props = '';
    let state = '';

    // Simple display if nothing is selected
    if (currentItem.type === 'none') {
      display = (<div id="details-panel" style={{"padding": "5px"}}>
        <h4>Select a node or assertion</h4>
        </div>
        ); 
    }
    
    // Render logic for details if a node is selected
    if (currentItem.type === 'node') {
      let node = this.props.stateIsNowProp.nodeData;
      let id = node.id ? node.id : 'n/a'; 
      let nodeClass = node.class ? node.class : 'n/a'; 

      // if state exists
      if (node.state && Object.keys(node.state).length > 0)  {
        // Loop through our state and build out our grid based on its contents
        let nodeState = Object.keys(node.state).map(item => {
          let currState = node.state[item];
          // iterate through current state if it is an array
          if (currState.constructor === Array) {
            const arrayRender = [];
            currState.forEach((el, i)=> {
              // if it's an element that is not a string
              if (typeof el !== 'string') el = JSON.stringify(el);
              arrayRender.push(<li className="object-content">{el}</li>);
            });
          return (<Grid.Row columns={2} className="grid-row"><Grid.Column width={5} className="boldDetail grid-col">{item}: </Grid.Column>
          <Grid.Column className="grid-col">
            <Accordion className="accordion-stateprops-block"> 
              <Accordion.Title className="accordion-stateprops-title"> Array({currState.length}) </Accordion.Title> 
              <Accordion.Content className="accordion-stateprops-content">
                { arrayRender } 
              </Accordion.Content>
            </Accordion>
          </Grid.Column></Grid.Row>);
          }
          
          if (typeof currState !== 'string') currState = JSON.stringify(currState);
          return (<Grid.Row columns={2} className="grid-row"><Grid.Column width={5} className="boldDetail grid-col">{item}:</Grid.Column><Grid.Column className="grid-col">{currState}</Grid.Column></Grid.Row>);
        });
        
        // Construct our state object with all of our state details contained in the nodeState array
        state = (
          <div className="detailsFull">
          <span className="detailName">State</span>
          <Grid divided='vertically' className="detailsList">
            {nodeState}
          </Grid>
          </div>
        );
      } 

      // Here we do the same thing with props that we did with state, build out an array of components to render
      if (node.props && Object.keys(node.props).length > 0) {
        let nodeProps = Object.keys(node.props).map(item => {
          let currProp = node.props[item];
          
          if (currProp.constructor === Array) {
            const arrayRender = [];
            currProp.forEach((el, i)=> {
              if (typeof el === 'object') el = JSON.stringify(el);
              if (el === '') el = "''";
              arrayRender.push(<li className="object-content">{el}</li>);
            });
          return (<Grid.Row columns={2} className="grid-row"><Grid.Column width={5} className="boldDetail grid-col">{item}: </Grid.Column>
          <Grid.Column className="grid-col">
            <Accordion className="accordion-stateprops-block"> 
              <Accordion.Title className="accordion-stateprops-title"> Array({currProp.length}) </Accordion.Title> 
              <Accordion.Content className="accordion-stateprops-content">
                { arrayRender } 
              </Accordion.Content>
            </Accordion>
          </Grid.Column></Grid.Row>);
          }
          return (<Grid.Row columns={2} className="grid-row"><Grid.Column width={5} className="boldDetail grid-col">{item}:</Grid.Column><Grid.Column className="grid-col">{currProp}</Grid.Column></Grid.Row>);
        });

        props = (
          <div className="detailsFull">
          <span className="detailName">Props</span>
          <Grid divided='vertically' className="detailsList">
            {nodeProps}
          </Grid>
          </div>
        );
      }

        // Build out our final display now that we've collected our state and props info
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
      let name = curr.selectorName ? curr.selectorName : curr.compName; 
      let selectorModifier = curr.selectorModifier ? curr.selectorModifier : 'n/a'; 
      let actual; 
      if (curr.actual && typeof curr.actual === 'string') actual = curr.actual;
      else if (curr.actual) actual = JSON.stringify(curr.actual);
      else actual = 'n/a';
      let property = curr.property ? curr.property : 'n/a';
      let mod = curr.modifier ? curr.modifier : 'n/a';
      let result = 'In Progress'; 
      if (curr.passed) result = 'Passed'; 
      else if (curr.passed === false) result = 'Failed'; 
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
      let onEnter = (currentItem.assert.event === 'keypress') ? (<li><span className="boldDetail">Input Text:</span> {currentItem.assert.inputValue}</li>) : '';
      display = (
        <div id="details-panel" style={{"padding": "5px"}}>
        <h5 id="detailsHeader">Details for Action Assertion</h5>
          <div id="details-action">
            <ul className="detailsList">
              <li><span className="boldDetail">Status:</span> {actionStatus}</li>
              <li><span className="boldDetail">Assert ID:</span> {currentItem.assert.assertID}</li>
              <li><span className="boldDetail">Event:</span> {currentItem.assert.event}</li>
              { onEnter }
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
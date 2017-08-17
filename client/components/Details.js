import React, { Component } from 'react';
import { render } from 'react-dom';
import KeyInformation from '../components/KeyInformation';
import ValueInformation from '../components/ValueInformation';


class Details extends Component {

  render() {
    let display; 
    if (this.props.stateIsNowProp.selectedItem.type === 'none') {
      display = (<div id="details-panel" style={{"padding": "5px"}}>
        <h4>Select a node or assertion</h4>
        </div>
        ); 
    } else if (this.props.stateIsNowProp.selectedItem.type === 'node') {
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
    } else if (this.props.stateIsNowProp.selectedItem.type === 'test') {
      display = (<div id="details-panel" style={{"padding": "5px"}}>
        <h4>You clicked a test</h4>
        </div>
        ); 
    } else if (this.props.stateIsNowProp.selectedItem.type === 'action') {
      display = (<div id="details-panel" style={{"padding": "5px"}}>
        <h4>You clicked an action</h4>
        </div>
        ); 
    }





    return display;
  }
  
}


export default Details;
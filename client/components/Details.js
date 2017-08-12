import React, { Component } from 'react';
import { render } from 'react-dom';
import KeyInformation from '../components/KeyInformation';
import ValueInformation from '../components/ValueInformation';


class Details extends Component {

  render() {
    let props = [];
    let state = [];
    console.log('out of props', this.props);
    if (this.props.props) {
      console.log('in props!!!!!');
      props = Object.keys(this.props.props).map((val, index) => {
        return (<li key={index}>{val}: {this.props.props[val]} </li>);
      })
    }

    if (this.props.state) {
      console.log('in props!!!!!');
      state = Object.keys(this.props.state).map((val, index) => {
        return (<li key={index}>{val}: {JSON.stringify(this.props.state[val])} </li>);
      })
    }


    return (
      <div id="details-panel">
      <h4 className="page-header">Details</h4>
      <h5 id="detailsName">{this.props.compName}</h5>
      <h5>Props</h5>
      {props}
      <h5>State</h5>
      {state}
      </div>
    );
  }
  
}


export default Details;
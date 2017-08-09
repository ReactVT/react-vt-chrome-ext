import React, { Component } from 'react';
import { render } from 'react-dom';
import KeyInformation from '../components/KeyInformation';
import ValueInformation from '../components/ValueInformation';


class Details extends Component {

  render() {

    return (
      <div>
      <h3 className="page-header">Add New Assertions For Test</h3>
              Name: {this.props.compName}
           <br/>
              State Key: {this.props.stateKey} 
              State Value: {this.props.stateValue} 

              Prop Key: {this.props.propKey} 
              Prop Value: {this.props.propValue}   
      </div>
    );
  }
}


export default Details;
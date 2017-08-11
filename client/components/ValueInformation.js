import React, { Component } from 'react';
import { render } from 'react-dom';



class ValueInformation extends Component {

  render() {
    console.log('in value information')
//     STATE             PROP
// [[[key][value]] | [[key][value]]]
    return (
      <div>
           {this.props.textInfo}   
      </div>
    );
  }
}


export default ValueInformation;
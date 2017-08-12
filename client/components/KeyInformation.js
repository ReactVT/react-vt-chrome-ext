import React, { Component } from 'react';
import { render } from 'react-dom';



class KeyInformaton extends Component {


  render() {
      console.log('in key information')
//     STATE             PROP
// [[[key][value]] | [[key][value]]]
    return (
      <div>
         {this.props.textInfo}   
      </div>
    );
  }
}


export default KeyInformaton;



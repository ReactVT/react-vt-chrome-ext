import React, { Component } from 'react';
import { render } from 'react-dom';

class Links extends Component {

  render () {
    function link(d) {
  return "M" + d.target.y + "," + d.target.x
      + "C" + (d.target.y + d.source.y) / 2 + "," + d.target.x
      + " " + (d.target.y + d.source.y) / 2 + "," + d.source.x
      + " " + d.source.y + "," + d.source.x;
}
    return (
      <path 
        d={link(this.props.datum)} 
        style={{ "fill": "none", "stroke": "darkgrey", "strokeWidth": "0.5px"}}>
      </path>
    );
  }
};


export default Links;

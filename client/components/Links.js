import React, { Component } from 'react';
import { render } from 'react-dom';

class Links extends Component {

  render () {
    function link(d) {
  return "M" + d.source.y + "," + d.source.x
      + "C" + (d.source.y + d.target.y) / 2 + "," + d.source.x
      + " " + (d.source.y + d.target.y) / 2 + "," + d.target.x
      + " " + d.target.y + "," + d.target.x;
}

    return (
      <path 
        d={link(this.props.datum)} 
        style={{ "fill": "none", "stroke": "darkgrey", "strokeWidth": ".5px"}}>
      </path>
    );
  }
};

export default Links;

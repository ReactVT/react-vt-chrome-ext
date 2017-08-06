import React, { Component } from 'react';
import { render } from 'react-dom';

class Nodes extends Component {

  render() {
    return (
        <g transform={"translate(" + this.props.ytranslate + "," + this.props.xtranslate + ")"}>
          <circle r={3}  onClick={()=>{
             this.props.getNodeData(this.props) 
            }}/>
          <text  
            style={{"fontFamily": "Times Roman", "fontSize": "12px"}}
            dx={8}
          	dy={3}> 
            {this.props.name}
          </text>
        </g>
    );
  }
}


export default Nodes;
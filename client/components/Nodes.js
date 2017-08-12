import React, { Component } from 'react';
import { render } from 'react-dom';

class Nodes extends Component {
  
  render() {
    let self = this
    let x;
    let y;
    if(this.props.children.length === 0 ) {
      x=12
      y=5
    } else {
      x=-9
      y=25
    }
    return (
        <g transform={"translate(" + this.props.ytranslate + "," + this.props.xtranslate + ")"}>
          <circle 
            r={10}  
            style={{'fill': '#fff',
              'stroke': 'steelblue', 
              'strokeWidth': '3px'}}
            onClick={()=>{
              const obj = {'state': this.props.state, 'props': this.props.props, 'name': this.props.name, 'address': this.props.address}; 
              self.props.getNodeData(obj);
              self.props.selectedNode(this);  
            }}
            />
            <text  
              style={{"fontFamily": "Times Roman", "fontSize": "15px", "fontWeight":"bold"}}
              dx={x}
              dy={y}> 
              {this.props.name}
            </text>
        </g>
    );
  }
}


export default Nodes;
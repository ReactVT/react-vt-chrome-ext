import React, { Component } from 'react';
import { render } from 'react-dom';

class Nodes extends Component {

  render() {
    let self = this;
    let x;
    let y;

    let currentColor;

    if(this.props.debugId === this.props.stateIsNowProp.selectedItem.debugId) currentColor = this.props.stateIsNowProp.selectedColor
    else currentColor = this.props.stateIsNowProp.globalColor
    
    if(this.props.children.length === 0 ) {
      x=18
      y=5
    } else {
      x=-20
      y=30
    }

    return (
        <g transform={"translate(" + this.props.ytranslate + "," + this.props.xtranslate + ")"}>
          <circle 
            r={10}  
            style={currentColor}
            onClick={()=>{
              const obj = {'state': this.props.state, 'id': this.props.id, 'class': this.props.class, 'props': this.props.props, 'name': this.props.name, 'address': this.props.address}; 
              self.props.getNodeData(obj);
              self.props.selectedNode(this, this.props.debugId);  
            }}
            />
          <text  
            style={{"fontFamily": "helvetica", "fontSize": "15px", "fontWeight":"400",
            'letterSpacing': '0.1em'}}
            dx={x}
            dy={y}> 
            {this.props.name}
          </text>
        </g>
    );
  }
}


export default Nodes;
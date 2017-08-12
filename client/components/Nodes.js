import React, { Component } from 'react';
import { render } from 'react-dom';

class Nodes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circleStyle: {'fill': '#fff',
      'stroke': 'steelblue', 
      'strokeWidth': '4px',
      },
      toggle: false
    };
  }

  changeColor() {
    if(!this.state.toggle) {
      this.setState({
                    circleStyle: {'fill': 'ff5e55',
                    'stroke': '#steelblue', 
                    'strokeWidth': '4px',
                    },
                    toggle: true
                    })
    } else { 
      this.setState({
                    circleStyle: {'fill': 'fff',
                    'stroke': '#steelblue', 
                    'strokeWidth': '4px',
                        },
                    toggle: false
                    })
    }                   
  }  

  render() {
    let self = this
    let x;
    let y;
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
            style={this.state.circleStyle}
            onClick={()=>{
              self.changeColor()
              const obj = {'state': this.props.state, 'props': this.props.props, 'name': this.props.name, 'address': this.props.address}; 
              self.props.getNodeData(obj);
              self.props.selectedNode(this);  
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
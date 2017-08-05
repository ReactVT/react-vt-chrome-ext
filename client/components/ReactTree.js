import React, { Component } from 'react';
import { render } from 'react-dom';
import Nodes from './Nodes.js';
import Links from './Links.js';


class ReactTree extends Component {


  componentWillMount() {
    const self = this;
    // Create a connection to the background page
    var backgroundPageConnection = chrome.runtime.connect({
        name: "panel"
    });

    // send tabId to backgroundjs to establish connection
    backgroundPageConnection.postMessage({
      name: 'panelToBackgroundInit',
      tabId: chrome.devtools.inspectedWindow.tabId
    });

    // Listens for messages from backgroundjs to get the parsed dom tree
    backgroundPageConnection.onMessage.addListener(function(data) {
        console.log('d3tree received message from content script', data);
        if(data.type === 'virtualdom') {
          self.props.loadTreeData(data.data)
        }
    });

    // send assertions to webpage panel -> backgroundjs
    backgroundPageConnection.postMessage({
      type: 'assertion',
      message: 'hello from d3tree js'
    });

  }

  render() {

    if (Object.keys(this.props.stateIsNowProp.treeData).length === 0) {
        return (<h1>Waiting for Data</h1>)
    } else {
        return (
        <div>
          <h1> Tree From Scratch </h1>

            <svg 
            style={{"border": "2px solid black", "margin": "10px"}}
            width={1000}
            height={1000}>
                <g transform={"translate(100,0)"}>
                  {this.props.stateIsNowProp.treeData[0]} 
                  {this.props.stateIsNowProp.treeData[1]}
                </g>
          </svg> 
        </div>
        )
    }
  }

}

export default ReactTree;
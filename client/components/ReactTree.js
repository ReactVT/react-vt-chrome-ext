import React, { Component } from 'react';
import { render } from 'react-dom';
import Nodes from './Nodes.js';
import Links from './Links.js';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import KeyInformation from '../components/KeyInformation';
import ValueInformation from '../components/ValueInformation';

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

    let stateKey;
    let stateValue;
    let propKey;
    let propValue;

    if(Object.keys(this.props.stateIsNowProp.nodeData).length === 0) {
      stateKey = '';
      stateValue = '';
      propKey = '';
      propValue = ''
    } else {
      stateKey = this.props.stateIsNowProp.nodeData[0][0][0];
      stateValue = this.props.stateIsNowProp.nodeData[0][1][0];
      propKey = this.props.stateIsNowProp.nodeData[0][1][0];
      propValue = this.props.stateIsNowProp.nodeData[1][1][0];
    }

    if (Object.keys(this.props.stateIsNowProp.treeData).length === 0) {
        return (<h1>Waiting for Data</h1>)
    } else {
        return (
        <div>
          <h1> React VT </h1>

            <svg 
            style={{"border": "2px solid black", "margin": "10px"}}
            width={1000}
            height={500}>
                <g transform={"translate(100,0)"}>
                  {this.props.stateIsNowProp.treeData[0]} 
                  {this.props.stateIsNowProp.treeData[1]}
                </g>
            </svg> 

           <Card>
            <CardHeader
              title="Details"
            />
            <CardText>
   
              State Key: {stateKey} 
              State Value: {stateValue} 

              Prop Key: {propKey} 
              Prop Value: {propValue}   
                    
            </CardText>
          </Card> 

        </div>
        )
      }
    }

}

export default ReactTree;
import React, { Component } from 'react';
import { render } from 'react-dom';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';

import Nodes from './Nodes.js';
import Links from './Links.js';
import Details from '../components/Details';
import Assertions from '../components/Assertions';
import AssertionsList from './AssertionsList.js';

class ReactTree extends Component {

  constructor(props) {
    super(props); 
    this.backgroundPageConnection = null; 
  }

  componentWillMount() {
    const self = this;
    console.log('helloooo');
    // Create a connection to the background page
    self.backgroundPageConnection = chrome.runtime.connect({
        name: "panel"
    });

    // send tabId to backgroundjs to establish connection
    self.backgroundPageConnection.postMessage({
      name: 'panelToBackgroundInit',
      tabId: chrome.devtools.inspectedWindow.tabId
    });

    // Listens for messages from backgroundjs to get the parsed dom tree
    self.backgroundPageConnection.onMessage.addListener(function(data) {
        console.log('d3tree received message from content script', data);
        if(data.type === 'virtualdom') {
          self.props.loadTreeData(data.data.virtualDom);
          self.props.loadNodeStore(data.data.nodeStore);
          if (self.props.stateIsNowProp.selectedNode) {
            let newNode = self.props.stateIsNowProp.selectedNode
            const obj = {'state': newNode.props.state, 'props': newNode.props.props, 'name': newNode.props.name, 'address': newNode.props.address}; 
            self.props.getNodeData(obj);
          }
        }
    });

    // send assertions to webpage panel -> backgroundjs
    self.backgroundPageConnection.postMessage({
      type: 'assertion',
      message: 'hello from d3tree js'
    });

  }

  render() {

      if (this.props.stateIsNowProp.toggleAssertion) {
        this.props.toggleAssertionBlock();
        console.log('inside toggle');
        this.backgroundPageConnection.postMessage({
          type: 'assertion',
          message: this.props.stateIsNowProp.assertionList[this.props.stateIsNowProp.assertionList.length - 1]
        });
      }

      console.log('stateisnowprop', this.props.stateIsNowProp.nodeData)
      let compAddress = this.props.stateIsNowProp.nodeData.address; 
      let compName = this.props.stateIsNowProp.nodeData.name; 
      let props = this.props.stateIsNowProp.nodeData.props; 
      let state = this.props.stateIsNowProp.nodeData.state; 
      // if(Object.keys(this.props.stateIsNowProp.nodeData).length === 0) {
      //   compAddress = '';
      //   compName = '';
      // } else {
      //   if(this.props.stateIsNowProp.nodeData[0][2] !== compAddress)
      //   compAddress = this.props.stateIsNowProp.nodeData[0][2];
      //   compName = this.props.stateIsNowProp.nodeData[0][3];
      // }
      
      // let stateKey;
      // let stateValue;
      // let propKey;
      // let propValue;

      // if(Object.keys(this.props.stateIsNowProp.nodeData).length === 0) {
      //   stateKey = '';
      //   stateValue = '';
      //   propKey = '';
      //   propValue = ''
      // } else {
      //   stateKey = this.props.stateIsNowProp.nodeData[0][0][0][0];
      //   stateValue = this.props.stateIsNowProp.nodeData[0][0][1][0];
      //   propKey = this.props.stateIsNowProp.nodeData[0][0][1][0];
      //   propValue = this.props.stateIsNowProp.nodeData[0][1][1][0];

      //   // console.log('stateKey', this.props.stateIsNowProp.nodeData[0][0][0])
      //   // console.log('stateValue' , this.props.stateIsNowProp.nodeData[0][1][0])
      //   // console.log('propKey' , this.props.stateIsNowProp.nodeData[0][1][0])
      //   // console.log( 'propValue' , this.props.stateIsNowProp.nodeData[1][1][0])

      // }

    if (Object.keys(this.props.stateIsNowProp.treeData).length === 0) {
        return (<h1>Waiting for Data</h1>)
    } else {
        return (

        <div>
          <div id="tree-container">
            <div id="tree">
              <ReactSVGPanZoom
                width={700}
                height={700}
                tool={'auto'}
                style={{'position': 'absolute'}}
                toolbarPosition={'none'}
                miniaturePosition ={'none'}
                background={'white'}
                detectAutoPan={false}
                disableDoubleClickZoomWithToolAuto={true}
                >       
                  <svg width={'100%'}
                  height={'100%'}
                  >
                    <defs>
                      <filter id="filter1"    
                      x="-0.10000000000000001"
                      y="-0.10000000000000001">
                        <feBlend in="SourceGraphic" in2="blurOut" mode="lighten" />
                      </filter>
                    </defs>
                    <g transform={"translate(20,350)"}
                    filter="url(#filter1)">
                      {this.props.stateIsNowProp.treeData[0][1]} 
                      {this.props.stateIsNowProp.treeData[0][0]}                  
                    </g>
                  </svg> 
                </ReactSVGPanZoom>   
            </div>
          </div>
        <div id="panel" style={{"float": "right"}}>

          <Details id="detailsPanel"
          compAddress={compAddress}
          compName={compName}
          state={state}
          props={props}
          style={{"float": "right"}}
          />

          <Assertions 
          compAddress={compAddress}
          compName={compName}
          state={state}
          props={props}
          style={{"float": "right"}}
          saveActionAssertion={this.props.saveActionAssertion}
          saveTestAssertion={this.props.saveTestAssertion}
          style={{"float": "right"}}
          {...this.props} 
          />  

          {/* <AssertionsList {...this.props}/>   */}
        </div>

        </div>
        )
      }
    }

}

export default ReactTree;
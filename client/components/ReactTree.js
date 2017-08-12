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
        }
    });

    // send assertions to webpage panel -> backgroundjs
    self.backgroundPageConnection.postMessage({
      type: 'assertion',
      message: 'hello from d3tree js'
    });

  }

  render() {
      console.log('renderman', this.props.stateIsNowProp.toggleAssertion);
      if (this.props.stateIsNowProp.toggleAssertion) {
        this.props.toggleAssertionBlock();
        console.log('inside toggle');
        this.backgroundPageConnection.postMessage({
          type: 'assertion',
          message: this.props.stateIsNowProp.assertionList[this.props.stateIsNowProp.assertionList.length - 1]
        });
      }
      let compAddress;
      let compName; 
      if(Object.keys(this.props.stateIsNowProp.nodeData).length === 0) {
        compAddress = '';
        compName = '';
      } else {
        if(this.props.stateIsNowProp.nodeData[0][2] !== compAddress)
        compAddress = this.props.stateIsNowProp.nodeData[0][2];
        compName = this.props.stateIsNowProp.nodeData[0][3];
      }
      
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
        stateKey = this.props.stateIsNowProp.nodeData[0][0][0][0];
        stateValue = this.props.stateIsNowProp.nodeData[0][0][1][0];
        propKey = this.props.stateIsNowProp.nodeData[0][0][1][0];
        propValue = this.props.stateIsNowProp.nodeData[0][1][1][0];

        // console.log('stateKey', this.props.stateIsNowProp.nodeData[0][0][0])
        // console.log('stateValue' , this.props.stateIsNowProp.nodeData[0][1][0])
        // console.log('propKey' , this.props.stateIsNowProp.nodeData[0][1][0])
        // console.log( 'propValue' , this.props.stateIsNowProp.nodeData[1][1][0])

      }

    if (Object.keys(this.props.stateIsNowProp.treeData).length === 0) {
        return (<h1>Waiting for Data</h1>)
    } else {
        return (

        <div>

         <ReactSVGPanZoom
          width={700}
          height={700}
          tool={'auto'}
          style={{'position': 'absolute'}}
          toolbarPosition={'none'}
          miniaturePosition ={'none'}
          background={'white'}
          > 
              <svg width={'100%'}
              height={'100%'}>
                  <g transform={"translate(20,0)"}>
                    {this.props.stateIsNowProp.treeData[0][1]} 
                    {this.props.stateIsNowProp.treeData[0][0]} 
                    
                  </g>
              </svg> 
        </ReactSVGPanZoom>    

        <div id="panel" style={{"float": "right"}}>

          <Details 
          compAddress={compAddress}
          compName={compName}
          stateKey={stateKey}
          stateValue={stateValue}
          propKey={propKey}
          propValue={propValue}
          style={{"float": "right"}}
          />

          <Assertions 
          compAddress={compAddress}
          compName={compName}
          stateKey={stateKey}
          stateValue={stateValue}
          propKey={propKey}
          propValue={propValue}
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
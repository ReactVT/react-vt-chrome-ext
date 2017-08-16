import React, { Component } from 'react';
import { render } from 'react-dom';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import { SortablePane, Pane } from 'react-sortable-pane';
import Nodes from './Nodes.js';
import Links from './Links.js';
import Details from '../components/Details';
import Assertions from '../components/Assertions';
import AssertionsList from './AssertionsList.js';
import Results from '../components/Results.js';

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
        if (data.type === 'virtualdom') {
          self.props.loadTreeData(data.data.virtualDom);
          self.props.loadNodeStore(data.data.nodeStore);
          if (self.props.stateIsNowProp.selectedNode) {
            let newNode = self.props.stateIsNowProp.selectedNode
            const obj = {'state': newNode.props.state, 'props': newNode.props.props, 'name': newNode.props.name, 'address': newNode.props.address}; 
            self.props.getNodeData(obj);
          }
        }
        if (data.type === 'test-result') {
          self.props.loadResults(data.data);
          console.log('d3 received results from content script', data.data);
        }
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
      
    if (Object.keys(this.props.stateIsNowProp.treeData).length === 0) {
        return (<h1>Waiting for Data</h1>)
    } else {
        return (
   <div>
      <SortablePane
        direction="horizontal" 
        isSortable={false}
        disableEffect={false} 
      >
          <Pane id={1} key={1} width={300} height="100%">
            <Details
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
            < Results
            state={state}
            props={props}
            {...this.props}
            />
          </Pane> 

          <Pane id={0} key={0} width={1000} height="100%" >
            <ReactSVGPanZoom
            width={1000}
            height={'100vh'}
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
        </Pane>
      </SortablePane>
    </div>
        )
      }
    }

}

export default ReactTree;
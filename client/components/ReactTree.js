import React, { Component } from 'react';
import { render } from 'react-dom';
import {ReactSVGPanZoom, setPointOnViewerCenter} from 'react-svg-pan-zoom';
import { SortablePane, Pane } from 'react-sortable-pane';
import { Dropdown, Loader } from 'semantic-ui-react'
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
    this.pageName = document.title;
  }

  sendAsserts() {
    const loadedAsserts = localStorage.getItem(this.pageName);
    if (loadedAsserts) {
      this.props.loadAssertionList(JSON.parse(loadedAsserts));
      this.backgroundPageConnection.postMessage({
        type: 'assertion',
        message: JSON.parse(loadedAsserts), 
        flag: 'onload'
      });
    }
  }

  componentWillMount() {
    const self = this;
    let checkContainer;
    // Create a connection to the background page
    self.backgroundPageConnection = chrome.runtime.connect({
        name: "panel"
    });
    this.props.setBackgroundConnection(self.backgroundPageConnection);
    this.sendAsserts();
    // send tabId to backgroundjs to establish connection
    self.backgroundPageConnection.postMessage({
      name: 'panelToBackgroundInit',
      tabId: chrome.devtools.inspectedWindow.tabId
    });

    // Listens for messages from backgroundjs to get the parsed dom tree
    self.backgroundPageConnection.onMessage.addListener(function(data) {
      if (data.type === 'virtualdom') {
        // check for react-router incompatibility
        if (data.data.virtualDom === 'reactRouter') self.props.reactRouter();
        else {
          self.props.noError();
          self.props.setAppName(data.topNode);
          // check for first traversal to accomodate app refreshes
          if (data.first === true) {
            // clear last result
            self.props.clearResults();
            // clear results from blocks and asserts in list
            self.props.clearResultsFromList();
            self.props.firstLoad();
            self.sendAsserts();
          } else self.props.notFirstLoad();

          self.props.loadTreeData(data.data.virtualDom);
          self.props.loadNodeStore(data.data.nodeStore);
          if (self.props.stateIsNowProp.selectedItem.debugId !== null) {
            checkContainer = []
            self.props.stateIsNowProp.treeData[0][0].map(function (d, i) {
              checkContainer.push(d.props.debugId)
                if(d.props.debugId === self.props.stateIsNowProp.selectedItem.debugId) {
                  const obj = {'state': d.props.state, 'props': d.props.props, 'name': d.props.name, 'address': d.props.address, 'debugId': d.props.debugId}; 
                  self.props.getNodeData(obj);
                } 
                if(i === self.props.stateIsNowProp.treeData[0][0].length-1 && !checkContainer.includes(self.props.stateIsNowProp.selectedItem.debugId)) {
                  self.props.removeSelectedNode();  
                }
            });
          }
        }
      }
        if (data.type === 'test-result') {
          let resultObj = data.data;
          self.props.loadResults(resultObj);
          // Affect assertionList reducer to update results within the block
          self.props.saveResultToBlock(resultObj.assertionBlock, resultObj.assertID, resultObj.result, resultObj.actual);
        }
    });
    

  }

  render() {

    if (this.props.stateIsNowProp.toggleAssertion) {
      this.props.toggleAssertionBlock();
      this.backgroundPageConnection.postMessage({
        type: 'assertion',
        message: this.props.stateIsNowProp.assertionList[this.props.stateIsNowProp.assertionList.length - 1]
      });
      }
      
      //Old way of getting details showing up, let's have this logic in the details component, not here
      let compAddress = this.props.stateIsNowProp.nodeData.address; 
      let compName = this.props.stateIsNowProp.nodeData.name; 
      let props = this.props.stateIsNowProp.nodeData.props; 
      let state = this.props.stateIsNowProp.nodeData.state;
    if (this.props.stateIsNowProp.error === 'reactRouter') {
      return (
      <div id="waiting">
      <p>React Router is currently unsupported. If you would like to voice your interest for this feature, please create an issue on our <a href="https://github.com/ReactVT/react-vt" target="_blank">GitHub repository</a>.</p>
      </div>);
    } else if (Object.keys(this.props.stateIsNowProp.treeData).length === 0) {
        return (<div id="waiting">
            <h1><Loader active inline /> Waiting for Data</h1>
            <p>If this is taking more than a few seconds, try refreshing your React application or referring back to the set up instructions and ensure each step has been followed. Full documentation and bug reporting can found <a href="https://github.com/ReactVT/react-vt" target="_blank">here</a>.</p>
            <p>* Note that react-router and Next.js are currently unsupported.</p>
            <br />
            <img src="setup.png" alt="Set Up" />
          </div>);
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
            style={{"float": "right"}}
            />
            <Assertions 
            viewMode={this.props.stateIsNowProp.viewMode}
            style={{"float": "right"}}
            saveActionAssertion={this.props.saveActionAssertion}
            saveTestAssertion={this.props.saveTestAssertion}
            style={{"float": "right"}}
            />  
            <Results />
          </Pane> 

          <Pane id={0} key={0} width={1000} height="100%" >

            <ReactSVGPanZoom
            ref={Viewer => this.Viewer = Viewer}
            width={'100vw'}
            height={'100vh'}
            tool={'auto'}
            style={{'position': 'absolute'}}
            toolbarPosition={'none'}
            miniaturePosition ={'none'}
            background={'white'}
            detectAutoPan={false}
            disableDoubleClickZoomWithToolAuto={true}
            >       
              <svg 
              width={"100%"}
              height={"100%"}
              >

                <g transform={"translate(30,308) scale(0.8)"}>
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
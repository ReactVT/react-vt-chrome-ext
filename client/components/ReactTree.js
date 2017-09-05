import React, { Component } from 'react';
import { render } from 'react-dom';
import {ReactSVGPanZoom, setPointOnViewerCenter} from 'react-svg-pan-zoom';
import { SortablePane, Pane } from 'react-sortable-pane';
import { Dropdown, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Nodes from './Nodes.js';
import Links from './Links.js';
import Details from '../components/Details';
import Assertions from '../components/Assertions';
import AssertionsList from './AssertionsList.js';
import Results from '../components/Results.js';

const mapStateToProps = store => ({
  selectedItem: store.selectedItem,
  treeData: store.treeData, 
  toggleAssertion: store.toggleAssertion,  
  assertionList: store.assertionList, 
  nodeData: store.nodeData, 
  error: store.error, 
  viewMode: store.viewMode,

});

const mapDispatchToProps = (dispatch) => ({

  loadAssertionList: (asserts) => {
    dispatch(actionCreators.loadAssertionList(asserts));
  },
  setBackgroundConnection: (address) => {
    dispatch(actionCreators.setBackgroundConnection(address));
  },
  toggleAssertionBlock: () => {
    dispatch(actionCreators.toggleAssertionBlock());
  },
  noError: () => {
    dispatch(actionCreators.noError());
  },
  setAppName: (node) => {
    dispatch(actionCreators.setAppName(node));
  },
  clearResults: () => {
    dispatch(actionCreators.clearResults());
  },
  clearResultsFromList: () => {
    dispatch(actionCreators.clearResultsFromList());
  },
  firstLoad: () => {
    dispatch(actionCreators.firstLoad());
  },
  notFirstLoad: () => {
    dispatch(actionCreators.notFirstLoad());
  },
  loadTreeData: (data) => {
    dispatch(actionCreators.loadTreeData(data));
  },
  loadNodeStore: (data) => {
    dispatch(actionCreators.loadNodeStore(data));
  },
  removeSelectedNode: (data) => {
    dispatch(actionCreators.loadNodeStore(data));
  },
  loadResults: (data) => {
    dispatch(actionCreators.loadResults(data));
  },
  saveResultToBlock: (block, id, result, actual) => {
    dispatch(actionCreators.saveResultToBlock(block, id, result, actual));
  },
  getNodeData: (obj) => {
    dispatch(actionCreators.getNodeData(obj));
  },
}); 

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
    this.backgroundPageConnection.postMessage({
      name: 'panelToBackgroundInit',
      tabId: chrome.devtools.inspectedWindow.tabId
    });

    // Listens for messages from backgroundjs to get the parsed dom tree
    this.backgroundPageConnection.onMessage.addListener(function(data) {
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
          if (self.props.selectedItem.debugId !== null) {
            checkContainer = []
            self.props.treeData[0][0].map(function (d, i) {
              checkContainer.push(d.props.debugId)
                if(d.props.debugId === self.props.selectedItem.debugId) {
                  const obj = {'state': d.props.state, 'props': d.props.props, 'name': d.props.name, 'address': d.props.address, 'debugId': d.props.debugId}; 
                  self.props.getNodeData(obj);
                } 
                if(i === self.props.treeData[0][0].length-1 && !checkContainer.includes(self.props.selectedItem.debugId)) {
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

    if (this.props.toggleAssertion) {
      this.props.toggleAssertionBlock();
      this.backgroundPageConnection.postMessage({
        type: 'assertion',
        message: this.props.assertionList[this.props.assertionList.length - 1]
      });
      }
      
    if (this.props.error === 'reactRouter') {
      return (
      <div id="waiting">
      <p>React Router is currently unsupported. If you would like to voice your interest for this feature, please create an issue on our <a href="https://github.com/ReactVT/react-vt" target="_blank">GitHub repository</a>.</p>
      </div>);
    } else if (Object.keys(this.props.treeData).length === 0) {
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
            viewMode={this.props.viewMode}
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
                  {this.props.treeData[0][1]} 
                  {this.props.treeData[0][0]}                  
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

export default connect(mapStateToProps, mapDispatchToProps)(ReactTree);
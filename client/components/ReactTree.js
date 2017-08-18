import React, { Component } from 'react';
import { render } from 'react-dom';
import {ReactSVGPanZoom, setPointOnViewerCenter} from 'react-svg-pan-zoom';
import { SortablePane, Pane } from 'react-sortable-pane';
import { Dropdown } from 'semantic-ui-react'
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
    // this.onResize = this.onResize.bind(this)
    // this.state = { screenWidth: screen.width, screenHeight: screen.height }
  }

  sendAsserts() {
    const loadedAsserts = localStorage.getItem("asserts");
    if (loadedAsserts) {
      this.props.loadAssertionList(JSON.parse(loadedAsserts));
      console.log('in assert to be sent back', loadedAsserts);
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
        console.log('d3tree received message from content script', data);
        if (data.type === 'virtualdom') {
          // check for first traversal to accomodate app refreshes
          if (data.first === true) {
            self.sendAsserts();
            // clear last result
            self.props.clearResults();
            // clear results from blocks and asserts in list
            self.props.clearResultsFromList();
            self.props.firstLoad();
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
            })
          }
        }
        if (data.type === 'test-result') {
          let resultObj = data.data;
          self.props.loadResults(resultObj);
          // Affect assertionList reducer to update results within the block
          self.props.saveResultToBlock(resultObj.assertionBlock, resultObj.assertID, resultObj.result);
          console.log('d3 received results from content script', data.data);
        }
    });
    
    // window.addEventListener('resize', this.onResize, false)
    // this.onResize()
  }

//   onResize() {
//     console.log('this.state BEFORE', this.state)
//     this.setState({ screenWidth: screen.width,
//         screenHeight: screen.height})
//         console.log('this.state AFTER', this.state)
//   }

// search() {
//   let inputVal = this.refs.input.value
  
//   let svgBox = this.Viewer
//   let self = this

//   let searchCollection = []
  
//   this.props.stateIsNowProp.treeData[0][0].map(function (d, i) {

//     if(d.props.name === inputVal) {
//       let xCoord = d.props.ytranslate + 100
//       let yCoord = d.props.xtranslate + 360
//       let node = d
//       let obj = {'state': d.props.state, 'props': d.props.props, 'name': d.props.name, 'address': d.props.address}; 

//       searchCollection.push(
//         <Dropdown.Item key={i} onClick={() => 
//           {svgBox.setPointOnViewerCenter(xCoord, yCoord, 4);
//           self.props.getNodeData(obj);}
//           } 
//         text ={d.props.name}/>)}
    
//   })

//   this.props.createSearchButtons(searchCollection)
// }

  render() {
    // let arraySearchButtons;

    // if (Object.keys(this.props.stateIsNowProp.searchButton).length === 0) arraySearchButtons = ''
    // else arraySearchButtons = this.props.stateIsNowProp.searchButton

    if (this.props.stateIsNowProp.toggleAssertion) {
      this.props.toggleAssertionBlock();
      console.log('inside toggle');
      this.backgroundPageConnection.postMessage({
        type: 'assertion',
        message: this.props.stateIsNowProp.assertionList[this.props.stateIsNowProp.assertionList.length - 1]
      });
      }
      
      //Old way of getting details showing up, let's have this logic in the details component, not here
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
            style={{"float": "right"}}
            {...this.props}
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
             {/* <input type="text" ref="input" />
            <input
            type="button"
            value="Search"
            onClick={()=>this.search()} 
            />  */}
          {/* 
            <Dropdown text='Available Components'>
              <Dropdown.Menu>
              {arraySearchButtons}
              </Dropdown.Menu>
            </Dropdown> */}

            <ReactSVGPanZoom
            ref={Viewer => this.Viewer = Viewer}
            width={1500}
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
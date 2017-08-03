import React, { Component } from 'react';
import { render } from 'react-dom';
import Tree from 'react-d3-tree';

class ReactTree extends Component {

  componentDidMount() {
    let self = this;
    // Create a connection to the background page
    const backgroundPageConnection = chrome.runtime.connect({
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
          const treeData = [];
          treeData.push(data.data);
          console.log(JSON.stringify(treeData))
          console.log('object treedata: ', treeData);
          console.log('react frontend props', self.props);
         self.props.getTreeData(treeData);
        }
    });

    // send assertions to webpage panel -> backgroundjs
    backgroundPageConnection.postMessage({
      type: 'assertion',
      message: 'hello from d3tree js'
    });
  }

  render() {     
        // document.addEventListener('click', () => {
        //   this.props.getTreeData(this.props.stateIsNowProp.treeData)
        //   console.log('this.props after action', this.props)
        // });


console.log('this.props.stateIsNowProp.treeData: ', this.props.stateIsNowProp.treeData)
    if(Object.keys(this.props.stateIsNowProp.treeData).length === 0) {
      return (<h1>Waiting for Data</h1>)
    }
    else{
       return(
        <div>
          <h1> React VT</h1>
          <div>NEW BUNDLE HERE</div>
          <div id="treeWrapper" style={{width: '1000px', height: '1000px'}}>
             <Tree data={this.props.stateIsNowProp.treeData} /> 
          </div> 
        </div> 
      )
    }
  }
};

export default ReactTree;

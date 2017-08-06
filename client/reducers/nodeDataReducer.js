import React, { Component } from 'react';

import KeyContainer from '../components/KeyContainer';
import KeyInformation from '../components/KeyInformation';

import ValueContainer from '../components/ValueContainer';
import ValueInformation from '../components/ValueInformation';


function nodeDataReducer(state = [], action) {
  switch(action.type) {
    case 'GET_NODE_DATA':

    let nodeState = action.payload.state;
    let nodeProp = action.payload.props;

    if(nodeState === null || nodeState === undefined) nodeState = {'Not State Available': 'Nothing to see here'}
    if(nodeProp === null || nodeProp === undefined) nodeProp = {'Not PropAvailable': 'Nothing to see here'}
  
    return [nodeStateData(nodeState), nodePropData(nodeProp)]
      
    default:
      return state;
  }
}

//     STATE             PROP
// [[[key][value]] | [[key][value]]]

function nodeStateData(nodeState) {
  let stateInformation = combineKeyAndState(nodeState)
  return stateInformation
}

function nodePropData(nodeProp) {
  let propInformation = combineKeyAndState(nodeProp)
  return propInformation
}

function combineKeyAndState(stateprop){
  const combinedInformation = []
  const allTheKey = []
  const allTheValue = []

  Object.keys(stateprop).map(function (d, i) {
    return (allTheKey.push(<KeyContainer
      textVal = {d}
    />)) 
  })
  Object.values(stateprop).map(function (d, i) {
    return (allTheValue.push(<ValueContainer
      textVal = {JSON.stringify(d)}
    />)) 
  })

  combinedInformation.push(allTheKey)
  combinedInformation.push(allTheValue)

  return combinedInformation
}


export default nodeDataReducer;


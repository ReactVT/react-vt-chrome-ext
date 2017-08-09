import React, { Component } from 'react';

import KeyInformation from '../components/KeyInformation';

import ValueInformation from '../components/ValueInformation';


function nodeDataReducer(state = [], action) {
  switch(action.type) {
    case 'GET_NODE_DATA':

    let nodeState = action.payload.state;
    let nodeProp = action.payload.props;

    if(nodeState === null || nodeState === undefined) nodeState = {'Not State Available': 'Nothing to see here'}
    if(nodeProp === null || nodeProp === undefined) nodeProp = {'Not PropAvailable': 'Nothing to see here'}

    let insertNewItem = [nodeStateData(nodeState), nodePropData(nodeProp), action.payload.address, action.payload.name]
    let updateArray = state.slice()
    updateArray.splice(0,1, insertNewItem)

    return updateArray
      
    default:
      return state;
  }
}

//     STATE             PROP
// [[[key][value]] | [[key][value]]]

function nodeStateData(nodeState) {
  let stateInformation = combineKeyAndValue(nodeState)
  return stateInformation
}

function nodePropData(nodeProp) {
  let propInformation = combineKeyAndValue(nodeProp)
  return propInformation
}

function combineKeyAndValue(stateprop){
  const combinedInformation = []
  const allTheKey = []
  const allTheValue = []

  Object.keys(stateprop).map(function (d, i) {
    return (allTheKey.push(<KeyInformation
      textInfo = {d}
    />)) 
  })
  Object.values(stateprop).map(function (d, i) {
    return (allTheValue.push(<ValueInformation
      textInfo = {JSON.stringify(d)}
    />)) 
  })

  combinedInformation.push(allTheKey)
  combinedInformation.push(allTheValue)

  return combinedInformation
}


export default nodeDataReducer;


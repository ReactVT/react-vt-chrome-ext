import React, { Component } from 'react';

import KeyInformation from '../components/KeyInformation';

import ValueInformation from '../components/ValueInformation';


function nodeDataReducer(state = {'state': null, 'props': null, 'address': null, 'name': null}, action) {
  switch(action.type) {
    case 'GET_NODE_DATA':
      let newState = Object.assign({}, state); 
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}

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


import React, { Component } from 'react';

function selectedItemReducer(state = {type: 'none', node: null, assert: {}}, action) {
  switch(action.type) {
    case 'SELECTED_NODE':
      return {type: 'node', node: action.payload, assert: {}};
    case 'SELECTED_ACTION':
      return {type: 'action', node: null, assert: action.payload}; 
    case 'SELECTED_TEST':
      return {type: 'test', node: null, assert: action.payload};  
    default:
      return state;
  }
}



export default selectedItemReducer;


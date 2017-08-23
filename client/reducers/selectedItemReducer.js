import React, { Component } from 'react';

function selectedItemReducer(state = {type: 'none', node: null, assert: {}, debugId: null}, action) {
  switch(action.type) {
    case 'SELECTED_NODE':
      return {type: 'node', node: action.payload, assert: {}, debugId: action.debugId};
    case 'SELECTED_ACTION':
      return {type: 'action', node: null, assert: action.payload}; 
    case 'SELECTED_TEST':
      return {type: 'test', node: null, assert: action.payload};  
    case 'REMOVE_SELECTED_NODE':
      return {type: 'none', node: null, assert: {}, debugId: null};  
    default:
      return state;
  }
}



export default selectedItemReducer;


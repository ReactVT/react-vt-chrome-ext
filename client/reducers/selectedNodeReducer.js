import React, { Component } from 'react';

function selectedNodeReducer(state = null, action) {
  switch(action.type) {
    case 'SELECTED_NODE':
      console.log('in selected node reducer')
      let newState = Object.assign({}, state); 
      newState = action.ref; 
      return newState; 
    default:
      return state;
  }
}



export default selectedNodeReducer;


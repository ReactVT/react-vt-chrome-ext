import React, { Component } from 'react';

function toggleAssertionBlockReducer(state = false, action){
  switch(action.type) {
    case 'NEW_ASSERTION_BLOCK_TOGGLE':
      let newState = state; 
      newState = !newState; 
      return newState; 
    default:
      return state;
  }
}

export default toggleAssertionBlockReducer;

import React, { Component } from 'react';

function assertionBlockReducer(state = { name: '', asserts: [] }, action) {
  let newState;
  // console.log('in assertion block reducer');
  switch(action.type) {
    case 'NEW_ASSERTION_BLOCK':
      newState = Object.assign({}, state);
      newState.name = action.name;
      newState.asserts = [];
      return newState;
    case 'SAVE_ASSERTION':
      newState = Object.assign({}, state);
      newState.asserts = state.asserts.slice();
      newState.asserts.push(action.payload);
      return newState;  
    case 'DELETE_ASSERTION':
      newState = Object.assign({}, state);
      newState.asserts = state.asserts.slice();
      for (let i = 0; i < newState.asserts.length; i += 1) {
        if (newState.asserts[i].assertID === action.id) {
          newState.asserts.splice(i, 1);
          break;
        }
      }
      return newState;
    case 'SEND_ASSERTION_BLOCK':
      updateArray = state.slice()
      updateArray.splice(0,1, action.payload)
      console.log('SEND_ASSERTION_BLOCK', updateArray)
      return updateArray
    case 'EMPTY_ASSERTION_BLOCK':
      updateArray = []
      return updateArray
    default:
      return state;
  }
}

export default assertionBlockReducer;

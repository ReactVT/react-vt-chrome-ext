import React, { Component } from 'react';

function assertionBlockReducer(state = { name: '', passed: '', asserts: [] }, action) {
  let newState;
  // console.log('in assertion block reducer');
  switch(action.type) {
    case 'NEW_ASSERTION_BLOCK':
      newState = Object.assign({}, state);
      newState.name = action.name;
      newState.passed = '';
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
    default:
      return state;
  }
}

export default assertionBlockReducer;

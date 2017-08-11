import React, { Component } from 'react';

function assertionListReducer(state = [], action){
  let newState;
  switch(action.type) {
    case 'ADD_ASSERTION_TO_LIST':
      newState = state.slice();
      newState.push(action.payload);
      return newState;
    case 'DELETE_ASSERTION_BLOCK':
      newState = state.slice();
      console.log('before', state, newState);
      for (let i = 0; i < newState.length; i += 1) {
        if (newState[i].name === action.name) {
          console.log('delete', action.name);
          newState.splice(i, 1);
          break;
        }
      }
      console.log('after', newState);
      return newState;
    default:
      return state;
  }
}

export default assertionListReducer


import React, { Component } from 'react';

function assertionListReducer(state = [], action){
  let newState;
  switch(action.type) {
    case 'ADD_ASSERTION_TO_LIST':
      newState = state.slice();
      newState.push(action.payload);
      localStorage.setItem("asserts", JSON.stringify(newState));
      return newState;
    case 'LOAD_ASSERTION_LIST': 
      return action.payload;
    case 'SAVE_RESULT_TO_BLOCK':
      newState = state.slice();
      // iterate through each block
      for (let i = 0; i < newState.length; i += 1) {
        if (newState[i].name === action.name) {
          // iterate through block's asserts and cross-reference with results
          // if all asserts have a matching result of true, assign block passed to true
          let allPass = true;
          for (let j = 0; j < newState[i].asserts.length; j += 1) {
            const assertion = newState[i].asserts[j];
            // save result to assertion with matching action.id
            if (assertion.assertID === action.id) assertion.passed = action.result;
            // check if assert's result property is false or blank
            if (assertion.passed === false) {
              allPass = false;
              newState[i].passed = false;
              break;
            } else if (assertion.passed === '') {
              allPass = false;
            }
          }
          // otherwise block has passed
          if (allPass === true) newState[i].passed = true;
          break;
        }
      }
      console.log('IN SAVE RESULT TO BLOCK', newState);
      return newState;
    case 'DELETE_ASSERTION_BLOCK':
      newState = state.slice();
      for (let i = 0; i < newState.length; i += 1) {
        if (newState[i].name === action.name) {
          newState.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("asserts", JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
}

export default assertionListReducer


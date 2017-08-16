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
          // Save result id - result pair to block
          newState[i].results[action.id] = action.result;
          // iterate through block's asserts and cross-reference with results
          // if all asserts have a matching result of true, assign passed to true
          let allPass = true;
          for (let j = 0; j < newState[i].asserts.length; j += 1) {
            const assertion = newState[i].asserts[j];
            console.log('passed in result', action.result);
            console.log('current assertion', assertion, assertion.assertID);
            if (newState[i].results[assertion.assertID] === false) {
              console.log('in fail conditional', newState[i].results[assertion.assertID])
              allPass = false;
              newState[i].passed = false;
              break;
            } else if (!newState[i].results[assertion.assertID] || newState[i].results[assertion.assertID] === '') {
              allPass = false;
              console.log('in empty conditional', newState[i].results[assertion.assertID]);
            }
          }
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


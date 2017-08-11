import React, { Component } from 'react';

import BlocksContainer from './../components/BlocksContainer';

function assertionListReducer(state = [], action){
  let newState;
  switch(action.type) {
    case 'ADD_ASSERTION_TO_LIST':
      newState = state.slice();
      newState.push(action.payload);
      return newState;
    case 'DELETE_ASSERTION_LIST':
      console.log('DELETE ASSERTION LIST', [...state.slice(0, action.payload), ...state.slice(action.payload+1)]  )
      return [...state.slice(0, action.payload), ...state.slice(action.payload+1)]   
    default:
      return state;
  }
}

export default assertionListReducer


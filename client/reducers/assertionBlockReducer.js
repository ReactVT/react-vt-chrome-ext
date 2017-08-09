import React, { Component } from 'react';

function assertionBlockReducer(state = [], action) {
  switch(action.type) {
    case 'SAVE_ASSERTION_BLOCK':
    console.log('action.payload in asserion BLOCK',action.payload)
      let updateArray = state.slice()
      updateArray.push(action.payload)
      return updateArray
    case 'SEND_ASSERTION_BLOCK':
      updateArray = state.slice()
      updateArray.splice(0,1, action.payload)
      console.log('SEND_ASSERTION_BLOCK', updateArray)
      return updateArray
    case 'DELETE_ASSERTION_BLOCK':
      console.log('DELETE ASSERTION BLOCK', [...state.slice(0, action.payload), ...state.slice(action.payload+1)]  )
      return [...state.slice(0, action.payload), ...state.slice(action.payload+1)]   
    case 'EMPTY_ASSERTION_BLOCK':
      updateArray = []
      return updateArray
    default:
      return state;
  }
}

export default assertionBlockReducer;

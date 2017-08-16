import React, { Component } from 'react';

function searchButtonReducer(state = [], action) {
  switch(action.type) {
    case 'SEARCH_BUTTON':
      let updateArray = state.slice()
      updateArray.splice(0,1, action.payload)
      return updateArray
    default:
      return state;
  }
}

export default searchButtonReducer;

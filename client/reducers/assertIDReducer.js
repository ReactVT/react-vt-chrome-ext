import React, { Component } from 'react';

function assertIDReducer(state = 1, action) {
  let newState;
  switch(action.type) {
    case 'INCREMENT_ASSERT_ID':
      newState = state;
      newState += 1;
      return newState;
      break;
    case 'RESET_ASSERT_ID':
      return 1;
      break;
    default:
      return state;
  }
}

export default assertIDReducer;
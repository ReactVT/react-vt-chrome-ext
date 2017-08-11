import React, { Component } from 'react';

function testModeReducer(state = 'test1', action) {
  switch(action.type) {
    case 'RENDER_TEST1_MODE':
      return 'test1';
      break;
    case 'RENDER_TEST2_MODE':
      return 'test2';
      break;
    case 'RENDER_TEST3_MODE':
      return 'test3';
      break;
    default:
      return state;
  }
}

export default testModeReducer;

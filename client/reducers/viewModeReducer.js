import React, { Component } from 'react';

function viewModeReducer(state = 'viewBlocks', action) {
  switch(action.type) {
    case 'RENDER_EDIT_BLOCK':
      return 'editBlock';
      break;
    case 'RENDER_ACTION_MENU':
      return 'actionMenu';
      break;
    case 'RENDER_TEST_MENU':
      return 'testMenu';
      break;
    case 'RENDER_VIEW_BLOCKS':
      return 'viewBlocks';
      break;
    default:
      return state;
  }
}

export default viewModeReducer;
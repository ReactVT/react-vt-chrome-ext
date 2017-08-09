import React, { Component } from 'react';

import BlocksContainer from './../components/BlocksContainer';

function assertionListReducer(state = [], action){
  switch(action.type) {
    case 'ADD_ASSERTION_TO_LIST':
      let updateArray = state.slice()
      let info = action.payload
      updateArray.push(<BlocksContainer
        blockInfo = {JSON.stringify(action.payload)}
        key={updateArray.length}
        id={updateArray.length}
      />
    )
    console.log('ASSERTION LIST REDUCER',updateArray)
      return updateArray
    case 'DELETE_ASSERTION_LIST':
      console.log('DELETE ASSERTION LIST', [...state.slice(0, action.payload), ...state.slice(action.payload+1)]  )
      return [...state.slice(0, action.payload), ...state.slice(action.payload+1)]   
    default:
      return state;
  }
}

export default assertionListReducer


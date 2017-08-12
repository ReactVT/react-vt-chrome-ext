import React, { Component } from 'react';

function selectedColorReducer(state = 
      {'fill': 'ff5e55',
      'stroke': 'steelblue', 
      'strokeWidth': '4px'}, action) {
      return state;
  }

export default selectedColorReducer;

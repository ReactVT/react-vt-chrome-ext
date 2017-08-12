import React, { Component } from 'react';

function globalColorReducer(state = 
      {'fill': '#fff',
      'stroke': 'steelblue', 
      'strokeWidth': '4px'}, action) {
      return state;
  }

export default globalColorReducer;

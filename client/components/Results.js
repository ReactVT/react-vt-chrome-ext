import React, { Component } from 'react';
import { render } from 'react-dom';
import { List, Icon } from 'semantic-ui-react';

class Results extends Component {
  constructor(props) {
    super(props);
    // keep source render here since logic is in componentWillMount
    this.results = [];
    this.passCount = 0;
    this.failCount = 0;
    this.lastResult;
  }
  
  componentDidUpdate() {
    let resultScroll = document.getElementById('results-panel');
    resultScroll.scrollTop = resultScroll.scrollHeight;
  }

  render () {
    let resultRender = 'Waiting for test results..';
    let resultsCountRender = [];
    let currentResult = this.props.stateIsNowProp.testResults;
    let actual;
    
    if (currentResult.actual && typeof currentResult.actual === 'string') actual = currentResult.actual;
    else if (currentResult.actual) actual = JSON.stringify(currentResult.actual);

    // Clear terminal if a refresh was triggered
    if (this.props.stateIsNowProp.firstLoad === true) {
      this.results = [];
      this.passCount = 0;
      this.failCount = 0;
      this.lastResult = '';
      resultRender = 'Waiting for test results..';
    }

    if (!this.lastResult || (this.lastResult !== currentResult)) {
      this.lastResult = currentResult;
      // if action is performed
      if (currentResult.result === true && currentResult.comparator === 'action') {
        this.results.push(
          <List.Item>
            <List.Icon name="arrow right" color='blue' />
         ID{currentResult.assertID} Action from {currentResult.assertionBlock} was performed
</List.Item>);
        // if test passes
      } else if (currentResult.result === true) {
        this.passCount += 1;        
        this.results.push(
          <List.Item>
          <List.Icon name="checkmark" color='green' />
         ID{currentResult.assertID} Test from {currentResult.assertionBlock} passed with '{actual}'
</List.Item>);
      // if test fails
    } else if (currentResult.result === false) {
      this.failCount += 1;
      this.results.push(<List.Item style={{'color':'red'}}>
         FAILED: ID{currentResult.assertID} Test from {currentResult.assertionBlock} expected '{actual}' to be '{currentResult.expected}'
        </List.Item>);
      }
    }

    if (this.results.length > 0) {
      resultRender = this.results;
      resultsCountRender.push(<div id="pass-fail" style={{'color': 'green'}}>{this.passCount} passing </div>);
      resultsCountRender.push(<div style={{'color': 'red'}} id="pass-fail">{this.failCount} failing </div>);
    }
    return (
      <div id="results-panel">
        <List id='results-list'>
          {resultRender}
        </List>
        <br />
          {resultsCountRender}
      </div>
    );
  }
};

export default Results;

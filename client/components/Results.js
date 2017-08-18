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
    this.lastResult = this.props.stateIsNowProp.testResults.assertID;
  }
  componentDidUpdate() {
    let resultScroll = document.getElementById('results-panel');
    resultScroll.scrollTop = resultScroll.scrollHeight;

  }
  render () {
    console.log('come on ', this.props.stateIsNowProp.testResults.result)
    let resultRender = 'Waiting for test results..';
    let resultsCountRender = [];
    let currentResult = this.props.stateIsNowProp.testResults;
    if (this.results.length > 0) {
      resultRender = this.results;
      resultsCountRender.push(<div id="pass-fail" style={{'color': 'green'}}>{this.passCount} passing </div>);
      resultsCountRender.push(<div style={{'color': 'red'}} id="pass-fail">{this.failCount} failing </div>);
    }

    if (this.lastResult !== currentResult.assertID) {
      this.lastResult = currentResult.assertID;
      // if action is performed
      if (currentResult.result === true && currentResult.comparator === 'action') {
        this.results.push(
        <List.Item>
         ID{currentResult.assertID} Action from {currentResult.assertionBlock} was performed
</List.Item>);
        // if test passes
      } else if (currentResult.result === true) {
        this.passCount += 1;        
        this.results.push(
        <List.Item>
          <List.Icon name="checkmark" color='green' />
         ID{currentResult.assertID} Test from {currentResult.assertionBlock} passed with '{currentResult.actual}'
</List.Item>);
      // if test fails
      } else if (currentResult.result === false) {
        this.failCount += 1;
        this.results.push(<List.Item style={{'color':'red'}}>
         FAILED: ID{currentResult.assertID} Test from {currentResult.assertionBlock} expected '{currentResult.actual}' to be '{currentResult.expected}'
        </List.Item>);
      }
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

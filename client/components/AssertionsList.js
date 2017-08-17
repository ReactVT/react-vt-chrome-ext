import React, { Component } from 'react';
import { render } from 'react-dom';
import Blocks from './Blocks';

import KeyInformation from './KeyInformation';
import generateTest from './../enzyme/enzymeTranslate'

import ValueInformation from './ValueInformation';
import { Button, Accordion, Icon, List } from 'semantic-ui-react';

class AssertionsList extends Component {
  
  handleNewAssertionBlock() {
    this.props.renderNameAssertionMode();
  }

  handleDelete(name) {
    this.props.deleteAssertionBlock(name);
    this.props.stateIsNowProp.backgroundConnection.postMessage({
        type: 'assertion',
        message: name, 
        flag: 'delete'
      });
  }

  handleEdit() {
    console.log('edit');
  }

  handleAssertDetailAction(assert) {
    this.props.selectedAction(assert);

  }

  handleAssertDetailTest(assert) {
    this.props.selectedTest(assert);
  }

  saveEnzyme() {
    let text = generateTest(this.props.stateIsNowProp.assertionList, 'App', this.props.stateIsNowProp.nodeStore);
    const data = new Blob([text], {type: 'text/plain'});
    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    const textFile = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.setAttribute('download', 'enzymeTest.js');
    link.href = textFile; 
    document.body.appendChild(link);

    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
      const event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
    });
  }

  render() {
    let assertionlist = [];
    let listArray = this.props.stateIsNowProp.assertionList;
    if (listArray.length > 0) {
      listArray.forEach((block, i) => {
        const assertText = [];
        let styling;
        // Block pass/fail status
        if (block.passed === true) styling = ({'background': 'rgba(76, 175, 80, 0.5)', 'transition': 'all .25s ease-in'});
        else if (block.passed === false) styling = ({'background': 'rgba(255, 0, 0, 0.3)', 'transition': 'all .25s ease-in'});
        else styling = ({'background': '#2f4f5b',
  'color': 'rgba(255,255,255,.6)',
  'transition': 'all .1s ease'});

        assertionlist.push(
            <Accordion.Title style={styling} className='accordion-block'>
              <Icon name='dropdown' />
              { block.name } 
              <Icon name='delete' style={{'float': 'right'}} onClick={() => this.handleDelete(block.name)} />
            </Accordion.Title>);
        // loop through all asserts in block
        block.asserts.forEach((assertion, i)=> {
          let passFailIcon;
          let comparator;
          let classOrId;
          // Pass/Fail status of assertion
          if (assertion.passed === true) passFailIcon = ( <List.Icon className="result-icon" name="checkmark" color='green' /> );
          else if (assertion.passed === false) passFailIcon = (<List.Icon className="result-icon" name="x" color='red' />);
          // Comparator
          if (assertion.type === 'equal') {
            comparator = ('to equal');
          } else if (assertion.type === 'greaterthan') {
            comparator = ('to be greater than');
          } else if (assertion.type === 'lessthan') {
            comparator = ('to be less than');
          } else if (assertion.type === 'notequal') {
            comparator = ('to not equal');
          }

          // ID or class
          if (assertion.selector === 'id') classOrId = ('#');
          else if (assertion.selector === 'class') classOrId = ('.');

          // Action/Test
          if (assertion.type === 'action') {
            assertText.push(<div className='accordion-asserts' onClick={()=>this.handleAssertDetailAction(assertion)} >ID{assertion.assertID} Action: {assertion.event} on {assertion.compName}</div>);
          } else {
            // component
            if (assertion.selector === 'component') {
            assertText.push(<div className='accordion-asserts' onClick={()=>this.handleAssertDetailTest(assertion)}>{ passFailIcon }ID{assertion.assertID} Expect {assertion.selector} {assertion.selectorName} {comparator} {assertion.value}</div>);
            } else if (assertion.selector === 'id' || assertion.selector === 'class') {
              // class or id
              assertText.push(<div className='accordion-asserts' onClick={()=>this.handleAssertDetailTest(assertion)}>{ passFailIcon }ID{assertion.assertID} Expect {classOrId}{assertion.selectorName} {comparator} {assertion.value}</div>);
            } else if (assertion.selector === 'node') {
              // node
              assertText.push(<div className='accordion-asserts' onClick={()=>this.handleAssertDetailTest(assertion)}>{ passFailIcon }ID{assertion.assertID} Expect {assertion.compName} {assertion.source} {comparator} '{assertion.value}'</div>);
            } else {
              // tags
              assertText.push(<div className='accordion-asserts' onClick={()=>this.handleAssertDetailTest(assertion)}>{ passFailIcon }ID{assertion.assertID} Expect {assertion.selectorName} {comparator} {assertion.value}</div>);
            }
          }
        });
        assertionlist.push(
          <Accordion.Content className="accordion-content">
            {assertText}
          </Accordion.Content>
        );
      });
    }  
      return (
        <div>
        <Button primary size='small' className="btn btn-primary" onClick={()=>this.handleNewAssertionBlock()}> New Assertion Block</Button>
        <Button primary size='small' type="button" className="btn btn-primary" onClick={()=>this.saveEnzyme()}> Export to Enzyme File</Button>
        <div className="accordion-container">
          <Accordion styled>
            { assertionlist }
          </Accordion>
        </div>
        </div>

      )
    }
    
};

export default AssertionsList;

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
  }

  handleEdit() {
    console.log('edit');
  }

  handleAssertDetail() {
    console.log('handled assert detail')
  }
  saveEnzyme() {
    let text = generateTest(this.props.stateIsNowProp.assertionList, 'App');
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

  componentWillMount() {
    var loadedAsserts = localStorage.getItem("asserts");
    if (loadedAsserts) this.props.loadAssertionList(JSON.parse(loadedAsserts));
  }

  render() {
    let assertionlist = [];
    let listArray = this.props.stateIsNowProp.assertionList;
    if (listArray.length > 0) {
      listArray.forEach((block, i) => {
        const assertText = [];
        let styling;
        // Block pass/fail status
        if (block.passed === true) styling = ({'background': 'rgba(76, 175, 80, 0.8)', 'transition': 'all .25s ease-in'});
        else if (block.passed === false) styling = ({'background': 'rgba(255, 0, 0, 0.8)', 'transition': 'all .25s ease-in'});
        assertionlist.push(
            <Accordion.Title style={styling} className='accordion-block'>
              <Icon name='dropdown' />
              { block.name } 
              <Icon name='delete' style={{'float': 'right'}} onClick={() => this.handleDelete(block.name)} />
            </Accordion.Title>);
        // loop through all asserts in block
        block.asserts.forEach((assertion, i)=> {
          // Action/Test
          if (assertion.type === 'action') {
            assertText.push(<List.Item className='accordion-asserts' onClick={()=>this.handleAssertDetail()} >ID{assertion.assertID} Action: {assertion.event} on {JSON.stringify(assertion.loc)}</List.Item>);
          } else {
            if (assertion.selector !== 'node') {
            assertText.push(<List.Item className='accordion-asserts' onClick={()=>this.handleAssertDetail()}>ID{assertion.assertID} Test: {assertion.selector} {assertion.selectorName} expecting to test {assertion.type} {assertion.value}</List.Item>);
            } else {
            assertText.push(<List.Item className='accordion-asserts' onClick={()=>this.handleAssertDetail()}>ID{assertion.assertID} Test: {assertion.selector} {assertion.source} expecting to {assertion.type} {assertion.value}</List.Item>);
            }
          }
        });
        assertionlist.push(
          <Accordion.Content fluid>
            <List>
              {assertText}
            </List>
          </Accordion.Content>
        );
      });
    }  
      return (
        <div>
        <Button primary size='small' className="btn btn-primary" onClick={()=>this.handleNewAssertionBlock()}> New Assertion Block</Button>
        <Button primary size='small' className="btn btn-primary" onClick={()=>this.saveEnzyme()}> Export to Enzyme File</Button>
        <Accordion styled>
          { assertionlist }
        </Accordion>
        </div>

      )
    }
    
};

export default AssertionsList;

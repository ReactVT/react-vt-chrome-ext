import React, { Component } from 'react';
import { render } from 'react-dom';
import Blocks from './Blocks';

import KeyInformation from './KeyInformation';
import generateTest from './../enzyme/enzymeTranslate'

import ValueInformation from './ValueInformation';
import { Button, Accordion, Icon } from 'semantic-ui-react';

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

  componentWillMount() {
    var loadedAsserts = localStorage.getItem("asserts");
    if (loadedAsserts) this.props.loadAssertionList(JSON.parse(loadedAsserts));
  }

  render() {
    let assertionlist = [];
    let listArray = this.props.stateIsNowProp.assertionList;
    if (listArray.length > 0) {
      listArray.forEach((el, i) => {
          assertionlist.push(
            <Accordion.Title style={{'border': 'solid 1px black'}}>
              <Icon name='dropdown' />
              { el.name } 
              <Icon name='delete' style={{'float': 'right'}} onClick={() => this.handleDelete(el.name)} />
            </Accordion.Title>);
          assertionlist.push(
            <Accordion.Content >
              {JSON.stringify(el.asserts)}
            </Accordion.Content>);
      });
    }  
      return (
        <div>
        <Button primary size='small' className="btn btn-primary" onClick={()=>this.handleNewAssertionBlock()}> New Assertion Block</Button>
        <Button primary size='small' className="btn btn-primary" onClick={()=>this.saveEnzyme()}> Export to Enzyme File</Button>
        <Accordion>
          { assertionlist }
        </Accordion>
        </div>

      )
    }
    
};

export default AssertionsList;

import React, { Component } from 'react';
import { render } from 'react-dom';
import Blocks from './Blocks';

import KeyInformation from './KeyInformation';

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
        <Accordion>
          { assertionlist }
        </Accordion>
        </div>

      )
    }
    
};

export default AssertionsList;

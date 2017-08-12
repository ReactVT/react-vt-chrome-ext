import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Accordion, Icon } from 'semantic-ui-react';

class EditAssertionBlock extends Component {
  handleSaveAssertionBlock() {
    this.props.addAssertionToList(this.props.stateIsNowProp.assertionBlock);
    this.props.renderViewMode();
    this.props.toggleAssertionBlock();
  }

  handleEdit() {
    
  }

  handleDelete(id) {
    this.props.deleteAssertion(id);
  }

  handleCancel() {
    this.props.renderViewMode();
  }
  render() {
    let assertions = [];
    let assertsArray = this.props.stateIsNowProp.assertionBlock.asserts;
    if(assertsArray.length > 0) {
      assertsArray.forEach((el, i) => {
        if (el.type === 'action') {
        assertions.push(
          <Accordion.Title style={{'border': 'solid 1px black'}}>
              <Icon name='dropdown' />
              {el.assertID} { el.type } 
              <Icon name='delete' style={{'float': 'right'}} onClick={()=>this.handleDelete(el.assertID)} />
          </Accordion.Title>);
        assertions.push(
          <Accordion.Content>
              { el.event }
          </Accordion.Content>);
        } else {
          assertions.push(
            <Accordion.Title style={{'border': 'solid 1px black'}}>
                <Icon name='dropdown' />
                {el.assertID} { el.type } 
                <Icon name='delete' style={{'float': 'right'}} onClick={()=>this.handleDelete(el.assertID)} />
          </Accordion.Title>);
          assertions.push(
            <Accordion.Content>
                { el.type } { el.value }
            </Accordion.Content>);
        }
      });
    }
    return (
      <div>
        <Button primary size="mini" className="btn btn-primary" onClick={()=>this.props.renderActionMode()}>New Action</Button>
        <Button primary size="mini"  onClick={()=>this.props.renderTestMode()}>New Test</Button>
        <br />
        <Button primary positive size="small" className="btn btn-primary" onClick={()=>this.handleSaveAssertionBlock()}>Save Assertion Block</Button> 
        <Button primary negative size="tiny" className="btn btn-primary" onClick={()=>this.handleCancel()}>Cancel</Button> 
        <Accordion>  
          { assertions }
        </Accordion>
      </div>
    )
  }
}

export default EditAssertionBlock;

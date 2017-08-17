import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Accordion, Icon } from 'semantic-ui-react';

class EditAssertionBlock extends Component {
  handleSaveAssertionBlock() {
    console.log('IN EDIT BLOCK COMP ADD ASSERTIONBLOCK TO LIST', this.props.stateIsNowProp.assertionBlock)
    this.props.addAssertionToList(this.props.stateIsNowProp.assertionBlock);
    this.props.renderViewMode();
    this.props.toggleAssertionBlock();
  }

  handleEdit() {
    
  }

  handleDelete(id) {
    this.props.deleteAssertion(id);
    localStorage.setItem("asserts", JSON.stringify(this.props.stateIsNowProp.assertionList));
  }

  handleCancel() {
    this.props.renderViewMode();
  }
  render() {
    console.log('after test save', this.props.stateIsNowProp.test)
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
        <div className='button-container'>
          <Button primary positive size="tiny" className="btn btn-primary" onClick={()=>this.handleSaveAssertionBlock()}>Save Assertion Block</Button> 
          <Button primary negative size="tiny" type="button" className="btn btn-primary" onClick={()=>this.handleCancel()}>Cancel</Button> 
          <Button primary  size="small" type="button" className="ui primary basic button" onClick={()=>this.props.renderActionMode()}>New Action</Button>
          <Button primary size="small" type="button" className="ui primary basic button" id="newTestButton"onClick={()=>this.props.renderTestMode()}>New Test</Button>
        </div>
        <Accordion>  
          { assertions }
        </Accordion>
      </div>
    )
  }
}

export default EditAssertionBlock;

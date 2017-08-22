import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Input, Message, Icon } from 'semantic-ui-react';


class NameAssertionBlock extends Component {
  constructor(props) {
    super(props);
    this.error = '';
  }
  saveHandler(event) {
    event.preventDefault();
    let input = document.getElementById('assertionBlockName').value;
    console.log('save clicked', input)
    let invalid = false;
    // VALIDATE ASSERTION NAME FOR DUPES
    const assertionList = this.props.stateIsNowProp.assertionList;
    for (let i = 0; i < assertionList.length; i += 1) {
      if (input === assertionList[i].name || input.length === 0){ 
        this.error=(<Message id="invalidName" negative>
          <Message.Header>Invalid Name</Message.Header>
          <p>Name already exists. Please try another name.</p>
</Message>);
        invalid = true;
      }
    }
    
    if (!invalid) {
      this.props.newAssertionBlock(input);
      this.props.renderEditMode();
    } else this.forceUpdate();
  }

  handleBack() {
    this.props.renderViewMode();
  }

  render() {
    return (
      <div id="newAssertionBlockDiv">
        <form onSubmit={(event)=>{
          this.saveHandler(event);
          }}>
          <h4>Assertion Block Name </h4>
          <Input type="text" className="form-control" id="assertionBlockName" placeholder="e.g. 'should render button'" required ref="assertionBlockName" />
          <div className='button-container-right'>
          <Button animated primary inverted color="red" size="tiny" type="button" onClick={()=>this.handleBack()} className="btn btn-primary">
              <Button.Content visible>Cancel</Button.Content>
              <Button.Content hidden>
                <Icon name='delete' />
              </Button.Content>
            </Button>
            <Button animated primary size="tiny" type="submit" className="btn btn-primary">
                <Button.Content visible>Save</Button.Content>
                <Button.Content hidden>
                  <Icon name='save' />
                </Button.Content>
            </Button>
          </div>
          <br />
          {this.error}
        </form>
      </div>
    )
  }
}

export default NameAssertionBlock;

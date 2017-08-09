import React, { Component } from 'react';
import { render } from 'react-dom';


class AddAssertionBlock extends Component {


  handleSubmitEventForAddingBlock(event, savedAction, savedTest) {
      event.preventDefault();
      console.log('savedACTION',savedAction)
      console.log('savedTEST',savedTest)
      this.props.saveAssertionBlock([...savedAction, ...savedTest])
      this.props.addAssertionToList([...savedAction, ...savedTest])
  };

  render () {
  let savedAction;
  let savedTest;

  if(Object.keys(this.props.stateIsNowProp.actionAssertion).length === 0) savedAction = '';
  else savedAction = this.props.stateIsNowProp.actionAssertion


  if(Object.keys(this.props.stateIsNowProp.testAssertion).length === 0) savedTest = '';
  else savedTest = this.props.stateIsNowProp.testAssertion

    return (
      <form onSubmit={(event)=>this.handleSubmitEventForAddingBlock(event, savedAction, savedTest)}>

        <h3 className="page-header">Add Assertion Block</h3>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    );
  }
};

export default AddAssertionBlock;





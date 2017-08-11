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

    return (
      <form onSubmit={(event)=>this.handleSubmitEventForAddingBlock(event, savedAction, savedTest)}>

        <button className="btn btn-primary" onClick={()=>this.props.renderActionMode()}>New Assertion Block</button>
      </form>
    );
  }
};

export default AddAssertionBlock;





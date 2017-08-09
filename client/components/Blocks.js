import React, { Component } from 'react';
import { render } from 'react-dom';


class Blocks extends Component {

  handleSubmitEventForDeletingBlock(event, idOfBlock) {
      event.preventDefault();
      this.props.deleteAssertionList(idOfBlock)
      this.props.deleteAssertionBlock(idOfBlock)
      

  };
  render () {
    let idOfBlock = this.props.id
    console.log('props INSIDE BLOCKS',this.props)
    return (
      <div>
        <form onSubmit={(event)=>this.handleSubmitEventForDeletingBlock(event, this.props.id)} >
          {this.props.blockInfo}
          <button type='submit'>Delete</button>
        </form>
      </div>
    );
  }
};

export default Blocks;





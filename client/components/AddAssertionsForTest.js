import React, { Component } from 'react';
import { render } from 'react-dom';
import TestLocation from './TestLocation.js';
import TestData from './TestData.js';
import TestExpect from './TestExpect.js';


class AddAssertionsForTest extends Component {


  handleSubmitEventForTest(event) {
      event.preventDefault();
        const test = {}
        test.type = 'equal',
        test.loc = this.props.compAddress,
        test.dataType = this.refs.typeOfData.value,
        test.property = this.refs.keyOfPropOrState.value,
        test.modifier = 'Currently Disabled',
        test.value = this.refs.propertyValue.value

        console.log('test ASSERTION', test)
        this.props.saveTestAssertion(test)

  };

  render () {
    let testMode;
    if (this.props.stateIsNowProp.testMode === 'test1') testMode = ( <TestLocation { ...this.props } />);
    else if (this.props.stateIsNowProp.testMode === 'test2') testMode = ( <TestData { ...this.props } />);
    else if (this.props.stateIsNowProp.testMode === 'test3') testMode = ( <TestExpect { ...this.props } />);
    return (
      <div>
        {testMode}
      </div>
    );
  }
};

export default AddAssertionsForTest;




      // <form onSubmit={(event)=>{
      //   this.props.renderEditMode();
      //   this.handleSubmitEventForTest(event);
      //   }}>

      //   <h3 className="subheader">Test</h3>

      //   <div className="form-group">
      //     <label htmlFor="componentName">Component <span style={ {color: "#ffaaaa"} }>*</span></label>
      //     <input type="text" className="form-control" id="componentName" required ref="componentName" value={this.props.compName} disabled/>
      //   </div>

      //   <div className="form-group">
      //     <label htmlFor="ActionTest">Type of Test <span style={ {color: "#ffaaaa"} }>*</span></label>
      //     <input type="text" className="form-control"  id="ActionTest" required ref="ActionTest" value='equal' disabled/>
      //   </div>

      //   <div className="form-group">
      //     <label htmlFor="typeOfData">Type of Data <span style={ {color: "#ffaaaa"} }>*</span></label>
      //     <input type="text" className="form-control" id="typeOfData" placeholder="Enter State or Prop" required ref="typeOfData" />
      //   </div>

      //     <div className="form-group">
      //     <label htmlFor="keyOfPropOrState">Data to be tested <span style={ {color: "#ffaaaa"} }>*</span></label>
      //     <input type="text" className="form-control" id="keyOfPropOrState" placeholder="Enter desired prop/state" required ref="keyOfPropOrState" />
      //   </div>

      //   <div className="form-group">
      //     <label htmlFor="modifier">Modifier <span style={ {color: "#ffaaaa"} }>*</span></label>
      //     <input type="text" className="form-control" id="modifier" required ref="modifier" value="Currently Disabled" disabled/>
      //   </div>

      //   <div className="form-group">
      //     <label htmlFor="propertyValue">Value <span style={ {color: "#ffaaaa"} }>*</span></label>
      //     <input type="text" className="form-control" id="propertyValue" placeholder="Enter expected value" required ref="propertyValue" />
      //   </div> 

      //   <button type="submit" className="btn btn-primary">Save</button>
      // </form>